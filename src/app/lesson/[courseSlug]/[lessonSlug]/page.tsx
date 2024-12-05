import Sections from "@/components/Course/sections";
import LeftSidebar from "@/components/Course/sidebar";
import { Button } from "@/components/ui/button";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { HTMLAttributes, DetailedHTMLProps } from "react";
import Link from "next/link";

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

  if (!courseSlug || !lessonSlug) {
    return notFound();
  }

  const course = await getCourseBySlugWithProgress(courseSlug);

  if (!course) {
    return notFound();
  }

  const moduleSlug = course?.modules?.find((module) =>
    module.lessons?.some((lesson) => lesson.slug === lessonSlug)
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

  const currentModuleIndex = course?.modules?.findIndex(
    (module) => module.slug === moduleSlug
  );

  const currentLessonIndex = course?.modules?.[
    currentModuleIndex
  ]?.lessons?.findIndex((lesson) => lesson.slug === lessonSlug);

  const nextLesson =
    course?.modules?.[currentModuleIndex]?.lessons?.[currentLessonIndex + 1];
  const nextModule = course?.modules?.[currentModuleIndex + 1];

  const getNextDestination = () => {
    if (nextLesson) {
      return {
        href: `/lesson/${courseSlug}/${nextLesson.slug}`,
        text: `Next: ${nextLesson.title}`,
      };
    }
    if (nextModule?.lessons?.[0]) {
      return {
        href: `/lesson/${courseSlug}/${nextModule.lessons[0].slug}`,
        text: `Next Module: ${nextModule.title}`,
      };
    }
    return {
      href: `/course/${courseSlug}`,
      text: "Course Complete! 🎉",
    };
  };

  const nextDestination = getNextDestination();

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
        <div className="mt-10 bg-black/5 dark:bg-black/20 p-6 w-full rounded-lg flex flex-col items-start gap-2">
          <p className="text-sm text-muted-foreground">
            {nextDestination.text === "Course Complete! 🎉"
              ? "Congratulations! You've completed all lessons."
              : "Continue your learning journey"}
          </p>
          <Button
            size="lg"
            className="w-full sm:w-auto dark:text-black text-white"
            asChild
          >
            <Link href={nextDestination.href}>{nextDestination.text}</Link>
          </Button>
        </div>
      </div>

      <Sections sections={sections} />
    </div>
  );
}

export default CoursePage;
