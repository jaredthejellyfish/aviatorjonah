import React from "react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { COMMON_AIRCRAFT, RATINGS } from "./constants";
import type { FormData } from "./types";

interface AircraftStepProps {
	formData: FormData;
	onInputChange: (field: keyof FormData, value: string) => void;
}

const AircraftStep: React.FC<AircraftStepProps> = ({
	formData,
	onInputChange,
}) => {
	return (
		<div className="space-y-6">
			<p className="text-gray-400 mb-4">
				Tell us about your experience and preferred aircraft.
			</p>
			<div className="space-y-4">
				<div>
					<Label htmlFor="aircraft_type" className="text-gray-300">
						Preferred Aircraft
					</Label>
					<Select
						value={formData.aircraft_type}
						onValueChange={(value) => onInputChange("aircraft_type", value)}
					>
						<SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
							<SelectValue placeholder="Select your preferred aircraft" />
						</SelectTrigger>
						<SelectContent className="bg-gray-800 border-gray-700">
							{COMMON_AIRCRAFT.map((aircraft) => (
								<SelectItem
									key={aircraft}
									value={aircraft}
									className="text-gray-100 focus:bg-gray-700 focus:text-gray-100"
								>
									{aircraft}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="rating_goal" className="text-gray-300">
						Pilot Rating
					</Label>
					<Select
						value={formData.rating_goal}
						onValueChange={(value) => onInputChange("rating_goal", value)}
					>
						<SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
							<SelectValue placeholder="Select your highest rating" />
						</SelectTrigger>
						<SelectContent className="bg-gray-800 border-gray-700">
							{RATINGS.map((rating) => (
								<SelectItem
									key={rating}
									value={rating}
									className="text-gray-100 focus:bg-gray-700 focus:text-gray-100"
								>
									{rating}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};

export default AircraftStep;
