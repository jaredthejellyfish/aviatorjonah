import React from "react";
import LeftSidebar from "@/components/Course/sidebar";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";

type Props = {
  params: Promise<{ courseSlug: string }>;
};

async function CoursePage({ params }: Props) {
  const courseSlug = (await params).courseSlug;

  const course = await getCourseBySlugWithProgress(courseSlug);

  console.log(JSON.stringify(course, null, 2));

  const formattedCourseModules = course?.modules?.map((moduleItem, index) => ({
    
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
    chapterNumber: index + 1, // assuming the order is sequential by index
  }));

  return (
    <div className="grid md:h-[calc(100vh-64px)] md:grid-cols-[300px_1fr_250px] grid-cols-1">

        <LeftSidebar
          courseTitle={course?.title ?? ""}
          courseModules={formattedCourseModules ?? []}
        />
      {courseSlug}
    </div>
  );
}

export default CoursePage;
