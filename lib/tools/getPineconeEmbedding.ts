import { Pinecone } from "@pinecone-database/pinecone";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

export type EmbeddingResponse = {
	response: {
		id: string;
		text: string;
		score: number;
	}[];
	source: (typeof sources)[number]["name"];
};

const sources = [
	{ name: "Pilot Handbook of Aeronautical Knowledge", namespace: "default" },
	{
		name: "Aviation Instructors Handbook",
		namespace: "aviation_instructors_handbook",
	},
	{
		name: "Instrument Flying Handbook",
		namespace: "instrument_flying_handbook",
	},
	{
		name: "Weight and Balance Handbook",
		namespace: "weight_and_balance_handbook",
	},
] as const;

export default async function getPineconeEmbedding(
	query: string,
	source: string,
): Promise<EmbeddingResponse> {
	const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
	const index = pc.Index("copilot");

	const parsedSource = sources.find((s) => s.name === source);

	if (!parsedSource) {
		throw new Error("Invalid source");
	}

	const embedding = await embed({
		model: openai.embedding("text-embedding-ada-002"),
		value: query,
	});

	if (!embedding.embedding) {
		throw new Error("Embedding is undefined");
	}

	const queryResponse = await index.namespace(parsedSource.namespace).query({
		topK: 2,
		vector: embedding.embedding,
		includeValues: false,
		includeMetadata: true,
	});

	for (const match of queryResponse.matches) {
		console.log(match.metadata);
	}

	return {
		response: queryResponse.matches.map((match) => ({
			id: match.id,
			text: String(match.metadata?.text || ""),
			score: match.score || 0,
		})),
		source: parsedSource.name,
	};
}
