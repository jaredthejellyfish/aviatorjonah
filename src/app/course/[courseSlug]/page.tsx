import React from "react";
import LeftSidebar from "@/components/Course/sidebar";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";
import Content from "./content";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getCourseBySlug } from "@/utils/helpers/getCourseBySlug";

type Props = {
  params: Promise<{ courseSlug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const courseSlug = (await params).courseSlug;

  // fetch data
  const course = await getCourseBySlug(courseSlug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: course?.title
      ? `AviatorJonah | ${course.title}`
      : "AviatorJonah | Course",
    description: course?.description
      ? `${course.description.slice(0, 150)}...`
      : "AviatorJonah | Course",
    openGraph: {
      images: [course?.image ?? "", ...previousImages],
    },
  };
}

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
        instructor={course.instructor_name ?? ""}
        modules={course.modules}
        courseSlug={courseSlug}
      />
    </div>
  );
}

export default CoursePage;
