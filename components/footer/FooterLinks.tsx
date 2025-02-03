import Link from "next/link";

export function FooterLinks() {
	return (
		<>
			{/* Products links */}
			<div className="products-links">
				<h6 className="text-white font-semibold mb-4">Products</h6>
				<ul className="space-y-2">
					<li>
						<Link
							href="/coming-soon"
							className="py-1 transition-colors duration-300 hover:text-white"
						>
							Classroom
						</Link>
					</li>
					<li>
						<Link
							href="/copilot"
							className="py-1 transition-colors duration-300 hover:text-white"
						>
							CoPilot
						</Link>
					</li>
				</ul>
			</div>

			{/* Company links */}
			<div className="company-links">
				<h6 className="text-white font-semibold mb-4">Company</h6>
				<ul className="space-y-2">
					<li>
						<Link
							href="/about-us"
							className="py-1 transition-colors duration-300 hover:text-white"
						>
							About us
						</Link>
					</li>
					<li>
						<Link
							href="/updates"
							className="py-1 transition-colors duration-300 hover:text-white"
						>
							Updates
						</Link>
					</li>
					<li>
						<Link
							href="/coming-soon"
							className="py-1 transition-colors duration-300 hover:text-white"
						>
							Join Our Team?
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}
