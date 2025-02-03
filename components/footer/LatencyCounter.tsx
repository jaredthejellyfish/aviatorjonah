"use client";

import { useServiceStatus } from "@/hooks/useServiceStatus";

export function LatencyCounter() {
	const { averageLatency } = useServiceStatus();

	return (
		<div className="text-sm text-gray-400 flex items-center space-x-2">
			<div>
				Latency: {averageLatency ? `${averageLatency}ms` : "Measuring..."}
			</div>
		</div>
	);
}
