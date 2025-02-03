"use client";

import { Input } from "@/components/ui/input";
import { Search, Loader2, ArrowRight, X } from "lucide-react";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useLogbookSearch } from "@/hooks/useLogbook";
import type { FlightEntry } from "@/hooks/useLogbook";
import { transformFlightEntry } from "@/lib/utils/transform-flight-entries";
import { debounce } from "lodash";
import dynamic from "next/dynamic";

const ViewFlightModal = dynamic(() => import("./ViewFlightModal"), {
	ssr: false,
});

export function LogbookSearch() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFlight, setSelectedFlight] = useState<FlightEntry | null>(
		null,
	);
	const { searchResults, isLoading, performSearch } = useLogbookSearch();

	const debouncedSearch = useMemo(
		() =>
			debounce(async (query: string) => {
				await performSearch(query);
			}, 300),
		[performSearch],
	);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	const handleSearch = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const query = e.target.value;
			setSearchQuery(query);
			debouncedSearch(query);
		},
		[debouncedSearch],
	);

	const handleFlightSelect = (entry: (typeof searchResults)[0]) => {
		setSelectedFlight({
			...entry,
			registration: entry.aircraft_registration,
			status: "completed",
			clerk_user_id: "",
			created_at: new Date().toISOString(),
		} as FlightEntry);
	};

	const transformedResults = useMemo(
		() => searchResults.map((entry) => transformFlightEntry(entry)),
		[searchResults],
	);

	const showResults =
		searchQuery.trim() && (transformedResults.length > 0 || isLoading);

	return (
		<div className="relative">
			<div className="relative w-full md:w-[300px]">
				{isLoading && (
					<Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 z-20 animate-spin" />
				)}
				{!isLoading && !searchQuery.trim() && (
					<Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 z-20" />
				)}
				{!isLoading && searchQuery.trim() && (
					<X
						className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 z-30 cursor-pointer"
						onClick={() => setSearchQuery("")}
					/>
				)}
				<Input
					placeholder="Search your logbook entries"
					className="w-full bg-slate-800/90 backdrop-blur-sm z-0 border-slate-700/50 text-slate-200 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 h-10 pr-9"
					value={searchQuery}
					onChange={handleSearch}
				/>
			</div>

			{showResults && (
				<div className="absolute right-0 top-[calc(100%+0.5rem)] w-full md:w-[400px] max-h-[500px] overflow-y-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-2xl z-50">
					<div className="p-3">
						{transformedResults.length > 0 ? (
							<div className="space-y-2">
								{searchResults.map((entry) => (
									<div
										key={entry.id}
										className="bg-slate-800/50 rounded-lg p-3 hover:bg-slate-800/80 transition-colors cursor-pointer group"
										onClick={() => handleFlightSelect(entry)}
									>
										<div className="flex items-center justify-between mb-2">
											<span className="text-slate-200 font-medium group-hover:text-purple-400 transition-colors">
												{entry.aircraft_type}
											</span>
											<span className="text-slate-400 text-sm">
												{entry.date}
											</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<div className="flex items-center gap-2">
												<span className="text-slate-300">
													{entry.departure_airport}
												</span>
												<ArrowRight className="h-3.5 w-3.5 text-slate-500" />
												<span className="text-slate-300">
													{entry.arrival_airport}
												</span>
											</div>
											<span className="text-purple-400 font-medium">
												{entry.total_time.substring(0, 5)}
											</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-6 text-slate-400">
								Searching...
							</div>
						)}
					</div>
				</div>
			)}

			{!!selectedFlight && (
				<ViewFlightModal
					isOpen={!!selectedFlight}
					onClose={() => setSelectedFlight(null)}
					flight={selectedFlight}
				/>
			)}
		</div>
	);
}
