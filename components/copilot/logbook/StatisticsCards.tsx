import React from "react";
import { Plane, Clock, MapPin, Calendar } from "lucide-react";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

async function StatisticsCards() {
	const { userId } = await auth();
	if (!userId) {
		return redirect("/");
	}
	const supabase = await createClerkSupabaseClientSsr();
	const { data: statsData, error } = await supabase.rpc(
		"get_flight_statistics",
		{
			user_id: userId,
		},
	);

	if (error) {
		console.error(error);
	}

	const stats = statsData as {
		totalFlights: number;
		totalHours: string;
		uniqueAirports: number;
		lastFlight: string;
	};

	const formatTimeAgo = (date: Date) => {
		const distance = formatDistanceToNow(date, { addSuffix: true })
			.replace("about ", "")
			.replace(" hours ago", "h ago")
			.replace(" days ago", "d ago")
			.replace(" months ago", "mo ago")
			.replace(" years ago", "y ago")
			.replace(" minutes ago", "m ago");
		return distance;
	};

	const formattedLastFlight = formatTimeAgo(new Date(stats.lastFlight));

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
				<div className="flex items-center space-x-3 mb-2">
					<Plane className="h-5 w-5 text-blue-400" />
					<p className="text-sm font-medium text-slate-300">Total Flights</p>
				</div>
				<p className="text-2xl font-bold text-slate-200">
					{stats.totalFlights}
				</p>
			</div>

			<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
				<div className="flex items-center space-x-3 mb-2">
					<Clock className="h-5 w-5 text-blue-400" />
					<p className="text-sm font-medium text-slate-300">Flight Hours</p>
				</div>
				<p className="text-2xl font-bold text-slate-200">{stats.totalHours}</p>
			</div>

			<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
				<div className="flex items-center space-x-3 mb-2">
					<MapPin className="h-5 w-5 text-blue-400" />
					<p className="text-sm font-medium text-slate-300">Airports Visited</p>
				</div>
				<p className="text-2xl font-bold text-slate-200">
					{stats.uniqueAirports}
				</p>
			</div>

			<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
				<div className="flex items-center space-x-3 mb-2">
					<Calendar className="h-5 w-5 text-blue-400" />
					<p className="text-sm font-medium text-slate-300">Last Flight</p>
				</div>
				<p className="text-2xl font-bold text-slate-200">
					{formattedLastFlight}
				</p>
			</div>
		</div>
	);
}

export default StatisticsCards;
