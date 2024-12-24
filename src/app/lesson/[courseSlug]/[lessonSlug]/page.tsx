import CompleteLesson from "@/components/Course/CompleteLesson";
import Sections from "@/components/Course/sections";
import LeftSidebar from "@/components/Course/sidebar";
import { getCourseBySlug } from "@/utils/helpers/getCourseBySlug";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";
import { Metadata, ResolvingMetadata } from "next";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { notFound } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  params: Promise<{
    courseSlug: string;
    lessonSlug: string;
  }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const courseSlug = (await params).courseSlug;
  const course = await getCourseBySlug(courseSlug);
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

function extractSections(content: string) {
  if (!content) {
    return [];
  }

  // Split content into lines and process each line
  const lines = content.split('\n');
  const sections: string[] = [];
  
  for (const line of lines) {
    // Match any line that starts with ## (allowing for optional spaces before and after)
    const match = line.match(/^\s*##\s+([^#].*?)\s*$/);
    if (match) {
      const sectionTitle = match[1].trim();
      // Only add non-empty section titles
      if (sectionTitle) {
        sections.push(sectionTitle);
      }
    }
  }

  return sections;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

  // Configure marked with custom renderer
  const renderer = new marked.Renderer();

  // Custom heading renderer
  renderer.heading = ({ tokens, depth }) => {
    const text = tokens
      .filter((token) => token.type === "text")
      .map((token) => (token as { text: string }).text)
      .join("");
    const id = slugify(text);

    if (depth === 2) {
      return `<h2 id="${id}" class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">${text}</h2>`;
    }

    if (depth === 3) {
      return `<h3 id="${id}" class="scroll-m-20 text-2xl font-semibold tracking-tight">${text}</h3>`;
    }

    return `<h${depth}>${text}</h${depth}>`;
  };

  // Configure marked with syntax highlighting and custom renderer
  marked.use(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
    {
      renderer,
      gfm: true,
      breaks: true,
    },
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr_250px]">
      <LeftSidebar
        course={course}
        courseSlug={courseSlug}
        moduleSlug={moduleSlug}
        lessonSlug={lessonSlug}
      />
      <div className="relative w-full overflow-x-hidden">
        <div className="px-4 md:px-10 py-5 prose dark:prose-invert max-w-full prose-headings:text-primary prose-strong:text-primary prose-a:text-primary prose-a:underline prose-a:decoration-primary prose-a:decoration-2 prose-a:underline-offset-4 prose-a:decoration-offset-4 prose-a:hover:text-primary/80 prose-a:hover:decoration-primary/80 prose-a:hover:no-underline prose-h1:font-bold dark:prose-p:text-white/80 dark:prose-li:text-white/80 prose-pre:overflow-x-auto prose-img:rounded-xl">
          <h1 className="text-4xl font-bold">{lessonTitle}</h1>
          <ErrorBoundary fallback={<div>Error loading lesson</div>}>
            <div
              dangerouslySetInnerHTML={{
                __html: marked(content),
              }}
            />
          </ErrorBoundary>
          <CompleteLesson course={course} currentLessonSlug={lessonSlug} />
        </div>
      </div>

      <Sections sections={sections} />
    </div>
  );
}

export default CoursePage;
