import { ToolCallResult } from "./types";
import { MetarDisplay } from "./MetarDisplay";
import { TafDisplay } from "./TafDisplay";

interface WeatherReportProps {
	result: ToolCallResult;
}

export function WeatherReport({ result }: WeatherReportProps) {
	const metarData = result.metar?.[0];
	const tafData = result.taf?.[0];

	if (!metarData && !tafData) {
		return null;
	}

	return (
		<div className="border border-amber-500/20 rounded-lg p-4 my-2 bg-amber-500/5">
			<div className="flex items-center gap-2 mb-4">
				<div className="w-4 h-4 rounded-full bg-amber-500/20" />
				<div className="font-medium text-amber-400">Fetched weather data</div>
			</div>
			<div className="space-y-4">
				{metarData && <MetarDisplay data={metarData} />}
				{tafData && <TafDisplay data={tafData} />}
			</div>
		</div>
	);
}
