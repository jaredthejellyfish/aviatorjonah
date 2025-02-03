import Link from "next/link";
import Logo from "../logo";
import { SocialLinks } from "./SocialLinks";
import { StatusWrapper } from "./StatusWrapper";
import { FooterLinks } from "./FooterLinks";
import { ResourceLinks } from "./ResourceLinks";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="py-8 md:py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
						<div className="col-span-1 md:col-span-2 lg:col-span-2">
							<div className="mb-4">
								<Logo />
							</div>
							<p className="text-sm mb-4">
								Empowering aviators with cutting-edge technology and education.
							</p>
							<SocialLinks />
							<StatusWrapper />
							<div className="mt-2 text-xs text-gray-500">
								Build Version: v0.725110
							</div>
						</div>

						<FooterLinks />
						<ResourceLinks />
					</div>
				</div>

				{/* Bottom bar */}
				<div className="border-t border-gray-800 py-6 text-sm md:flex md:justify-between md:text-left">
					<div className="mb-4 md:mb-0">
						&copy; {new Date().getFullYear()} AviatorJonah, LLC. All rights
						reserved.
					</div>
					<div className="space-x-2">
						<Link
							href="/refunds"
							className="px-2 py-1 transition-colors duration-300 hover:text-white"
						>
							Refund Policy
						</Link>
						<span className="text-gray-500 px-2">•</span>
						<Link
							href="/terms"
							className="px-2 py-1 transition-colors duration-300 hover:text-white"
						>
							Terms & Conditions
						</Link>
						<span className="text-gray-500 px-2">•</span>
						<Link
							href="/privacy"
							className="px-2 py-1 transition-colors duration-300 hover:text-white"
						>
							Privacy Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
