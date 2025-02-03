"use client";

import { Home } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database } from "@/lib/supabase/db-types";

type Settings = Database["public"]["Tables"]["settings"]["Row"];

interface ProfileTabProps {
	isLoading: boolean;
	isSubmitting: boolean;
	settings: Partial<Settings>;
	updateSettings: (settings: Partial<Settings>) => Promise<void>;
}

export function ProfileTab({
	isLoading,
	isSubmitting,
	settings,
	updateSettings,
}: ProfileTabProps) {
	const [localSettings, setLocalSettings] = useState<Settings>({
		id: settings?.id || "",
		clerk_user_id: settings?.clerk_user_id || "",
		created_at: settings?.created_at || new Date().toISOString(),
		updated_at: settings?.updated_at || new Date().toISOString(),
		home_airport: settings?.home_airport ?? null,
		aircraft_type: settings?.aircraft_type ?? null,
		rating_goal: settings?.rating_goal ?? null,
		units: settings?.units ?? "imperial",
		pilot_certificate: settings?.pilot_certificate ?? null,
		medical_certificate: settings?.medical_certificate ?? null,
		photo_id: settings?.photo_id ?? null,
		subscription: settings?.subscription ?? null,
		cookie_preferences: settings?.cookie_preferences ?? null,
		onboarding_complete: settings?.onboarding_complete ?? false,
	});

	const [error, setError] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	const handleChange = (
		field: keyof Settings,
		value: Settings[typeof field],
	) => {
		setLocalSettings((prev) => ({
			...prev,
			[field]: value,
			updated_at: new Date().toISOString(),
		}));
	};

	const handleSave = async () => {
		try {
			setError(null);
			setIsSaving(true);

			// Validate required fields
			if (!localSettings.home_airport) {
				throw new Error("Home airport is required");
			}

			await updateSettings(localSettings);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to save settings");
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<div className="text-slate-400">Loading...</div>
			</div>
		);
	}

	return (
		<div className="space-y-6 max-w-3xl p-6">
			{error && (
				<Alert variant="destructive">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<Card className="bg-slate-800 border-slate-700">
				<CardHeader>
					<CardTitle className="text-lg font-medium text-slate-200">
						<Home className="inline-block w-5 h-5 mr-2" />
						Basic Information
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<label className="text-sm font-medium text-slate-200">Units</label>
						<div className="flex items-center space-x-1 p-1 bg-slate-700/50 rounded-lg">
							<div
								onClick={() => handleChange("units", "imperial")}
								className={`px-3 py-1.5 rounded cursor-pointer text-sm transition-all ${
									localSettings.units === "imperial"
										? "bg-blue-500 text-white"
										: "text-slate-400 hover:text-slate-200"
								}`}
							>
								Imperial
							</div>
							<div
								onClick={() => handleChange("units", "metric")}
								className={`px-3 py-1.5 rounded cursor-pointer text-sm transition-all ${
									localSettings.units === "metric"
										? "bg-blue-500 text-white"
										: "text-slate-400 hover:text-slate-200"
								}`}
							>
								Metric
							</div>
						</div>
					</div>
					<div className="h-px bg-slate-700/50" />
					<div className="space-y-2">
						<label className="block text-sm font-medium text-slate-200">
							Home Airport
						</label>
						<div className="relative">
							<input
								type="text"
								value={localSettings.home_airport || ""}
								onChange={(e) => handleChange("home_airport", e.target.value)}
								placeholder="KORD"
								className="w-full pl-3 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-md text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-slate-200">
							Aircraft Type
						</label>
						<select
							value={localSettings.aircraft_type || ""}
							onChange={(e) => handleChange("aircraft_type", e.target.value)}
							className="w-full h-10 pl-3 pr-10 bg-slate-700/50 border border-slate-600/50 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
						>
							<option value="" disabled>
								Select aircraft
							</option>
							<option value="C172" className="bg-slate-800">
								Cessna 172
							</option>
							<option value="PA28" className="bg-slate-800">
								Piper Cherokee
							</option>
							<option value="C152" className="bg-slate-800">
								Cessna 152
							</option>
							<option value="BE36" className="bg-slate-800">
								Beechcraft Bonanza
							</option>
						</select>
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-slate-200">
							Current Rating Goal
						</label>
						<select
							value={localSettings.rating_goal || ""}
							onChange={(e) => handleChange("rating_goal", e.target.value)}
							className="w-full h-10 pl-3 pr-10 bg-slate-700/50 border border-slate-600/50 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
						>
							<option value="" disabled>
								Select rating
							</option>
							<option value="Private Pilot" className="bg-slate-800">
								Private Pilot
							</option>
							<option value="Instrument Rating" className="bg-slate-800">
								Instrument Rating
							</option>
							<option value="Commercial Pilot" className="bg-slate-800">
								Commercial Pilot
							</option>
							<option value="ATP" className="bg-slate-800">
								Airline Transport Pilot
							</option>
						</select>
					</div>
				</CardContent>
			</Card>

			<div className="pt-4">
				<button
					onClick={handleSave}
					disabled={isSubmitting || isSaving}
					className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				>
					{isSubmitting || isSaving ? "Saving..." : "Save Changes"}
				</button>
			</div>
		</div>
	);
}
