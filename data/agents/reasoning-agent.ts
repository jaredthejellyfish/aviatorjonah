import { ChatOpenAI } from "@langchain/openai";
import {
	ChatPromptTemplate,
	MessagesPlaceholder,
} from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { BaseMessage } from "@langchain/core/messages";
import { LangChainAdapter } from "ai";
import REASONING_PROMPT from "../system-prompt";

const SYSTEM_TEMPLATE = `${REASONING_PROMPT}

Current query: {input}
`;

export async function processQuery(
	q: string,
	history: BaseMessage[] = [],
): Promise<Response> {
	const model = new ChatOpenAI({
		modelName: "gpt-4o-mini",
		temperature: 0.1,
		streaming: true,
	});

	const prompt = ChatPromptTemplate.fromMessages([
		["system", SYSTEM_TEMPLATE],
		new MessagesPlaceholder("history"),
		["human", "{input}"],
	]);

	const chain = RunnableSequence.from([
		{
			input: (input: string) => input,
			history: () => history,
		},
		prompt,
		model,
		new StringOutputParser(),
	]);

	try {
		const stream = await chain.stream(q);
		return LangChainAdapter.toDataStreamResponse(stream);
	} catch (error) {
		console.error("Error in reasoning chain:", error);
		throw error;
	}
}
