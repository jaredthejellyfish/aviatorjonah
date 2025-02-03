"use client";

import React, { useState } from "react";
import { ChevronDown, Book, Cloud, Clock, Plane } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const FAQPage = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const features = [
		{
			icon: <Book className="w-6 h-6" />,
			title: "Study Guide",
			description:
				"Interactive lessons and practice tests for your pilot certification",
		},
		{
			icon: <Cloud className="w-6 h-6" />,
			title: "Weather Integration",
			description: "Real-time weather updates and flight planning assistance",
		},
		{
			icon: <Clock className="w-6 h-6" />,
			title: "Flight Log",
			description: "Track your flight hours and training progress",
		},
		{
			icon: <Plane className="w-6 h-6" />,
			title: "Checklists",
			description: "Digital checklists for pre-flight and in-flight procedures",
		},
	];

	const faqs = [
		{
			question: "What is CoPilot?",
			answer:
				"CoPilot is your digital companion for learning! Its aimed to those who want to learn more about aviation, from real-world pilots to simualtor enthusists.",
		},
		{
			question: "How does CoPilot help with my flight training?",
			answer:
				"With CoPilot, you can enter a testing enviroment where CoPilot asks you questions regarding a rating or upcoming written, or it can teach you new concepts and break them down into more meaningful wholes. This allows you to learn faster, smarter, and more efficently.",
		},
		{
			question: "Does CoPilot work offline?",
			answer:
				"CoPilot does require an active, stable internet connection. We are working on implementing offline features soon.",
		},
		{
			question: "Is CoPilot suitable for all types of pilot training?",
			answer:
				"Yes! Whether you are working on your private pilot or ATP, or just a pilot with some questions, CoPilot can assist you. In aviation, you are always learning, why not make it easy.",
		},
		{
			question: "Can I sync my progress across devices?",
			answer:
				"Yes, your progress is stored in the cloud so where you left on your iPad, is now on your laptop at home.",
		},
		{
			question: "How often is the content updated?",
			answer:
				"Our model is always learning and changing. Check out our updates page for all the latest information about our newest models we will be releasing.",
		},
		{
			question: "Is there a free verision available?",
			answer:
				"Yes! You can use CoPilot for free, however, you will be limited to 5 chats per 24 hour period. We recomend signing-up for our monthly subscription for an increased quota in chats.x ",
		},
	];

	return (
		<>
			<Header />
			<div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900">
				{/* Hero Section with adjusted padding for fixed header */}
				<div className="relative overflow-hidden pt-24 mt-16">
					<div className="absolute inset-0">
						<div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-gray-900 opacity-90"></div>
					</div>
					<div className="relative px-6 py-32 sm:px-8 lg:px-12">
						<div className="text-center">
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
								Your Supplemental Instructor
								<span className="block text-blue-400">
									When Away From School
								</span>
							</h1>
							<p className="max-w-2xl mx-auto text-xl text-gray-300 mb-8">
								Master your flight training with interactive 1-1 learning
								environment. <br />
								Have a question? Ask CoPilot!
							</p>
							<button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 transform hover:scale-105">
								Start Learning Now
							</button>
						</div>
					</div>
				</div>

				{/* Features Grid */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-blue-700 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1"
							>
								<div className="text-blue-400 mb-4">{feature.icon}</div>
								<h3 className="text-xl font-semibold text-white mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-400">{feature.description}</p>
							</div>
						))}
					</div>
				</div>

				{/* FAQ Section */}
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold text-white mb-4">
							Frequently Asked Questions
						</h2>
						<p className="text-xl text-gray-300">
							Everything you need to know about CoPilot
						</p>
					</div>

					<div className="space-y-4">
						{faqs.map((faq, index) => (
							<div
								key={index}
								className="bg-gray-800 bg-opacity-50 rounded-lg border border-blue-700 overflow-hidden hover:border-blue-500 transition-all duration-300"
							>
								<button
									onClick={() => {
										const newIndex: number | null =
											openIndex === index ? null : index;
										setOpenIndex(newIndex);
									}}
									className="w-full px-6 py-4 flex justify-between items-center text-left text-lg font-semibold text-white hover:text-blue-400 transition-colors focus:outline-none"
								>
									<span>{faq.question}</span>
									<ChevronDown
										className={`transform transition-transform duration-300 text-blue-400 ${
											openIndex === index ? "rotate-180" : ""
										}`}
									/>
								</button>
								<div
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										openIndex === index ? "max-h-96" : "max-h-0"
									}`}
								>
									<div className="px-6 py-4 text-gray-300 border-t border-blue-700">
										{faq.answer}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="mt-16 text-center">
						<h2 className="text-2xl font-semibold text-white mb-4">
							Still have questions?
						</h2>
						<p className="text-gray-300 mb-8">
							Our support team is here to help you succeed in your aviation
							journey.
						</p>
						<button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 transform hover:scale-105">
							Contact Support
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default FAQPage;
