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
import LessonContentContainer from "@/components/Course/LessonContentContainer";

export const experimental_ppr = false;

// Cache the marked configuration to avoid reconfiguring on every render
const configureMarked = () => {
	const renderer = new marked.Renderer();

	renderer.heading = ({ tokens, depth }) => {
		const text = tokens
			.filter((token) => token.type === "text")
			.map((token) => (token as { text: string }).text)
			.join("");
		const id = slugify(text);

		const headingClasses = {
			2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
			3: "scroll-m-20 text-2xl font-semibold tracking-tight",
		};

		return depth in headingClasses
			? `<h${depth} id="${id}" class="${
					headingClasses[depth as keyof typeof headingClasses]
				}">${text}</h${depth}>`
			: `<h${depth}>${text}</h${depth}>`;
	};

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
};

// Configure marked once at module level
configureMarked();

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
	try {
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
	} catch (error) {
		console.error("Error generating metadata:", error);
		return {
			title: "AviatorJonah | Course",
			description: "AviatorJonah | Course",
		};
	}
}

function extractSections(content: string): string[] {
	if (!content) {
		return [];
	}

	// Split content into lines and process each line
	const lines = content.split("\n");
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

const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.trim()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // Remove diacritics
		.replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/-+/g, "-") // Remove consecutive hyphens
		.replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
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

	const currentModule = course?.modules?.find((module) =>
		module.lessons?.some((lesson) => lesson.slug === lessonSlug),
	);

	const moduleSlug = currentModule?.slug as string | undefined;
	const currentLesson = currentModule?.lessons?.find(
		(lesson) => lesson.slug === lessonSlug,
	);

	const lessonTitle = currentLesson?.title || "";
	const content = currentLesson?.content || "";
	const sections = extractSections(content);

	return (
		<LessonContentContainer>
			<LeftSidebar
				course={course}
				courseSlug={courseSlug}
				moduleSlug={moduleSlug}
				lessonSlug={lessonSlug}
			/>
			<div className="relative w-full overflow-x-hidden">
				<div className="px-4 md:px-10 py-5 prose dark:prose-invert max-w-full prose-headings:text-primary prose-strong:text-primary prose-a:text-primary prose-a:underline prose-a:decoration-primary prose-a:decoration-2 prose-a:underline-offset-4 prose-a:decoration-offset-4 prose-a:hover:text-primary/80 prose-a:hover:decoration-primary/80 prose-a:hover:no-underline prose-h1:font-bold dark:prose-p:text-white/80 dark:prose-li:text-white/80 prose-pre:overflow-x-auto prose-img:rounded-xl">
					<h1 className="text-4xl font-bold">{lessonTitle}</h1>
					<ErrorBoundary
						fallback={
							<div className="text-red-500">Error loading lesson content</div>
						}
					>
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
		</LessonContentContainer>
	);
}

export default CoursePage;
