"use client";
// sidebar-client.tsx (Client Components)
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const fadeInUpVariants = {
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

const fadeInQuickVariants = {
	initial: { opacity: 0, y: -10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -10 },
};

const rotateVariants = {
	open: { rotate: 180 },
	closed: { rotate: 0 },
};

// -------------------------------------
// ChapterLesson
// -------------------------------------
export function ChapterLesson({
	lesson,
	currentLessonTitle,
}: {
	lesson: {
		title: string;
		completed: boolean;
		slug: string;
		moduleSlug: string;
		courseSlug: string;
	};
	currentLessonTitle?: string;
}) {
	return (
		<motion.div
			variants={fadeInQuickVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.2 }}
			className="mr-3"
		>
			<Link
				href={`/lesson/${lesson.courseSlug}/${lesson.slug}`}
				className={cn(
					"group flex items-center justify-between w-full px-4 py-2.5 rounded-md transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
					lesson.title === currentLessonTitle && "bg-primary/10",
				)}
			>
				<Tooltip>
					<TooltipTrigger asChild>
						<span className="truncate w-4/5 text-sm font-medium group-hover:text-primary">
							{lesson.title}
						</span>
					</TooltipTrigger>
					<TooltipContent side="right" sideOffset={10}>
						<p className="text-sm">{lesson.title}</p>
					</TooltipContent>
					{lesson.completed && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="flex items-center justify-center p-1.5 rounded-full bg-green-400/40"
						>
							<Check className="w-3.5 h-3.5 text-primary" />
						</motion.div>
					)}
				</Tooltip>
			</Link>
		</motion.div>
	);
}

// -------------------------------------
// ChapterSection
// -------------------------------------
export function ChapterSection({
	lessons,
	chapterTitle,
	chapterNumber,
	defaultOpen,
	currentLessonTitle,
}: {
	lessons: {
		title: string;
		completed: boolean;
		slug: string;
		moduleSlug: string;
		courseSlug: string;
	}[];
	chapterTitle: string;
	chapterNumber: number;
	defaultOpen?: boolean;
	currentLessonTitle?: string;
}) {
	const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

	return (
		<motion.div
			variants={fadeInUpVariants}
			initial="initial"
			animate="animate"
			transition={{ duration: 0.3 }}
			className="mt-6"
		>
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between px-4 py-2 hover:bg-primary/5 transition-colors rounded-md group"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<div className="flex flex-col items-start max-w-[80%]">
					<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Chapter {chapterNumber}
					</span>
					<Tooltip>
						<TooltipTrigger asChild>
							<h2 className="text-sm font-semibold truncate w-full text-left group-hover:text-primary transition-colors">
								{chapterTitle}
							</h2>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={10}>
							<p className="text-sm">{chapterTitle}</p>
						</TooltipContent>
					</Tooltip>
				</div>
				<motion.div
					variants={rotateVariants}
					animate={isOpen ? "open" : "closed"}
					transition={{ duration: 0.2 }}
				>
					<ChevronDown className="w-4 h-4 text-muted-foreground" />
				</motion.div>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="mt-1 space-y-0.5 pl-4 overflow-hidden"
					>
						{lessons.map((lesson) => (
							<ChapterLesson
								key={lesson.slug}
								lesson={lesson}
								currentLessonTitle={currentLessonTitle}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

// -------------------------------------
// SidebarContent
// -------------------------------------
export function SidebarContent({
	courseModules,
	courseTitle,
	className,
	currentModuleTitle,
	currentLessonTitle,
	courseSlug,
}: {
	className?: string;
	courseTitle: string;
	currentModuleTitle?: string;
	currentLessonTitle?: string;
	courseModules: {
		lessons: {
			title: string;
			completed: boolean;
			slug: string;
			moduleSlug: string;
			courseSlug: string;
		}[];
		chapterTitle: string;
		chapterNumber: number;
	}[];
	courseSlug: string;
}) {
	return (
		<TooltipProvider>
			<Tabs
				defaultValue="content"
				className={cn(
					"md:h-[calc(100vh-64px)] h-full pb-6 md:pb-0 overflow-scroll flex flex-col bg-background",
					className,
				)}
			>
				{/* Course title (visible on md+) */}
				<motion.div
					variants={fadeInUpVariants}
					initial="initial"
					animate="animate"
					transition={{ duration: 0.5 }}
					className="flex-shrink-0 border-b border-border p-4 hidden md:block"
				>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link href={`/course/${courseSlug}`}>
								<h1 className="text-xl font-bold w-full max-w-[250px] truncate">
									{courseTitle}
								</h1>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={10}>
							<p className="text-sm">{courseTitle}</p>
						</TooltipContent>
					</Tooltip>
				</motion.div>

				{/* Tabs header */}
				<motion.div
					variants={fadeInUpVariants}
					initial="initial"
					animate="animate"
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex-shrink-0 bg-background p-2 border-b border-border"
				>
					<TabsList className="w-full">
						<TabsTrigger value="content" className="flex-1">
							Content
						</TabsTrigger>
						<TabsTrigger value="resources" className="flex-1">
							Resources
						</TabsTrigger>
					</TabsList>
				</motion.div>

				{/* Tabs content */}
				<motion.div
					variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
					initial="initial"
					animate="animate"
					transition={{ duration: 0.5, delay: 0.4 }}
					className="flex-grow overflow-y-auto"
				>
					<TabsContent value="content">
						{courseModules?.map((moduleItem) => (
							<ChapterSection
								key={moduleItem.chapterNumber}
								lessons={moduleItem.lessons}
								chapterTitle={moduleItem.chapterTitle}
								chapterNumber={moduleItem.chapterNumber}
								currentLessonTitle={currentLessonTitle}
								defaultOpen={
									currentModuleTitle
										? currentModuleTitle === moduleItem.chapterTitle
										: false
								}
							/>
						))}
					</TabsContent>

					<TabsContent value="resources" className="p-4">
						<p className="text-sm text-muted-foreground">
							Resources content goes here.
						</p>
					</TabsContent>
				</motion.div>
			</Tabs>
		</TooltipProvider>
	);
}

// -------------------------------------
// DrawerSidebar
// -------------------------------------
export function DrawerSidebar({
	courseTitle,
	courseModules,
	currentModuleTitle,
	currentLessonTitle,
	courseSlug,
}: {
	courseTitle: string;
	currentModuleTitle?: string;
	currentLessonTitle?: string;
	courseModules: {
		lessons: {
			title: string;
			completed: boolean;
			slug: string;
			moduleSlug: string;
			courseSlug: string;
		}[];
		chapterTitle: string;
		chapterNumber: number;
	}[];
	courseSlug: string;
}) {
	const [isOpen, setIsOpen] = useState(false);

	// Close the drawer automatically if screen is resized to >=768px
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsOpen(false);
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<motion.div
					initial={{ opacity: 0, scale: 0, rotate: -360 }}
					animate={{ opacity: 1, scale: 1, rotate: 0 }}
					transition={{ duration: 0.5 }}
					className="fixed top-20 left-4 z-30"
				>
					<Button variant="outline" className="w-10 h-10 md:hidden">
						<Menu className="w-full h-full" />
					</Button>
				</motion.div>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader>
					<Link href={`/course/${courseSlug}`}>
						<DrawerTitle>{courseTitle}</DrawerTitle>
					</Link>
				</DrawerHeader>

				{/* Reuse the SidebarContent inside the drawer */}
				<SidebarContent
					courseSlug={courseSlug}
					courseTitle={courseTitle}
					courseModules={courseModules}
					currentModuleTitle={currentModuleTitle}
					currentLessonTitle={currentLessonTitle}
				/>
			</DrawerContent>
		</Drawer>
	);
}
