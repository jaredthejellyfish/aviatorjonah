import { ToolCall, ToolCallResult } from "./types";
import { ReasoningStep } from "./ReasoningStep";
import { WeatherData } from "./WeatherData";
import { WeatherReport } from "./WeatherReport";
import { ManualInformation } from "./ManualInformation";
import { LoadingStep } from "./LoadingStep";

interface ToolCallDisplayProps {
	toolCall: ToolCall;
}

export function ToolCallDisplay({ toolCall }: ToolCallDisplayProps) {
	// If the tool is still processing
	if (toolCall.state !== "result") {
		return <LoadingStep toolName={toolCall.toolName} />;
	}

	// Handle different tool types based on toolName
	const toolDisplayMap: Record<string, React.FC<{ result: ToolCallResult }>> = {
		addAReasoningStep: ({ result }) =>
			result?.title && result?.content ? (
				<ReasoningStep title={result.title} content={result.content} />
			) : null,
		getCurrentWeather: ({ result }) =>
			result ? <WeatherData result={result} /> : null,
		fetchTafAndMetar: ({ result }) =>
			result ? <WeatherReport result={result} /> : null,
		getInformationFromManuals: ({ result }) =>
			result ? <ManualInformation result={result} /> : null,
	};

	const DisplayComponent = toolDisplayMap[toolCall.toolName];
	return DisplayComponent ? (
		<DisplayComponent result={toolCall.result || {}} />
	) : null;
}
