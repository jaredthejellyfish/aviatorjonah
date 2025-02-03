import { TafData } from "./types";

interface TafDisplayProps {
	data: TafData;
}

export function TafDisplay({ data }: TafDisplayProps) {
	const formatTime = (timestamp: number) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
	};

	return (
		<div className="space-y-2">
			<div className="font-medium text-amber-400">TAF for {data.name}</div>
			<div className="font-mono text-sm text-gray-300 bg-gray-800/50 p-2 rounded whitespace-pre-wrap">
				{data.rawTAF}
			</div>
			<div className="space-y-2 text-sm text-gray-300">
				{data.fcsts.map((fcst, index) => (
					<div
						key={index}
						className={`${index > 0 ? "border-t border-gray-700" : ""} pt-2`}
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							<div className="text-amber-400/80">
								{formatTime(fcst.timeFrom)} - {formatTime(fcst.timeTo)}
								{fcst.fcstChange && ` (${fcst.fcstChange})`}
								{fcst.probability && ` PROB${fcst.probability}`}
							</div>
							<div>
								Wind:{" "}
								{typeof fcst.wdir === "number" ? `${fcst.wdir}°` : fcst.wdir} at{" "}
								{fcst.wspd}kt{fcst.wgst ? ` G${fcst.wgst}` : ""}
							</div>
							<div>Vis: {fcst.visib}</div>
							<div>
								Clouds:{" "}
								{fcst.clouds
									.map(
										(cloud) =>
											`${cloud.cover}${cloud.base ? ` ${cloud.base}ft` : ""}`,
									)
									.join(", ")}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
