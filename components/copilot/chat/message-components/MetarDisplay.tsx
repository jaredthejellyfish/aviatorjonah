import { MetarData } from "./types";

interface MetarDisplayProps {
	data: MetarData;
}

export function MetarDisplay({ data }: MetarDisplayProps) {
	const getFlightCategory = (ceiling: number, visibility: number): string => {
		if (ceiling < 500 || visibility < 1) return "LIFR";
		if (ceiling < 1000 || visibility < 3) return "IFR";
		if (ceiling < 3000 || visibility < 5) return "MVFR";
		return "VFR";
	};

	const flightCategory = getFlightCategory(
		data.clouds[0]?.base || Infinity,
		data.visib,
	);

	return (
		<div className="space-y-2">
			<div className="font-medium text-amber-400">METAR for {data.name}</div>
			<div className="font-mono text-sm text-gray-300 bg-gray-800/50 p-2 rounded">
				{data.rawOb}
			</div>
			<div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
				<div>
					Flight Category:{" "}
					<span
						className={`font-medium ${
							flightCategory === "VFR"
								? "text-green-400"
								: flightCategory === "MVFR"
									? "text-blue-400"
									: flightCategory === "IFR"
										? "text-red-400"
										: flightCategory === "LIFR"
											? "text-purple-400"
											: "text-gray-400"
						}`}
					>
						{flightCategory}
					</span>
				</div>
				<div>Temperature: {data.temp}°C</div>
				<div>
					Wind: {data.wspd}kt @ {data.wdir}°
				</div>
				<div>Visibility: {data.visib}sm</div>
				<div>Dewpoint: {data.dewp}°C</div>
				<div>Altimeter: {(data.altim / 33.8639).toFixed(2)}&quot;Hg</div>
				<div>
					Clouds:{" "}
					{data.clouds
						.map((cloud) => `${cloud.cover} ${cloud.base}ft`)
						.join(", ")}
				</div>
				{data.wxString && <div>Weather: {data.wxString}</div>}
			</div>
		</div>
	);
}
