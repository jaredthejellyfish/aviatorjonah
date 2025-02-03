interface SIGMETParams {
	format?: "raw" | "json" | "xml";
	type?: "sigmet" | "airmet";
	hazard?: "conv" | "turb" | "ice" | "ifr";
	level?: number;
	date?: string;
	icao?: string;
	country?: string;
}

const DEFAULT_SIGMET_OPTIONS: SIGMETParams = {
	format: "json",
	type: "sigmet", // Default to SIGMETs only
};

export async function getSIGMETs(
	params: SIGMETParams = DEFAULT_SIGMET_OPTIONS,
) {
	if (params.country !== "United States") {
		return [];
	}

	const baseUrl = "https://aviationweather.gov/api/data/airsigmet";

	const queryParams = new URLSearchParams();

	// Merge default options with provided params
	const options = { ...DEFAULT_SIGMET_OPTIONS, ...params };

	// Add parameters if they exist
	if (options.format) queryParams.append("format", options.format);
	if (options.type) queryParams.append("type", options.type);
	if (options.hazard) queryParams.append("hazard", options.hazard);
	if (options.level) queryParams.append("level", options.level.toString());
	if (options.date) queryParams.append("date", options.date);
	if (options.icao) queryParams.append("icao", options.icao);

	const url = `${baseUrl}?${queryParams.toString()}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch SIGMETs: ${response.statusText}`);
		}

		const data = await response.json();

		// If data is an array, return it directly
		if (Array.isArray(data)) {
			return data;
		}

		// If data has a specific property containing the SIGMETs, return that
		if (data.features) {
			return data.features;
		}

		// If we get here, log the structure and return an empty array
		return [];
	} catch (error) {
		console.error("Error fetching SIGMETs:", error);
		return []; // Return empty array instead of throwing
	}
}
