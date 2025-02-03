"use client";

import type React from "react";
import { X, Plane } from "lucide-react";
import type { Flight } from "types/calendar";

interface FlightDetailsPopupProps {
	flights: Flight[];
	onClose: () => void;
}

const FlightDetailsPopup: React.FC<FlightDetailsPopupProps> = ({
	flights,
	onClose,
}) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto text-gray-100">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold text-blue-400">Flight Details</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-200"
					>
						<X size={24} />
					</button>
				</div>
				{flights.map((flight) => (
					<div
						key={flight.id}
						className="mb-6 pb-6 border-b border-gray-700 last:border-b-0"
					>
						<div className="flex items-center mb-2">
							<Plane size={24} className="text-blue-500 mr-2" />
							<span className="font-semibold text-blue-400 text-lg">
								{flight.aircraft}
							</span>
						</div>
						<p className="text-gray-300">
							<strong>Date:</strong> {flight.date.toLocaleDateString()}
						</p>
						<p className="text-gray-300">
							<strong>Duration:</strong> {flight.duration} hours
						</p>
						<p className="text-gray-300">
							<strong>Departure:</strong> {flight.departureAirport}
						</p>
						<p className="text-gray-300">
							<strong>Arrival:</strong> {flight.arrivalAirport}
						</p>
						<p className="text-gray-300 mt-2">
							<strong>Notes:</strong> {flight.notes}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default FlightDetailsPopup;
