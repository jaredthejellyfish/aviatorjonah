import React from "react";
import { Plane, Clock, MapPin, Calendar } from "lucide-react";

function StatisticsCardsLoading() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
				<div className="flex items-center space-x-3 mb-2">
					<Plane className="h-5 w-5 text-blue-400" />
					<p className="text-sm font-medium text-slate-300">Total Flights</p>
				</div>
				<div className="h-8 w-16 bg-slate-600 animate-pulse rounded" />
			</div>

			<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
				<div className="flex items-center space-x-3 mb-2">
					<Clock className="h-5 w-5 text-blue-400" />
					<p className="text-sm font-medium text-slate-300">Flight Hours</p>
				</div>
				<div className="h-8 w-24 bg-slate-600 animate-pulse rounded" />
			</div>

			<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
				<div className="flex items-center space-x-3 mb-2">
					<MapPin className="h-5 w-5 text-blue-400" />
					<p className="text-sm font-medium text-slate-300">Airports Visited</p>
				</div>
				<div className="h-8 w-16 bg-slate-600 animate-pulse rounded" />
			</div>

			<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
				<div className="flex items-center space-x-3 mb-2">
					<Calendar className="h-5 w-5 text-blue-400" />
					<p className="text-sm font-medium text-slate-300">Last Flight</p>
				</div>
				<div className="h-8 w-28 bg-slate-600 animate-pulse rounded" />
			</div>
		</div>
	);
}

export default StatisticsCardsLoading;
