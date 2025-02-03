"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";

type Section = {
	id: string;
	title: string;
};

const sections: Section[] = [
	{ id: "introduction", title: "Introduction" },
	{ id: "policy-overview", title: "Policy Overview" },
	{ id: "final-sales", title: "All Sales Are Final" },
	{ id: "exceptions", title: "Exceptional Circumstances" },
	{ id: "request-process", title: "Refund Request Process" },
	{ id: "processing-time", title: "Processing Timeline" },
	{ id: "eligibility", title: "Eligibility Criteria" },
	{ id: "contact", title: "Contact Information" },
];

export default function RefundPolicyPage() {
	const [region, setRegion] = useState<"US" | "EU">("US");
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

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pt-32 pb-16 sm:pt-40 sm:pb-20">
					<nav
						className="flex items-center space-x-2 text-sm text-gray-400 mb-8"
						aria-label="Breadcrumb"
					>
						<Link href="/" className="hover:text-white transition-colors">
							Home
						</Link>
						<ChevronRight className="h-4 w-4" />
						<span className="text-white">Refund Policy</span>
					</nav>

					<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-8 mb-12 space-y-4 sm:space-y-0">
						<div className="flex flex-col sm:flex-row sm:items-center gap-4">
							<h1 className="text-3xl font-semibold text-white">
								Refund Policy
							</h1>
							<div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/80">
								<Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
								<span>Last Modified: Jan 25, 2025</span>
							</div>
						</div>
						<div className="flex gap-4">
							<button
								onClick={() => setRegion("US")}
								className={`flex items-center px-4 py-2 rounded-md transition-all ${
									region === "US"
										? "bg-white/10 text-white"
										: "text-gray-400 hover:text-white"
								}`}
								aria-pressed={region === "US"}
							>
								<span className="mr-2" aria-hidden="true">
									🇺🇸
								</span>
								<span>United States</span>
							</button>
							<button
								onClick={() => setRegion("EU")}
								className={`flex items-center px-4 py-2 rounded-md transition-all ${
									region === "EU"
										? "bg-white/10 text-white"
										: "text-gray-400 hover:text-white"
								}`}
								aria-pressed={region === "EU"}
							>
								<span className="mr-2" aria-hidden="true">
									🇪🇺
								</span>
								<span>EU & EEA</span>
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
										aria-current={
											activeSection === section.id ? "true" : undefined
										}
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
										{region === "US"
											? "At AviatorJonah, we are committed to maintaining transparent and fair refund practices. This policy outlines our approach to refunds and the circumstances under which they may be considered."
											: "At AviatorJonah, we are committed to maintaining transparent and fair refund practices in accordance with EU consumer protection laws. This policy outlines our approach to refunds and your rights under EU law."}
									</p>
								</div>
							</section>

							<section id="policy-overview">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Policy Overview
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>Our refund policy is designed to be:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Clear and transparent in its terms</li>
										<li>Fair to all customers</li>
										<li>Compliant with applicable laws and regulations</li>
										{region === "EU" && (
											<li>In accordance with EU consumer protection rights</li>
										)}
									</ul>
								</div>
							</section>

							<section id="final-sales">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									All Sales Are Final
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										Unless otherwise specified, all sales are final. This policy
										exists because:
									</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Our products are digital in nature</li>
										<li>Products are delivered immediately upon purchase</li>
										<li>Products cannot be returned or resold</li>
										{region === "EU" && (
											<li>
												This policy applies within the limits of EU consumer law
											</li>
										)}
									</ul>
								</div>
							</section>

							<section id="exceptions">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Exceptional Circumstances
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										We may consider refunds in exceptional circumstances,
										including:
									</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Technical issues preventing product access</li>
										<li>Duplicate charges or billing errors</li>
										<li>Product unavailability after purchase</li>
										{region === "EU" && (
											<li>
												Circumstances covered by EU consumer protection laws
											</li>
										)}
									</ul>
								</div>
							</section>

							<section id="request-process">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Refund Request Process
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>To submit a refund request:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Email us at refunds@avjco.org</li>
										<li>Include your order number</li>
										<li>Provide a detailed explanation</li>
										<li>Attach relevant documentation</li>
									</ul>
								</div>
							</section>

							<section id="processing-time">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Processing Timeline
								</h2>
								<div className="space-y-4 text-gray-300">
									<div className="rounded-lg border border-emerald-400/20 bg-emerald-500/5 p-6">
										<p className="text-xl font-semibold text-emerald-400 mb-4">
											Response Time Commitment
										</p>
										<ul className="list-disc pl-6 space-y-2">
											<li>Initial response within 2 business days</li>
											<li>Decision within 5 business days</li>
											<li>Processing time of 5-10 business days if approved</li>
										</ul>
									</div>
								</div>
							</section>

							<section id="eligibility">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Eligibility Criteria
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>Refund requests are evaluated based on:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Time elapsed since purchase</li>
										<li>Nature of the issue reported</li>
										<li>Previous refund history</li>
										<li>Documentation provided</li>
									</ul>
								</div>
							</section>

							<section id="contact">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Contact Information
								</h2>
								<div className="space-y-6 text-gray-300">
									<p>
										{region === "US"
											? "For questions about our refund policy or to submit a request:"
											: "For refund inquiries or to exercise your EU consumer rights:"}
									</p>
									<div className="space-y-6">
										<div>
											<h3 className="font-medium text-white mb-2">Mail</h3>
											<address className="not-italic">
												<p>ATTN: Refunds - AviatorJonah</p>
												<p>70 SW Century Dr PMB 1198</p>
												<p>Bend, OR 97702</p>
											</address>
										</div>
										<div>
											<h3 className="font-medium text-white mb-2">Email</h3>
											<Link
												href={`mailto:${region === "US" ? "refunds@avjco.org" : "eu-refunds@avjco.org"}`}
												className="text-emerald-400 hover:text-emerald-300 transition-colors"
											>
												{region === "US"
													? "refunds@avjco.org"
													: "eu-refunds@avjco.org"}
											</Link>
										</div>
										<div className="pt-6 border-t border-white/10">
											<div className="rounded-lg border border-white/10 bg-white/5 p-6">
												<p className="text-sm text-white/60">
													Our support team is available Monday through Friday,
													9:00 AM to 5:00 PM Pacific Time. For urgent matters,
													please email us:
													<Link
														href="mailto://support@avjco.org"
														className="text-emerald-400 hover:text-emerald-300 transition-colors ml-1"
													>
														support@avjco.org
													</Link>
												</p>
											</div>
										</div>
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
