"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ChevronRight,
	FileText,
	Shield,
	Bot,
	Scale,
	Globe,
	AlertCircle,
	Check,
} from "lucide-react";

const policies = [
	{
		id: "terms",
		title: "Terms of Service",
		description: "Our general terms and conditions for using our services",
		icon: FileText,
		link: "/legal/terms",
		lastUpdated: "Feb 02, 2025",
		required: true,
	},
	{
		id: "privacy",
		title: "Privacy Policy",
		description: "How we collect, use, and protect your personal information",
		icon: Shield,
		link: "/legal/privacy",
		lastUpdated: "Feb 02, 2025",
		required: true,
	},
	{
		id: "ai-agreement",
		title: "AI User Agreement",
		description: "Specific terms regarding the use of our AI-powered features",
		icon: Bot,
		link: "/legal/ai-agreement",
		lastUpdated: "Feb 02, 2025",
		required: true,
	},
	{
		id: "data-processing",
		title: "Data Processing Agreement",
		description: "Terms governing how we process and handle your data",
		icon: Globe,
		link: "/legal/dpa",
		lastUpdated: "Feb 02, 2025",
		required: true,
	},
	{
		id: "compliance",
		title: "Compliance & Security",
		description: "Our compliance standards and security practices",
		icon: Scale,
		link: "/legal/compliance",
		lastUpdated: "Feb 02, 2025",
		required: false,
	},
	{
		id: "acceptable-use",
		title: "Acceptable Use Policy",
		description: "Guidelines for acceptable use of our services",
		icon: AlertCircle,
		link: "/legal/acceptable-use",
		lastUpdated: "Feb 02, 2025",
		required: true,
	},
];

export default function PolicyCenter() {
	const [acceptedPolicies, setAcceptedPolicies] = useState<{
		[key: string]: boolean;
	}>({});

	useEffect(() => {
		const savedPolicies = localStorage.getItem("acceptedPolicies");
		if (savedPolicies) {
			setAcceptedPolicies(JSON.parse(savedPolicies));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("acceptedPolicies", JSON.stringify(acceptedPolicies));
	}, [acceptedPolicies]);

	const handlePolicyAccept = (policyId: string) => {
		setAcceptedPolicies((prev) => ({
			...prev,
			[policyId]: !prev[policyId],
		}));
	};

	return (
		<main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pt-32 pb-16 sm:pt-40 sm:pb-20">
					<nav className="flex items-center space-x-2 text-sm text-slate-400 mb-8">
						<Link href="/" className="hover:text-white transition-colors">
							Home
						</Link>
						<ChevronRight className="h-4 w-4" />
						<span className="text-white">Policy Center</span>
					</nav>

					<div className="mb-12">
						<h1 className="text-3xl font-semibold text-white mb-4">
							Policy Center
						</h1>
						<p className="text-slate-400 text-lg max-w-3xl">
							Access our policies, terms, and agreements. These documents
							outline our commitment to transparency, security, and user
							privacy.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{policies.map((policy) => (
							<Link
								key={policy.id}
								href={policy.link}
								target="_blank"
								rel="noopener noreferrer"
								className="group relative flex flex-col p-6 bg-white/5 hover:bg-blue-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-500/20"
							>
								<div className="flex items-start gap-4 mb-8">
									<div className="p-2 bg-blue-500/10 rounded-lg">
										<policy.icon
											className="h-6 w-6 text-blue-400"
											aria-hidden="true"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between mb-2">
											<h2 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
												{policy.title}
											</h2>
											{policy.required && (
												<span className="ml-2 shrink-0 text-xs text-slate-400 bg-slate-400/10 px-2 py-1 rounded">
													Required
												</span>
											)}
										</div>
										<p className="text-sm text-slate-400 mb-4">
											{policy.description}
										</p>
										<div className="flex justify-between items-center">
											<p className="text-xs text-slate-500">
												Last updated: {policy.lastUpdated}
											</p>
										</div>
									</div>
								</div>

								<div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
									<button
										onClick={(e) => {
											e.preventDefault();
											handlePolicyAccept(policy.id);
										}}
										className={`px-4 py-2 rounded text-sm transition-colors ${
											acceptedPolicies[policy.id]
												? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
												: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
										}`}
									>
										{acceptedPolicies[policy.id] ? (
											<span className="flex items-center">
												<Check className="h-4 w-4 mr-2" />
												Accepted
											</span>
										) : (
											"Accept Policy"
										)}
									</button>
									<ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
								</div>
							</Link>
						))}
					</div>

					<div className="mt-12 p-6 bg-blue-500/5 rounded-lg border border-blue-500/10">
						<h2 className="text-xl font-medium text-white mb-4">Need Help?</h2>
						<p className="text-slate-400 mb-4">
							If you have any questions about our policies or need
							clarification, our support team is here to help.
						</p>
						<Link
							href="/contact"
							className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
						>
							Contact Support
							<ChevronRight className="h-4 w-4 ml-1" />
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
