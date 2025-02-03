import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import type { Update } from "types/update";

export default function UpdateCard({ update }: { update: Update }) {
	return (
		<Link
			href={`/updates/${update.slug.current}`}
			className="group relative bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl"
		>
			<div className="aspect-video relative">
				<Image
					src={update.mainImage.asset.url}
					alt={update.title}
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
			</div>
			<div className="p-6 space-y-4">
				<div className="flex items-center gap-2">
					{update.categories.map((category) => (
						<span
							key={category.title}
							className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium"
						>
							{category.title}
						</span>
					))}
				</div>
				<h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
					{update.title}
				</h3>
				<p className="text-gray-400 line-clamp-2">{update.excerpt}</p>
				<time className="text-sm text-gray-500">
					{format(new Date(update.publishedAt), "MMMM d, yyyy")}
				</time>
			</div>
		</Link>
	);
}
