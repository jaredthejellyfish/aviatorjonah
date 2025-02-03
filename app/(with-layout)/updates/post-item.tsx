import Image from "next/image";
import PostDate from "@/components/post-date";
import Link from "next/link";

interface Author {
	name: string;
	image?: string;
	role?: string;
}

interface PostItemProps {
	slug: string;
	title: string;
	publishedAt: string;
	excerpt?: string;
	imageUrl?: string | null;
	category?: string;
	author?: Author;
}

function AuthorAvatar({ author }: { author: Author }) {
	return (
		<div className="flex items-center">
			{author.image ? (
				<div className="relative w-6 h-6 mr-2">
					<Image
						src={author.image}
						alt={author.name}
						fill
						className="rounded-full object-cover border border-blue-500/20"
						sizes="24px"
					/>
				</div>
			) : (
				<div className="w-6 h-6 mr-2 rounded-full bg-blue-900/60 border border-blue-500/20 flex items-center justify-center">
					<span className="text-xs font-medium text-white">
						{author.name.charAt(0)}
					</span>
				</div>
			)}
			<div className="flex flex-col">
				<span className="text-sm font-medium text-white">{author.name}</span>
				{author.role && (
					<span className="text-xs text-white/60">{author.role}</span>
				)}
			</div>
		</div>
	);
}

export default function PostItem({
	slug,
	title,
	publishedAt,
	excerpt,
	imageUrl,
	category,
	author,
}: PostItemProps) {
	return (
		<Link
			href={`/updates/update/${slug}`}
			className="group block relative rounded-xl bg-navy-800/50 backdrop-blur-sm border border-blue-500/10 overflow-hidden hover:border-blue-500/20 transition-all duration-300"
		>
			{/* Image Container */}
			<div className="aspect-video relative overflow-hidden">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={title}
						fill
						className="object-cover transform transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				) : (
					<div className="w-full h-full bg-blue-900/20" />
				)}
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-transparent" />

				{/* Category Badge */}
				{category && (
					<span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium text-white bg-blue-900/60 backdrop-blur-sm rounded-full border border-blue-500/20">
						{category}
					</span>
				)}
			</div>

			{/* Content */}
			<div className="p-6">
				{/* Author and Date Row */}
				<div className="flex items-center justify-between mb-4">
					{author && <AuthorAvatar author={author} />}
					<time className="text-sm text-white/70 font-light">
						<PostDate dateString={publishedAt} />
					</time>
				</div>

				{/* Title */}
				<h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-200 transition-colors duration-200">
					{title}
				</h2>

				{/* Excerpt */}
				<p className="text-white/70 line-clamp-3 text-sm font-light">
					{excerpt}
				</p>

				{/* Read More Link */}
				<div className="mt-4 flex items-center text-white text-sm font-medium group-hover:text-blue-200 transition-colors duration-200">
					Read More
					<svg
						className="w-4 h-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</div>
			</div>

			{/* Hover Effects */}
			<div className="absolute inset-0 border-2 border-blue-500/0 rounded-xl transition-all duration-300 group-hover:border-blue-500/20" />
			<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-blue-500/5 via-transparent to-blue-500/5" />
		</Link>
	);
}
