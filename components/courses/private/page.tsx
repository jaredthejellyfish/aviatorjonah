"use client";

import { motion } from "framer-motion";
import { Clock, BookOpen, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function CourseOverview() {
	return (
		<div className="min-h-screen bg-[#0c1220] text-white">
			{/* Hero Section */}
			<section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<motion.h1
						className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Private Pilot Ground School
					</motion.h1>
					<motion.p
						className="text-xl text-center text-gray-300 max-w-3xl mx-auto"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Master the fundamentals of aviation and prepare for your Private
						Pilot License with our comprehensive ground school course.
					</motion.p>
				</div>
			</section>

			{/* Course Content Section */}
			<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-3xl font-bold mb-8 text-center"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Course Contents
					</motion.h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							"Aerodynamics",
							"Aircraft Systems",
							"Flight Instruments",
							"Regulations",
							"Weather",
							"Navigation",
						].map((topic, index) => (
							<motion.div
								key={topic}
								className="bg-gray-800 p-6 rounded-lg shadow-lg"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<BookOpen className="w-8 h-8 mb-4 text-blue-400" />
								<h3 className="text-xl font-semibold mb-2">{topic}</h3>
								<p className="text-gray-400">
									In-depth coverage of {topic.toLowerCase()} principles and
									applications in aviation.
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Instructor Section */}
			<section className="py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-3xl font-bold mb-8 text-center"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Meet Your Instructor
					</motion.h2>
					<div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
						<motion.div
							className="w-48 h-48 rounded-full overflow-hidden"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
						>
							<Image
								src="/placeholder.svg"
								alt="Instructor"
								width={200}
								height={200}
								className="w-full h-full object-cover"
							/>
						</motion.div>
						<motion.div
							className="text-center md:text-left"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<h3 className="text-2xl font-semibold mb-2">Captain John Doe</h3>
							<p className="text-gray-300 mb-4">
								With over 20 years of flying experience and 10,000+ flight
								hours, Capt. John Doe brings a wealth of knowledge to the
								classroom.
							</p>
							<p className="text-blue-400">
								FAA Certified Flight Instructor (CFI, CFII, MEI)
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Course Duration and Contact Section */}
			<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<motion.div
							className="bg-gray-800 p-8 rounded-lg shadow-lg"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Clock className="w-12 h-12 mb-4 text-blue-400" />
							<h3 className="text-2xl font-semibold mb-2">Course Duration</h3>
							<p className="text-gray-300">
								Estimated completion time: 6-8 weeks
							</p>
							<p className="text-gray-400 mt-2">
								Self-paced learning with 40+ hours of video content
							</p>
						</motion.div>
						<motion.div
							className="bg-gray-800 p-8 rounded-lg shadow-lg"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<Mail className="w-12 h-12 mb-4 text-blue-400" />
							<h3 className="text-2xl font-semibold mb-2">Have Questions?</h3>
							<p className="text-gray-300 mb-2">
								We&apos;re here to help! Contact us at:
							</p>
							<Link
								href="mailto:jonah@avjco.org"
								className="text-blue-400 hover:underline"
							>
								jonah@avjco.org
							</Link>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	);
}
