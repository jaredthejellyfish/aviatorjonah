"use client";

import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopilotSettings } from "@/components/copilot/CopilotSettingsProvider";
import {
	type CopilotSettings,
	type CopilotSettingsUpdate,
} from "@/lib/schemas/copilot-settings-schema";
import { useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";

interface SettingsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
	const { settings, isLoading, updateSettings, error } = useCopilotSettings();
	const queryClient = useQueryClient();
	const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

	// Local state for form values
	const [localSettings, setLocalSettings] = useState<CopilotSettings>({
		temperature: 0.7,
		topP: 0.9,
		topK: 40,
		maxTokens: 2048,
		presencePenalty: 0,
		frequencyPenalty: 0,
		tone: "balanced",
		show_intermediate_steps: false,
	});

	useEffect(() => {
		if (settings) {
			setLocalSettings(settings);
		}
	}, [settings]);

	// Generic handler for all setting changes
	const handleSettingChange = <K extends keyof CopilotSettingsUpdate>(
		key: K,
		value: CopilotSettingsUpdate[K],
	) => {
		// Update local state immediately for responsive UI
		setLocalSettings((prev) => ({ ...prev, [key]: value }));

		// Prepare the update
		const update = { [key]: value } as CopilotSettingsUpdate;

		// Optimistically update the cache
		queryClient.setQueryData<CopilotSettings>(["copilot-settings"], (old) => {
			if (!old) return old;
			return { ...old, ...update };
		});

		// Send update to server
		updateSettings(update);
	};

	if (isLoading || !settings) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="sm:max-w-[500px] bg-slate-800 border border-slate-700">
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold text-slate-200">
							Settings
						</DialogTitle>
						<DialogDescription className="text-sm text-slate-400">
							Loading your preferences...
						</DialogDescription>
					</DialogHeader>
					<div className="flex items-center justify-center py-8">
						<div className="text-slate-400">Loading settings...</div>
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px] bg-slate-800 border border-slate-700">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold text-slate-200">
						Settings
					</DialogTitle>
					<DialogDescription className="text-sm text-slate-400">
						Customize your chat experience and preferences
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className="max-h-[70vh] pr-4">
					<div className="space-y-8 py-4">
						<div className="space-y-4">
							<div>
								<Label className="text-sm font-medium text-slate-200">
									Show intermediate steps
								</Label>
								<p className="text-sm text-slate-400 mt-0.5">
									Show the intermediate steps the assistant takes to reach the
									final answer
								</p>
								<div className="flex items-center justify-between space-x-3 space-y-0 rounded-lg border border-slate-700 p-4 mt-2 hover:bg-slate-700/50">
									<div className="space-y-1">
										<p className="text-sm font-medium leading-none text-slate-200">
											{localSettings.show_intermediate_steps
												? "Enabled"
												: "Disabled"}
										</p>
										<p className="text-sm text-slate-400">
											See how the assistant arrives at its answers
										</p>
									</div>
									<Switch
										checked={localSettings.show_intermediate_steps}
										onCheckedChange={(checked) =>
											handleSettingChange("show_intermediate_steps", checked)
										}
									/>
								</div>
							</div>
						</div>
						{/* Conversation Tone */}
						<div className="space-y-4">
							<div>
								<Label className="text-sm font-medium text-slate-200">
									Conversation Tone
								</Label>
								<p className="text-sm text-slate-400 mt-0.5">
									Set the personality and style of responses
								</p>
							</div>
							<RadioGroup
								value={localSettings.tone}
								onValueChange={(
									value: "professional" | "balanced" | "friendly",
								) => handleSettingChange("tone", value)}
								className="grid grid-cols-1 gap-2"
							>
								<Label
									htmlFor="professional"
									className="flex items-center space-x-3 space-y-0 rounded-lg border border-slate-700 p-4 hover:bg-slate-700/50 cursor-pointer"
								>
									<RadioGroupItem value="professional" id="professional" />
									<div className="space-y-1">
										<p className="text-sm font-medium leading-none text-slate-200">
											Professional
										</p>
										<p className="text-sm text-slate-400">
											Formal and business-like responses
										</p>
									</div>
								</Label>
								<Label
									htmlFor="balanced"
									className="flex items-center space-x-3 space-y-0 rounded-lg border border-slate-700 p-4 hover:bg-slate-700/50 cursor-pointer"
								>
									<RadioGroupItem value="balanced" id="balanced" />
									<div className="space-y-1">
										<p className="text-sm font-medium leading-none text-slate-200">
											Balanced
										</p>
										<p className="text-sm text-slate-400">
											Mix of professional and conversational
										</p>
									</div>
								</Label>
								<Label
									htmlFor="friendly"
									className="flex items-center space-x-3 space-y-0 rounded-lg border border-slate-700 p-4 hover:bg-slate-700/50 cursor-pointer"
								>
									<RadioGroupItem value="friendly" id="friendly" />
									<div className="space-y-1">
										<p className="text-sm font-medium leading-none text-slate-200">
											Friendly
										</p>
										<p className="text-sm text-slate-400">
											Casual and conversational style
										</p>
									</div>
								</Label>
							</RadioGroup>
						</div>

						<Button
							className="flex items-center gap-2 text-xs bg-transparent border border-slate-700"
							onClick={() => {
								setShowAdvancedSettings(!showAdvancedSettings);
								// Wait for state update and DOM to render
								setTimeout(() => {
									const dialogContent = document.querySelector(
										'[role="dialog"] [data-radix-scroll-area-viewport]',
									);
									if (dialogContent && !showAdvancedSettings) {
										dialogContent.scrollTo({
											top: dialogContent.scrollHeight * 0.1,
											behavior: "smooth",
										});
									}
								}, 100);
							}}
						>
							<ChevronDown
								className={cn(
									"w-4 h-4 text-slate-400 rotate-0 transition-transform duration-200",
									showAdvancedSettings && "rotate-180",
								)}
							/>
							<span>Advanced Settings</span>
						</Button>

						{showAdvancedSettings && (
							<div className="space-y-6">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div>
											<Label className="text-sm font-medium text-slate-200">
												Model Parameters
											</Label>
											<p className="text-sm text-slate-400 mt-0.5">
												Fine-tune the AI model&apos;s response generation
											</p>
										</div>
										<Button
											variant="outline"
											size="sm"
											className="text-xs border-slate-700 hover:bg-slate-700/50"
											onClick={() => {
												const defaults = {
													temperature: 0.7,
													topP: 0.9,
													topK: 40,
													maxTokens: 2048,
													presencePenalty: 0,
													frequencyPenalty: 0,
												};
												handleSettingChange(
													"temperature",
													defaults.temperature,
												);
												handleSettingChange("topP", defaults.topP);
												handleSettingChange("topK", defaults.topK);
												handleSettingChange("maxTokens", defaults.maxTokens);
												handleSettingChange(
													"presencePenalty",
													defaults.presencePenalty,
												);
												handleSettingChange(
													"frequencyPenalty",
													defaults.frequencyPenalty,
												);
											}}
										>
											Reset to Defaults
										</Button>
									</div>

									{/* Temperature */}
									<div className="space-y-2">
										<div className="flex justify-between">
											<Label className="text-sm text-slate-200">
												Temperature
											</Label>
											<span className="text-sm text-slate-400">
												{localSettings.temperature}
											</span>
										</div>
										<input
											type="range"
											min="0"
											max="2"
											step="0.1"
											value={localSettings.temperature}
											onChange={(e) => {
												const value = parseFloat(e.target.value);
												handleSettingChange("temperature", value);
											}}
											className="w-full accent-blue-500"
										/>
										<p className="text-xs text-slate-400">
											Controls randomness in responses. Higher values make
											output more creative but less focused.
										</p>
									</div>

									{/* Top P */}
									<div className="space-y-2">
										<div className="flex justify-between">
											<Label className="text-sm text-slate-200">
												Top P (Nucleus Sampling)
											</Label>
											<span className="text-sm text-slate-400">
												{localSettings.topP}
											</span>
										</div>
										<input
											type="range"
											min="0"
											max="1"
											step="0.05"
											value={localSettings.topP}
											onChange={(e) => {
												const value = parseFloat(e.target.value);
												handleSettingChange("topP", value);
											}}
											className="w-full accent-blue-500"
										/>
										<p className="text-xs text-slate-400">
											Controls diversity via cumulative probability
											thresholding.
										</p>
									</div>

									{/* Top K */}
									<div className="space-y-2">
										<div className="flex justify-between">
											<Label className="text-sm text-slate-200">Top K</Label>
											<span className="text-sm text-slate-400">
												{localSettings.topK}
											</span>
										</div>
										<input
											type="range"
											min="1"
											max="100"
											step="1"
											value={localSettings.topK}
											onChange={(e) => {
												const value = parseInt(e.target.value);
												handleSettingChange("topK", value);
											}}
											className="w-full accent-blue-500"
										/>
										<p className="text-xs text-slate-400">
											Limits the number of tokens considered for each step of
											text generation.
										</p>
									</div>

									{/* Max Tokens */}
									<div className="space-y-2">
										<div className="flex justify-between">
											<Label className="text-sm text-slate-200">
												Max Tokens
											</Label>
											<span className="text-sm text-slate-400">
												{localSettings.maxTokens}
											</span>
										</div>
										<input
											type="range"
											min="256"
											max="4096"
											step="256"
											value={localSettings.maxTokens}
											onChange={(e) => {
												const value = parseInt(e.target.value);
												handleSettingChange("maxTokens", value);
											}}
											className="w-full accent-blue-500"
										/>
										<p className="text-xs text-slate-400">
											Maximum length of the generated response.
										</p>
									</div>

									{/* Presence Penalty */}
									<div className="space-y-2">
										<div className="flex justify-between">
											<Label className="text-sm text-slate-200">
												Presence Penalty
											</Label>
											<span className="text-sm text-slate-400">
												{localSettings.presencePenalty}
											</span>
										</div>
										<input
											type="range"
											min="-2"
											max="2"
											step="0.1"
											value={localSettings.presencePenalty}
											onChange={(e) => {
												const value = parseFloat(e.target.value);
												handleSettingChange("presencePenalty", value);
											}}
											className="w-full accent-blue-500"
										/>
										<p className="text-xs text-slate-400">
											Reduces repetition by penalizing tokens that have appeared
											in the text.
										</p>
									</div>

									{/* Frequency Penalty */}
									<div className="space-y-2">
										<div className="flex justify-between">
											<Label className="text-sm text-slate-200">
												Frequency Penalty
											</Label>
											<span className="text-sm text-slate-400">
												{localSettings.frequencyPenalty}
											</span>
										</div>
										<input
											type="range"
											min="-2"
											max="2"
											step="0.1"
											value={localSettings.frequencyPenalty}
											onChange={(e) => {
												const value = parseFloat(e.target.value);
												handleSettingChange("frequencyPenalty", value);
											}}
											className="w-full accent-blue-500"
										/>
										<p className="text-xs text-slate-400">
											Reduces repetition by penalizing tokens based on their
											frequency in the text.
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</ScrollArea>

				{error && (
					<div className="text-red-400 text-sm mt-2">
						Failed to save settings. Please try again.
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
