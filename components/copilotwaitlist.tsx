// WaitlistPopup.tsx
"use client";

import React, { useState } from "react";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const WaitlistPopup = ({ onClose }: { onClose: () => void }) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<"success" | "error" | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setStatus(null);

		try {
			const response = await fetch("/api/waitlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, name }),
			});

			if (!response.ok) {
				console.error(response);
				throw new Error("Failed to join waitlist");
			}

			setStatus("success");
			setEmail("");
			setName("");

			setTimeout(() => {
				onClose();
			}, 3000);
		} catch (error) {
			setStatus("error");
			console.error("Waitlist submission error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
			<div className="relative w-full max-w-md overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-gray-900/90 to-black/90 shadow-2xl">
				<div className="absolute inset-0 bg-grid-white/[0.02]" />

				<div className="relative p-6">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<div>
							<h2 className="text-2xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
								Join the Waitlist
							</h2>
							<p className="text-sm text-white/60 mt-1">
								Be the first to experience CoPilot
							</p>
						</div>
						<button
							onClick={onClose}
							className="rounded-full p-1 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-white/80 mb-1.5"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white placeholder-white/30 transition-colors"
								placeholder="Enter your name"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-white/80 mb-1.5"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white placeholder-white/30 transition-colors"
								placeholder="Enter your email"
								required
							/>
						</div>

						<div className="flex items-start gap-3">
							<input
								type="checkbox"
								id="terms"
								required
								className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-0"
							/>
							<label htmlFor="terms" className="text-sm text-white/60">
								I agree to the{" "}
								<a
									href="/terms"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 underline"
								>
									Terms of Use
								</a>{" "}
								and{" "}
								<a
									href="/privacy"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 underline"
								>
									Privacy Policy
								</a>
							</label>
						</div>

						{/* Status Messages */}
						{status === "success" && (
							<div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 rounded-lg px-4 py-2.5">
								<CheckCircle className="h-5 w-5 flex-shrink-0" />
								<span className="text-sm">
									Welcome aboard! You&apos;re on the waitlist.
								</span>
							</div>
						)}

						{status === "error" && (
							<div className="flex items-center gap-2 text-rose-400 bg-rose-400/10 rounded-lg px-4 py-2.5">
								<AlertCircle className="h-5 w-5 flex-shrink-0" />
								<span className="text-sm">
									Something went wrong. Please try again.
								</span>
							</div>
						)}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
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

					{/* Footer Text */}
					<p className="mt-6 text-sm text-white/40 text-center">
						Be the first to know when CoPilot launches and stay updated with
						development progress.
					</p>
				</div>
			</div>
		</div>
	);
};

export default WaitlistPopup;
