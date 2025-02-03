"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Section = {
	id: string;
	title: string;
};

const sections: Section[] = [
	{ id: "introduction", title: "Introduction" },
	{ id: "ai-acknowledgment", title: "AI Technology Acknowledgment" },
	{ id: "acceptance", title: "Acceptance of Terms" },
	{ id: "eligibility", title: "Eligibility" },
	{ id: "account", title: "Account Responsibilities" },
	{ id: "services", title: "Service Description" },
	{ id: "disclaimer", title: "Disclaimer of Warranties" },
	{ id: "liability", title: "Limitation of Liability" },
	{ id: "user-responsibilities", title: "User Responsibilities" },
	{ id: "intellectual-property", title: "Intellectual Property" },
	{ id: "indemnification", title: "Indemnification" },
	{ id: "modifications", title: "Modifications to Terms" },
	{ id: "governing-law", title: "Governing Law" },
	{ id: "contact", title: "Contact Information" },
];

export default function CoPilotTermsPage() {
	const [region, setRegion] = useState<"US" | "OTHER">("US");
	const [activeSection, setActiveSection] = useState<string>("introduction");

	useEffect(() => {
		const observerCallback = (entries: IntersectionObserverEntry[]): void => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			});
		};

		const observerOptions: IntersectionObserverInit = {
			root: null,
			rootMargin: "-20% 0px -75% 0px",
			threshold: 0,
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions,
		);

		sections.forEach((section) => {
			const element = document.getElementById(section.id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, []);

	const scrollToSection = (id: string): void => {
		const element = document.getElementById(id);
		if (element) {
			const offset = 100;
			const bodyRect = document.body.getBoundingClientRect().top;
			const elementRect = element.getBoundingClientRect().top;
			const elementPosition = elementRect - bodyRect;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	if (region !== "US") {
		return (
			<main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div className="pt-32 pb-16 sm:pt-40 sm:pb-20">
						<nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
							<Link href="/" className="hover:text-white transition-colors">
								Home
							</Link>
							<ChevronRight className="h-4 w-4" />
							<span className="text-white">AI Agreement</span>
						</nav>

						<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-8 mb-12 space-y-4 sm:space-y-0">
							<h1 className="text-3xl font-semibold text-white">
								Not Available in Your Region
							</h1>
							<div className="flex gap-4">
								<button
									onClick={() => setRegion("US")}
									className="flex items-center px-4 py-2 rounded-md transition-all text-gray-400 hover:text-white"
								>
									<span className="mr-2" aria-hidden="true">
										🇺🇸
									</span>
									<span>United States</span>
								</button>
								<button
									onClick={() => setRegion("OTHER")}
									className="flex items-center px-4 py-2 rounded-md transition-all bg-white/10 text-white"
								>
									<span className="mr-2" aria-hidden="true">
										🌍
									</span>
									<span>Other Regions</span>
								</button>
							</div>
						</div>

						<Alert className="mb-8 border-amber-500/50 bg-amber-500/10">
							<AlertTriangle className="h-4 w-4 text-amber-500" />
							<AlertDescription className="text-amber-200">
								CoPilot is currently only available in the United States.
								We&apos;re working on expanding to other regions soon.
							</AlertDescription>
						</Alert>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pt-32 pb-16 sm:pt-40 sm:pb-20">
					<nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
						<Link href="/" className="hover:text-white transition-colors">
							Home
						</Link>
						<ChevronRight className="h-4 w-4" />
						<span className="text-white">AI Agreement</span>
					</nav>

					<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-8 mb-12 space-y-4 sm:space-y-0">
						<div className="flex flex-col sm:flex-row sm:items-center gap-4">
							<h1 className="text-3xl font-semibold text-white">
								Our AI Agreement
							</h1>
							<div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/80">
								<Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
								<span>Last Modified: Feb 02, 2025</span>
							</div>
						</div>
						<div className="flex gap-4">
							<button
								onClick={() => setRegion("US")}
								className="flex items-center px-4 py-2 rounded-md transition-all bg-white/10 text-white"
							>
								<span className="mr-2" aria-hidden="true">
									🇺🇸
								</span>
								<span>United States</span>
							</button>
							<button
								onClick={() => setRegion("OTHER")}
								className="flex items-center px-4 py-2 rounded-md transition-all text-gray-400 hover:text-white"
							>
								<span className="mr-2" aria-hidden="true">
									🌍
								</span>
								<span>Other Regions</span>
							</button>
						</div>
					</div>

					<div className="flex gap-12">
						<nav
							className="hidden lg:block w-64 shrink-0"
							aria-label="Table of contents"
						>
							<div className="sticky top-32 space-y-2">
								<h2 className="text-white font-medium mb-4">Contents</h2>
								{sections.map((section) => (
									<button
										key={section.id}
										onClick={() => scrollToSection(section.id)}
										className={`block w-full text-left px-4 py-2 rounded-md transition-all duration-200 ${
											activeSection === section.id
												? "bg-white/10 text-white"
												: "text-gray-400 hover:text-white hover:bg-white/5"
										}`}
									>
										{section.title}
									</button>
								))}
							</div>
						</nav>

						<div className="flex-1 space-y-12 max-w-3xl">
							<section id="introduction">
								<div className="text-lg text-gray-300">
									<p>
										These Terms and Conditions constitute a legally binding
										agreement between you and CoPilot (&quot;we&quot;,
										&quot;us&quot;, or &quot;our&quot;) governing your access to
										and use of our AI-powered software tool and related services
										(collectively, the &quot;Service&quot;).
									</p>
								</div>
							</section>

							<section id="ai-acknowledgment">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									AI Technology Acknowledgment
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										You acknowledge and understand that the Service uses
										artificial intelligence and machine learning technologies to
										generate suggestions and content. The AI system may:
									</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>
											Generate incomplete, inaccurate, or inappropriate
											suggestions
										</li>
										<li>
											Produce code that contains bugs or security
											vulnerabilities
										</li>
										<li>
											Create content that may be similar to existing code in its
											training data
										</li>
										<li>
											Operate in ways that are not always predictable or
											consistent
										</li>
									</ul>
								</div>
							</section>

							{/* Add remaining sections here following the same pattern... */}

							<section id="contact">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Contact Information
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>For questions about these Terms, please contact:</p>
									<div className="space-y-2">
										<p>Email: legal@copilot.com</p>
										<p>Address: [Your Company Address]</p>
										<p>Phone: [Your Phone Number]</p>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
