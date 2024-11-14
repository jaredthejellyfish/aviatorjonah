import React from "react";
import LeftSidebar from "@/components/Course/sidebar";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";

type Props = {
  params: Promise<{ courseSlug: string }>;
};

async function CoursePage({ params }: Props) {
  const courseSlug = (await params).courseSlug;

  const course = await getCourseBySlugWithProgress(courseSlug);

  return (
    <div className="grid md:h-[calc(100vh-64px)] md:grid-cols-[300px_1fr_250px] grid-cols-1">
      <LeftSidebar course={course} courseSlug={courseSlug} />
      {courseSlug}
    </div>
  );
}

export default CoursePage;
