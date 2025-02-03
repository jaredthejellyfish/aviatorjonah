export default function Loading(): JSX.Element {
	return (
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
					{/* Page header skeleton */}
					<div className="text-center max-w-3xl mx-auto mb-16">
						<div className="h-12 w-64 bg-blue-900/30 rounded animate-pulse mx-auto mb-6" />
						<div className="h-6 w-96 bg-blue-900/30 rounded animate-pulse mx-auto" />
					</div>

					{/* Posts grid skeleton */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(9)].map((_, i) => (
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
				</div>
			</div>
		</section>
	);
}
