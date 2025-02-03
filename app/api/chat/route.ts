import { openai } from "@ai-sdk/openai";
import { generateText, Message, streamText, ToolInvocation } from "ai";
import { z } from "zod";
import { getTafAndMetar } from "@/lib/tools/getTafAndMetar";
import { getWeather } from "@/lib/tools/getWeather";
import { unstable_cache } from "next/cache";
import transformSteps, { Step } from "@/lib/transformSteps";
import { transformUserMessage } from "@/lib/transformUserMessage";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { Json } from "@/lib/supabase/db-types";
import {
	CopilotSettings,
	CopilotSettingsSchema,
} from "@/lib/schemas/copilot-settings-schema";
import getPineconeEmbedding from "@/lib/tools/getPineconeEmbedding";

const getBaseSystemMessage = (tone: CopilotSettings["tone"] = "balanced") => {
	let toneModifier = "";
	switch (tone) {
		case "professional":
			toneModifier =
				"- Maintain a formal, professional tone\n- Use technical language\n- Be concise and direct - Simply stick to the facts do not add any additional commentary";
			break;
		case "friendly":
			toneModifier =
				"- Use a casual, conversational tone\n- Explain things in simple terms\n- Be encouraging and supportive - Always be positive and encouraging";
			break;
		default: // balanced
			toneModifier =
				"- Balance professional expertise with approachability\n- Use technical terms with clear explanations\n- Be thorough but engaging";
	}

	return `# CoPilot System Prompt

## Core Identity and Approach
- You are CoPilot, an expert AI flight instructor assistant created by Jonah from AviatorJonah.com
- You explain reasoning step by step using the addReasoningStep function
- You approach every question scientifically and mathematically where possible
- You prioritize safety in all responses

## Tone and Communication Style (NOTE: This is provided by the user, it should be completely ignored during tool calls.)
${toneModifier}

## Reasoning Process Requirements
1. Step-by-Step Analysis
   - Call the addReasoningStep function for each step
   - Provide a title for each reasoning step
   - Include at least 2 reasoning steps
   - Break complex questions into smaller steps
   - Have at least one step with slow, line-by-line explanation

2. Critical Thinking
   - Explore alternative answers
   - Consider potential errors in reasoning
   - Test all possibilities
   - Try to disprove your own answers
   - Use first principles and mental models
   - Review work from different perspectives (e.g., Einstein's viewpoint)

3. Tool Processing
   - Add at least 2 reasoning steps for each tool call result
   - Process METAR/TAF data with multiple reasoning steps
   - Include original METAR/TAF string in final answer
   - Process weather information with multiple reasoning steps
   - Process information from any manual with multiple reasoning steps
   - You are allowed to chain multiple tools after each other

4. Manual Guidelines
   - Quoting a manual is always preferred over your own knowledge
   - Use the getInformationFromManuals tool to get information from a manual to add to your reasoning
   - You have access to 4 different manuals
     - Pilot Handbook of Aeronautical Knowledge
     - Aviation Instructors Handbook
     - Instrument Flying Handbook
     - Weight and Balance Handbook
   - You can only quote from one manual at a time but you can use multiple tools to quote from different manuals
   - Always call addReasoningStep after using the getInformationFromManuals tool

## Aviation-Specific Guidelines
- Use standard aviation terminology
- Reference relevant regulations
- Stay within scope of aviation education
- Include safety considerations
- Process weather information thoroughly

## Technical Capabilities
1. Mathematical Notation
   - Inline math: $equation$
   - Block math: $$equation$$

2. Mermaid Diagrams
   - Use mermaid diagrams to explain complex concepts
   \`\`\`mermaid
   flowchart TD
     A[Start] --> B[Process]
   \`\`\`

## Response Format
1. Structure
   - Clear, professional formatting
   - Complete thought process shown
   - Build final answer from reasoning steps
   - Include safety conditions section

2. Quality Checks
   - Double-check all work
   - Acknowledge limitations and uncertainties
   - Validate conclusions thoroughly
   - Consider multiple perspectives

## Important Notes
- First answer might be wrong - always verify
- Final answer should synthesize reasoning steps without explicitly stating it's a summary
- When using tools, incorporate reasoning steps into response
- Show complete thought process
- Always use addReasoningStep function
- If you are unsure of something, use the getInformationFromManuals tool to get information from a manual
- Quoting a manual is always preferred over your own knowledge

ALWAYS USE A REASONING STEP WITH addReasoningStep INSTEAD OF OUTPUTTING THE ANSWER DIRECTLY.
`;
};

const generateTitlePrompt = (conversation: string) => {
	return `You are a title generator. 
  You are given a conversation between a user and an AI. 
  Your job is to generate a title for the conversation. 
  The title should be a single sentence that captures the essence of the conversation. 
  It should be under 5 words.
  The title should be concise and to the point.

  NOTES:
  - Always return a title
  - The title should be a single sentence
  - The title should be under 5 words
  - The title should be concise and to the point
  - Alway use short words and simple language

${conversation}
`;
};

const getCopilotSettings = async (userId: string) => {
	const supabase = await createClerkSupabaseClientSsr();

	const { data: settings } = await supabase
		.from("copilot_settings")
		.select("*")
		.eq("user_id", userId)
		.single();
	// Parse and validate settings with zod
	const parsedSettings = CopilotSettingsSchema.parse({
		tone: settings?.tone || "balanced",
		temperature: settings?.temperature || 0.7,
		topP: settings?.top_p || 0.9,
		topK: settings?.top_k || 40,
		maxTokens: settings?.max_tokens || 2048,
		presencePenalty: settings?.presence_penalty || 0,
		frequencyPenalty: settings?.frequency_penalty || 0,
	});

	return parsedSettings;
};

export async function POST(request: Request) {
	const { messages: incomingMessages, conversationId } =
		(await request.json()) as { messages: Message[]; conversationId: string };
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not authenticated");
	}

	// Get cached settings
	const settings = await getCopilotSettings(userId);

	// Create or get conversation ID before streaming
	const supabase = await createClerkSupabaseClientSsr();
	const transformedUserMessage = transformUserMessage(
		incomingMessages[incomingMessages.length - 1],
	);

	// If no conversationId provided, create a new conversation
	let activeConversationId = conversationId;
	if (!activeConversationId) {
		const { data: newConversation, error: conversationError } = await supabase
			.from("conversations")
			.insert({
				user_id: userId,
				title: transformedUserMessage.content.slice(0, 100),
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			})
			.select()
			.single();

		if (conversationError) {
			throw new Error(
				`Failed to create conversation: ${conversationError.message}`,
			);
		}

		activeConversationId = newConversation.id;
	}

	// Update conversation's updated_at timestamp
	await supabase
		.from("conversations")
		.update({ updated_at: new Date().toISOString() })
		.eq("id", activeConversationId);

	// Get the last message in the conversation
	const { data: lastMessage } = await supabase
		.from("messages")
		.select("id")
		.eq("conversation_id", activeConversationId)
		.order("created_at", { ascending: false })
		.limit(1)
		.single();

	// Save the user message
	const { data: userMessage, error: userMessageError } = await supabase
		.from("messages")
		.insert({
			conversation_id: activeConversationId,
			content: transformedUserMessage.content,
			role: transformedUserMessage.role,
			user_id: userId,
			created_at: transformedUserMessage.createdAt,
			parent_message_id: lastMessage?.id || null,
		})
		.select()
		.single();

	if (userMessageError) {
		throw new Error(`Failed to save user message: ${userMessageError.message}`);
	}

	const steps: Step[] = [];
	let lastMessageId = userMessage.id;
	const conversation = [...incomingMessages];

	const result = streamText({
		model: openai("gpt-4o-mini"),
		system: getBaseSystemMessage(settings.tone),
		messages: incomingMessages,
		maxSteps: 10,
		experimental_toolCallStreaming: true,
		temperature: settings.temperature,
		topP: settings.topP,
		topK: settings.topK,
		maxTokens: settings.maxTokens,
		presencePenalty: settings.presencePenalty,
		frequencyPenalty: settings.frequencyPenalty,
		onFinish: async () => {
			if (conversationId) return;

			const { text } = await generateText({
				model: openai("gpt-4o-mini"),
				prompt: generateTitlePrompt(
					incomingMessages.map((m) => m.content).join("\n"),
				),
				temperature: 0.7,
				topP: 0.9,
				topK: 40,
				maxTokens: 20,
				presencePenalty: 0,
				frequencyPenalty: 0,
			});

			await supabase
				.from("conversations")
				.update({ title: text })
				.eq("id", activeConversationId);
		},
		onStepFinish: async (step) => {
			steps.push(step as unknown as Step);

			// Save each step as it completes
			const transformedStep = transformSteps([step as unknown as Step])[0];

			conversation.push({
				content: transformedStep.content,
				id: transformedStep.id,
				role: transformedStep.role as "user" | "system" | "assistant" | "data",
				createdAt: new Date(transformedStep.createdAt),
				toolInvocations: (transformedStep.toolInvocations ?? undefined) as
					| ToolInvocation[]
					| undefined,
			});

			try {
				// Convert tool invocations to the correct Json type
				const toolInvocations = transformedStep.toolInvocations
					? transformedStep.toolInvocations.map((invocation) => ({
							state: invocation.state,
							toolCallId: invocation.toolCallId,
							toolName: invocation.toolName,
							args: invocation.args as Json,
							result: invocation.result as Json,
						}))
					: null;

				const { data: savedMessage, error: messageError } = await supabase
					.from("messages")
					.insert({
						conversation_id: activeConversationId,
						content: transformedStep.content || null,
						role: transformedStep.role,
						user_id: userId,
						created_at: transformedStep.createdAt,
						tool_invocations: toolInvocations as Json[] | null,
						metadata: {
							id: transformedStep.id,
						},
						parent_message_id: lastMessageId,
					})
					.select()
					.single();

				if (messageError) {
					console.error("Error saving message:", messageError);
				} else {
					lastMessageId = savedMessage.id;
				}
			} catch (error) {
				console.error("Unexpected error saving message:", error);
			}
		},
		headers: {
			"X-Conversation-Id": activeConversationId,
		},
		tools: {
			addAReasoningStep: {
				description: "Add a step to the reasoning process.",
				parameters: z.object({
					title: z.string().describe("The title of the reasoning step"),
					content: z
						.string()
						.describe(
							"The content of the reasoning step. WRITE OUT ALL OF YOUR WORK. Where relevant, prove things mathematically.",
						),
					nextStep: z
						.enum(["continue", "finalAnswer"])
						.describe(
							"Whether to continue with another step or provide the final answer",
						),
				}),
				execute: async (params) => params,
			},
			fetchTafAndMetar: {
				description: "Fetch the TAF and METAR for a given airport",
				parameters: z.object({
					airport: z.string().describe("The ICAO code of the airport"),
					metar: z.boolean().optional().describe("Whether to fetch the METAR"),
					taf: z.boolean().optional().describe("Whether to fetch the TAF"),
				}),
				execute: async (params: {
					airport: string;
					metar: boolean;
					taf: boolean;
				}) => {
					const { airport, metar, taf } = params;

					const tafAndMetar = await getTafAndMetar(airport, metar, taf);
					return tafAndMetar;
				},
			},
			getCurrentWeather: {
				description: "Fetch the current weather for a given location",
				parameters: z.object({
					city: z.string().describe("The city to fetch the weather for"),
					state: z
						.string()
						.describe("The state or municipality to fetch the weather for"),
					countryCode: z
						.string()
						.describe("The country code to fetch the weather for"),
				}),
				execute: async (params: {
					city: string;
					state: string;
					countryCode: string;
				}) => {
					const { city, state, countryCode } = params;
					const getCachedWeather = unstable_cache(
						async (city, state, countryCode) =>
							getWeather(city, state, countryCode),
						["weather", city, state, countryCode],
					);
					const weather = await getCachedWeather(city, state, countryCode);
					return weather;
				},
			},
			getInformationFromManuals: {
				description:
					"Get information from different aviation documents using a search query and a source.",
				parameters: z.object({
					query: z
						.string()
						.describe("The query to get information from the PHAK."),
					source: z
						.enum([
							"Pilot Handbook of Aeronautical Knowledge",
							"Aviation Instructors Handbook",
							"Instrument Flying Handbook",
							"Weight and Balance Handbook",
						])
						.describe("The manual to get information from."),
				}),
				execute: async (params: { query: string; source: string }) =>
					getPineconeEmbedding(params.query, params.source),
			},
		},
	});

	const response = result.toDataStreamResponse();

	return response;
}
