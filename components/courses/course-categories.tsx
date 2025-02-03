"use client";

import { motion } from "framer-motion";
import {
	Compass,
	Book,
	Users,
	Award,
	Plane,
	Headphones,
	Clock,
} from "lucide-react";

const features = [
	{
		icon: Compass,
		title: "Comprehensive Curriculum",
		description:
			"From private pilot to advanced certifications, our courses cover every aspect of aviation.",
	},
	{
		icon: Book,
		title: "Expert-Led Instruction",
		description:
			"Learn from seasoned pilots and industry professionals with years of experience.",
	},
	{
		icon: Users,
		title: "Community Learning",
		description:
			"Join a vibrant community of aspiring and experienced aviators to share knowledge and experiences.",
	},
	{
		icon: Award,
		title: "FAA-Approved Content",
		description:
			"Our courses are designed to meet and exceed FAA standards for pilot education.",
	},
	{
		icon: Plane,
		title: "Practical Simulations",
		description:
			"Experience realistic flight scenarios with our advanced simulation technology.",
	},
	{
		icon: Headphones,
		title: "24/7 Support",
		description:
			"Access round-the-clock assistance from our dedicated support team.",
	},
	{
		icon: Clock,
		title: "Flexible Learning",
		description:
			"Study at your own pace with our on-demand video lessons and interactive content.",
	},
];

export default function CourseCategories() {
	return (
		<section
			className="py-16 bg-gradient-to-b from-[#0c1220] to-[#1b264f]"
			id="features"
		>
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Welcome to The Aviator&apos;s Classroom
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Embark on a journey of excellence in aviation education. Discover
						why aspiring pilots choose us for their learning adventure.
					</p>
				</motion.div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<feature.icon className="w-12 h-12 text-blue-400 mb-4" />
							<h3 className="text-xl font-semibold text-white mb-2">
								{feature.title}
							</h3>
							<p className="text-gray-300">{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
