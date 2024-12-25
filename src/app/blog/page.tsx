import ArticleCard from "@/components/Blog/ArticleCard";
import RecommendedArticles from "@/components/Blog/RecommendedArticles";
import { client } from "@/utils/sanity/client";

const POSTS_QUERY = `*[
  _type == "post" 
  && defined(slug.current)
  && !(_id in path('drafts.**'))
  && publishedAt <= now()
][0...12] {
  "id": _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "imageUrl": select(
    defined(mainImage.asset) => mainImage.asset->url,
    null
  ),
  "categories": categories[]->title
} | order(publishedAt desc)`;

const options = { next: { revalidate: 60 } };

type PostWithImageUrl = {
	id: string;
	title: string;
	slug: string;
	publishedAt: string;
	excerpt: string;
	imageUrl: string | null;
	categories: string[];
};

export default async function BlogPage() {
	const posts = await client.fetch<PostWithImageUrl[]>(
		POSTS_QUERY,
		{},
		options,
	);

	return (
		<div className="container mx-auto px-4 py-8">
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Recommended Articles</h2>
				<RecommendedArticles articles={posts.slice(0, 3)} />
			</section>

			<section>
				<h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
			</section>
		</div>
	);
}
