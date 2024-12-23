import React from "react";
import LeftSidebar from "@/components/CreatorStudio/Sidebar";
import { notFound } from "next/navigation";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";
import LessonEditor from "@/components/CreatorStudio/LessonEditor";

type Props = {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
};

async function EditLessonPage({ params }: Props) {
  const { courseSlug, lessonSlug } = await params;
  const course = await getCourseBySlugWithProgress(courseSlug);

  if (!course) {
    return notFound();
  }

  const moduleSlug = course?.modules?.find((module) =>
    module.lessons?.some((lesson) => lesson.slug === lessonSlug),
  )?.slug;

  const currentLesson = course?.modules
    ?.find((module) => module.slug === moduleSlug)
    ?.lessons?.find((lesson) => lesson.slug === lessonSlug);

  if (!currentLesson) {
    return notFound();
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] grid-cols-1">
      <LeftSidebar
        course={course}
        courseSlug={courseSlug}
        moduleSlug={moduleSlug || undefined}
        lessonSlug={lessonSlug}
      />

      <LessonEditor
        initialContent={currentLesson.content || ""}
        lessonId={currentLesson.id}
        lessonSlug={lessonSlug}
        courseSlug={courseSlug}
        lessonTitle={currentLesson.title}
      />
    </div>
  );
}

export default EditLessonPage;
