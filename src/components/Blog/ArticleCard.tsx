"use client";

import { motion } from "motion/react";
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
		<Link href={`/blog/article/${article.slug}`}>
			<motion.div 
				className="relative overflow-hidden rounded-lg shadow-lg"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.3 }}
			>
				<Image
					src={article.imageUrl}
					alt={article.title}
					width={300}
					height={200}
					className="w-full h-48 object-cover"
				/>
				<motion.div 
					className="absolute inset-0 bg-black"
					initial={{ opacity: 0.6 }}
					whileHover={{ opacity: 0.75 }}
					transition={{ duration: 0.2 }}
				>
					<div className="absolute bottom-0 left-0 right-0 p-4">
						{article.category && (
							<motion.span 
								className="text-xs font-semibold text-blue-300 uppercase tracking-wider"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
							>
								{article.category}
							</motion.span>
						)}
						<motion.h3 
							className="text-lg font-bold text-white mt-2 mb-2"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							{article.title}
						</motion.h3>
						<motion.p 
							className="text-sm text-gray-300 mb-4 line-clamp-2"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							{article.excerpt}
						</motion.p>
						<motion.div 
							className="flex justify-between items-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							<span className="text-xs text-gray-400">{article.createdAt}</span>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>
		</Link>
	);
}
