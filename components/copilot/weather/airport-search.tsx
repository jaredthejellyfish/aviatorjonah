"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { airports } from "@nwpr/airport-codes";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type Airport = (typeof airports)[0];

export default function AirportSearch() {
	const [search, setSearch] = useState("");
	const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const router = useRouter();

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearch(value);

		if (value.length >= 2) {
			const filtered = airports
				.filter((airport) => {
					const searchLower = value.toLowerCase();
					return (
						airport.name?.toLowerCase().includes(searchLower) ||
						airport.iata?.toLowerCase().includes(searchLower) ||
						airport.icao?.toLowerCase().includes(searchLower) ||
						airport.city?.toLowerCase().includes(searchLower)
					);
				})
				.slice(0, 5); // Limit to 5 results for better performance
			setFilteredAirports(filtered);
			setShowDropdown(true);
		} else {
			setFilteredAirports([]);
			setShowDropdown(false);
		}
	};

	const handleSelectAirport = (airport: (typeof airports)[0]) => {
		setSearch(`${airport.name} (${airport.iata || airport.icao})`);
		setShowDropdown(false);
		router.push(`/copilot/weather/${airport.icao}`);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = () => setShowDropdown(false);
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<div className="relative w-full">
			<div className="relative">
				<Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 z-20" />
				<Input
					placeholder="Search for a different airport"
					className="w-full bg-slate-800/90 backdrop-blur-sm z-0 border-slate-700/50 text-slate-200 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 h-10 pr-9"
					onChange={handleSearch}
					value={search}
					onClick={(e) => {
						e.stopPropagation();
						if (filteredAirports.length > 0) setShowDropdown(true);
					}}
				/>
			</div>
			{showDropdown && filteredAirports.length > 0 && (
				<div className="absolute z-50 w-full mt-1 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg max-h-[60vh] md:max-h-[40vh] overflow-auto custom-scrollbar">
					{filteredAirports.map((airport) => (
						<div
							key={airport.id}
							className="px-4 py-3 hover:bg-slate-700/50 active:bg-slate-600/50 cursor-pointer border-b border-slate-700/50 last:border-0 transition-colors"
							onClick={() => handleSelectAirport(airport)}
						>
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
								<div>
									<div className="font-medium text-slate-200 text-sm md:text-base">
										{airport.name}
									</div>
									<div className="text-xs md:text-sm text-slate-400">
										{airport.city}, {airport.country}
									</div>
								</div>
								<div className="text-sm font-mono text-purple-400">
									{airport.iata || airport.icao}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
