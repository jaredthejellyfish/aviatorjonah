// sidebar.tsx (Server Component)
import { Course } from "@/utils/helpers/getCourseBySlugWithProgress";
import dynamic from "next/dynamic";

// Import only the named export you need for the server component (non-interactive part)
import { SidebarContent } from "./sidebar-client";

/**
 * Dynamically import the DrawerSidebar client component.
 * We disable SSR here to ensure it only renders on the client.
 */
const DrawerSidebar = dynamic(() =>
	import("./sidebar-client").then((mod) => mod.DrawerSidebar),
);

interface LeftSidebarProps {
	course: Course;
	courseSlug: string;
	moduleSlug?: string;
	lessonSlug?: string;
}

export default function LeftSidebar({
	course,
	courseSlug,
	moduleSlug,
	lessonSlug,
}: LeftSidebarProps) {
	const courseModulesUnsorted = course?.modules?.map((moduleItem) => ({
		lessons: moduleItem.lessons
			.sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
			.map((lesson) => ({
				title: lesson.title ?? "",
				completed:
					lesson.progress?.some((progressEntry) => progressEntry.completed) ??
					false,
				slug: lesson.slug ?? "",
				moduleSlug: moduleItem.slug ?? "",
				courseSlug: courseSlug ?? "",
				id: lesson.id ?? "",
			})),
		chapterTitle: moduleItem.title ?? "",
		chapterNumber: moduleItem.order_index,
		id: moduleItem.id ?? "",
	}));

	const currentModuleTitle =
		course?.modules?.find((m) => m.slug === moduleSlug)?.title ?? "";

	const currentLessonTitle =
		course?.modules
			?.find((m) => m.slug === moduleSlug)
			?.lessons?.find((l) => l.slug === lessonSlug)?.title ?? "";

	// Sort modules by their order
	const courseModules = courseModulesUnsorted?.sort(
		(a, b) => (a.chapterNumber ?? 0) - (b.chapterNumber ?? 0),
	);

	if (!course) {
		return null;
	}

	return (
		<div>
			{/* Sidebar (visible on md+ screens) */}
			<SidebarContent
				className="hidden md:block sticky top-16"
				courseTitle={course.title ?? ""}
				courseModules={courseModules ?? []}
				currentModuleTitle={currentModuleTitle}
				currentLessonTitle={currentLessonTitle}
				courseSlug={courseSlug}
				courseId={course.id}
			/>

			{/* DrawerSidebar (mobile-friendly) */}
			<DrawerSidebar
				courseTitle={course.title ?? ""}
				courseModules={courseModules ?? []}
				currentModuleTitle={currentModuleTitle}
				currentLessonTitle={currentLessonTitle}
				courseSlug={courseSlug}
				courseId={course.id}
			/>
		</div>
	);
}
