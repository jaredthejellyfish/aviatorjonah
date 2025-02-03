"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import type { FormEvent, ChangeEvent } from "react";

interface FormState {
	email: string;
	name: string;
}

interface WaitlistResponse {
	success: boolean;
	message: string;
}

export default function WaitlistForm(): JSX.Element {
	const [formData, setFormData] = useState<FormState>({
		email: "",
		name: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [status, setStatus] = useState<"success" | "error" | null>(null);
	const [termsRead, setTermsRead] = useState(false);
	const [privacyRead, setPrivacyRead] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		if (!termsRead || !privacyRead) {
			setStatus("error");
			return;
		}

		setLoading(true);
		setStatus(null);

		try {
			const response = await fetch("/api/waitlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data: WaitlistResponse = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to join waitlist");
			}

			setStatus("success");
			setFormData({ email: "", name: "" });
		} catch (error) {
			setStatus("error");
			console.error("Waitlist submission error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-white/80 mb-2"
				>
					Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white placeholder-white/30 transition-colors"
					placeholder="Enter your full name"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-white/80 mb-2"
				>
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white placeholder-white/30 transition-colors"
					placeholder="you@example.com"
					required
				/>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-3">
					<input
						type="checkbox"
						id="terms"
						checked={termsRead}
						onChange={(e) => setTermsRead(e.target.checked)}
						className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-0"
					/>
					<label htmlFor="terms" className="text-sm text-white/60">
						I have read and agree to the{" "}
						<a
							href="/terms"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:text-blue-300 underline"
							onClick={() => {
								// Allow time to read the terms
								setTimeout(() => setTermsRead(true), 1000);
							}}
						>
							Terms of Service
						</a>
					</label>
				</div>

				<div className="flex items-center gap-3">
					<input
						type="checkbox"
						id="privacy"
						checked={privacyRead}
						onChange={(e) => setPrivacyRead(e.target.checked)}
						className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-0"
					/>
					<label htmlFor="privacy" className="text-sm text-white/60">
						I have read and agree to the{" "}
						<a
							href="/privacy"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:text-blue-300 underline"
							onClick={() => {
								// Allow time to read the privacy policy
								setTimeout(() => setPrivacyRead(true), 1000);
							}}
						>
							Privacy Policy
						</a>
					</label>
				</div>
			</div>

			{/* Status Messages */}
			{status === "success" && (
				<div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 rounded-lg px-4 py-3">
					<CheckCircle className="h-5 w-5 flex-shrink-0" />
					<span>Welcome aboard! You&apos;re officially on the waitlist.</span>
				</div>
			)}

			{status === "error" && (
				<div className="flex items-center gap-2 text-rose-400 bg-rose-400/10 rounded-lg px-4 py-3">
					<AlertCircle className="h-5 w-5 flex-shrink-0" />
					<span>
						{!termsRead || !privacyRead
							? "Please read and accept both Terms of Service and Privacy Policy to continue."
							: "Something went wrong. Please try again later."}
					</span>
				</div>
			)}

			{/* Submit Button */}
			<button
				type="submit"
				disabled={loading || !termsRead || !privacyRead}
				className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
			>
				{loading ? (
					<Loader2 className="h-5 w-5 animate-spin" />
				) : (
					<span className="flex items-center gap-2">
						Join Waitlist
						<span className="opacity-0 group-hover:opacity-100 transition-opacity">
							→
						</span>
					</span>
				)}
			</button>
		</form>
	);
}
