"use client";

import React, { useState, useEffect } from "react";
import { useSettings } from "../SettingsProvider";
import type { Settings } from "./types";
import dynamic from "next/dynamic";

const OnboardingContent = dynamic(() => import("./onboarding-content"), {
	ssr: false,
});

function OnboardingWrapper() {
	const { updateSettings, settings, isLoading } = useSettings();
	const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false); // Start with false to prevent flash
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		// Only update shouldShowOnboarding after initial settings load
		if (isLoading) return;

		// Show onboarding if settings is null/undefined or missing required fields
		if (!settings || Object.keys(settings).length === 0) {
			setShouldShowOnboarding(true);
			setIsInitialized(true);
			return;
		}

		const requiredFields: (keyof Settings)[] = [
			"home_airport",
			"aircraft_type",
		];
		const hasAllRequiredFields = requiredFields.every(
			(field) => settings[field] !== null && settings[field] !== undefined,
		);

		setShouldShowOnboarding(!hasAllRequiredFields);
		setIsInitialized(true);
	}, [settings, isLoading]);

	// Don't render anything while loading or before initialization
	if (isLoading || !isInitialized) return null;
	if (!shouldShowOnboarding) return null;

	// If settings exist but are incomplete, use them as a base
	const defaultSettings: Settings = {
		id: settings?.id ?? "",
		clerk_user_id: settings?.clerk_user_id ?? "",
		created_at: settings?.created_at ?? new Date().toISOString(),
		updated_at: settings?.updated_at ?? new Date().toISOString(),
		home_airport: settings?.home_airport ?? null,
		aircraft_type: settings?.aircraft_type ?? null,
		onboarding_complete: settings?.onboarding_complete ?? false,
		cookie_preferences: settings?.cookie_preferences ?? null,
		medical_certificate: settings?.medical_certificate ?? null,
		pilot_certificate: settings?.pilot_certificate ?? null,
		photo_id: settings?.photo_id ?? null,
		rating_goal: settings?.rating_goal ?? null,
		subscription: settings?.subscription ?? null,
		units: settings?.units ?? "imperial",
	};

	return (
		<OnboardingContent
			settings={defaultSettings}
			updateSettings={updateSettings}
		/>
	);
}

export default OnboardingWrapper;
