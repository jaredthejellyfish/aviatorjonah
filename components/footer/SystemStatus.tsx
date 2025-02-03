import React, { useState } from "react";
import { ServiceStatus as ServiceStatusPopup } from "./ServiceStatus";
import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceStatus = {
	url: string;
	name: string;
	latency: number;
	isReachable: boolean;
};

type SystemStatusProps = {
	statuses: ServiceStatus[];
};

export const SystemStatus: React.FC<SystemStatusProps> = ({ statuses }) => {
	const [showStatus, setShowStatus] = useState(false);

	const getOverallStatus = (statuses: ServiceStatus[]) => {
		const unreachableCount = statuses.filter((s) => !s.isReachable).length;
		const highLatencyCount = statuses.filter(
			(s) => s.isReachable && s.latency > 500,
		).length;

		if (unreachableCount > 0) return "potential-outages";
		if (highLatencyCount > 0) return "degraded";
		return "normal";
	};

	const status = getOverallStatus(statuses);

	const statusConfig = {
		normal: {
			color: "bg-green-500",
			text: "All Systems Operational",
			icon: CheckCircle,
		},
		degraded: {
			color: "bg-yellow-500",
			text: "Degraded Performance",
			icon: AlertTriangle,
		},
		"potential-outages": {
			color: "bg-orange-500",
			text: "Potential Outages",
			icon: AlertOctagon,
		},
	};

	const { color, text, icon: Icon } = statusConfig[status];

	return (
		<>
			<button
				onClick={() => setShowStatus(true)}
				className={cn(
					"relative inline-flex items-center px-4 py-2 rounded-full bg-opacity-10 hover:bg-opacity-20 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 overflow-hidden",
					color,
				)}
			>
				<Icon className={`${color.replace("bg-", "text-")} mr-2`} size={16} />
				<span
					className={`text-sm font-medium ${color.replace("bg-", "text-")}`}
				>
					{text}
				</span>
				<span className="absolute inset-0 pointer-events-none">
					<span
						className={`
              absolute inset-0 ${color} opacity-0 
              hover:opacity-100 transition-opacity duration-300
            `}
					></span>
					<span
						className={`
              absolute inset-0 ${color} opacity-0 
              hover:opacity-100 transition-opacity duration-300
              animate-ping
            `}
					></span>
				</span>
			</button>
			{showStatus && (
				<ServiceStatusPopup
					open={showStatus}
					onOpenChange={setShowStatus}
					statuses={statuses}
					overallStatus={status}
				/>
			)}
		</>
	);
};
