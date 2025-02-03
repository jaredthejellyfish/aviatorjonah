"use client";

import { useState, FormEvent } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CountrySelector from "@/components/country-selector";
import { useRouter } from "next/navigation";

interface FormData {
	name: string;
	email: string;
	country: string;
	aviationExperience: string;
	currentRoles: string;
	discord: string;
	termsAccepted: boolean;
	betaPolicyAccepted: boolean;
}

interface FormErrors {
	name?: string;
	email?: string;
	country?: string;
	aviationExperience?: string;
	currentRoles?: string;
	discord?: string;
}

interface SubmitStatus {
	type: "success" | "error" | "";
	message: string;
}

const sendBetaApplication = async (formData: FormData): Promise<Response> => {
	const response = await fetch("/api/beta", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: formData.email,
			name: formData.name,
			country: formData.country,
			aviation_experience: formData.aviationExperience,
			current_roles: formData.currentRoles,
			discord: formData.discord,
			terms_accepted: formData.termsAccepted,
			beta_policy_accepted: formData.betaPolicyAccepted,
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to submit application: ${response.statusText}`);
	}

	return response;
};

export default function BetaTesterForm({
	firstName,
	lastName,
	email,
}: { firstName: string; lastName: string; email: string }) {
	const [formData, setFormData] = useState<FormData>({
		name: `${firstName} ${lastName}`,
		email: email,
		country: "",
		aviationExperience: "",
		currentRoles: "",
		discord: "",
		termsAccepted: false,
		betaPolicyAccepted: false,
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
		type: "",
		message: "",
	});
	const router = useRouter();

	const inputStyle =
		"mt-2 block w-full px-4 py-3 rounded-lg bg-gray-700/50 border-gray-600/50 text-gray-100 shadow-sm focus:border-blue-400 focus:ring-blue-400 transition-colors duration-200 placeholder-gray-400";
	const labelStyle = "block text-sm font-medium text-gray-200";

	const validateForm = (): boolean => {
		const errors: FormErrors = {};
		let isValid = true;

		// Name validation
		if (formData.name.trim().length < 2) {
			errors.name = "Name must be at least 2 characters long";
			isValid = false;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			errors.email = "Please enter a valid email address";
			isValid = false;
		}

		// Country validation
		if (!formData.country) {
			errors.country = "Please select your country";
			isValid = false;
		}

		// Aviation Experience validation
		if (formData.aviationExperience.trim().length < 10) {
			errors.aviationExperience =
				"Please provide more detail about your aviation experience";
			isValid = false;
		}

		// Current Roles validation
		if (formData.currentRoles.trim().length < 5) {
			errors.currentRoles = "Please specify your current aviation roles";
			isValid = false;
		}

		// Discord validation (optional)
		if (formData.discord && !formData.discord.includes("#")) {
			errors.discord =
				"Please include your Discord discriminator (e.g. username#0000)";
		}

		setFormErrors(errors);
		return isValid;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		if (!formData.termsAccepted || !formData.betaPolicyAccepted) {
			setSubmitStatus({
				type: "error",
				message: "Please accept both the Terms of Use and Privacy Policy",
			});
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus({ type: "", message: "" });

		try {
			await sendBetaApplication(formData);

			setSubmitStatus({
				type: "success",
				message:
					"Application submitted successfully! Check your email for confirmation.",
			});

			setFormData({
				name: "",
				email: "",
				country: "",
				aviationExperience: "",
				currentRoles: "",
				discord: "",
				termsAccepted: false,
				betaPolicyAccepted: false,
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			setSubmitStatus({
				type: "error",
				message: errorMessage.includes(
					'duplicate key value violates unique constraint "beta_applications_email_key"',
				)
					? "This email has already been registered for beta testing."
					: "Error submitting application. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
			router.refresh();
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-32 px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl mx-auto mt-8">
				{submitStatus.message && (
					<Alert
						className={`mb-6 ${submitStatus.type === "success" ? "bg-green-500/20 text-green-300 border-green-500/20" : "bg-red-500/20 text-red-300 border-red-500/20"}`}
					>
						<AlertDescription>{submitStatus.message}</AlertDescription>
					</Alert>
				)}

				<Card className="bg-gray-800/80 backdrop-blur-lg shadow-2xl border border-gray-700/50 rounded-xl">
					<CardHeader className="space-y-2 pb-8">
						<CardTitle className="text-3xl font-bold text-center text-gray-100 tracking-tight">
							CoPilot Beta Tester Application
						</CardTitle>
						<CardDescription className="text-center text-gray-300">
							Join us in shaping the future of aviation education
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="name" className={labelStyle}>
									Legal Full Name*
								</label>
								<input
									id="name"
									type="text"
									required
									className={`${inputStyle} ${formErrors.name ? "border-red-500" : ""}`}
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									aria-label="Your legal full name"
									aria-invalid={!!formErrors.name}
									aria-describedby={formErrors.name ? "name-error" : undefined}
									placeholder="John Doe"
									minLength={2}
									disabled
								/>
								{formErrors.name && (
									<p id="name-error" className="mt-1 text-sm text-red-500">
										{formErrors.name}
									</p>
								)}
							</div>

							<div>
								<label htmlFor="email" className={labelStyle}>
									Email Address*
								</label>
								<input
									id="email"
									type="email"
									required
									className={`${inputStyle} ${formErrors.email ? "border-red-500" : ""}`}
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									aria-label="Your email address"
									aria-invalid={!!formErrors.email}
									aria-describedby={
										formErrors.email ? "email-error" : undefined
									}
									placeholder="john.doe@example.com"
									disabled
								/>
								{formErrors.email && (
									<p id="email-error" className="mt-1 text-sm text-red-500">
										{formErrors.email}
									</p>
								)}
							</div>

							<div>
								<label htmlFor="country" className={labelStyle}>
									Country of Residence*
								</label>
								<CountrySelector
									value={formData.country}
									onChange={(country) => setFormData({ ...formData, country })}
									required
									aria-label="Your country of residence"
									aria-invalid={!!formErrors.country}
									aria-describedby={
										formErrors.country ? "country-error" : undefined
									}
								/>
								{formErrors.country && (
									<p id="country-error" className="mt-1 text-sm text-red-500">
										{formErrors.country}
									</p>
								)}
							</div>

							<div>
								<label htmlFor="aviation-experience" className={labelStyle}>
									Aviation Experience*
								</label>
								<textarea
									id="aviation-experience"
									required
									rows={3}
									className={`${inputStyle} ${formErrors.aviationExperience ? "border-red-500" : ""}`}
									placeholder="Tell us about your aviation background, licenses, ratings, and years of experience..."
									value={formData.aviationExperience}
									onChange={(e) =>
										setFormData({
											...formData,
											aviationExperience: e.target.value,
										})
									}
									aria-label="Your aviation experience"
									aria-invalid={!!formErrors.aviationExperience}
									aria-describedby={
										formErrors.aviationExperience
											? "aviation-exp-error"
											: undefined
									}
									minLength={10}
								/>
								{formErrors.aviationExperience && (
									<p
										id="aviation-exp-error"
										className="mt-1 text-sm text-red-500"
									>
										{formErrors.aviationExperience}
									</p>
								)}
							</div>

							<div>
								<label htmlFor="current-roles" className={labelStyle}>
									Current Aviation Roles*
								</label>
								<textarea
									id="current-roles"
									required
									rows={2}
									className={`${inputStyle} ${formErrors.currentRoles ? "border-red-500" : ""}`}
									placeholder="List your current aviation-related positions (e.g., Commercial Pilot, Flight Instructor)..."
									value={formData.currentRoles}
									onChange={(e) =>
										setFormData({ ...formData, currentRoles: e.target.value })
									}
									aria-label="Your current aviation roles"
									aria-invalid={!!formErrors.currentRoles}
									aria-describedby={
										formErrors.currentRoles ? "roles-error" : undefined
									}
									minLength={5}
								/>
								{formErrors.currentRoles && (
									<p id="roles-error" className="mt-1 text-sm text-red-500">
										{formErrors.currentRoles}
									</p>
								)}
							</div>

							<div>
								<label htmlFor="discord" className={labelStyle}>
									Discord Username (Optional)
								</label>
								<input
									id="discord"
									type="text"
									className={`${inputStyle} ${formErrors.discord ? "border-red-500" : ""}`}
									placeholder="username#0000"
									value={formData.discord}
									onChange={(e) =>
										setFormData({ ...formData, discord: e.target.value })
									}
									aria-label="Your Discord username"
									aria-invalid={!!formErrors.discord}
									aria-describedby={
										formErrors.discord ? "discord-error" : undefined
									}
								/>
								{formErrors.discord && (
									<p id="discord-error" className="mt-1 text-sm text-red-500">
										{formErrors.discord}
									</p>
								)}
							</div>

							<div className="space-y-4">
								<div className="flex items-center gap-4">
									<a
										href="https://aviatorjonah.com/terms"
										target="_blank"
										rel="noopener noreferrer"
										className="flex-1 flex items-center justify-between px-4 py-3 bg-gray-700/50 rounded-lg text-gray-200 hover:bg-gray-600/50 transition-colors duration-200"
										onClick={() =>
											setFormData((prev) => ({ ...prev, termsAccepted: true }))
										}
									>
										<span>Terms of Use*</span>
										{formData.termsAccepted && (
											<div className="flex items-center text-green-500">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
										)}
									</a>

									<a
										href="https://aviatorjonah.com/privacy"
										target="_blank"
										rel="noopener noreferrer"
										className="flex-1 flex items-center justify-between px-4 py-3 bg-gray-700/50 rounded-lg text-gray-200 hover:bg-gray-600/50 transition-colors duration-200"
										onClick={() =>
											setFormData((prev) => ({
												...prev,
												betaPolicyAccepted: true,
											}))
										}
									>
										<span>Privacy Policy*</span>
										{formData.betaPolicyAccepted && (
											<div className="flex items-center text-green-500">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
										)}
									</a>
								</div>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
									isSubmitting
										? "bg-gray-600 cursor-not-allowed"
										: "bg-blue-500 hover:bg-blue-600 text-white"
								}`}
							>
								{isSubmitting ? (
									<span className="flex items-center">
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Submitting...
									</span>
								) : (
									<>
										<Send className="w-4 h-4 mr-2" />
										Submit Application
									</>
								)}
							</button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
