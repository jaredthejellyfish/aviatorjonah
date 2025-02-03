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
	{ id: "acceptance", title: "Acceptance of Terms" },
	{ id: "eligibility", title: "Eligibility" },
	{ id: "account", title: "Account Responsibilities" },
	{ id: "products", title: "Products and Services" },
	{ id: "pricing", title: "Pricing and Payment" },
	{ id: "acceptable-use", title: "Acceptable Use" },
	{ id: "prohibited-conduct", title: "Prohibited Conduct" },
	{ id: "termination", title: "Termination" },
	{ id: "intellectual-property", title: "Intellectual Property" },
	{ id: "disclaimer", title: "Disclaimer of Warranties" },
	{ id: "liability", title: "Limitation of Liability" },
	{ id: "indemnification", title: "Indemnification" },
	{ id: "governing-law", title: "Governing Law" },
	{ id: "dispute-resolution", title: "Dispute Resolution" },
	{ id: "changes", title: "Changes to Terms" },
	{ id: "contact", title: "Contact Information" },
];

export default function TermsPage() {
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
						<span className="text-white">Terms & Conditions</span>
					</nav>

					<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-8 mb-12 space-y-4 sm:space-y-0">
						<div className="flex flex-col sm:flex-row sm:items-center gap-4">
							<h1 className="text-3xl font-semibold text-white">
								Terms & Conditions
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
											? "These Terms and Conditions ('Terms') constitute a legally binding agreement between you and AviatorJonah, LLC ('AviatorJonah', 'we', 'us', or 'our') governing your access to and use of our website, products, services, and content (collectively, the 'Services')."
											: "These Terms and Conditions ('Terms') constitute a legally binding agreement between you and AviatorJonah, LLC ('AviatorJonah', 'we', 'us', or 'our') in accordance with European Union regulations and consumer protection laws. These Terms govern your access to and use of our website, products, services, and content (collectively, the 'Services')."}
									</p>
								</div>
							</section>

							<section id="acceptance">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Acceptance of Terms
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										By accessing or using our Services, you acknowledge that you
										have read, understood, and agree to be bound by these Terms.
										If you do not agree to these Terms, you must not access or
										use our Services.
									</p>
									<p>
										We reserve the right to modify these Terms at any time. Your
										continued use of the Services following any changes
										constitutes your acceptance of the modified Terms.
									</p>
								</div>
							</section>

							<section id="eligibility">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Eligibility
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										You must be at least 18 years old to use our Services. By
										using our Services, you represent and warrant that:
									</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>You are at least 18 years old</li>
										<li>
											You have the legal capacity to enter into these Terms
										</li>
										<li>
											You are not prohibited from using the Services under
											applicable laws
										</li>
										<li>
											You will comply with these Terms and all applicable laws
										</li>
									</ul>
								</div>
							</section>

							<section id="account">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Account Responsibilities
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>You are responsible for:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>
											Maintaining the confidentiality of your account
											credentials
										</li>
										<li>All activities that occur under your account</li>
										<li>
											Promptly notifying us of any unauthorized use of your
											account
										</li>
										<li>
											Ensuring your account information is accurate and
											up-to-date
										</li>
									</ul>
									<p>
										We reserve the right to suspend or terminate your account
										and access to the Services for any violation of these Terms.
									</p>
								</div>
							</section>

							<section id="products">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Products and Services
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										We provide various digital products and services subject to
										these Terms. We reserve the right to:
									</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Modify or discontinue any Service without notice</li>
										<li>
											Limit access to certain features or portions of the
											Services
										</li>
										<li>
											Establish general practices and limits concerning use of
											the Services
										</li>
									</ul>
								</div>
							</section>

							<section id="acceptable-use">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Acceptable Use
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										You agree to use the Services only for lawful purposes and
										in accordance with these Terms. You must:
									</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Comply with all applicable laws and regulations</li>
										<li>Respect the intellectual property rights of others</li>
										<li>
											Use the Services in a manner that does not interfere with
											or disrupt other users
										</li>
										<li>
											Follow any guidelines or policies we publish regarding the
											Services
										</li>
									</ul>
								</div>
							</section>

							<section id="prohibited-conduct">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Prohibited Conduct
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>You may not:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Use the Services for any illegal purpose</li>
										<li>
											Attempt to gain unauthorized access to any portion of the
											Services
										</li>
										<li>Interfere with or disrupt the Services or servers</li>
										<li>Upload or transmit malware or other malicious code</li>
										<li>Engage in any automated use of the Services</li>
										<li>Collect user information without consent</li>
										<li>Impersonate any person or entity</li>
										<li>Harass, abuse, or harm others</li>
									</ul>
								</div>
							</section>

							<section id="termination">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Termination
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										We may terminate or suspend your access to the Services
										immediately, without prior notice or liability, for any
										reason, including:
									</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Violation of these Terms</li>
										<li>Suspected fraudulent, abusive, or illegal activity</li>
										<li>Non-payment of fees</li>
										<li>Extended periods of inactivity</li>
									</ul>
									<p>Upon termination:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>
											Your right to access and use the Services will immediately
											cease
										</li>
										<li>We may delete your account and all associated data</li>
										<li>Any fees paid are non-refundable</li>
									</ul>
								</div>
							</section>

							<section id="intellectual-property">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Intellectual Property
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										All content, features, and functionality of the Services are
										owned by AviatorJonah and protected by copyright, trademark,
										and other intellectual property laws.
									</p>
									<p>You may not:</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Copy, modify, or distribute our content</li>
										<li>Reverse engineer or decompile our software</li>
										<li>Remove any copyright or proprietary notices</li>
										<li>Use our trademarks without express permission</li>
									</ul>
								</div>
							</section>

							<section id="disclaimer">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Disclaimer of Warranties
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
										AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND. WE EXPRESSLY
										DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED,
										INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
										PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
									</p>
								</div>
							</section>

							<section id="liability">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Limitation of Liability
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL
										AVIATORJONAH, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS,
										SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT,
										INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
										INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE,
										GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
									</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>
											YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE
											SERVICES
										</li>
										<li>
											ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES
										</li>
										<li>ANY CONTENT OBTAINED FROM THE SERVICES</li>
										<li>
											UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR
											TRANSMISSIONS OR CONTENT
										</li>
									</ul>
									<p className="mt-4">
										{region === "US"
											? "OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES SHALL NOT EXCEED THE GREATER OF $100 OR THE AMOUNT YOU PAID US IN THE LAST 12 MONTHS."
											: "Our liability is limited to the maximum extent permitted by applicable EU consumer protection laws."}
									</p>
								</div>
							</section>

							<section id="indemnification">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Indemnification
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										You agree to defend, indemnify, and hold harmless
										AviatorJonah, its parent, subsidiaries, affiliates,
										partners, officers, directors, agents, contractors,
										licensors, service providers, subcontractors, suppliers,
										interns and employees, from and against any claims,
										liabilities, damages, judgments, awards, losses, costs,
										expenses, or fees (including reasonable attorneys&apos;
										fees) arising out of or relating to:
									</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>Your violation of these Terms of Service</li>
										<li>
											Your use of the Services, including any data or content
											transmitted or received by you
										</li>
										<li>
											Your violation of any rights of a third party, including
											intellectual property rights
										</li>
										<li>
											Your violation of any applicable laws, rules, or
											regulations
										</li>
										<li>
											Any content that is submitted via your account including
											third party links and content
										</li>
										<li>Your willful misconduct, fraud, or negligence</li>
									</ul>
								</div>
							</section>

							<section id="governing-law">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Governing Law
								</h2>
								<div className="space-y-4 text-gray-300">
									{region === "US" ? (
										<>
											<p>
												These Terms shall be governed and construed in
												accordance with the laws of Oregon, United States,
												without regard to its conflict of law provisions.
											</p>
											<p>
												Our failure to enforce any right or provision of these
												Terms will not be considered a waiver of those rights.
												If any provision of these Terms is held to be invalid or
												unenforceable by a court, the remaining provisions of
												these Terms will remain in effect.
											</p>
										</>
									) : (
										<>
											<p>
												For EU users, these Terms shall be governed by and
												construed in accordance with the laws of your country of
												residence. As a consumer, you will benefit from any
												mandatory provisions of the law of the country in which
												you are resident. Nothing in these Terms affects your
												rights as a European consumer to rely on such mandatory
												provisions of local law.
											</p>
											<p>
												The European Commission provides a platform for online
												dispute resolution which you can access at
												http://ec.europa.eu/consumers/odr/.
											</p>
										</>
									)}
								</div>
							</section>

							<section id="dispute-resolution">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Dispute Resolution
								</h2>
								<div className="space-y-4 text-gray-300">
									{region === "US" ? (
										<>
											<p className="font-semibold">
												PLEASE READ THIS SECTION CAREFULLY – IT AFFECTS YOUR
												LEGAL RIGHTS
											</p>
											<div className="mt-4 space-y-4">
												<p>
													Agreement to Arbitrate: You and AviatorJonah agree
													that any dispute, claim, or controversy arising out of
													or relating to these Terms or the Services shall be
													determined by binding arbitration. YOU UNDERSTAND AND
													AGREE THAT, BY AGREEING TO THESE TERMS, YOU AND
													AVIATORJONAH ARE EACH WAIVING THE RIGHT TO A TRIAL BY
													JURY OR TO PARTICIPATE IN A CLASS ACTION.
												</p>
												<p>
													Arbitration Rules: The arbitration will be
													administered by the American Arbitration Association
													(&quot;AAA&quot;) in accordance with its Consumer
													Arbitration Rules. The arbitration will be conducted
													in Bend, Oregon, unless you and AviatorJonah agree
													otherwise.
												</p>
												<p>
													Class Action Waiver: ANY DISPUTE RESOLUTION
													PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL
													BASIS AND NOT IN A CLASS, CONSOLIDATED, OR
													REPRESENTATIVE ACTION.
												</p>
												<p>
													Opt-Out: You may opt out of this arbitration agreement
													by notifying AviatorJonah in writing within 30 days of
													the date you first became subject to this arbitration
													provision.
												</p>
											</div>
										</>
									) : (
										<p>
											If you are a resident of the European Union, you have the
											right to refer any dispute to the EU Online Dispute
											Resolution platform or to the competent national courts.
											Nothing in these Terms affects your statutory rights as a
											consumer.
										</p>
									)}
								</div>
							</section>

							<section id="changes">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Changes to Terms
								</h2>
								<div className="space-y-4 text-gray-300">
									<p>
										We reserve the right to update and change these Terms at our
										sole discretion. When we make changes:
									</p>
									<ul className="list-disc pl-6 space-y-2">
										<li>
											We will revise the &quot;Last Modified&quot; date at the
											top of the Terms
										</li>
										<li>
											We will notify you through the Services, via email, or
											other reasonable means
										</li>
										<li>
											Your continued use of the Services after any changes
											constitutes your acceptance of the new Terms
										</li>
									</ul>
									{region === "EU" && (
										<p className="mt-4">
											For EU users, we will provide you with at least 30
											days&apos; notice of any material changes to these Terms,
											and you have the right to terminate your use of the
											Services before the changes take effect.
										</p>
									)}
								</div>
							</section>

							<section id="contact">
								<h2 className="text-2xl font-semibold text-white mb-6 pb-2 border-b border-white/10">
									Contact Information
								</h2>
								<div className="space-y-6 text-gray-300">
									<p>
										{region === "US"
											? "Questions about these Terms should be sent to:"
											: "For legal inquiries or to exercise your EU consumer rights, contact our legal department at:"}
									</p>
									<div className="space-y-6">
										<div>
											<h3 className="font-medium text-white mb-2">Mail</h3>
											<address className="not-italic">
												<p>ATTN: Legal Department - AviatorJonah</p>
												<p>70 SW Century Dr PMB 1198</p>
												<p>Bend, OR 97702</p>
												{region === "EU" && (
													<p>
														European Office: [70 SW Century Dr PMB 1198 Bend, OR
														97756 USA]
													</p>
												)}
											</address>
										</div>
										<div>
											<h3 className="font-medium text-white mb-2">Email</h3>
											<Link
												href={`mailto:${region === "US" ? "legal@avjco.org" : "eu-legal@avjco.org"}`}
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
		</main>
	);
}
