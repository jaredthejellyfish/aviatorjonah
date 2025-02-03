import { ToolCallResult, EmbeddingResponse } from "./types";

interface ManualInformationProps {
	result: ToolCallResult;
}

export function ManualInformation({ result }: ManualInformationProps) {
	// Parse the result if it's a string and cast to EmbeddingResponse
	const parsedResult: EmbeddingResponse =
		typeof result === "string"
			? JSON.parse(result)
			: (result as unknown as EmbeddingResponse);

	const parseEntry = (entry: { id: string; text: string; score: number }) => {
		const text = entry.text || "";

		// Parse the Python-style string format
		const contentMatch = text.match(/page_content='([\s\S]*?)' metadata=/);
		const metadataMatch = text.match(/metadata=({[\s\S]*?})$/);

		const content = contentMatch ? contentMatch[1] : text;
		let metadata;

		// If metadata is in the string, parse it
		if (metadataMatch) {
			try {
				// Replace single quotes with double quotes for valid JSON
				const metadataStr = metadataMatch[1].replace(/'/g, '"');
				metadata = JSON.parse(metadataStr);
			} catch (e) {
				console.error("Failed to parse metadata:", e);
			}
		}

		return { content, metadata };
	};

	return (
		<div className="border border-purple-500/20 rounded-lg p-3 my-2 bg-purple-500/5">
			<div className="flex items-center gap-2 mb-2">
				<div className="w-3 h-3 rounded-full bg-purple-500/20" />
				<div className="font-medium text-purple-400 text-sm">
					Retrieved Information from {parsedResult.source}
				</div>
			</div>
			<div className="space-y-2">
				{parsedResult.response.map((entry, entryIndex: number) => {
					const { content, metadata } = parseEntry(entry);
					const previewLines = content.split("\n").slice(0, 5);

					return (
						<div key={entryIndex}>
							<div className="text-gray-400 text-xs mb-1">
								Source: {parsedResult.source} - Page {metadata?.page || "N/A"}
							</div>
							<div className="bg-gray-800/50 p-2 rounded text-gray-300 text-sm">
								{previewLines.map((line: string, lineIndex: number) => (
									<span key={`${entryIndex}-${lineIndex}`}>{line.trim()} </span>
								))}
								<span className="text-gray-400 text-xs italic ml-2">
									...more
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
