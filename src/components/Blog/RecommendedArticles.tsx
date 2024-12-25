import Link from "next/link";
import Image from "next/image";
import PlaceHolderImage from "@/public/placeholder.svg";

type PostWithImageUrl = {
	id: string;
	title: string;
	slug: string;
	publishedAt: string;
	excerpt: string;
	imageUrl: string | null;
	categories: string[];
};

interface RecommendedArticlesProps {
	articles: PostWithImageUrl[];
}

export default function RecommendedArticles({
	articles,
}: RecommendedArticlesProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[calc(100vh-400px)]">
			{articles.map((article, index) => (
				<Link
					href={`/blog/article/${article.slug}`}
					key={article.id}
					className={`relative overflow-hidden rounded-lg shadow-lg ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
				>
					<Image
						src={article.imageUrl ?? PlaceHolderImage}
						alt={article.title}
						width={index === 0 ? 600 : 300}
						height={index === 0 ? 400 : 200}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity hover:bg-opacity-75">
						<div className="absolute bottom-0 left-0 right-0 p-4">
							<span className="text-xs font-semibold text-aviatorjonah-300 uppercase tracking-wider">
								{article.categories.join(", ")}
							</span>
							<h3 className="text-lg md:text-xl font-bold text-white mt-2 mb-2">
								{article.title}
							</h3>
							<p className="text-sm text-gray-300 mb-4 line-clamp-2">
								{article.excerpt}
							</p>
							<div className="flex justify-between items-center">
								<span className="text-xs text-gray-400">
									{article.publishedAt}
								</span>
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
