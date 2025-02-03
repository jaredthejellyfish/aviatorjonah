"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function AnimatedHero() {
	return (
		<section className="relative h-screen flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/40 to-slate-900"></div>
			</div>
			<div className="relative z-10 text-center px-4 max-w-4xl">
				<motion.h1
					className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					About AviatorJonah
				</motion.h1>
				<motion.p
					className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
				>
					Founded by a passionate CFI, we&apos;re reimagining how aviation
					education can inspire and empower the next generation of pilots.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<Link
						href="#story"
						className="inline-block bg-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all hover:bg-blue-700 hover:shadow-lg hover:scale-105"
					>
						Our Story
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
