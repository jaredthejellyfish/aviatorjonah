export default function Loading(): JSX.Element {
	return (
		<div className="relative">
			{/* Elegant blue gradient background */}
			<div
				className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square"
				aria-hidden="true"
			>
				<div className="absolute inset-0 translate-z-0 bg-blue-600 rounded-full blur-[120px] opacity-20" />
				<div className="absolute w-64 h-64 translate-z-0 bg-blue-500 rounded-full blur-[80px] opacity-40" />
			</div>

			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="pt-32 md:pt-40">
					<div className="md:flex md:justify-between">
						{/* Main content */}
						<div className="md:grow pb-12 md:pb-20">
							<article>
								<div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-16">
									{/* Back button skeleton */}
									<div className="shrink-0">
										<div className="sticky top-6">
											<div className="w-9 h-9 rounded-full bg-slate-800 animate-pulse" />
										</div>
									</div>

									{/* Content skeleton */}
									<div className="grow">
										{/* Header skeleton */}
										<header className="mb-8">
											<div className="mb-3">
												<div className="h-4 w-24 bg-blue-800/50 rounded animate-pulse" />
											</div>
											<div className="h-12 w-3/4 bg-blue-800/50 rounded animate-pulse" />
											{/* Author skeleton */}
											<div className="flex items-center mt-4">
												<div className="w-8 h-8 rounded-full bg-blue-800/50 animate-pulse mr-3" />
												<div className="h-4 w-32 bg-blue-800/50 rounded animate-pulse" />
											</div>
										</header>

										{/* Featured image skeleton */}
										<div className="mb-8">
											<div className="relative bg-slate-700/20 border border-slate-300/10 rounded-2xl overflow-hidden">
												<div className="w-full h-[380px] bg-blue-800/50 animate-pulse" />
											</div>
										</div>

										{/* Content skeleton */}
										<div className="space-y-6">
											{[...Array(6)].map((_, i) => (
												<div
													key={i}
													className="h-4 w-full bg-blue-800/50 rounded animate-pulse"
												/>
											))}
											<div className="h-4 w-3/4 bg-blue-800/50 rounded animate-pulse" />
											{[...Array(4)].map((_, i) => (
												<div
													key={`p2-${i}`}
													className="h-4 w-full bg-blue-800/50 rounded animate-pulse"
												/>
											))}
										</div>

										{/* Categories skeleton */}
										<div className="mt-8 flex gap-2">
											{[...Array(3)].map((_, i) => (
												<div
													key={`cat-${i}`}
													className="h-6 w-20 bg-blue-900/30 rounded-full animate-pulse"
												/>
											))}
										</div>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
