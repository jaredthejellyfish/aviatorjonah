"use client";

import React, { useState } from "react";
import { Bot, Lightbulb, Rocket, Brain } from "lucide-react";
import WaitlistPopup from "components/copilotwaitlist";

export default function AviatorJonahFeatures() {
	const [showWaitlist, setShowWaitlist] = useState(false);

	const features = [
		{
			icon: <Bot className="w-6 h-6" />,
			title: "Meet CoPilot",
			description:
				"Whether you are studying for a checkride, want to stay up-to-date on the latest changes, or want a 1-on-1 chat, CoPilot is here to ensure continued learning.",
		},
		{
			icon: <Brain className="w-6 h-6" />,
			title: "Modern Learning Platform",
			description:
				"Master aviation through interactive tools & lessons that makes complex topics clear and memorable.",
		},
		{
			icon: <Rocket className="w-6 h-6" />,
			title: "Learning Revolution",
			description:
				"Break free from outdated study methods. Our technology-driven approach transforms how you learn aviation, making it more engaging and effective.",
		},
		{
			icon: <Lightbulb className="w-6 h-6" />,
			title: "Elevate Your Aviation Knowledge",
			description:
				"Our platform bridges the gap between theory and practice, delivering clear, engaging lessons that simplify complex aviation concepts for every pilot.",
		},
	];

	return (
		<>
			<div className="bg-slate-900 py-16">
				<div className="max-w-5xl mx-auto px-4">
					{/* Header */}
					<div className="text-center mb-16">
						<h1 className="text-4xl font-bold text-blue-100 mb-6">
							Revolutionizing Learning
						</h1>
						<p className="text-blue-200 text-lg max-w-2xl mx-auto">
							AviatorJonah is transforming how aviators learn through
							cutting-edge technology and an innovative approach that makes
							aviation education more accessible, engaging, and effective than
							ever before.
						</p>
					</div>

					{/* Features Grid */}
					<div className="grid md:grid-cols-2 gap-8 mb-16">
						{features.map((feature, index) => (
							<div
								key={index}
								className="bg-slate-800/50 p-8 rounded-lg border border-blue-800/30 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all"
							>
								<div className="text-blue-400 mb-4">{feature.icon}</div>
								<h3 className="text-xl font-semibold text-blue-100 mb-3">
									{feature.title}
								</h3>
								<p className="text-blue-300">{feature.description}</p>
							</div>
						))}
					</div>

					{/* Platform Highlight */}
					<div className="text-center bg-gradient-to-r from-slate-800/50 via-blue-900/20 to-slate-800/50 p-8 rounded-lg border border-blue-800/30">
						<h2 className="text-2xl font-bold text-blue-100 mb-4">
							The Future of Aviation Learning Is Coming
						</h2>
						<p className="text-blue-200 mb-8">
							Join our waitlist now to be the first to know when the future has
							arrived.
						</p>
						<button
							onClick={() => setShowWaitlist(true)}
							className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Join The Waitlist
						</button>
					</div>
				</div>
			</div>

			{/* Waitlist Popup */}
			{showWaitlist && <WaitlistPopup onClose={() => setShowWaitlist(false)} />}
		</>
	);
}
