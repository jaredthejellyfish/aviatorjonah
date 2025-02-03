import { Plane, Wind, Gauge, Fuel, Weight, ThermometerSun } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata = {
	title: "Copilot | Performance",
	description: "Calculate and monitor aircraft performance metrics",
};

const AircraftPerformanceComponent = () => (
	<div className="space-y-6">
		{/* Header Card */}
		<div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
			<div className="flex items-center gap-4">
				<div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
					<Plane className="h-6 w-6 text-blue-400" />
				</div>
				<div>
					<h2 className="text-2xl font-semibold text-slate-200">
						Aircraft Performance
					</h2>
					<p className="text-slate-400">
						Calculate and monitor aircraft performance metrics
					</p>
				</div>
			</div>
		</div>

		{/* Performance Metrics Grid */}
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{/* Weight and Balance */}
			<div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
				<div className="flex items-center gap-3 mb-4">
					<Weight className="h-5 w-5 text-blue-400" />
					<h3 className="text-lg font-medium text-slate-200">
						Weight & Balance
					</h3>
				</div>
				<div className="space-y-4">
					<div>
						<label className="text-sm text-slate-400 mb-2 block">
							Take-off Weight
						</label>
						<div className="grid grid-cols-2 gap-4">
							<Input
								type="number"
								placeholder="Enter weight"
								className="bg-slate-700/50 border-slate-600/50 text-slate-200"
							/>
							<div className="bg-slate-700/50 rounded-lg p-2 border border-slate-600/50 flex items-center justify-center">
								<span className="text-slate-200">12,500 lbs max</span>
							</div>
						</div>
					</div>
					<div className="h-px bg-slate-700/50" />
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-sm text-slate-400 mb-2 block">
								CG Location
							</label>
							<div className="text-xl font-semibold text-slate-200">24.2%</div>
							<div className="text-sm text-green-400">Within limits</div>
						</div>
						<div>
							<label className="text-sm text-slate-400 mb-2 block">
								Moment
							</label>
							<div className="text-xl font-semibold text-slate-200">
								2,145 lb-in
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Takeoff Performance */}
			<div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
				<div className="flex items-center gap-3 mb-4">
					<Gauge className="h-5 w-5 text-green-400" />
					<h3 className="text-lg font-medium text-slate-200">
						Takeoff Performance
					</h3>
				</div>
				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-sm text-slate-400 mb-2 block">
								Temperature
							</label>
							<div className="flex items-center gap-2">
								<ThermometerSun className="h-4 w-4 text-orange-400" />
								<Input
									type="number"
									placeholder="°C"
									className="bg-slate-700/50 border-slate-600/50 text-slate-200"
								/>
							</div>
						</div>
						<div>
							<label className="text-sm text-slate-400 mb-2 block">Wind</label>
							<div className="flex items-center gap-2">
								<Wind className="h-4 w-4 text-blue-400" />
								<Input
									type="number"
									placeholder="kts"
									className="bg-slate-700/50 border-slate-600/50 text-slate-200"
								/>
							</div>
						</div>
					</div>
					<div className="h-px bg-slate-700/50" />
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-sm text-slate-400 mb-2 block">
								Required Distance
							</label>
							<div className="text-xl font-semibold text-slate-200">
								3,250 ft
							</div>
							<div className="text-sm text-blue-400">
								Runway available: 5,000 ft
							</div>
						</div>
						<div>
							<label className="text-sm text-slate-400 mb-2 block">
								V Speeds
							</label>
							<div className="space-y-1">
								<div className="flex justify-between">
									<span className="text-slate-400">V1</span>
									<span className="text-slate-200">115 kts</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-400">VR</span>
									<span className="text-slate-200">119 kts</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-400">V2</span>
									<span className="text-slate-200">124 kts</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Fuel Planning */}
			<div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
				<div className="flex items-center gap-3 mb-4">
					<Fuel className="h-5 w-5 text-yellow-400" />
					<h3 className="text-lg font-medium text-slate-200">Fuel Planning</h3>
				</div>
				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-sm text-slate-400 mb-2 block">
								Required Fuel
							</label>
							<div className="text-xl font-semibold text-slate-200">
								850 lbs
							</div>
							<div className="text-sm text-slate-400">2.5 hrs + reserves</div>
						</div>
						<div>
							<label className="text-sm text-slate-400 mb-2 block">
								Fuel Capacity
							</label>
							<div className="text-xl font-semibold text-slate-200">
								2,100 lbs
							</div>
							<div className="text-sm text-green-400">
								Sufficient for flight
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default AircraftPerformanceComponent;
