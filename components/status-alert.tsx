"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { AlertTriangle, X, Twitter, ExternalLink } from "lucide-react";
import Cookies from "js-cookie";

type StatusType = "normal" | "degraded" | "potential-outages";

type StatusAlertProps = {
	status: StatusType;
	onClose: () => void;
};

const statusConfig = {
	normal: {
		gradient: "from-emerald-500/20 to-emerald-500/10",
		border: "border-emerald-400/20",
		textColor: "text-emerald-400",
		icon: AlertTriangle,
		message: "All systems are operational.",
	},
	degraded: {
		gradient: "from-amber-500/20 to-amber-500/10",
		border: "border-amber-400/20",
		textColor: "text-amber-400",
		icon: AlertTriangle,
		message: "It appears there is higher latency than recommended.",
	},
	"potential-outages": {
		gradient: "from-rose-500/20 to-rose-500/10",
		border: "border-rose-400/20",
		textColor: "text-rose-400",
		icon: AlertTriangle,
		message: "There is an outage. Please check your internet connection.",
	},
} as const;

export const StatusAlert: React.FC<StatusAlertProps> = ({
	status,
	onClose,
}) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Don't show alert if status is normal
		if (status === "normal") {
			setIsVisible(false);
			return;
		}

		const alertDismissed = Cookies.get("statusAlertDismissed");
		if (!alertDismissed) {
			setIsVisible(true);
		}
	}, [status]);

	const dismissAlert = () => {
		setIsVisible(false);
		Cookies.set("statusAlertDismissed", "true", { expires: 1 / 96 }); // 15 minutes
		onClose();
		setTimeout(
			() => {
				Cookies.remove("statusAlertDismissed");
			},
			15 * 60 * 1000,
		);
	};

	if (!isVisible) return null;

	// Ensure status is a valid key in statusConfig
	if (!(status in statusConfig)) {
		console.error(`Invalid status: ${status}`);
		return null;
	}

	const {
		gradient,
		border,
		textColor,
		icon: Icon,
		message,
	} = statusConfig[status];

	return (
		<div className="fixed bottom-4 right-4 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-300">
			<div
				className={`relative overflow-hidden rounded-lg border ${border} bg-gradient-to-b ${gradient} backdrop-blur-xl`}
			>
				<div className="absolute inset-0 bg-grid-white/[0.02]" />

				<div className="relative p-6">
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center space-x-2">
							<div className={`rounded-full ${textColor} bg-white/10 p-1`}>
								<Icon className="h-4 w-4" />
							</div>
							<h3 className={`${textColor} font-medium text-base`}>
								Service Status
							</h3>
						</div>
						<button
							type="button"
							onClick={dismissAlert}
							className="rounded-full p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
						>
							<X className="h-4 w-4" />
						</button>
					</div>

					<p className="mb-4 text-sm text-white/80">
						{message} If this issue persists, please check our{" "}
						<a
							href="https://x.com/AviatorJonahHQ"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-white"
						>
							X page
						</a>{" "}
						or{" "}
						<a
							href="https://support.aviatorjonah.com"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-white"
						>
							open a support ticket
						</a>
						.
					</p>

					<a
						href="https://x.com/AviatorJonahHQ"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
					>
						<span className="flex items-center space-x-2">
							<Twitter className="h-4 w-4" />
							<span>Follow @AviatorJonahHQ for updates</span>
						</span>
						<ExternalLink className="h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default StatusAlert;
