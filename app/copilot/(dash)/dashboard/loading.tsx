import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Plane,
	Cloud,
	ExternalLink,
	Bell,
	IdCard,
	Newspaper,
} from "lucide-react";

export default function DashboardLoading() {
	return (
		<div className="min-h-screen w-full p-4 sm:p-6">
			<div className="w-full space-y-6 max-w-[1800px] mx-auto">
				{/* Header */}
				<div className="space-y-1">
					<Skeleton className="h-8 w-64 bg-slate-700/50" />
					<Skeleton className="h-5 w-96 bg-slate-700/50" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
					{/* Last Flight Card */}
					<Card className="bg-white/5 backdrop-blur-lg border-slate-700/30">
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<Plane className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
								<span className="text-lg sm:text-xl">Last Flight</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="space-y-4">
								{[...Array(4)].map((_, i) => (
									<div
										key={i}
										className="flex items-center justify-between text-sm"
									>
										<Skeleton className="h-4 w-20 bg-slate-600/50" />
										<Skeleton className="h-4 w-32 bg-slate-600/50" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Currency Card */}
					<Card className="bg-white/5 backdrop-blur-lg border-slate-700/30">
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<IdCard className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
								<span className="text-lg sm:text-xl">Currency Status</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="space-y-4">
								{[...Array(4)].map((_, i) => (
									<div
										key={i}
										className="p-3 rounded-lg bg-white/5 border border-slate-700/30"
									>
										<div className="flex items-center justify-between text-sm">
											<Skeleton className="h-4 w-24 bg-slate-600/50" />
											<Skeleton className="h-4 w-32 bg-slate-600/50" />
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Weather Card */}
					<Card className="bg-white/5 backdrop-blur-lg border-slate-700/30">
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<Cloud className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
								<span className="text-lg sm:text-xl">Weather</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="grid grid-cols-2 gap-4">
								{[...Array(4)].map((_, i) => (
									<div
										key={i}
										className="p-3 sm:p-4 rounded-lg bg-white/5 border border-slate-700/30"
									>
										<Skeleton className="h-4 w-24 mb-2 bg-slate-600/50" />
										<Skeleton className="h-6 w-20 bg-slate-600/50" />
									</div>
								))}
								<div className="flex-row w-full block">
									<Skeleton className="h-4 w-24 mb-1 bg-slate-600/50" />
									<Skeleton className="h-4 w-40 bg-slate-600/50" />
								</div>
							</div>
						</CardContent>
					</Card>

					{/* NOTAMs */}
					<Card className="md:col-span-3 bg-white/5 backdrop-blur-lg border-slate-700/30">
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<Bell className="h-5 w-5 sm:h-6 sm:w-6 text-rose-400" />
								<span className="text-lg sm:text-xl">NOTAMs Center</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="space-y-4">
								{[...Array(2)].map((_, i) => (
									<div
										key={i}
										className="p-4 rounded-lg bg-white/5 border border-slate-700/30"
									>
										<div className="flex items-center space-x-2 mb-2">
											<Skeleton className="h-5 w-5 bg-slate-600/50" />
											<Skeleton className="h-5 w-32 bg-slate-600/50" />
										</div>
										<Skeleton className="h-4 w-full bg-slate-600/50" />
										<Skeleton className="h-4 w-3/4 mt-2 bg-slate-600/50" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Quick Links */}
					<Card className="md:col-span-2 bg-white/5 backdrop-blur-lg border-slate-700/30">
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-violet-400" />
								<span className="text-lg sm:text-xl">Quick Links</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{[...Array(4)].map((_, i) => (
									<div
										key={i}
										className="p-4 rounded-lg bg-white/5 border border-slate-700/30"
									>
										<Skeleton className="h-5 w-40 mb-2 bg-slate-600/50" />
										<Skeleton className="h-4 w-full bg-slate-600/50" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Latest News */}
					<Card className="md:col-span-1 bg-white/5 backdrop-blur-lg border-slate-700/30">
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<Newspaper className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
								<span className="text-lg sm:text-xl">Latest News</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="space-y-4">
								{[...Array(2)].map((_, i) => (
									<div
										key={i}
										className="p-4 rounded-lg bg-white/5 border border-slate-700/30"
									>
										<div className="flex items-center justify-between mb-2">
											<Skeleton className="h-4 w-24 bg-slate-600/50" />
											<Skeleton className="h-4 w-16 bg-slate-600/50" />
										</div>
										<Skeleton className="h-5 w-full mb-2 bg-slate-600/50" />
										<Skeleton className="h-4 w-full bg-slate-600/50" />
										<Skeleton className="h-4 w-3/4 mt-1 bg-slate-600/50" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
