import { notFound } from "next/navigation";
import Image from "next/image";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

import { format } from "date-fns";
import PageModal from "@/components/PageModal";
import BackButton from "@/components/BackButton";
import { client } from "@/sanity/lib/client";
import PlaceHolderImage from "@/public/placeholder.svg";
import { PortableText } from "next-sanity";
// Sample data (in a real app, this would come from your database)

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
	  defined(mainImage.asset) => mainImage.asset->url,
	  null
	),
	"categories": categories[]->title,
	"author": author-> {
	  "name": name,
	  "image": image.asset->url
	}
  }`;
  
  type PostWithImageUrl = {
	  id: string;
	  title: string;
	  slug: string;
	  publishedAt: string;
	  excerpt: string;
	  imageUrl: string | null;
	  categories: string[];
	  body: Record<string, string>;
	  author: {
		  name: string;
		  image: string;
	  };
  };

const options = { next: { revalidate: 0 } };

async function ArticleModalContent({ slug }: { slug: string }) {
	const article = await client.fetch<PostWithImageUrl>(
		POST_QUERY,
		{ slug },
		options,
	);

	if (!article) {
		notFound();
	}

	return (
		<article className="rounded-lg overflow-hidden relative">
			<div className="relative rounded-lg">
				<BackButton />
				<Image
					src={article.imageUrl ?? PlaceHolderImage}
					alt={article.title}
					width={1600}
					height={900}
					className="w-full h-[400px] object-cover "
				/>
				<div className="bottom-0 left-8 absolute z-50">
					<h1 className="text-4xl font-bold text-white mb-4">
						{article.title}
					</h1>
					<div className="flex items-center text-neutral-400 mb-8">
						<span className="font-medium">{article.author.name}</span>
						<span className="mx-2">•</span>
						<span>{format(new Date(article.publishedAt), "MMMM d, yyyy")}</span>
						<span className="mx-2">•</span>
						<span className="bg-primary/10 text-neutral-400 px-2 py-1 rounded-full text-sm">
							{article.categories.join(", ")}
						</span>
					</div>
				</div>
				<div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black/90" />
			</div>
			<div className="p-8 ">
				<div className="prose dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900">
					{Array.isArray(article.body) && <PortableText value={article.body} />}
				</div>
			</div>
		</article>
	);
}
export default async function ArticlePage({
	params,
}: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug;
	return (
		<PageModal showCloseButton={false} className="dark:bg-neutral-800 p-0">
			<ArticleModalContent slug={slug} />
		</PageModal>
	);
}
