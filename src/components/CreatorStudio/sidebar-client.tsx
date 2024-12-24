"use client";
// sidebar-client.tsx (Client Components)
import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";

import { ChevronDown, Menu, Plus, Trash } from "lucide-react";

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
import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogTrigger,
	AlertDialogCancel,
	AlertDialogAction,
	AlertDialog,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { addChapter, removeChapter } from "@/actions/course-editor/chapter";
import { toast } from "sonner";
import { addLesson, removeLesson } from "@/actions/course-editor/lesson";

// -------------------------------------
// ChapterLesson
// -------------------------------------
function ChapterLesson({
	lesson,
	currentLessonTitle,
}: {
	lesson: {
		id: string;
		title: string;
		completed: boolean;
		slug: string;
		moduleSlug: string;
		courseSlug: string;
	};
	currentLessonTitle?: string;
}) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [moduleTitleInput, setModuleTitleInput] = useState("");
	const [currentText, setCurrentText] = useState("");

	const doesTextMatch = useMemo(() => {
		return currentText.toLowerCase() === "delete my lesson";
	}, [currentText]);

	const handleDelete = async (formData: FormData) => {
		formData.append("lessonId", lesson.id);

		const res = (await new Promise((resolve) => {
			startTransition(async () => {
				const res = await removeLesson(formData);
				resolve(res);
			});
		})) as { success: boolean };

		if (res.success) {
			toast.success("Lesson deleted successfully");
			router.push(`/content-studio/edit/${lesson.courseSlug}`);
			setDialogOpen(false);
		} else {
			toast.error("Failed to delete lesson");
		}
	};

	return (
		<div
			className={cn(
				lesson.title === currentLessonTitle && "bg-primary/10",
				"group flex items-center justify-between w-full px-4 py-2.5 rounded-md transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
			)}
		>
			<Link href={`/content-studio/edit/${lesson.courseSlug}/${lesson.slug}`}>
				<span className="truncate w-4/5 text-sm font-medium group-hover:text-primary">
					{lesson.title}
				</span>
			</Link>
			<AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<AlertDialogTrigger asChild>
					<div className="flex items-center justify-center p-1.5 rounded-full bg-red-400/40">
						<Trash className="w-3.5 h-3.5 text-primary" />
					</div>
				</AlertDialogTrigger>
				<AlertDialogContent className="max-w-2xl p-6 gap-6 border-neutral-800">
					<AlertDialogHeader className="gap-2">
						<AlertDialogTitle className="text-3xl font-normal">
							Delete Lesson
						</AlertDialogTitle>
						<AlertDialogDescription className="text-base font-normal text-neutral-400">
							This lesson will be deleted, along with all of its Content,
							Student Progress, Comments, and Associated Data.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<div className="bg-red-950/30 border border-red-900/50 text-red-400 rounded-md p-4 text-sm">
						Warning: This action is not reversible. Please be certain.
					</div>

					<div className="space-y-6">
						<div className="space-y-3">
							<p className="text-sm text-neutral-400">
								Enter the lesson title{" "}
								<span className="text-neutral-200">{lesson.title}</span> to
								continue:
							</p>
							<Input
								value={moduleTitleInput}
								onChange={(e) => setModuleTitleInput(e.target.value)}
								className="bg-neutral-900 border-neutral-800 h-12"
							/>
						</div>

						<div className="space-y-3">
							<p className="text-sm text-neutral-400">
								To verify, type{" "}
								<span className="text-neutral-200">delete my lesson</span>{" "}
								below:
							</p>
							<Input
								value={currentText}
								onChange={(e) => setCurrentText(e.target.value)}
								className="bg-neutral-900 border-neutral-800 h-12"
							/>
						</div>
					</div>

					<form action={handleDelete}>
						<AlertDialogFooter className="gap-3 sm:gap-3">
							<AlertDialogCancel className="h-11 px-6 bg-transparent border-neutral-800 hover:bg-neutral-900 transition-colors">
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								type="submit"
								disabled={
									!doesTextMatch ||
									moduleTitleInput !== lesson.title ||
									isPending
								}
								className={cn(
									"h-11 px-6 bg-white text-black hover:bg-neutral-200 transition-colors",
									(!doesTextMatch ||
										moduleTitleInput !== lesson.title ||
										isPending) &&
										"opacity-50 cursor-not-allowed",
								)}
							>
								{isPending ? "Deleting..." : "Continue"}
							</AlertDialogAction>
						</AlertDialogFooter>
					</form>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
// -------------------------------------
// ChapterSection
// -------------------------------------
function ChapterSection({
	lessons,
	chapterTitle,
	chapterNumber,
	defaultOpen,
	currentLessonTitle,
	moduleId,
}: {
	lessons: {
		id: string;
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
	moduleId: string;
}) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(defaultOpen ?? false);
	const [moduleTitleInput, setModuleTitleInput] = useState("");
	const [currentText, setCurrentText] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);

	const doesTextMatch = useMemo(() => {
		return currentText.toLowerCase() === "delete my module";
	}, [currentText]);

	const handleDelete = async (formData: FormData) => {
		formData.append("moduleId", moduleId);

		const res = (await new Promise((resolve) => {
			startTransition(async () => {
				const res = await removeChapter(formData);
				resolve(res);
			});
		})) as { success: boolean };

		if (res.success) {
			toast.success("Chapter deleted successfully");
			router.refresh();
			setDialogOpen(false);
		} else {
			toast.error("Failed to delete chapter");
		}
	};

	return (
		<div className="mt-6">
			<HoverCard>
				<HoverCardTrigger>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="w-full flex items-center justify-between px-4 py-2 hover:bg-primary/5 transition-colors rounded-md group"
					>
						<div className="flex flex-col items-start max-w-[80%]">
							<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
								Chapter {chapterNumber}
							</span>

							<h2 className="text-sm font-semibold truncate w-full text-left group-hover:text-primary transition-colors">
								{chapterTitle}
							</h2>
						</div>
						<div>
							<ChevronDown className="w-4 h-4 text-muted-foreground" />
						</div>
					</button>
				</HoverCardTrigger>

				<HoverCardContent className="p-0" side="top">
					<AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
						<AlertDialogTrigger asChild>
							<Button variant="outline" className="w-full">
								Delete Chapter
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="max-w-2xl p-6 gap-6 border-neutral-800">
							<AlertDialogHeader className="gap-2">
								<AlertDialogTitle className="text-3xl font-normal">
									Delete Chapter
								</AlertDialogTitle>
								<AlertDialogDescription className="text-base font-normal text-neutral-400">
									This chapter will be deleted, along with all of its Lessons,
									Content, Student Progress, Comments, and Associated Data.
								</AlertDialogDescription>
							</AlertDialogHeader>

							<div className="bg-red-950/30 border border-red-900/50 text-red-400 rounded-md p-4 text-sm">
								Warning: This action is not reversible. Please be certain.
							</div>

							<div className="space-y-6">
								<div className="space-y-3">
									<p className="text-sm text-neutral-400">
										Enter the chapter title{" "}
										<span className="text-neutral-200">{chapterTitle}</span> to
										continue:
									</p>
									<Input
										value={moduleTitleInput}
										onChange={(e) => setModuleTitleInput(e.target.value)}
										className="bg-neutral-900 border-neutral-800 h-12"
									/>
								</div>

								<div className="space-y-3">
									<p className="text-sm text-neutral-400">
										To verify, type{" "}
										<span className="text-neutral-200">delete my module</span>{" "}
										below:
									</p>
									<Input
										value={currentText}
										onChange={(e) => setCurrentText(e.target.value)}
										className="bg-neutral-900 border-neutral-800 h-12"
									/>
								</div>
							</div>

							<form action={handleDelete}>
								<AlertDialogFooter className="gap-3 sm:gap-3">
									<AlertDialogCancel className="h-11 px-6 bg-transparent border-neutral-800 hover:bg-neutral-900 transition-colors">
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction
										type="submit"
										disabled={
											!doesTextMatch ||
											moduleTitleInput !== chapterTitle ||
											isPending
										}
										className={cn(
											"h-11 px-6 bg-white text-black hover:bg-neutral-200 transition-colors",
											(!doesTextMatch ||
												moduleTitleInput !== chapterTitle ||
												isPending) &&
												"opacity-50 cursor-not-allowed",
										)}
									>
										{isPending ? "Deleting..." : "Continue"}
									</AlertDialogAction>
								</AlertDialogFooter>
							</form>
						</AlertDialogContent>
					</AlertDialog>
				</HoverCardContent>
			</HoverCard>
			{isOpen && (
				<div className="mt-1 space-y-0.5 pl-4 overflow-hidden">
					<AddLessonButton moduleId={moduleId} />
					{lessons.map((lesson) => (
						<ChapterLesson
							key={lesson.slug}
							lesson={lesson}
							currentLessonTitle={currentLessonTitle}
						/>
					))}
				</div>
			)}
		</div>
	);
}

// -------------------------------------
// AddModuleButton
// -------------------------------------
function AddModuleButton({
	courseId,
	moduleCount,
}: {
	courseId: string;
	moduleCount: number;
}) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [open, setOpen] = useState(false);

	const handleSubmit = async (formData: FormData) => {
		// Add the order index to the form data
		formData.append("orderIndex", (moduleCount + 1).toString());
		formData.append("courseId", courseId);

		const res = (await new Promise((resolve) => {
			startTransition(async () => {
				const res = await addChapter(formData);
				resolve(res);
			});
		})) as { success: boolean };

		if (res.success) {
			toast.success("Chapter added successfully");
			router.refresh();
			setOpen(false);
		} else {
			toast.error("Failed to add chapter");
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="mt-0">
					<button className="w-full flex items-center justify-between px-4 bg-primary/5 transition-colors group py-4">
						<div className="flex flex-col items-start max-w-[80%]">
							<Tooltip>
								<TooltipTrigger asChild>
									<h2 className="text-sm font-semibold truncate w-full text-left group-hover:text-primary transition-colors">
										Add Chapter
									</h2>
								</TooltipTrigger>
								<TooltipContent side="right" sideOffset={10}>
									<p className="text-sm">Add Chapter</p>
								</TooltipContent>
							</Tooltip>
						</div>
						<div>
							<Plus className="w-4 h-4 text-muted-foreground" />
						</div>
					</button>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Chapter</DialogTitle>
					<DialogDescription>
						Add a new chapter to your course.
					</DialogDescription>
				</DialogHeader>
				<form action={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="title">Title</Label>
						<Input id="title" name="title" />
					</div>
					<div>
						<Label htmlFor="description">Description</Label>
						<Textarea id="description" name="description" />
					</div>

					<DialogFooter>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Adding..." : "Add Chapter"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

// -------------------------------------
// AddLessonButton
// -------------------------------------
function AddLessonButton({ moduleId }: { moduleId: string }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [open, setOpen] = useState(false);

	const handleSubmit = async (formData: FormData) => {
		formData.append("moduleId", moduleId);

		const res = (await new Promise((resolve) => {
			startTransition(async () => {
				const res = await addLesson(formData);
				resolve(res);
			});
		})) as { success: boolean };

		if (res.success) {
			toast.success("Lesson added successfully");
			router.refresh();
			setOpen(false);
		} else {
			toast.error("Failed to add lesson");
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="mr-3">
					<div
						className={cn(
							"group flex items-center justify-between w-full px-4 py-2.5 rounded-md transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
							"bg-primary/5",
						)}
					>
						<Tooltip>
							<TooltipTrigger asChild>
								<span className="truncate w-4/5 text-sm font-medium group-hover:text-primary">
									Add Lesson
								</span>
							</TooltipTrigger>
							<TooltipContent>
								<p className="text-sm">Add Lesson</p>
							</TooltipContent>

							<div className="flex items-center justify-center p-1.5 rounded-full">
								<Plus className="w-3.5 h-3.5 text-primary" />
							</div>
						</Tooltip>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Lesson</DialogTitle>
					<DialogDescription>
						Add a new lesson to your chapter.
					</DialogDescription>
				</DialogHeader>

				<form action={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="title">Title</Label>
						<Input id="title" name="title" />
					</div>
					<div>
						<Label htmlFor="description">Description</Label>
						<Textarea id="description" name="description" />
					</div>

					<DialogFooter>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Adding..." : "Add Lesson"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
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
	courseId,
}: {
	className?: string;
	courseTitle: string;
	currentModuleTitle?: string;
	currentLessonTitle?: string;
	courseId: string;
	courseModules: {
		id: string;
		lessons: {
			id: string;
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
				<div className="flex-shrink-0 border-b border-border p-4 hidden md:block">
					<Tooltip>
						<TooltipTrigger asChild>
							<Link href={`/content-studio/edit/${courseSlug}`}>
								<h1 className="text-xl font-bold w-full max-w-[250px] truncate">
									{courseTitle}
								</h1>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={10}>
							<p className="text-sm">{courseTitle}</p>
						</TooltipContent>
					</Tooltip>
				</div>

				{/* Tabs header */}
				<div className="flex-shrink-0 bg-background p-2 border-b border-border">
					<TabsList className="w-full">
						<TabsTrigger value="content" className="flex-1">
							Content
						</TabsTrigger>
						<TabsTrigger value="resources" className="flex-1">
							Resources
						</TabsTrigger>
					</TabsList>
				</div>

				{/* Tabs content */}
				<div className="flex-grow overflow-y-auto">
					<TabsContent value="content">
						<AddModuleButton
							courseId={courseId}
							moduleCount={courseModules.length}
						/>

						{courseModules?.map((moduleItem) => (
							<ChapterSection
								moduleId={moduleItem.id}
								key={moduleItem.id}
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
				</div>
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
	courseId,
}: {
	courseTitle: string;
	currentModuleTitle?: string;
	currentLessonTitle?: string;
	courseModules: {
		id: string;
		lessons: {
			id: string;
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
	courseId: string;
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
				<div className="fixed top-20 left-4 z-30">
					<Button variant="outline" className="w-10 h-10 md:hidden">
						<Menu className="w-full h-full" />
					</Button>
				</div>
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
					courseId={courseId}
					currentModuleTitle={currentModuleTitle}
					currentLessonTitle={currentLessonTitle}
				/>
			</DrawerContent>
		</Drawer>
	);
}
