import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

// Sample data (in a real app, this would come from your database)

const futureOfAviation = `Lorem ipsum dolor sit amet, *consectetur* adipisicing elit, sed do eiusmod tempor incididunt ut **labore et dolore magna aliqua**. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ***Duis aute irure dolor*** in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ~~Excepteur sint occaecat~~ cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## H2

Lorem ipsum dolor sit amet, *consectetur* adipisicing elit, sed do eiusmod tempor incididunt ut **labore et dolore magna aliqua**. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

---

***Duis aute irure dolor*** in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ~~Excepteur sint occaecat~~ cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### H3

unordered list:

* item-1
  * sub-item-1
  * sub-item-2
- item-2
  - sub-item-3
  - sub-item-4
+ item-3
  + sub-item-5
  + sub-item-6


ordered list:

1. item-1
   1. sub-item-1
   2. sub-item-2
2. item-2
   1. sub-item-3
   2. sub-item-4
3. item-3

#### Header4

Table Header-1 | Table Header-2 | Table Header-3
:--- | :---: | ---:
Table Data-1 | Table Data-2 | Table Data-3
TD-4 | Td-5 | TD-6
Table Data-7 | Table Data-8 | Table Data-9

##### Header5

You may also want some images right in here like ![GitHub Logo](https://cloud.githubusercontent.com/assets/5456665/13322882/e74f6626-dc00-11e5-921d-f6d024a01eaa.png "GitHub") - you can do that but I would recommend you to use the component "image" and simply split your text.

###### Header6

Let us do some links - this for example: https://github.com/MinhasKamal/github-markdown-syntax is **NOT** a link but this: is [GitHub](https://github.com/MinhasKamal/github-markdown-syntax)
`;

// Cache the marked configuration to avoid reconfiguring on every render
const configureMarked = () => {
	const renderer = new marked.Renderer();

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

const articles = [
	{
		id: 1,
		slug: "future-of-aviation",
		title: "The Future of Aviation",
		content: futureOfAviation,
		imageUrl: "https://picsum.photos/1600/2400",
		createdAt: "2023-05-15",
		category: "Aviation Technology",
		author: "Jane Doe",
	},
	{
		id: 2,
		slug: "top-10-pilot-training-tips",
		title: "Top 10 Pilot Training Tips",
		content:
			"Becoming a skilled pilot requires dedication, practice, and a commitment to continuous learning. Here are ten essential tips for aspiring pilots:\n\n1. Master the basics: Ensure you have a solid understanding of fundamental flight principles.\n2. Stay current with regulations: Aviation rules change frequently, so keep yourself updated.\n3. Practice emergency procedures regularly: Being prepared for unexpected situations is crucial.\n4. Develop strong communication skills: Clear communication with ATC and crew members is vital.\n5. Learn from experienced pilots: Seek mentorship and advice from seasoned aviators.\n6. Use flight simulators: They're excellent tools for practicing procedures and decision-making.\n7. Focus on situational awareness: Always know your aircraft's position, fuel state, and surrounding traffic.\n8. Prioritize physical and mental health: Flying demands peak performance, so take care of yourself.\n9. Study weather patterns: Understanding meteorology is crucial for safe flight planning.\n10. Embrace new technologies: Familiarize yourself with modern avionics and navigation systems.\n\nRemember, becoming an excellent pilot is a journey, not a destination. Keep learning, stay humble, and always prioritize safety.",
		imageUrl: "https://picsum.photos/1600/2400",
		createdAt: "2023-05-10",
		category: "Pilot Training",
		author: "John Smith",
	},
	{
		id: 3,
		slug: "aviation-safety-innovations",
		title: "Aviation Safety Innovations",
		content: futureOfAviation,
		imageUrl: "https://picsum.photos/1600/2400",
		createdAt: "2023-05-10",
		category: "Aviation Safety",
		author: "John Smith",
	},
	{
		id: 4,
		slug: "the-history-of-commercial-flight",
		title: "The History of Commercial Flight",
		content: futureOfAviation,
		imageUrl: "https://picsum.photos/1600/2400",
		createdAt: "2023-05-10",
		category: "Aviation History",
		author: "John Smith",
	},
	{
		id: 5,
		slug: "sustainable-aviation-the-green-future",
		title: "Sustainable Aviation: The Green Future",
		content: futureOfAviation,
		imageUrl: "https://picsum.photos/1600/2400",
		createdAt: "2023-05-10",
		category: "Sustainable Aviation",
		author: "John Smith",
	},
];

export default async function ArticlePage({
	params,
}: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug;
	const article = articles.find((a) => a.slug === slug);

	if (!article) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-800">
			<div className="container mx-auto px-4 py-12">
				<article className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden relative">
					<div className="relative">
						<Link
							href="/blog"
							className="absolute top-5 left-5 inline-flex items-center transition-colors mb-8 z-20"
						>
							<Button>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Blog
							</Button>
						</Link>
						<Image
							src={article.imageUrl}
							alt={article.title}
							width={1600}
							height={900}
							className="w-full h-[400px] object-cover"
						/>
						<div className="bottom-0 left-8 absolute z-50 text-white">
							<h1 className="text-4xl font-bold text-white mb-4">
								{article.title}
							</h1>
							<div className="flex items-center text-neutral-400 mb-8">
								<span className="font-medium">{article.author}</span>
								<span className="mx-2">•</span>
								<span>
									{format(new Date(article.createdAt), "MMMM d, yyyy")}
								</span>
								<span className="mx-2">•</span>
								<span className="bg-primary/10 text-neutral-400 px-2 py-1 rounded-full text-sm">
									{article.category}
								</span>
							</div>
						</div>
						<div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black/90" />
					</div>
					<div className="p-8 ">
						<div className="prose dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900">
							<div
								dangerouslySetInnerHTML={{ __html: marked(article.content) }}
							/>
						</div>
					</div>
				</article>
			</div>
		</div>
	);
}
