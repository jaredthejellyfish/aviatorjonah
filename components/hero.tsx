"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";
import Cookies from "js-cookie";
import { ChevronDown, X } from "lucide-react";

// Types for better type safety
type SimpleLine = {
	text: string;
	type: "simple";
	className: string;
};

type CompoundLinePart = {
	text: string;
	className: string;
};

type CompoundLine = {
	type: "compound";
	parts: CompoundLinePart[];
};

type Line = SimpleLine | CompoundLine;

type DisplayedText = {
	line0: string;
	line1Part0: string;
	line1Part1: string;
	line1Part2: string;
	line2: string;
};

// Type guard to check if a line is compound
function isCompoundLine(line: Line): line is CompoundLine {
	return line.type === "compound";
}

// Memoized animation variants
const variants = {
	fly: {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
		},
	},
	scroll: {
		initial: { opacity: 0, y: -10 },
		animate: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" },
		},
		exit: {
			opacity: 0,
			y: 10,
			transition: { duration: 0.3, ease: "easeIn" },
		},
	},
	waitlist: {
		initial: { opacity: 0, scale: 0.95 },
		animate: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	},
	bounce: {
		animate: {
			y: [0, 8, 0] as number[],
			transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
		},
	},
	text: {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.3, ease: "easeOut" },
		},
	},
	comingSoon: {
		hidden: {
			opacity: 0,
			scale: 0.95,
			filter: "blur(5px)",
		},
		visible: {
			opacity: 1,
			scale: 1,
			filter: "blur(0px)",
			transition: {
				duration: 1.2,
				ease: [0.23, 1, 0.32, 1],
				delay: 0.4,
			},
		},
	},
} as const;

export default function CoPilotHero() {
	const [typingComplete, setTypingComplete] = useState(false);
	const [showScroll, setShowScroll] = useState(true);
	const [showWaitlist, setShowWaitlist] = useState(false);
	const [hasInteractedWithWaitlist, setHasInteractedWithWaitlist] =
		useState(false);
	const [showComingSoon, setShowComingSoon] = useState(false);
	const [displayedText, setDisplayedText] = useState<DisplayedText>({
		line0: "",
		line1Part0: "",
		line1Part1: "",
		line1Part2: "",
		line2: "",
	});

	// Memoized configuration
	const lines = useMemo(
		(): Line[] => [
			{
				text: "introducing...",
				type: "simple",
				className:
					"text-lg md:text-xl text-slate-300 font-light tracking-wider",
			},
			{
				type: "compound",
				parts: [
					{
						text: "CoPilot",
						className:
							"text-4xl md:text-6xl font-bold text-white tracking-tight",
					},
					{
						text: "x",
						className: "text-4xl md:text-6xl font-bold text-slate-300 mx-2",
					},
					{
						text: "AviatorJonah",
						className:
							"text-4xl md:text-6xl font-bold gradient-text tracking-tight",
					},
				],
			},
			{
				text: "Revolutionizing Learning",
				type: "simple",
				className: "text-xl md:text-2xl text-blue-300 font-light tracking-wide",
			},
		],
		[],
	);

	// Memoized handlers
	const handleWaitlistClose = useCallback(() => {
		setShowWaitlist(false);
		setHasInteractedWithWaitlist(true);
		// Set cookie to expire in 7 days
		Cookies.set("waitlistPopupSeen", "true", { expires: 7 });
	}, []);

	const handleScrollClick = useCallback(() => {
		setShowScroll(false);
		setShowWaitlist(true);
		window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
	}, []);

	// Typing animation effect
	useEffect(() => {
		const timeouts: NodeJS.Timeout[] = [];
		let currentState = "line0";
		let currentIndex = 0;

		const states = [
			{
				key: "line0" as keyof DisplayedText,
				text: (lines[0] as SimpleLine).text,
				delay: 60,
			},
			{
				key: "line1Part0" as keyof DisplayedText,
				text: isCompoundLine(lines[1]) ? lines[1].parts[0].text : "",
				delay: 60,
			},
			{
				key: "line1Part1" as keyof DisplayedText,
				text: isCompoundLine(lines[1]) ? lines[1].parts[1].text : "",
				delay: 60,
			},
			{
				key: "line1Part2" as keyof DisplayedText,
				text: isCompoundLine(lines[1]) ? lines[1].parts[2].text : "",
				delay: 60,
			},
			{
				key: "line2" as keyof DisplayedText,
				text: (lines[2] as SimpleLine).text,
				delay: 60,
			},
		];

		const typeNextCharacter = () => {
			const currentStateObj = states.find((s) => s.key === currentState);
			if (!currentStateObj) {
				setTypingComplete(true);
				setTimeout(() => setShowComingSoon(true), 100);
				return;
			}

			if (currentIndex >= currentStateObj.text.length) {
				const nextStateIndex =
					states.findIndex((s) => s.key === currentState) + 1;
				const timeout = setTimeout(() => {
					currentState = states[nextStateIndex]?.key ?? "";
					currentIndex = 0;
					if (currentState) {
						typeNextCharacter();
					} else {
						setTypingComplete(true);
						setTimeout(() => setShowComingSoon(true), 50);
					}
				}, 800);
				timeouts.push(timeout);
				return;
			}

			setDisplayedText((prev) => ({
				...prev,
				[currentStateObj.key]: currentStateObj.text.slice(0, currentIndex + 1),
			}));

			currentIndex++;
			const timeout = setTimeout(typeNextCharacter, currentStateObj.delay);
			timeouts.push(timeout);
		};

		const initialDelay = setTimeout(typeNextCharacter, 1500);
		timeouts.push(initialDelay);

		return () => timeouts.forEach(clearTimeout);
	}, [lines]);

	// Scroll handler effect
	// Check for existing cookie on component mount
	useEffect(() => {
		const hasSeenPopup = Cookies.get("waitlistPopupSeen");
		if (hasSeenPopup) {
			setHasInteractedWithWaitlist(true);
		}
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setShowScroll(false);
				if (!hasInteractedWithWaitlist && !Cookies.get("waitlistPopupSeen")) {
					setShowWaitlist(true);
				}
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [hasInteractedWithWaitlist]);

	// Memoized waitlist component
	const waitlistComponent = useMemo(() => {
		if (!showWaitlist) return null;

		return (
			<motion.div
				className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-8"
				variants={variants.waitlist}
				initial="initial"
				animate="animate"
			>
				<div className="relative w-full max-w-lg bg-slate-900 rounded-xl overflow-hidden shadow-2xl p-6 md:p-8 border border-blue-500/20">
					<button
						onClick={handleWaitlistClose}
						className="absolute top-4 right-4 text-white hover:text-blue-300 transition-colors z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm"
					>
						<X className="w-6 h-6" />
					</button>

					<div className="text-center space-y-6">
						<h2 className="text-2xl md:text-3xl font-bold text-white">
							Join the Waitlist
						</h2>
						<p className="text-slate-300">
							Be among the first to experience CoPilot when we launch in 2025.
						</p>

						<form className="space-y-4">
							<input
								type="email"
								placeholder="Enter your email"
								className="w-full px-4 py-3 bg-slate-800 border border-blue-500/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
							/>
							<button
								type="submit"
								className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
							>
								Join Waitlist
							</button>
						</form>

						<p className="text-sm text-slate-400">
							By joining, you&apos;ll receive updates about our launch and early
							access opportunities.
						</p>
					</div>
				</div>
			</motion.div>
		);
	}, [showWaitlist, handleWaitlistClose]);

	return (
		<>
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.1)_0%,transparent_100%)]" />

				<div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
					<motion.div
						key="content"
						className="text-center space-y-8"
						variants={variants.fly}
						initial="initial"
						animate="animate"
						exit="exit"
					>
						<div className="space-y-6">
							{lines[0].type === "simple" && (
								<motion.div
									className="relative min-h-[2em]"
									variants={variants.text}
									initial="hidden"
									animate={displayedText.line0 ? "visible" : "hidden"}
								>
									<span className={lines[0].className}>
										{displayedText.line0}
									</span>
								</motion.div>
							)}

							{lines[1].type === "compound" && (
								<motion.div
									className="relative min-h-[2em] flex items-center justify-center flex-wrap gap-x-2 gap-y-1"
									variants={variants.text}
									initial="hidden"
									animate={displayedText.line1Part0 ? "visible" : "hidden"}
								>
									{lines[1].parts.map((part, i) => (
										<span key={i} className={part.className}>
											{displayedText[`line1Part${i}` as keyof DisplayedText]}
										</span>
									))}
								</motion.div>
							)}

							{lines[2].type === "simple" && (
								<motion.div
									className="relative min-h-[2em]"
									variants={variants.text}
									initial="hidden"
									animate={displayedText.line2 ? "visible" : "hidden"}
								>
									<span className={lines[2].className}>
										{displayedText.line2}
										{typingComplete && (
											<motion.span
												className="inline-block w-0.5 h-6 bg-blue-300 ml-0.5 align-text-top"
												animate={{ opacity: [0, 1] }}
												transition={{ duration: 0.6, repeat: Infinity }}
											/>
										)}
									</span>
								</motion.div>
							)}

							<motion.div
								className="relative mt-12"
								variants={variants.comingSoon}
								initial="hidden"
								animate={showComingSoon ? "visible" : "hidden"}
							>
								<div className="relative inline-flex flex-col items-center">
									<div className="relative">
										<span className="inline-block px-8 py-3 border border-blue-300/10">
											<motion.span
												className="block text-sm uppercase tracking-widest text-blue-200/70 font-medium mb-1"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 1, delay: 0.2 }}
											>
												Experience it in
											</motion.span>
											<motion.span
												className="text-2xl md:text-3xl text-white font-light tracking-wider"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 1, delay: 0.4 }}
											>
												<span className="shine-effect">
													<span className="font-semibold">2025</span>
												</span>
											</motion.span>
										</span>
									</div>
								</div>
							</motion.div>
						</div>

						{typingComplete && showScroll && (
							<motion.div
								className="fixed bottom-0 left-0 right-0 w-full pb-8 md:pb-12 text-center bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent pt-16"
								variants={variants.scroll}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								<motion.button
									className="inline-flex flex-col items-center text-blue-300 hover:text-blue-200 transition-colors"
									variants={variants.bounce}
									animate="animate"
									onClick={handleScrollClick}
								>
									<span className="text-sm md:text-base font-medium mb-2">
										Join the Waitlist
									</span>
									<ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
								</motion.button>
							</motion.div>
						)}
					</motion.div>
				</div>

				<style jsx>{`
          .gradient-text {
            background: linear-gradient(135deg, #60a5fa, #818cf8, #60a5fa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% 200%;
            animation: gradient-shift 8s ease infinite;
          }

          @keyframes gradient-shift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes shine {
            from {
              mask-position: -50%;
            }
            to {
              mask-position: 150%;
            }
          }

          .shine-effect {
            position: relative;
            overflow: hidden;
            mask-image: linear-gradient(
              60deg,
              black 25%,
              rgba(0, 0, 0, 0.2) 50%,
              black 75%
            );
            mask-size: 400%;
            animation: shine 3s infinite;
          }
        `}</style>
			</section>

			{waitlistComponent}
		</>
	);
}
