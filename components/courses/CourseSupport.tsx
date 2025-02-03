import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, HelpCircle } from "lucide-react";

export default function CourseSupport() {
	return (
		<motion.div
			className="bg-gray-800 rounded-lg p-6 mt-12 text-white"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h3 className="text-2xl font-bold mb-4">Need Help Choosing a Course?</h3>
			<p className="mb-6">
				If you need course recommendations or assistance in selecting the right
				course for you, our support team is here to help!
			</p>
			<div className="flex flex-col sm:flex-row gap-4">
				<Link
					href="mailto:support@avjco.org"
					className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
				>
					<Mail className="w-5 h-5" />
					<span>Email Support</span>
				</Link>
				<Link
					href="https://support.aviatorjonah.com"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
				>
					<HelpCircle className="w-5 h-5" />
					<span>Visit Help Desk</span>
				</Link>
			</div>
		</motion.div>
	);
}
