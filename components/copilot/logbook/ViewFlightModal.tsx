"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Plane, Clock, Calendar, ArrowRight } from "lucide-react";
import type { FlightEntry } from "@/hooks/useLogbook";

interface ViewFlightModalProps {
	isOpen: boolean;
	onClose: () => void;
	flight: FlightEntry | null;
}

export default function ViewFlightModal({
	isOpen,
	onClose,
	flight,
}: ViewFlightModalProps) {
	if (!flight) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700/50 text-slate-200 max-w-2xl">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-slate-200">
						Flight Details
					</DialogTitle>
					<DialogDescription className="text-slate-400">
						Detailed information about your flight on {flight.date} from{" "}
						{flight.departure_airport} to {flight.arrival_airport}
					</DialogDescription>
				</DialogHeader>

				<div className="mt-6 space-y-8">
					{/* Main Flight Info */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
							<div className="flex items-center gap-2 text-purple-400">
								<Plane className="h-5 w-5" />
								<h3 className="font-medium">Aircraft</h3>
							</div>
							<div className="space-y-2">
								<div>
									<p className="text-sm text-slate-400">Type</p>
									<p className="text-slate-200 font-medium">
										{flight.aircraft_type}
									</p>
								</div>
								<div>
									<p className="text-sm text-slate-400">Registration</p>
									<p className="text-slate-200 font-medium">
										{flight.registration}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
							<div className="flex items-center gap-2 text-purple-400">
								<Calendar className="h-5 w-5" />
								<h3 className="font-medium">Flight Information</h3>
							</div>
							<div className="space-y-2">
								<div>
									<p className="text-sm text-slate-400">Date</p>
									<p className="text-slate-200 font-medium">{flight.date}</p>
								</div>
								<div>
									<p className="text-sm text-slate-400">Conditions</p>
									<p className="text-slate-200 font-medium">
										{flight.conditions}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Route and Times */}
					<div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
						<div className="flex items-center gap-2 text-purple-400">
							<Clock className="h-5 w-5" />
							<h3 className="font-medium">Route & Times</h3>
						</div>

						<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-700/50">
							<div className="flex items-center gap-3 text-lg">
								<span className="font-medium text-slate-200">
									{flight.departure_airport}
								</span>
								<ArrowRight className="h-5 w-5 text-slate-500" />
								<span className="font-medium text-slate-200">
									{flight.arrival_airport}
								</span>
							</div>
							<div className="flex items-center gap-4 text-sm">
								<div>
									<span className="text-slate-400">Departure: </span>
									<span className="text-slate-200">
										{flight.departure_time.substring(0, 5)}
									</span>
								</div>
								<div>
									<span className="text-slate-400">Arrival: </span>
									<span className="text-slate-200">
										{flight.arrival_time.substring(0, 5)}
									</span>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-4 pt-2">
							<div>
								<p className="text-sm text-slate-400">Total Time</p>
								<p className="text-lg font-medium text-purple-400">
									{flight.total_time.substring(0, 5)}
								</p>
							</div>
							<div>
								<p className="text-sm text-slate-400">Night Time</p>
								<p className="text-lg font-medium text-slate-200">
									{flight.night_time.substring(0, 5)}
								</p>
							</div>
							<div>
								<p className="text-sm text-slate-400">Landings</p>
								<p className="text-lg font-medium text-slate-200">
									{flight.landings}
								</p>
							</div>
						</div>
					</div>

					{/* Remarks */}
					{flight.remarks && (
						<div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
							<h3 className="font-medium text-purple-400">Remarks</h3>
							<p className="text-slate-200">{flight.remarks}</p>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
