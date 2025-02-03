import { Skeleton } from "@/components/ui/skeleton";
import { Search, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DocsLoading() {
	return (
		<div className="space-y-6 p-3 md:p-0">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div className="flex flex-col items-start justify-center">
					<h2 className="text-2xl font-semibold text-slate-200">Documents</h2>
					<p className="text-slate-400 text-sm">
						Manage your aviation documentation
					</p>
				</div>
			</div>

			<div className="space-y-6">
				{/* Search and Filter Section */}
				<div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
					<div className="relative w-full md:w-2/3">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
						<Input
							placeholder="Search documents..."
							className="pl-10 bg-slate-700/50 border-slate-600/50 text-slate-200 w-full"
							disabled
						/>
					</div>
					<div className="w-full md:w-auto">
						<Button
							className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white gap-2"
							disabled
						>
							<Upload className="h-4 w-4" />
							Upload Document
						</Button>
					</div>
				</div>

				{/* Documents List */}
				<div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg">
					<div className="p-4">
						<h3 className="text-lg font-medium text-slate-200 px-2">
							Recent Documents
						</h3>
					</div>

					<div className="divide-y divide-slate-700/50">
						{[...Array(5)].map((_, i) => (
							<div
								key={i}
								className="p-4 hover:bg-slate-700/30 transition-colors"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-start space-x-4">
										{/* Document Icon */}
										<div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
											<Skeleton className="h-6 w-6" />
										</div>

										{/* Document Info */}
										<div>
											<Skeleton className="h-5 w-48 mb-2" />
											<div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-0.5 my-2">
												<Skeleton className="h-4 w-24" />
												<Skeleton className="h-4 w-32" />
											</div>
											<div className="mt-2 flex flex-wrap gap-2">
												<Skeleton className="h-6 w-24 rounded-full" />
												<Skeleton className="h-6 w-32 rounded-full" />
												<Skeleton className="h-6 w-20 rounded-full" />
											</div>
										</div>
									</div>

									{/* Actions */}
									<div className="flex items-center gap-2">
										<Skeleton className="h-9 w-9 rounded-lg" />
										<Skeleton className="h-9 w-9 rounded-lg" />
										<Skeleton className="h-9 w-9 rounded-lg" />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
