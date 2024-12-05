"use client";

import dynamic from "next/dynamic";
import { SidebarContent } from "./sidebar-client";
import { Course } from "@/utils/helpers/getCourseBySlugWithProgress";

const DrawerSidebar = dynamic(
  () => import("./sidebar-client").then((mod) => mod.DrawerSidebar),
  {
    ssr: false,
  },
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
      })),
    chapterTitle: moduleItem.title ?? "",
    chapterNumber: moduleItem.order_index,
  }));

  const currentModuleTitle =
    course?.modules?.find((module) => module.slug === moduleSlug)?.title ?? "";

  const currentLessonTitle =
    course?.modules
      ?.find((module) => module.slug === moduleSlug)
      ?.lessons?.find((lesson) => lesson.slug === lessonSlug)?.title ?? "";

  const courseTitle = course?.title ?? "";

  const courseModules = courseModulesUnsorted?.sort(
    (a, b) => (a.chapterNumber ?? 0) - (b.chapterNumber ?? 0),
  );

  return (
    <div>
      <SidebarContent
        className="hidden md:block sticky top-16"
        courseTitle={courseTitle}
        courseModules={courseModules ?? []}
        currentModuleTitle={currentModuleTitle}
        currentLessonTitle={currentLessonTitle}
        courseSlug={courseSlug}
      />

      <DrawerSidebar
        courseTitle={courseTitle}
        courseModules={courseModules ?? []}
        currentModuleTitle={currentModuleTitle}
        currentLessonTitle={currentLessonTitle}
        courseSlug={courseSlug}
      />
    </div>
  );
}
