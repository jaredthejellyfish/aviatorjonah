import { client } from "@/lib/sanity-client";
import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import PostDate from "@/components/post-date";

export async function generateMetadata({
	params,
}: { params: Promise<{ slug: string }> }) {
	const post = await client.fetch(POST_QUERY, { slug: (await params).slug });
	return {
		title: `AviatorJonah | ${post.title}`,
		description: post.excerpt || "",
	};
}

type Author = {
	name: string;
	image: string;
};

type ExtendedUpdateType = {
	id: string;
	title: string;
	slug: string;
	publishedAt: string;
	excerpt: string;
	imageUrl: string | null;
	body: TypedObject | TypedObject[];
	categories?: string[];
	author?: Author;
};

type Props = {
	params: Promise<{ slug: string }>;
};

const REVALIDATION_TIME = 30;

// Queries remain the same
const POST_QUERY = `*[
  _type == "post" 
  && slug.current == $slug 
  && !(_id in path('drafts.**'))
][0] {
  "id": _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body,
  "imageUrl": select(
    defined(image.asset) => image.asset->url,
    null
  ),
  "categories": categories[]->title,
  "author": author-> {
    "name": name,
    "image": image.asset->url
  }
}`;

function BackButton() {
	return (
		<Link
			className="flex items-center justify-center w-9 h-9 group border border-transparent rounded-full [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none hover:scale-105 transition-transform duration-150"
			href="/updates"
			aria-label="Go back to updates"
		>
			<svg
				className="w-4 h-4 fill-blue-500"
				viewBox="0 0 16 16"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
			</svg>
		</Link>
	);
}

function ArticleSkeleton() {
	return (
		<article>
			<div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-16">
				{/* Back button skeleton */}
				<div className="shrink-0">
					<div className="sticky top-6">
						<div className="w-9 h-9 rounded-full bg-slate-800 animate-pulse" />
					</div>
				</div>

				{/* Content skeleton */}
				<div className="grow">
					{/* Header skeleton */}
					<header className="mb-8">
						<div className="mb-3">
							<div className="h-4 w-24 bg-blue-800/50 rounded animate-pulse" />
						</div>
						<div className="h-12 w-3/4 bg-blue-800/50 rounded animate-pulse" />
						{/* Author skeleton */}
						<div className="flex items-center mt-4">
							<div className="w-8 h-8 rounded-full bg-blue-800/50 animate-pulse mr-3" />
							<div className="h-4 w-32 bg-blue-800/50 rounded animate-pulse" />
						</div>
					</header>

					{/* Featured image skeleton */}
					<div className="mb-8">
						<div className="relative bg-slate-700/20 border border-slate-300/10 rounded-2xl overflow-hidden">
							<div className="w-full h-[380px] bg-blue-800/50 animate-pulse" />
						</div>
					</div>

					{/* Content skeleton */}
					<div className="space-y-6">
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="h-4 w-full bg-blue-800/50 rounded animate-pulse"
							/>
						))}
						<div className="h-4 w-3/4 bg-blue-800/50 rounded animate-pulse" />
						{[...Array(4)].map((_, i) => (
							<div
								key={`p2-${i}`}
								className="h-4 w-full bg-blue-800/50 rounded animate-pulse"
							/>
						))}
					</div>

					{/* Categories skeleton */}
					<div className="mt-8 flex gap-2">
						{[...Array(3)].map((_, i) => (
							<div
								key={`cat-${i}`}
								className="h-6 w-20 bg-blue-900/30 rounded-full animate-pulse"
							/>
						))}
					</div>
				</div>
			</div>
		</article>
	);
}

function NotFound() {
	return (
		<div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-slate-100">Update not found</h1>
				<p className="mt-4 text-lg text-slate-400">
					The update you&apos;re looking for doesn&apos;t exist or has been
					removed.
				</p>
				<Link
					href="/updates"
					className="mt-8 inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
				>
					<span className="tracking-normal hover:-translate-x-0.5 transition-transform duration-150 ease-in-out mr-1">
						←
					</span>{" "}
					Back to Updates
				</Link>
			</div>
		</div>
	);
}

async function ArticleContent({ article }: { article: ExtendedUpdateType }) {
	return (
		<article>
			<div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-16">
				{/* Back button */}
				<div className="shrink-0">
					<div className="sticky top-6">
						<BackButton />
					</div>
				</div>

				{/* Content */}
				<div className="grow">
					{/* Header */}
					<header className="mb-8">
						{/* Post date */}
						<div className="mb-3">
							<time className="text-sm inline-flex items-center text-blue-200/90">
								<PostDate dateString={article.publishedAt} />
							</time>
						</div>
						{/* Title */}
						<h1 className="h1 inline-flex bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
							{article.title}
						</h1>
						{/* Author */}
						{article.author && (
							<div className="flex items-center mt-4">
								{article.author.image && (
									<Image
										className="rounded-full mr-3"
										src={article.author.image}
										width={32}
										height={32}
										alt={`Avatar of ${article.author.name}`}
									/>
								)}
								<div className="text-sm text-slate-300 font-medium">
									{article.author.name}
								</div>
							</div>
						)}
					</header>

					{/* Featured image */}
					{article.imageUrl && (
						<figure className="mb-8">
							<div className="relative bg-slate-700/20 border border-slate-300/10 rounded-2xl overflow-hidden">
								<Image
									className="w-full max-h-[380px] object-cover"
									src={article.imageUrl}
									width={720}
									height={480}
									alt={`Featured image for ${article.title}`}
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 via-transparent to-slate-900/10" />
							</div>
						</figure>
					)}

					{/* Content */}
					<div className="prose max-w-none text-slate-400 prose-headings:text-slate-50 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-50 prose-strong:font-medium prose-blockquote:pl-5 prose-blockquote:border-l-2 prose-blockquote:border-blue-500 prose-blockquote:font-medium prose-blockquote:text-slate-300 prose-blockquote:italic">
						<PortableText value={article.body} />
					</div>

					{/* Categories */}
					{article.categories && article.categories.length > 0 && (
						<div className="mt-8">
							<div className="flex flex-wrap gap-2">
								{article.categories.map((category: string) => (
									<span
										key={`category-${category}`}
										className="inline-flex px-3 py-1 text-xs font-medium text-blue-400 bg-blue-900/30 rounded-full"
									>
										{category}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</article>
	);
}

async function PostContent({ slug }: { slug: string }) {
	try {
		const options = { next: { revalidate: REVALIDATION_TIME } };
		const article = await client.fetch<ExtendedUpdateType>(
			POST_QUERY,
			{ slug },
			options,
		);

		if (!article) {
			return <NotFound />;
		}

		return <ArticleContent article={article} />;
	} catch (error) {
		console.error("Error fetching article:", error);
		return (
			<div className="text-center text-red-400">
				Failed to load the article. Please try again later.
			</div>
		);
	}
}

// Main component
async function UpdatePage({ params }: Props) {
	const slug = (await params).slug;

	await new Promise((resolve) => setTimeout(resolve, 1000));

	return (
		<div className="relative">
			{/* Elegant blue gradient background */}
			<div
				className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square"
				aria-hidden="true"
			>
				<div className="absolute inset-0 translate-z-0 bg-blue-600 rounded-full blur-[120px] opacity-20" />
				<div className="absolute w-64 h-64 translate-z-0 bg-blue-500 rounded-full blur-[80px] opacity-40" />
			</div>

			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pt-32 md:pt-40">
					<div className="md:flex md:justify-between">
						{/* Main content */}
						<div className="md:grow pb-12 md:pb-20">
							<Suspense fallback={<ArticleSkeleton />}>
								<PostContent slug={slug} />
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UpdatePage;
