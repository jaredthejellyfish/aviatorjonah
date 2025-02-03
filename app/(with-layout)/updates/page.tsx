// app/updates/page.tsx
import { Suspense } from "react";
import PostItem from "./post-item";
import { client } from "@/lib/sanity-client";

export const metadata = {
	title: "AviatorJonah | Updates",
	description: "Latest updates from AviatorJonah",
};

// Types
interface Author {
	name: string;
	image: string;
	role?: string;
}

interface UpdateType {
	id: string;
	title: string;
	slug: string;
	publishedAt: string;
	excerpt?: string;
	category?: string;
	imageUrl?: string | null;
	author?: Author;
}

interface UpdatesPageProps {
	searchParams: Promise<{
		page?: string;
	}>;
}

interface PaginationButtonProps {
	href?: string;
	disabled?: boolean;
	children: React.ReactNode;
}

// Constants
const POSTS_PER_PAGE = 9;
const REVALIDATION_TIME = 30;

// Sanity Queries
const POSTS_COUNT_QUERY = `count(*[
  _type == "post" 
  && defined(slug.current)
  && !(_id in path('drafts.**'))
  && publishedAt <= now()
])`;

const createPostsQuery = (page: number): string => `*[
  _type == "post" 
  && defined(slug.current)
  && !(_id in path('drafts.**'))
  && publishedAt <= now()
][${(page - 1) * POSTS_PER_PAGE}...${page * POSTS_PER_PAGE}] {
  "id": _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "category": categories[0]->title,
  "imageUrl": select(
    defined(image.asset) => image.asset->url,
    null
  ),
  "author": author-> {
    name,
    "image": image.asset->url,
    role
  }
} | order(publishedAt desc)`;

// Components
function PostsSkeleton(): JSX.Element {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{[...Array(6)].map((_, i) => (
				<div
					key={i}
					className="rounded-xl bg-navy-800/50 backdrop-blur-sm p-4 border border-blue-500/10"
				>
					<div className="aspect-video rounded-lg bg-blue-900/20 animate-pulse mb-4" />
					<div className="space-y-3">
						<div className="h-4 w-24 bg-blue-900/30 rounded animate-pulse" />
						<div className="h-8 w-full bg-blue-900/30 rounded animate-pulse" />
						<div className="h-16 w-full bg-blue-900/30 rounded animate-pulse" />
					</div>
				</div>
			))}
		</div>
	);
}

function ErrorMessage({ message }: { message: string }): JSX.Element {
	return (
		<div className="rounded-xl border border-red-500/20 bg-red-950/10 backdrop-blur-sm p-6 text-red-300 text-center">
			<p className="text-lg font-medium">{message}</p>
		</div>
	);
}

function PaginationButton({
	href,
	disabled,
	children,
}: PaginationButtonProps): JSX.Element {
	const baseClasses =
		"inline-flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200";
	const activeClasses =
		"bg-blue-600/20 border border-blue-500/20 text-white hover:bg-blue-600/30 hover:border-blue-500/30";
	const disabledClasses =
		"bg-navy-800/50 border border-navy-700/50 text-navy-300 opacity-50 cursor-not-allowed";

	if (disabled || !href) {
		return (
			<span className={`${baseClasses} ${disabledClasses}`}>{children}</span>
		);
	}

	return (
		<a href={href} className={`${baseClasses} ${activeClasses}`}>
			{children}
		</a>
	);
}

async function PostsList({ page }: { page: number }): Promise<JSX.Element> {
	const options = { next: { revalidate: REVALIDATION_TIME } };

	try {
		const [totalPosts, posts] = await Promise.all([
			client.fetch<number>(POSTS_COUNT_QUERY, {}, options),
			client.fetch<UpdateType[]>(createPostsQuery(page), {}, options),
		]);

		const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

		if (!posts.length) {
			return (
				<div className="rounded-xl border border-blue-500/20 bg-navy-800/50 backdrop-blur-sm p-6 text-white text-center">
					<p className="text-lg font-medium">No updates found</p>
				</div>
			);
		}

		return (
			<>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts.map((post) => (
						<PostItem key={post.id} {...post} />
					))}
				</div>

				{totalPages > 1 && (
					<nav
						className="mt-12 flex items-center justify-center gap-4"
						aria-label="Pagination"
					>
						<PaginationButton
							href={page > 1 ? `?page=${page - 1}` : undefined}
							disabled={page <= 1}
						>
							<span className="mr-2">←</span> Previous
						</PaginationButton>

						<span className="px-4 text-white/80">
							Page {page} of {totalPages}
						</span>

						<PaginationButton
							href={page < totalPages ? `?page=${page + 1}` : undefined}
							disabled={page >= totalPages}
						>
							Next <span className="ml-2">→</span>
						</PaginationButton>
					</nav>
				)}
			</>
		);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return (
			<ErrorMessage message="Failed to load updates. Please try again later." />
		);
	}
}

export default async function Updates({
	searchParams,
}: UpdatesPageProps): Promise<JSX.Element> {
	const page = Number((await searchParams).page) || 1;

	return (
		<>
			<section className="relative min-h-screen bg-gradient-to-b from-navy-950 to-navy-900">
				{/* Subtle background pattern */}
				<div className="absolute inset-0 opacity-20">
					<div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(29,78,216,0.1),transparent)]" />
					<div
						className="absolute inset-0 opacity-50"
						style={{
							backgroundImage:
								"radial-gradient(circle at center, rgba(29,78,216,0.08) 2px, transparent 2px)",
							backgroundSize: "24px 24px",
						}}
					/>
				</div>

				{/* Content container */}
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="pt-48 pb-20">
						{/* Page header */}
						<div className="text-center max-w-3xl mx-auto mb-16">
							<h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
								Latest Updates
							</h1>
							<p className="text-lg md:text-xl text-white/80 font-light">
								Stay informed about the latest developments and announcements
								from AviatorJonah
							</p>
						</div>

						{/* Updates content */}
						<div>
							<Suspense fallback={<PostsSkeleton />}>
								<PostsList page={page} />
							</Suspense>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
