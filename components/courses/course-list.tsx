"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const courses = [
	{
		id: "private-pilot-ground-school",
		title: "Private Pilot Ground School",
		category: "Private",
		description: "Comprehensive ground school for aspiring private pilots.",
		price: "$499",
		image: "/placeholder.svg?height=400&width=600",
	},
	{
		id: "instrument-rating-mastery",
		title: "Instrument Rating Mastery",
		category: "Instrument",
		description: "Master instrument flying with our in-depth course.",
		price: "$699",
		image: "/placeholder.svg?height=400&width=600",
	},
	{
		id: "commercial-pilot-essentials",
		title: "Commercial Pilot Essentials",
		category: "Commercial",
		description:
			"Everything you need to know for your commercial pilot license.",
		price: "$899",
		image: "/placeholder.svg?height=400&width=600",
	},
];

export default function CourseCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setDirection(1);
			setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	const navigate = (newDirection: number) => {
		setDirection(newDirection);
		setCurrentIndex((prevIndex) => {
			if (newDirection === -1) {
				return prevIndex === 0 ? courses.length - 1 : prevIndex - 1;
			}
			return (prevIndex + 1) % courses.length;
		});
	};

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		}),
	};

	return (
		<section className="py-16 bg-[#0c1220] overflow-hidden">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold text-white mb-12 text-center">
					Featured Courses
				</h2>
				<div className="relative">
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={currentIndex}
							custom={direction}
							variants={variants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: "spring", stiffness: 300, damping: 30 },
								opacity: { duration: 0.2 },
							}}
							className="absolute w-full"
						>
							<div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row">
								<div className="md:w-1/2 relative">
									<Image
										src={courses[currentIndex].image}
										alt={courses[currentIndex].title}
										className="w-full h-64 md:h-full object-cover"
										width={600}
										height={400}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
								</div>
								<div className="p-8 md:w-1/2 flex flex-col justify-center">
									<span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4 w-max">
										{courses[currentIndex].category}
									</span>
									<h3 className="text-3xl font-bold text-white mb-4">
										{courses[currentIndex].title}
									</h3>
									<p className="text-gray-300 mb-6 text-lg">
										{courses[currentIndex].description}
									</p>
									<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
										<span className="text-blue-400 font-bold text-2xl">
											{courses[currentIndex].price}
										</span>
										<Link
											href={`/courses/${courses[currentIndex].id}`}
											className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 text-lg font-semibold w-full sm:w-auto text-center"
										>
											Enroll Now
										</Link>
									</div>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
					<button
						className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 transition duration-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onClick={() => navigate(-1)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
					<button
						className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 transition duration-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onClick={() => navigate(1)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>
				<div className="flex justify-center mt-8">
					{courses.map((_, index) => (
						<button
							key={index}
							className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${
								index === currentIndex
									? "bg-blue-500 scale-125"
									: "bg-gray-600 hover:bg-gray-500"
							}`}
							onClick={() => setCurrentIndex(index)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
