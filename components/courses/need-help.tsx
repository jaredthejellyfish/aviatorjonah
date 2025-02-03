import { Mail, HelpCircle, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function NeedHelp() {
	return (
		<section className="bg-gray-900 py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-white mb-8 text-center">
					Need Help?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="bg-gray-800 p-6 rounded-lg text-center">
						<Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-white mb-2">
							Email Support
						</h3>
						<p className="text-gray-300 mb-4">
							Have a question? Reach out to our support team.
						</p>
						<Link
							href="mailto:support@avjco.org"
							className="text-blue-400 hover:text-blue-300 transition-colors"
						>
							support@avjco.org
						</Link>
					</div>
					<div className="bg-gray-800 p-6 rounded-lg text-center">
						<HelpCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-white mb-2">
							Help Center
						</h3>
						<p className="text-gray-300 mb-4">
							Find answers to common questions in our Help Center.
						</p>
						<Link
							href="https://support.aviatorjonah.com"
							className="text-blue-400 hover:text-blue-300 transition-colors"
						>
							Visit Help Center
						</Link>
					</div>
					<div className="bg-gray-800 p-6 rounded-lg text-center">
						<PhoneCall className="w-12 h-12 text-blue-500 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-white mb-2">
							Phone Support
						</h3>
						<p className="text-gray-300 mb-4">
							Need immediate assistance? Give us a call.
						</p>
						<Link
							href="tel:+1234567890"
							className="text-blue-400 hover:text-blue-300 transition-colors"
						>
							+1 (234) 567-890
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
