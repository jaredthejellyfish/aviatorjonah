import { getCourseBySlug } from "@/utils/helpers/getCourseBySlug";
import React from "react";
import SlugClient from "./slug-client";

type Props = {
  params: Promise<{ slug: string }>;
};

async function ViewCourse({ params }: Props) {
  const slug = (await params).slug;
  const course = await getCourseBySlug(slug);
  return <SlugClient course={course} />;
}

export default ViewCourse;
