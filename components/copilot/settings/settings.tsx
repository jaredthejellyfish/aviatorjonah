"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@clerk/nextjs";
import { Sidebar } from "./Sidebar";
import { ProfileTab } from "components/copilot/settings/tabs/Profile";
import { FeedbackTab } from "components/copilot/settings/tabs/Feedback";
import { BugReportTab } from "components/copilot/settings/tabs/BugReport";
import { PoliciesTab } from "components/copilot/settings/tabs/Policies";
import { SubscriptionPage } from "components/copilot/settings/tabs/SubscriptionManagement";
import { BUILD_VERSION } from "./constants";
import { X } from "lucide-react";
import { useSettings } from "../SettingsProvider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Database } from "@/lib/supabase/db-types";

type Settings = Database["public"]["Tables"]["settings"]["Row"];

interface SettingsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

function SettingsDialogContent({ open, onOpenChange }: SettingsDialogProps) {
	const [activeTab, setActiveTab] = useState("profile");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { settings, updateSettings } = useSettings();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onOpenChange(false);
			}
		};

		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onOpenChange, open]);

	const handleFeedbackSubmit = async () => {
		setIsSubmitting(true);
		try {
			const response = await fetch("/api/feedback", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}), // Add your feedback data here
			});

			if (!response.ok) throw new Error("Failed to submit feedback");
			alert("Thank you for your feedback!");
			onOpenChange(false);
		} catch (error) {
			console.error("Error submitting feedback:", error);
			alert("Failed to submit feedback. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleBugReport = async () => {
		setIsSubmitting(true);
		try {
			const response = await fetch("/api/bug-report", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					buildVersion: BUILD_VERSION,
				}),
			});

			if (!response.ok) throw new Error("Failed to submit bug report");
			alert("Thank you for reporting this issue!");
			onOpenChange(false);
		} catch (error) {
			console.error("Error submitting bug report:", error);
			alert("Failed to submit bug report. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!open) return null;

	const renderTabContent = () => {
		switch (activeTab) {
			case "profile":
				return (
					<ProfileTab
						isLoading={!settings}
						isSubmitting={isSubmitting}
						settings={settings as Partial<Settings>}
						updateSettings={updateSettings}
					/>
				);
			case "subscription":
				return <SubscriptionPage />;
			case "feedback":
				return (
					<FeedbackTab
						isSubmitting={isSubmitting}
						onSubmit={handleFeedbackSubmit}
					/>
				);
			case "bug":
				return (
					<BugReportTab
						isSubmitting={isSubmitting}
						onSubmit={handleBugReport}
					/>
				);
			case "policies":
				return <PoliciesTab />;
			case "account":
				return (
					<div className="rounded-lg border border-slate-700/50 overflow-hidden">
						<UserProfile
							routing="hash"
							appearance={{
								elements: {
									rootBox: "bg-transparent",
									card: "bg-transparent shadow-none",
								},
							}}
						/>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
			<div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl w-full max-w-5xl shadow-xl flex overflow-hidden h-[80vh]">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								className="absolute top-4 right-4 text-slate-400 hover:text-white"
								onClick={() => onOpenChange(false)}
							>
								<X />
							</button>
						</TooltipTrigger>
						<TooltipContent>Close Settings</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

				<div className="flex-1 flex flex-col max-h-[80vh] overflow-hidden">
					{/* Content Header */}
					<div className="p-6 border-b border-slate-700/50">
						<h3 className="text-lg font-medium text-slate-200">
							{activeTab === "profile"
								? "Flight Profile"
								: activeTab === "account"
									? "Account Settings"
									: activeTab === "subscription"
										? "Subscription Management"
										: activeTab === "feedback"
											? "Feedback"
											: activeTab === "policies"
												? "Policies"
												: "Report Bug"}
						</h3>
						<p className="text-sm text-slate-400 mt-1">
							{activeTab === "profile"
								? "Customize your flight preferences and aircraft settings"
								: activeTab === "account"
									? "Manage your account details and preferences"
									: activeTab === "subscription"
										? "Manage your subscription plan and billing details"
										: activeTab === "feedback"
											? "Share your thoughts and suggestions"
											: activeTab === "policies"
												? "Review our policies and manage your data"
												: "Report a bug or technical issue"}
						</p>
					</div>

					{/* Content Body */}
					<div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
				</div>
			</div>

			{/* Build Version */}
			<div className="absolute bottom-6 right-6 text-xs text-slate-500">
				Build {BUILD_VERSION}
			</div>
		</div>
	);
}

export default function SettingsDialog(props: SettingsDialogProps) {
	return <SettingsDialogContent {...props} />;
}
