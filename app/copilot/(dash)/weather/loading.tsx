import { Cloud, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AirportSearch from "@/components/copilot/weather/airport-search";

export default function WeatherLoading() {
	return (
		<div className="space-y-6 p-3 md:p-0">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div className="flex flex-col items-start justify-center">
					<h2 className="text-2xl font-semibold text-slate-200">
						<Skeleton className="h-8 w-64" />
					</h2>
					<div className="text-slate-400 text-sm">
						<Skeleton className="h-4 w-48" />
					</div>
				</div>
				<div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
					<div className="w-full md:w-[300px]">
						<AirportSearch />
					</div>
					<div className="flex items-center gap-2">
						<Skeleton className="w-16 h-16 rounded-lg" />
						<div className="text-right">
							<Skeleton className="h-8 w-16 mb-1" />
							<Skeleton className="h-4 w-24" />
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Primary Weather Info */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium text-slate-300">
							Current Conditions
						</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Feels Like</p>
								<Skeleton className="h-6 w-16 mt-1" />
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Wind</p>
								<Skeleton className="h-6 w-24 mt-1" />
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Visibility</p>
								<Skeleton className="h-6 w-20 mt-1" />
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Ceiling</p>
								<Skeleton className="h-6 w-20 mt-1" />
							</div>
						</div>
					</div>

					{/* Additional Details */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium text-slate-300">Details</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Temperature Range</p>
								<Skeleton className="h-6 w-24 mt-1" />
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Humidity</p>
								<Skeleton className="h-6 w-16 mt-1" />
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Pressure</p>
								<Skeleton className="h-6 w-24 mt-1" />
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Sun Times</p>
								<div className="flex flex-row items-center gap-x-3">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-4 w-16" />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Aviation Weather Section */}
				<div className="mt-6 space-y-4">
					<h3 className="text-lg font-medium text-slate-300">
						Aviation Weather
					</h3>

					{/* METAR and TAF */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<div className="flex justify-between items-center mb-2">
								<p className="text-sm text-slate-400">METAR</p>
								<Skeleton className="h-5 w-24 rounded-full" />
							</div>
							<Skeleton className="h-4 w-full" />
						</div>
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<div className="flex justify-between items-center mb-2">
								<p className="text-sm text-slate-400">TAF</p>
								<span className="text-xs text-blue-400 px-2 py-1 rounded-full bg-blue-400/10">
									24HR Forecast
								</span>
							</div>
							<Skeleton className="h-4 w-full" />
						</div>
					</div>

					{/* Flight Conditions Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<p className="text-sm text-slate-400">Flight Category</p>
							<div className="text-lg font-medium flex items-center">
								<Skeleton className="h-3 w-3 rounded-full mr-2" />
								<Skeleton className="h-6 w-16" />
							</div>
							<Skeleton className="h-4 w-32 mt-1" />
						</div>
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<p className="text-sm text-slate-400">Wind</p>
							<Skeleton className="h-6 w-24 mt-1" />
						</div>
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<p className="text-sm text-slate-400">Temperature/Dewpoint</p>
							<Skeleton className="h-6 w-24 mt-1" />
						</div>
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<p className="text-sm text-slate-400">Altimeter</p>
							<Skeleton className="h-6 w-24 mt-1" />
						</div>
					</div>

					{/* Warnings and NOTAMs */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* NOTAMs Section */}
						<div className="bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center space-x-2">
									<AlertTriangle className="w-5 h-5 text-amber-500" />
									<p className="text-sm font-medium text-amber-500">
										Active NOTAMs
									</p>
								</div>
								<Skeleton className="h-5 w-24 rounded-full" />
							</div>

							<div className="space-y-3">
								<div className="p-4 bg-amber-500/5 rounded-lg border border-amber-500/20">
									<div className="flex items-center gap-2 mb-2">
										<Skeleton className="h-5 w-16 rounded" />
										<Skeleton className="h-4 w-12" />
									</div>
									<Skeleton className="h-20 w-full" />
									<div className="mt-2">
										<Skeleton className="h-4 w-48" />
									</div>
								</div>
								<Button
									variant="ghost"
									className="w-full mt-2 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 text-xs"
									disabled
								>
									<Skeleton className="h-4 w-24" />
									<ChevronRight className="h-4 w-4 ml-2" />
								</Button>
							</div>
						</div>

						{/* Weather Advisories Section */}
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center space-x-2">
									<Cloud className="w-5 h-5 text-slate-400" />
									<p className="text-sm font-medium text-slate-300">
										Weather Advisories
									</p>
								</div>
								<Skeleton className="h-5 w-24 rounded-full" />
							</div>
							<div className="space-y-3">
								<div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
									<div className="flex items-center gap-2 mb-2">
										<Skeleton className="h-5 w-16 rounded" />
										<Skeleton className="h-5 w-16 rounded" />
										<Skeleton className="h-4 w-8" />
									</div>
									<Skeleton className="h-20 w-full" />
									<div className="mt-2">
										<Skeleton className="h-4 w-48" />
									</div>
									<div className="mt-1">
										<Skeleton className="h-4 w-32" />
									</div>
								</div>

								<Button
									variant="ghost"
									size="sm"
									className="text-slate-400 hover:text-slate-300 hover:bg-slate-600/50 py-2 w-full mt-2"
									disabled
								>
									<Skeleton className="h-4 w-24" />
									<ChevronRight className="h-4 w-4 ml-1" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-4 text-xs text-slate-400 text-right">
				Last updated: <Skeleton className="h-4 w-24 inline-block" />
			</div>
		</div>
	);
}
