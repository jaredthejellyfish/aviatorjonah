import { ToolCall } from "./types";
import { ToolCallDisplay } from "./ToolCallDisplay";

interface ToolCallsProps {
	toolCalls: ToolCall[];
}

export function ToolCalls({ toolCalls }: ToolCallsProps) {
	return (
		<div className="space-y-2">
			{toolCalls.map((call) => (
				<ToolCallDisplay key={call.toolCallId} toolCall={call} />
			))}
		</div>
	);
}
