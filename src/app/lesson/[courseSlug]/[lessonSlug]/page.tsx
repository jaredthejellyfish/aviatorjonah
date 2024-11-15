import Sections from "@/components/Course/sections";
import LeftSidebar from "@/components/Course/sidebar";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { HTMLAttributes, DetailedHTMLProps } from "react";

type Props = {
  params: Promise<{
    courseSlug: string;
    lessonSlug: string;
  }>;
};

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

function extractSections(content: string) {
  if (!content) {
    return [];
  }

  const h2Regex = /##\s*(.*?)(?:\n|$)/g;
  const matches = Array.from(content.matchAll(h2Regex));

  const sections = matches.map((match) => match[1].trim().replace(/^#+/, ""));

  return sections;
}

const components = {
  h2: ({ children, ...props }: HeadingProps) => {
    const id = children!
      .toString()
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: HeadingProps) => {
    const id = children!
      .toString()
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    );
  },
};

async function CoursePage({ params }: Props) {
  const courseSlug = (await params).courseSlug;
  const lessonSlug = (await params).lessonSlug;

  const course = await getCourseBySlugWithProgress(courseSlug);

  if (!course) {
    return notFound();
  }

  const moduleSlug = course?.modules?.find((module) =>
    module.lessons?.some((lesson) => lesson.slug === lessonSlug),
  )?.slug as string | undefined;

  const lessonTitle =
    course?.modules
      ?.find((module) => module.slug === moduleSlug)
      ?.lessons?.find((lesson) => lesson.slug === lessonSlug)?.title ?? "";

  const content =
    course?.modules
      ?.find((module) => module.slug === moduleSlug)
      ?.lessons?.find((lesson) => lesson.slug === lessonSlug)?.content ?? "";

  const sections = extractSections(content);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr_250px] ">
      <LeftSidebar
        course={course}
        courseSlug={courseSlug}
        moduleSlug={moduleSlug}
        lessonSlug={lessonSlug}
      />
      <div className="w-full !max-w-none md:px-10 px-4 py-5 prose prose-headings:text-primary prose-strong:text-primary prose-a:text-primary prose-a:underline prose-a:decoration-primary prose-a:decoration-2 prose-a:underline-offset-4 prose-a:decoration-offset-4 prose-a:hover:text-primary/80 prose-a:hover:decoration-primary/80 prose-a:hover:no-underline prose-h1:font-bold dark:prose-p:text-white/80 dark:prose-li:text-white/80">
        <h1 className="text-4xl font-bold">{lessonTitle}</h1>
        <MDXRemote source={content} components={components} />
      </div>

      <Sections sections={sections} />
    </div>
  );
}

export default CoursePage;
