"use client";

import { useState, useEffect, useCallback } from "react";
import { useServiceStatus } from "@/hooks/useServiceStatus";
import { SystemStatus } from "@/components/footer/SystemStatus";
import { StatusAlert } from "@/components/status-alert";
import { LatencyCounter } from "./LatencyCounter";
import Cookies from "js-cookie";

export function StatusWrapper() {
	const { statuses } = useServiceStatus();
	const [overallStatus, setOverallStatus] = useState<
		"normal" | "degraded" | "potential-outages"
	>("normal");
	const [lastAlertedStatus, setLastAlertedStatus] = useState<
		"normal" | "degraded" | "potential-outages"
	>("normal");

	useEffect(() => {
		if (statuses) {
			const unreachableCount = statuses.filter((s) => !s.isReachable).length;
			const highLatencyCount = statuses.filter(
				(s) => s.isReachable && s.latency > 1500,
			).length;

			if (unreachableCount > 0) setOverallStatus("potential-outages");
			else if (highLatencyCount > 0) setOverallStatus("degraded");
			else setOverallStatus("normal");
		}
	}, [statuses]);

	const handleAlertClose = useCallback(() => {
		setLastAlertedStatus(overallStatus);
		Cookies.set("statusAlertDismissed", "true", { expires: 1 / 96 });
	}, [overallStatus]);

	useEffect(() => {
		const timer = setTimeout(
			() => {
				if (Cookies.get("statusAlertDismissed")) {
					setLastAlertedStatus("normal");
					Cookies.remove("statusAlertDismissed");
				}
			},
			15 * 60 * 1000,
		);

		return () => clearTimeout(timer);
	}, [lastAlertedStatus]);

	return (
		<>
			<div className="flex items-center space-x-4">
				<SystemStatus statuses={statuses} />
				<LatencyCounter />
			</div>
			<StatusAlert status={overallStatus} onClose={handleAlertClose} />
		</>
	);
}
