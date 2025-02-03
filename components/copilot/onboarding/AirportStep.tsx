import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TIMEZONES } from "./constants";
import type { FormData } from "./types";

interface AirportStepProps {
	formData: FormData;
	onInputChange: (field: keyof FormData, value: string) => void;
}

const AirportStep: React.FC<AirportStepProps> = ({
	formData,
	onInputChange,
}) => {
	return (
		<div className="space-y-6">
			<div>
				<Label htmlFor="home_airport" className="text-gray-300">
					Home Airport (ICAO/IATA)
				</Label>
				<Input
					id="home_airport"
					placeholder="KJFK"
					value={formData.home_airport}
					onChange={(e) => onInputChange("home_airport", e.target.value)}
					maxLength={4}
					className="bg-gray-800 border-gray-700 text-gray-100"
					aria-label="Home airport identifier"
				/>
				<p className="text-sm text-gray-400 mt-1">
					Enter your primary airport identifier
				</p>
			</div>

			<div>
				<Label htmlFor="timezone" className="text-gray-300">
					Time Zone
				</Label>
				<Select
					value={formData.timezone}
					onValueChange={(value) => onInputChange("timezone", value)}
				>
					<SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
						<SelectValue placeholder="Select your time zone" />
					</SelectTrigger>
					<SelectContent className="bg-gray-800 border-gray-700">
						{TIMEZONES.map((tz) => (
							<SelectItem
								key={tz}
								value={tz}
								className="text-gray-100 focus:bg-gray-700 focus:text-gray-100"
							>
								{tz}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div>
				<Label className="text-gray-300">Measurement System</Label>
				<div className="grid grid-cols-2 gap-4 mt-2">
					{[
						{
							id: "imperial",
							label: "Imperial (US)",
							desc: "feet, miles, °F",
						},
						{ id: "metric", label: "Metric", desc: "meters, km, °C" },
					].map(({ id, label, desc }) => (
						<button
							key={id}
							type="button"
							onClick={() => onInputChange("units", id)}
							className={`p-3 rounded-lg border-2 transition-all ${
								formData.units === id
									? "border-cyan-500 bg-gray-800 text-cyan-500"
									: "border-gray-700 hover:border-gray-600 text-gray-300"
							}`}
						>
							{label}
							<div className="text-sm text-gray-400">{desc}</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default AirportStep;
