interface ToolCall {
	type: string;
	toolCallId: string;
	toolName: string;
	args: Record<string, unknown>;
}

interface ToolResult {
	type: string;
	toolCallId: string;
	toolName: string;
	args: Record<string, unknown>;
	result: Record<string, unknown>;
}

interface MessageContent {
	type: string;
	text?: string;
	toolCallId?: string;
	toolName?: string;
	args?: Record<string, unknown>;
	result?: Record<string, unknown>;
}

interface Message {
	role: string;
	content: MessageContent[];
	id: string;
}

interface ResponseData {
	id: string;
	timestamp: string;
	modelId: string;
	headers: Record<string, string>;
	messages: Message[];
}

export interface Step {
	stepType: string;
	text: string;
	toolCalls: ToolCall[];
	toolResults: ToolResult[];
	finishReason: string;
	usage?: {
		promptTokens: number;
		completionTokens: number;
		totalTokens: number;
	};
	warnings?: string[];
	request?: {
		body: string;
	};
	response: ResponseData;
	experimental_providerMetadata?: {
		openai: {
			reasoningTokens: number;
			acceptedPredictionTokens: number;
			rejectedPredictionTokens: number;
			cachedPromptTokens: number;
		};
	};
	isContinued: boolean;
}

interface TransformedMessage {
	id: string;
	role: string;
	content: string;
	createdAt: string;
	toolInvocations?: Array<{
		state: string;
		toolCallId: string;
		toolName: string;
		args: Record<string, unknown>;
		result?: Record<string, unknown>;
	}>;
	revisionId?: string;
}

function transformSteps(steps: Step[]): TransformedMessage[] {
	return steps.map((step) => {
		if (step.finishReason === "stop") {
			return {
				id: crypto.randomUUID(),
				role: "assistant",
				content: step.text,
				createdAt: step.response.timestamp,
				revisionId: crypto.randomUUID(),
			};
		}

		const transformedStep: TransformedMessage = {
			id: crypto.randomUUID(),
			role: "assistant",
			content: "",
			createdAt: step.response.timestamp,
			toolInvocations: step.toolResults.map((toolResult) => {
				return {
					state: "result",
					toolCallId: crypto.randomUUID(),
					toolName: toolResult.toolName,
					args: toolResult.args,
					result: toolResult.result,
				};
			}),
		};
		return transformedStep;
	});
}

export default transformSteps;
