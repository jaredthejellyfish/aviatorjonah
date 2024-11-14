"use client";

import dynamic from "next/dynamic";
import { SidebarContent } from "./sidebar-client";
import { Course } from "@/utils/helpers/getCourseBySlugWithProgress";

const DrawerSidebar = dynamic(
  () => import("./sidebar-client").then((mod) => mod.DrawerSidebar),
  {
    ssr: false,
  }
);

export default function LeftSidebar({
  course,
  courseSlug,
  moduleSlug,
  lessonSlug,
}: {
  course: Course;
  courseSlug: string;
  moduleSlug?: string;
  lessonSlug?: string;
}) {
  const courseModules = course?.modules
    ?.map((moduleItem, index) => ({
      lessons: moduleItem.lessons.map((lesson) => ({
        title: lesson.title ?? "",
        completed:
          lesson.progress?.some((progressEntry) => progressEntry.completed) ??
          false,
        slug: lesson.slug ?? "",
        moduleSlug: moduleItem.slug ?? "",
        courseSlug: courseSlug ?? "",
      })),
      chapterTitle: moduleItem.title ?? "",
      chapterNumber: index + 1, // assuming the order is sequential by index
    }))
    .sort((a, b) => (a.chapterNumber ?? 0) - (b.chapterNumber ?? 0));

  const currentModuleTitle =
    course?.modules?.find((module) => module.slug === moduleSlug)?.title ?? "";

  const currentLessonTitle =
    course?.modules
      ?.find((module) => module.slug === moduleSlug)
      ?.lessons?.find((lesson) => lesson.slug === lessonSlug)?.title ?? "";

  const courseTitle = course?.title ?? "";

  return (
    <div>
      <SidebarContent
        className="hidden md:block sticky top-16"
        courseTitle={courseTitle}
        courseModules={courseModules ?? []}
        currentModuleTitle={currentModuleTitle}
        currentLessonTitle={currentLessonTitle}
      />

      <DrawerSidebar
        courseTitle={courseTitle}
        courseModules={courseModules ?? []}
        currentModuleTitle={currentModuleTitle}
        currentLessonTitle={currentLessonTitle}
      />
    </div>
  );
}
