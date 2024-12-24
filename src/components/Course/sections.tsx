"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { setIsSectionsOpen } from "@/stores/sections-store";
import { useStore } from "@nanostores/react";
import { $isSectionsOpen } from "@/stores/sections-store";

type Props = {
	sections: string[];
};

const Sections = ({ sections }: Props) => {
	const [activeSection, setActiveSection] = useState<string>("");
	const observerRef = useRef<IntersectionObserver | null>(null);
	const isScrollingRef = useRef(false);
	const activeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const isOpen = useStore($isSectionsOpen);

	const createSectionId = (section: string): string => {
		return section
			.toLowerCase()
			.trim()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-+|-+$/g, "");
	};

	useEffect(() => {
		const cleanup = () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
			if (activeTimeoutRef.current) {
				clearTimeout(activeTimeoutRef.current);
			}
		};

		// Wait for DOM to be ready
		const initializeObserver = () => {
			cleanup();

			observerRef.current = new IntersectionObserver(
				(entries) => {
					if (isScrollingRef.current) return;

					// Get all visible sections
					const visibleSections = entries.filter(
						(entry) => entry.isIntersecting,
					);

					if (visibleSections.length > 0) {
						// Find the section that's most visible (closest to center of viewport)
						const mostVisible = visibleSections.reduce((prev, current) => {
							const prevBounds = prev.boundingClientRect;
							const currentBounds = current.boundingClientRect;
							const viewportHeight = window.innerHeight;
							const viewportCenter = viewportHeight / 2;

							const prevDistanceToCenter = Math.abs(
								prevBounds.top + prevBounds.height / 2 - viewportCenter,
							);
							const currentDistanceToCenter = Math.abs(
								currentBounds.top + currentBounds.height / 2 - viewportCenter,
							);

							return currentDistanceToCenter < prevDistanceToCenter
								? current
								: prev;
						});

						if (activeTimeoutRef.current) {
							clearTimeout(activeTimeoutRef.current);
						}

						activeTimeoutRef.current = setTimeout(() => {
							setActiveSection(mostVisible.target.id);
						}, 50);
					}
				},
				{
					rootMargin: "-20% 0px -35% 0px",
					threshold: [0, 0.25, 0.5, 0.75, 1],
				},
			);

			sections.forEach((section) => {
				const element = document.getElementById(createSectionId(section));
				if (element && observerRef.current) {
					observerRef.current.observe(element);
				}
			});
		};

		// Small delay to ensure DOM elements are ready
		setTimeout(initializeObserver, 100);

		return cleanup;
	}, [sections]);

	const scrollToSection = (section: string) => {
		const sectionId = createSectionId(section);
		const element = document.getElementById(sectionId);

		if (element) {
			isScrollingRef.current = true;

			const headerHeight = 80; // Adjust based on your actual header height
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = window.scrollY + elementPosition - headerHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});

			// Update active section immediately for better UX
			setActiveSection(sectionId);

			// Reset scrolling flag after animation completes
			setTimeout(() => {
				isScrollingRef.current = false;
			}, 1000); // Adjust timing based on your scroll animation duration
		}
	};

	if (!sections.length) return null;

	const variants = {
		sections: {
			open: { opacity: 1, x: 20 },
			closed: { opacity: 1, x: 272 },
		},
		button: {
			open: { width: 0, opacity: 0 },
			closed: { width: 25, opacity: 1 },
		},
	};

	return (
		<motion.div
			className="fixed top-16 right-2 p-4 w-[300px] hidden lg:block"
			initial={isOpen ? "open" : "closed"}
			animate={isOpen ? "open" : "closed"}
			exit={isOpen ? "closed" : "open"}
			transition={{ duration: 0.3 }}
			variants={variants.sections}
		>
			<div className="relative mx-auto h-[calc(100vh-6rem)] overflow-y-auto  bg-white dark:bg-black rounded-xl">
				<nav className="flex flex-row w-full">
					<motion.div
						onClick={() => setIsSectionsOpen(true)}
						variants={variants.button}
						animate={isOpen ? "open" : "closed"}
						initial={isOpen ? "open" : "closed"}
						className="h-[calc(100vh-6rem)] flex flex-col items-center justify-center"
					>
						<div className="w-1.5 bg-neutral-600 h-20 rounded-xl m-1.5" />
					</motion.div>
					<div className="flex flex-col space-y-2 pb-4 px-4 py-2 w-full">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsSectionsOpen(false)}
							className="absolute top-2 right-2"
						>
							<X className="w-4 h-4" />
						</Button>
						<p className="font-semibold text-sm text-muted-foreground mb-2 w-full">
							ON THIS PAGE
						</p>
						{sections.map((section, index) => (
							<TooltipProvider key={section + "-section" + index}>
								<Tooltip>
									<TooltipTrigger asChild>
										<button
											key={section + "-section" + index}
											onClick={() => scrollToSection(section)}
											className={cn(
												"text-sm px-3 py-1.5 text-left transition-colors rounded-md truncate max-w-[230px]",
												"hover:bg-accent hover:text-accent-foreground",
												"focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
												activeSection === createSectionId(section)
													? "text-primary font-medium bg-accent"
													: "text-muted-foreground",
											)}
										>
											{section}
										</button>
									</TooltipTrigger>
									<TooltipContent>
										<p>{section}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						))}
					</div>
				</nav>
			</div>
		</motion.div>
	);
};

export default Sections;
