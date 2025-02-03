import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
	return (
		<section className="relative h-screen flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0">
				<Image
					src="https://assets.aviatorjonah.com/ifr-chart.jpg"
					alt="IFR Chart background"
					fill
					className="object-cover"
					quality={100}
				/>
				<div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm" />
			</div>
			<div className="relative z-10 text-center px-4 max-w-4xl">
				<motion.h1
					className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					Charting New Heights
				</motion.h1>
				<motion.p
					className="text-xl md:text-2xl mb-8 text-blue-100"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
				>
					Empowering the next generation of aviators through innovation and
					excellence
				</motion.p>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<a
						href="#about"
						className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all hover:bg-blue-700 hover:shadow-lg"
					>
						Discover Our Story
					</a>
				</motion.div>
			</div>
		</section>
	);
}
