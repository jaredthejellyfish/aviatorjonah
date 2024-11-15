import React from "react";
import LeftSidebar from "@/components/Course/sidebar";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";
import Content from "./content";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ courseSlug: string }>;
};

async function CoursePage({ params }: Props) {
  const courseSlug = (await params).courseSlug;

  const course = await getCourseBySlugWithProgress(courseSlug);

  if (!course) {
    return notFound();
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] grid-cols-1">
      <LeftSidebar course={course} courseSlug={courseSlug} />
      <Content
        title={course.title}
        instructor={course.instructor}
        modules={course.modules}
        courseSlug={courseSlug}
      />
    </div>
  );
}

export default CoursePage;
