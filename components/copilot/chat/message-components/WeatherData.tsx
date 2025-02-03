import { ToolCallResult } from "./types";

interface WeatherDataProps {
	result: ToolCallResult;
}

export function WeatherData({ result }: WeatherDataProps) {
	if (!result.weather?.[0] || !result.main) return null;

	return (
		<div className="border border-emerald-500/20 rounded-lg p-4 my-2 bg-emerald-500/5">
			<div className="flex items-center gap-2 mb-2">
				<div className="w-4 h-4 rounded-full bg-emerald-500/20" />
				<div className="font-medium text-emerald-400">
					Weather Data Retrieved
				</div>
			</div>
			<div className="text-gray-300 text-sm pl-6 space-y-1">
				<div>Condition: {result.weather[0].description}</div>
				<div>Temperature: {result.main.temp}°C</div>
				<div>Humidity: {result.main.humidity}%</div>
			</div>
		</div>
	);
}
