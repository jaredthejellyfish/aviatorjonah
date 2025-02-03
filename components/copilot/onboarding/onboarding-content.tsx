"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { X } from "lucide-react";

import { FormData, DEFAULT_FORM_DATA, Settings } from "./types";
import WelcomeStep from "./WelcomeStep";
import AirportStep from "./AirportStep";
import AircraftStep from "./AircraftStep";
import CompletionStep from "./CompletionStep";

type Props = {
	settings: Settings;
	updateSettings: (settings: Partial<Settings>) => void;
};

const CoPilotOnboarding: React.FC<Props> = ({ settings, updateSettings }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);

	useEffect(() => {
		// If settings is empty/undefined or has no keys, show onboarding
		if (!settings || Object.keys(settings).length === 0) {
			setIsLoading(false);
			setIsVisible(true);
			return;
		}

		if (settings.onboarding_complete !== undefined) {
			setIsVisible(!settings.onboarding_complete);
			setIsLoading(false);
		}

		if (!settings.home_airport) {
			setIsLoading(false);
			setIsVisible(true);
		}

		return () => {
			setIsLoading(true);
			setIsVisible(false);
		};
	}, [settings]);

	const handleInputChange = useCallback(
		(field: keyof FormData, value: string) => {
			setFormData((prev) => ({
				...prev,
				[field]:
					field === "home_airport" ? value.toUpperCase().slice(0, 4) : value,
			}));
		},
		[],
	);

	const steps = useMemo(
		() => [
			{ title: "Welcome to CoPilot", content: <WelcomeStep /> },
			{
				title: "Let's Get Started",
				content: (
					<AirportStep formData={formData} onInputChange={handleInputChange} />
				),
			},
			{
				title: "Aircraft & Experience",
				content: (
					<AircraftStep formData={formData} onInputChange={handleInputChange} />
				),
			},
			{ title: "Ready for Takeoff!", content: <CompletionStep /> },
		],
		[formData, handleInputChange],
	);

	const handleNext = useCallback(async () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep((prev) => prev + 1);
			return;
		}

		try {
			await updateSettings({
				home_airport: formData.home_airport.trim(),
				aircraft_type: formData.aircraft_type,
				rating_goal: formData.rating_goal,
				units: formData.units,
				onboarding_complete: true,
			});
			setIsVisible(false);
		} catch (error) {
			console.error("Settings update error:", error);
		}
	}, [currentStep, formData, updateSettings, steps]);

	const isStepValid = useMemo(() => {
		switch (currentStep) {
			case 0:
				return true;
			case 1:
				return Boolean(formData.home_airport && formData.timezone);
			case 2:
				return Boolean(formData.aircraft_type && formData.rating_goal);
			default:
				return true;
		}
	}, [currentStep, formData]);

	const handleClose = useCallback(() => {
		const confirmClose = window.confirm(
			"Are you sure you want to exit? Your progress will not be saved.",
		);
		if (confirmClose) {
			setIsVisible(false);
		}
	}, []);

	if (isLoading || !isVisible) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
			role="dialog"
			aria-modal="true"
			aria-labelledby="onboarding-title"
		>
			<div className="bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 relative border border-gray-800">
				<button
					onClick={handleClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
					aria-label="Close onboarding"
				>
					<X size={24} />
				</button>

				<div className="flex justify-center gap-2 pt-6">
					{steps.map((_, index) => (
						<div
							key={index}
							className={`h-2 w-16 rounded-full ${
								index <= currentStep ? "bg-cyan-500" : "bg-gray-700"
							}`}
							role="progressbar"
							aria-valuenow={((index + 1) / steps.length) * 100}
							aria-valuemin={0}
							aria-valuemax={100}
						/>
					))}
				</div>

				<div className="p-8">
					<h2
						id="onboarding-title"
						className="text-2xl font-bold mb-6 text-gray-100"
					>
						{steps[currentStep].title}
					</h2>

					<div className="mb-8">{steps[currentStep].content}</div>

					<button
						onClick={handleNext}
						disabled={!isStepValid}
						className={`w-full py-3 px-4 rounded-lg transition-colors font-semibold ${
							isStepValid
								? "bg-cyan-500 text-black hover:bg-cyan-400"
								: "bg-gray-700 text-gray-500 cursor-not-allowed"
						}`}
					>
						{currentStep === 0
							? "Get Started"
							: currentStep === steps.length - 1
								? "Complete Setup"
								: "Continue"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CoPilotOnboarding;
