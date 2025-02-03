import { Map, Navigation, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = {
	title: "Copilot | Route Planning",
	description:
		"Plan your flight route with detailed waypoints and weather information",
};

const RoutePlanningComponent = () => (
	<div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg">
		{/* Header Section */}
		<div className="p-6 border-b border-slate-700/50">
			<h2 className="text-2xl font-semibold text-slate-200">Route Planning</h2>
			<p className="text-slate-400 mt-2">
				Plan your flight route with detailed waypoints and weather information
			</p>
		</div>

		{/* Route Input Section */}
		<div className="p-6 border-b border-slate-700/50">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<label className="text-sm text-slate-400">Departure</label>
					<div className="relative">
						<Input
							placeholder="Enter departure airport"
							className="pl-10 bg-slate-700/50 border-slate-600/50 text-slate-200"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
					</div>
				</div>
				<div className="space-y-2">
					<label className="text-sm text-slate-400">Destination</label>
					<div className="relative">
						<Input
							placeholder="Enter destination airport"
							className="pl-10 bg-slate-700/50 border-slate-600/50 text-slate-200"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
					</div>
				</div>
			</div>
		</div>

		{/* Route Details */}
		<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
				<div className="flex items-center gap-3 mb-2">
					<Navigation className="h-5 w-5 text-blue-400" />
					<h3 className="text-slate-200 font-medium">Distance</h3>
				</div>
				<p className="text-2xl font-semibold text-slate-200">487 nm</p>
				<p className="text-sm text-slate-400">Estimated flight time: 2h 45m</p>
			</div>

			<div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
				<div className="flex items-center gap-3 mb-2">
					<Map className="h-5 w-5 text-green-400" />
					<h3 className="text-slate-200 font-medium">Waypoints</h3>
				</div>
				<p className="text-2xl font-semibold text-slate-200">6</p>
				<p className="text-sm text-slate-400">3 alternate airports available</p>
			</div>

			<div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
				<div className="flex items-center gap-3 mb-2">
					<Navigation className="h-5 w-5 text-purple-400" />
					<h3 className="text-slate-200 font-medium">Route Type</h3>
				</div>
				<p className="text-2xl font-semibold text-slate-200">IFR</p>
				<p className="text-sm text-slate-400">High altitude airways</p>
			</div>
		</div>

		{/* Actions */}
		<div className="p-6 bg-slate-700/30 rounded-b-lg border-t border-slate-700/50">
			<div className="flex gap-3 justify-end">
				<Button
					variant="outline"
					className="text-slate-200 border-slate-600 hover:bg-slate-700/50"
				>
					Save Route
				</Button>
				<Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
					Start Navigation
				</Button>
			</div>
		</div>
	</div>
);

export default RoutePlanningComponent;
