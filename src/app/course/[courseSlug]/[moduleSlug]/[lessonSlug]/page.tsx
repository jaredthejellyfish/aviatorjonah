import Sections from "@/components/Course/sections";
import LeftSidebar from "@/components/Course/sidebar";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";
import { MDXRemote } from "next-mdx-remote/rsc";
type Props = {
  params: Promise<{
    courseSlug: string;
    moduleSlug: string;
    lessonSlug: string;
  }>;
};

function extractSections(content: string) {
  // If content is empty or undefined, return empty array
  if (!content) {
    console.log("Content is empty");
    return [];
  }

  console.log("Content:", content); // Debug log

  // Match all level 2 headings (##) in the markdown content
  // Modified regex to be more flexible with spaces and newlines
  const h2Regex = /##\s*(.*?)(?:\n|$)/g;
  const matches = Array.from(content.matchAll(h2Regex));

  console.log("Matches found:", matches); // Debug log

  // Extract just the heading text (without the ##)
  const sections = matches.map((match) => match[1].trim().replace(/^#+/, ""));

  console.log("Extracted sections:", sections); // Debug log

  return sections;
}

const components = {
  h2: ({ children }: { children: React.ReactNode }) => {
    const id = children!
      .toString()
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Remove consecutive hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }: { children: React.ReactNode }) => {
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
    return <h3 id={id}>{children}</h3>;
  },
};

async function CoursePage({ params }: Props) {
  const courseSlug = (await params).courseSlug;
  const moduleSlug = (await params).moduleSlug;
  const lessonSlug = (await params).lessonSlug;

  const course = await getCourseBySlugWithProgress(courseSlug);

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
      <div className="w-full !max-w-none px-10 py-5 prose prose-headings:text-primary prose-strong:text-primary prose-a:text-primary prose-a:underline prose-a:decoration-primary prose-a:decoration-2 prose-a:underline-offset-4 prose-a:decoration-offset-4 prose-a:hover:text-primary/80 prose-a:hover:decoration-primary/80 prose-a:hover:no-underline prose-h1:font-bold dark:prose-p:text-white/80 dark:prose-li:text-white/80">
        <h1 className="text-4xl font-bold">{lessonTitle}</h1>
        <MDXRemote source={content} components={components} />
      </div>

      <Sections sections={sections} />
    </div>
  );
}

export default CoursePage;
