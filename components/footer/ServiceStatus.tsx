import React from "react";
import {
	CheckCircle,
	AlertTriangle,
	AlertOctagon,
	Twitter,
	ExternalLink,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type ServiceStatus = {
	url: string;
	name: string;
	latency: number;
	isReachable: boolean;
};

type ServiceStatusProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	statuses: ServiceStatus[];
	overallStatus: "normal" | "degraded" | "potential-outages";
};

const statusConfig = {
	normal: {
		color: "text-emerald-400",
		gradient: "from-emerald-500/20 to-emerald-500/10",
		border: "border-emerald-400/20",
		icon: CheckCircle,
		text: "Operational",
	},
	degraded: {
		color: "text-amber-400",
		gradient: "from-amber-500/20 to-amber-500/10",
		border: "border-amber-400/20",
		icon: AlertTriangle,
		text: "Degraded",
	},
	outage: {
		color: "text-rose-400",
		gradient: "from-rose-500/20 to-rose-500/10",
		border: "border-rose-400/20",
		icon: AlertOctagon,
		text: "Outage",
	},
};

const overallStatusConfig = {
	normal: {
		color: "text-emerald-400",
		gradient: "from-emerald-700/50 to-emerald-700/30",
		border: "border-emerald-400/50",
		icon: CheckCircle,
		text: "All Systems Operational",
	},
	degraded: {
		color: "text-amber-400",
		gradient: "from-amber-700/50 to-amber-700/30",
		border: "border-amber-400/50",
		icon: AlertTriangle,
		text: "Degraded Performance",
	},
	"potential-outages": {
		color: "text-rose-400",
		gradient: "from-rose-700/50 to-rose-700/30",
		border: "border-rose-400/50",
		icon: AlertOctagon,
		text: "Potential Outages",
	},
};

export const ServiceStatus: React.FC<ServiceStatusProps> = ({
	open,
	onOpenChange,
	statuses,
	overallStatus,
}) => {
	const getServiceStatus = (service: ServiceStatus) => {
		if (!service.isReachable) return "outage";
		if (service.latency > 500) return "degraded";
		return "normal";
	};

	const {
		color,
		gradient,
		border,
		icon: Icon,
		text,
	} = overallStatusConfig[overallStatus];

	const hasOutage = statuses.some((service) => !service.isReachable);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={`overflow-hidden rounded-lg border ${border} bg-gradient-to-b ${gradient} backdrop-blur-xl`}
			>
				<DialogHeader className="flex items-center justify-between p-6 border-b border-white/10">
					<DialogTitle className="text-xl font-medium text-white">
						Service Status
					</DialogTitle>
				</DialogHeader>

				<div className="p-6 space-y-6">
					<div
						className={`flex items-center justify-center rounded-lg border ${border} bg-white/5 p-4 w-full`}
					>
						<Icon className={`${color} mr-2 h-5 w-5`} />
						<span className={`${color} text-lg font-medium`}>{text}</span>
					</div>

					{hasOutage && (
						<div className="rounded-lg border border-white/10 bg-white/5 p-4 w-full">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center space-x-2">
									<Twitter className="h-5 w-5 text-[#1DA1F2]" />
									<span className="text-white font-medium">
										Follow for Updates
									</span>
								</div>
							</div>
							<p className="text-sm text-white/60 mb-3">
								Follow us on X (Twitter) for real-time updates on service status
								and incident resolution.
							</p>
							<a
								href="https://twitter.com/AviatorJonahHQ"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-between rounded-lg border border-[#1DA1F2]/20 bg-[#1DA1F2]/5 px-4 py-2.5 text-[#1DA1F2] transition-all hover:bg-[#1DA1F2]/10 w-full"
							>
								<span className="font-medium">@AviatorJonahHQ</span>
								<ExternalLink className="h-4 w-4" />
							</a>
						</div>
					)}

					<ul className="space-y-3 w-full">
						{statuses.map((service) => {
							const serviceStatus = getServiceStatus(service);
							const {
								color,
								gradient,
								border,
								icon: StatusIcon,
								text,
							} = statusConfig[serviceStatus];

							return (
								<li
									key={service.name}
									className={`
                        overflow-hidden rounded-lg border ${border}
                        bg-gradient-to-b ${gradient}
                        transition-all duration-200 w-full
                      `}
								>
									<div className="relative p-4">
										<div className="absolute inset-0 bg-grid-white/[0.02]" />
										<div className="relative flex items-center justify-between">
											<div className="space-y-1">
												<div className="font-medium text-white">
													{service.name}
												</div>
												{service.isReachable && (
													<div className="text-sm text-white/40">
														Latency: {service.latency}ms
													</div>
												)}
											</div>
											<div className="flex items-center space-x-2">
												<StatusIcon className={`${color} h-4 w-4`} />
												<span className={`${color} text-sm font-medium`}>
													{text}
												</span>
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</DialogContent>
		</Dialog>
	);
};
