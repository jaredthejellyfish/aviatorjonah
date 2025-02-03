import Link from "next/link";

export default function TermsPage() {
	return (
		<main className="flex-grow">
			<section className="relative">
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div className="pt-32 pb-12 md:pt-40 md:pb-20">
						<div className="max-w-3xl mx-auto">
							{/* Navigation Directory */}
							<nav className="text-sm mb-4" aria-label="Breadcrumb">
								<ol className="list-none p-0 inline-flex">
									<li className="flex items-center">
										<Link
											href="/"
											className="text-gray-400 hover:text-white transition-colors duration-200"
										>
											Home
										</Link>
										<svg
											className="fill-current w-3 h-3 mx-3"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 320 512"
										>
											<path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
										</svg>
									</li>
									<li>
										<span className="text-white" aria-current="page">
											Terms
										</span>
									</li>
								</ol>
							</nav>
							<br />
							{/* Last Modified Date Bubble */}
							<div className="inline-block mb-6 px-4 py-2 border border-white rounded-full text-sm font-bold text-white bg-opacity-10 bg-white">
								Last Modified: 1/4/2025
							</div>

							<h1 className="text-4xl font-bold mb-6">
								T &Cs for AviatorJonah
							</h1>
							<div className="text-lg text-gray-400 space-y-6">
								<p>
									These Terms and Conditions (&quot;Terms&quot;) govern your use
									of the products and services provided by AviatorJonah, LLC
									(&quot;AviatorJonah&quot;). By purchasing or using our
									products or services, you agree to these Terms. If you do not
									agree, please do not purchase or use our offerings.
								</p>

								<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
									1. Acceptance of Terms
								</h2>
								<p>
									By accessing or using our website and services, you confirm
									that you have read, understood, and agree to be bound by these
									Terms.
								</p>

								<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
									2. Products and Services
								</h2>
								<p>
									AviatorJonah provides a range of products and services related
									to aviation. All descriptions, images, and specifications of
									products are subject to change without notice. We reserve the
									right to discontinue any product or service at any time.
								</p>

								<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
									3. Pricing and Payment
								</h2>
								<p>
									All prices are listed in U.S. dollars and are subject to
									change. Payment must be made in full at the time of purchase.
									We accept various payment methods, and you agree to provide
									accurate billing information.
								</p>

								<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
									4. All Sales Are Final
								</h2>
								<p>
									Once a purchase is made, it is considered final. We do not
									offer refunds or exchanges. Refund requests may be reviewed on
									a case-by-case basis; please refer to our Refund Policy for
									more information.
								</p>

								<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
									5. Intellectual Property
								</h2>
								<p>
									All content on our website, including text, graphics, logos,
									and images, is the property of AviatorJonah and is protected
									by copyright and other intellectual property laws. You may not
									use, reproduce, or distribute any content without our prior
									written permission.
								</p>

								<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
									6. Limitation of Liability
								</h2>
								<p>
									To the fullest extent permitted by law, AviatorJonah shall not
									be liable for any direct, indirect, incidental, or
									consequential damages arising from your use of our products or
									services. Your sole remedy for dissatisfaction with our
									offerings is to discontinue use.
								</p>

								<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
									7. Indemnification
								</h2>
								<p>
									You agree to indemnify and hold harmless AviatorJonah, its
									officers, employees, and agents from any claims, losses,
									damages, liabilities, costs, or expenses (including reasonable
									attorneys&apos; fees) arising out of your use of our products
									or services.
								</p>

								<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
									8. Governing Law
								</h2>
								<p>
									These Terms shall be governed by and construed in accordance
									with the laws of the state in which AviatorJonah is
									registered, without regard to its conflict of law principles.
								</p>

								<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
									9. Changes to Terms
								</h2>
								<p>
									AviatorJonah reserves the right to modify these Terms at any
									time. Any changes will be effective immediately upon posting
									on our website. Your continued use of our products or services
									after changes have been made constitutes your acceptance of
									the new Terms.
								</p>

								<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
									10. Contact Information
								</h2>
								<p>
									For any questions or concerns regarding these Terms, please
									contact us at:
								</p>
								<p className="mt-4">
									<strong>AviatorJonah</strong>
									<br />
									Email:{" "}
									<Link
										href="mailto:support@avjco.org"
										className="text-blue-400 hover:text-blue-300"
									>
										support@avjco.org
									</Link>
								</p>

								<p className="mt-8">
									By using our products and services, you acknowledge that you
									have read and understood these Terms and agree to be bound by
									them.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
