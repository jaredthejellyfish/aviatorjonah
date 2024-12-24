import ArticleCard from "@/components/Blog/ArticleCard";
import RecommendedArticles from "@/components/Blog/RecommendedArticles";

const sampleArticles = [
	{
		id: 1,
		title: "The Future of Aviation",
		excerpt: "Exploring upcoming trends in the aviation industry.",
		imageUrl: "https://picsum.photos/800/1200",
		createdAt: "2023-05-15",
		category: "Aviation Technology",
		slug: "future-of-aviation",
	},
	{
		id: 2,
		title: "Top 10 Pilot Training Tips",
		excerpt: "Essential tips for aspiring pilots to improve their skills.",
		imageUrl: "https://picsum.photos/800/1200",
		createdAt: "2023-05-10",
		category: "Pilot Training",
		slug: "top-10-pilot-training-tips",
	},
	{
		id: 3,
		title: "Aviation Safety Innovations",
		excerpt: "New technologies enhancing air travel safety.",
		imageUrl: "https://picsum.photos/800/1200",
		createdAt: "2023-05-05",
		category: "Aviation Safety",
		slug: "aviation-safety-innovations",
	},
	{
		id: 4,
		title: "The History of Commercial Flight",
		excerpt: "A journey through the evolution of commercial aviation.",
		imageUrl: "https://picsum.photos/800/1200",
		createdAt: "2023-04-30",
		category: "Aviation History",
		slug: "the-history-of-commercial-flight",
	},
	{
		id: 5,
		title: "Sustainable Aviation: The Green Future",
		excerpt: "How the aviation industry is working towards sustainability.",
		imageUrl: "https://picsum.photos/800/1200",
		createdAt: "2023-04-25",
		category: "Sustainable Aviation",
		slug: "sustainable-aviation-the-green-future",
	},
];

export default function BlogPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Recommended Articles</h2>
				<RecommendedArticles articles={sampleArticles.slice(0, 3)} />
			</section>

			<section>
				<h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sampleArticles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
			</section>
		</div>
	);
}
