"use client";

import type React from "react";
import { Plane } from "lucide-react";

interface Flight {
	id: string;
	date: Date;
	aircraft: string;
	duration: number;
}

interface FlightDetailsProps {
	flights: Flight[];
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flights }) => {
	if (flights.length === 0) {
		return (
			<div className="bg-gray-100 p-4 rounded-lg">
				<p className="text-gray-500 text-center">
					Select a day to view flight details
				</p>
			</div>
		);
	}

	return (
		<div className="bg-sky-100 p-4 rounded-lg">
			<h3 className="text-xl font-semibold text-sky-800 mb-4">
				Flight Details
			</h3>
			{flights.map((flight) => (
				<div key={flight.id} className="bg-white p-4 rounded-lg mb-4 shadow">
					<div className="flex items-center mb-2">
						<Plane size={20} className="text-sky-500 mr-2" />
						<span className="font-semibold text-sky-700">
							{flight.aircraft}
						</span>
					</div>
					<p className="text-gray-600">
						Date: {flight.date.toLocaleDateString()}
					</p>
					<p className="text-gray-600">Duration: {flight.duration} hours</p>
				</div>
			))}
		</div>
	);
};

export default FlightDetails;
