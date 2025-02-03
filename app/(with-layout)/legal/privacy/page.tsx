"use client";

import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";

type Region = "US" | "EU";
type Section = {
	id: string;
	title: string;
};

const sections: Section[] = [
	{ id: "introduction", title: "Introduction" },
	{ id: "information-collection", title: "Information We Collect" },
	{ id: "tracking-technologies", title: "Tracking Technologies" },
	{ id: "how-we-use", title: "How We Use Your Information" },
	{ id: "information-sharing", title: "Information Sharing" },
	{ id: "your-rights", title: "Your Rights" },
	{ id: "data-retention", title: "Data Retention" },
	{ id: "security", title: "Security Measures" },
	{ id: "international-transfers", title: "International Data Transfers" },
	{ id: "contact", title: "Contact Us" },
];

const PrivacyPolicyPage: NextPage = () => {
	const [region, setRegion] = useState<Region>("US");
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
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
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
						<span className="text-white">Privacy Policy</span>
					</nav>

					<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-8 mb-12 space-y-4 sm:space-y-0">
						<div className="flex flex-col sm:flex-row sm:items-center gap-4">
							<h1 className="text-3xl font-semibold text-white">
								Privacy Policy
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
							<section id="introduction" aria-labelledby="introduction-title">
								<div className="text-lg text-gray-300">
									{region === "US" ? (
										<p>
											At AviatorJonah, LLC (&quot;AviatorJonah&quot;), we are
											committed to protecting your privacy. This Privacy Policy
											outlines our data collection practices, how we use and
											protect your information, and your rights regarding that
											information. This policy applies to all services provided
											through our website and related applications.
										</p>
									) : (
										<p>
											At AviatorJonah, LLC (&quot;AviatorJonah&quot;), we are
											committed to protecting your privacy in accordance with
											GDPR and applicable EU data protection laws. This Privacy
											Policy details our data processing activities, your
											enhanced privacy rights under EU law, and how we ensure
											compliance with EU data protection requirements.
										</p>
									)}
								</div>
							</section>

							<section
								id="information-collection"
								aria-labelledby="information-collection-title"
							>
								<h2
									id="information-collection-title"
									className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10"
								>
									Information We Collect
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>We collect the following types of information:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>
											Information you provide directly (name, email, address,
											payment information)
										</li>
										<li>
											Usage data (interactions with our services, IP address,
											browser type)
										</li>
										<li>
											Device information (operating system, browser settings)
										</li>
										<li>
											Payment and transaction data processed through Stripe
										</li>
										<li>Analytics data collected through Google Analytics</li>
									</ul>
								</div>
							</section>

							<section
								id="tracking-technologies"
								aria-labelledby="tracking-technologies-title"
							>
								<h2
									id="tracking-technologies-title"
									className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10"
								>
									Tracking Technologies
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>We use various tracking technologies including:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Cookies for authentication and user preferences</li>
										<li>Google Analytics for website usage analysis</li>
										<li>Stripe elements for payment processing</li>
										{region === "EU" && (
											<li>
												You have the right to opt-out of non-essential cookies
											</li>
										)}
									</ul>
								</div>
							</section>

							<section id="how-we-use" aria-labelledby="how-we-use-title">
								<h2
									id="how-we-use-title"
									className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10"
								>
									How We Use Your Information
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>We use the information we collect for:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Service provision and maintenance</li>
										<li>Payment processing through Stripe</li>
										<li>Service improvement and analytics</li>
										<li>Communication about our services</li>
										<li>Legal compliance and fraud prevention</li>
										{region === "EU" && (
											<li>
												Processing based on explicit consent where required by
												GDPR
											</li>
										)}
									</ul>
								</div>
							</section>

							<section
								id="information-sharing"
								aria-labelledby="information-sharing-title"
							>
								<h2
									id="information-sharing-title"
									className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10"
								>
									Information Sharing
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>We share information with:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Stripe for payment processing</li>
										<li>Google for analytics services</li>
										<li>Service providers for website operation</li>
										<li>Legal authorities when required</li>
										{region === "EU" && (
											<li>Data processors under GDPR-compliant agreements</li>
										)}
									</ul>
								</div>
							</section>

							<section id="your-rights" aria-labelledby="your-rights-title">
								<h2
									id="your-rights-title"
									className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10"
								>
									Your Rights
								</h2>
								<div className="space-y-4 text-gray-300">
									{region === "EU" ? (
										<>
											<p>Under GDPR, you have the right to:</p>
											<ul className="list-disc pl-6 space-y-2">
												<li>Access your personal data</li>
												<li>Rectify incorrect data</li>
												<li>
													Request erasure (&quot;right to be forgotten&quot;)
												</li>
												<li>Data portability</li>
												<li>Object to processing</li>
												<li>Withdraw consent</li>
												<li>Lodge a complaint with a supervisory authority</li>
											</ul>
										</>
									) : (
										<>
											<p>Your rights include:</p>
											<ul className="list-disc pl-6 space-y-2">
												<li>Access your personal information</li>
												<li>Correct inaccurate information</li>
												<li>Request deletion of information</li>
												<li>Opt-out of communications</li>
												<li>California privacy rights (CCPA)</li>
											</ul>
										</>
									)}
								</div>
							</section>

							<section
								id="data-retention"
								aria-labelledby="data-retention-title"
							>
								<h2
									id="data-retention-title"
									className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10"
								>
									Data Retention
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>We retain data based on:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Active account status</li>
										<li>Legal requirements</li>
										<li>Business needs</li>
										<li>User preferences</li>
									</ul>
								</div>
							</section>

							<section id="security" aria-labelledby="security-title">
								<h2
									id="security-title"
									className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10"
								>
									Security Measures
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>Our security measures include:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Encryption in transit and at rest</li>
										<li>Regular security assessments</li>
										<li>Access controls</li>
										<li>Secure database infrastructure</li>
										<li>PCI-DSS compliance for payments</li>
									</ul>
								</div>
							</section>

							<section
								id="international-transfers"
								aria-labelledby="international-transfers-title"
							>
								<h2
									id="international-transfers-title"
									className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10"
								>
									International Data Transfers
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										{region === "EU"
											? "We transfer data outside the EU using approved safeguards including Standard Contractual Clauses and adequacy decisions."
											: "We may transfer your data internationally in compliance with applicable laws and regulations."}
									</p>
								</div>
							</section>

							<section id="contact" aria-labelledby="contact-title">
								<h2
									id="contact-title"
									className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10"
								>
									Contact Us
								</h2>
								<div className="space-y-6 text-gray-300">
									<p>
										{region === "US"
											? "For privacy-related questions or concerns:"
											: "To exercise your GDPR rights or contact our Data Protection Officer:"}
									</p>
									<div className="space-y-6">
										<div>
											<h3 className="font-medium text-white mb-2">Mail</h3>
											<address className="not-italic">
												<p>ATTN: Privacy - AviatorJonah</p>
												<p>70 SW Century Dr PMB 1198</p>
												<p>Bend, OR 97702</p>
											</address>
										</div>
										<div>
											<h3 className="font-medium text-white mb-2">Email</h3>
											<Link
												href={`mailto:${region === "US" ? "support@avjco.org" : "support@avjco.org"}`}
												className="text-emerald-400 hover:text-emerald-300 transition-colors"
											>
												{region === "US"
													? "support@avjco.org"
													: "support@avjco.org"}
											</Link>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicyPage;
