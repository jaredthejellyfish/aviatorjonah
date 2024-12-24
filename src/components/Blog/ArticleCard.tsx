import Link from "next/link";
import Image from "next/image";

interface Article {
	id: number;
	title: string;
	excerpt: string;
	imageUrl: string;
	category?: string;
	slug: string;
	createdAt: string;
}

interface ArticleCardProps {
	article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Link
			href={`/blog/article/${article.slug}`}
			className="relative overflow-hidden rounded-lg shadow-lg"
		>
			<Image
				src={article.imageUrl}
				alt={article.title}
				width={300}
				height={200}
				className="w-full h-48 object-cover"
			/>
			<div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity hover:bg-opacity-75">
				<div className="absolute bottom-0 left-0 right-0 p-4">
					{article.category && (
						<span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
							{article.category}
						</span>
					)}
					<h3 className="text-lg font-bold text-white mt-2 mb-2">
						{article.title}
					</h3>
					<p className="text-sm text-gray-300 mb-4 line-clamp-2">
						{article.excerpt}
					</p>
					<div className="flex justify-between items-center">
						<span className="text-xs text-gray-400">{article.createdAt}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
