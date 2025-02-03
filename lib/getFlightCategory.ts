import { MetarData } from "./getMetar";

type FlightCategory = "VFR" | "MVFR" | "IFR" | "LIFR";

/**
 * Calculates the flight category based on ceiling and visibility conditions
 *
 * VFR = Ceilings greater than 3,000' AGL and visibility greater than 5 miles
 * MVFR = Ceilings between 1,000' and 3,000' AGL and/or visibility between 3 to 5 miles
 * IFR = Ceilings between 500' and 999' AGL and/or visibility between 1 and 3 miles
 * LIFR = Ceilings below 500' and/or visibility less than 1 mile
 */
export function getFlightCategory(metar: MetarData): FlightCategory {
	// Get ceiling from clouds array
	// The ceiling is the lowest broken (BKN) or overcast (OVC) layer
	let ceilingHeightFeet: number | null = null;

	for (const cloud of metar.clouds) {
		if (cloud.cover === "BKN" || cloud.cover === "OVC") {
			// Cloud height is reported in hundreds of feet
			const heightFeet = cloud.base * 100;
			if (ceilingHeightFeet === null || heightFeet < ceilingHeightFeet) {
				ceilingHeightFeet = heightFeet;
			}
		}
	}

	// If there's vertical visibility, use that as ceiling
	if (metar.vertVis !== null) {
		ceilingHeightFeet = metar.vertVis * 100;
	}

	// Parse visibility
	// METAR visibility can be a number or "6+" for 6 miles or greater
	const visibilityMiles = metar.visib === "6+" ? 6 : parseFloat(metar.visib);

	// Determine flight category based on the worst condition
	if (
		(ceilingHeightFeet !== null && ceilingHeightFeet < 500) ||
		visibilityMiles < 1
	) {
		return "LIFR";
	}

	if (
		(ceilingHeightFeet !== null && ceilingHeightFeet < 1000) ||
		visibilityMiles < 3
	) {
		return "IFR";
	}

	if (
		(ceilingHeightFeet !== null && ceilingHeightFeet <= 3000) ||
		visibilityMiles <= 5
	) {
		return "MVFR";
	}

	return "VFR";
}

/**
 * Gets the color associated with a flight category
 */
export function getFlightCategoryColor(
	category: FlightCategory | null,
): string {
	switch (category) {
		case "VFR":
			return "bg-green-400";
		case "MVFR":
			return "bg-blue-400";
		case "IFR":
			return "bg-red-400";
		case "LIFR":
			return "bg-purple-400";
		default:
			return "bg-blue-200";
	}
}
