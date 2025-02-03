interface TafResponse {
	data: {
		ICAO: string;
		raw_text: string;
		station: {
			geometry: {
				coordinates: [number, number];
			};
		};
	}[];
}

interface TafParams {
	ids: string;
	time?: "valid" | "issue";
}

export async function getTaf(params: TafParams): Promise<TafResponse> {
	const baseUrl = "https://aviationweather.gov/api/data/taf";
	const searchParams = new URLSearchParams();

	// Add required parameter
	searchParams.append("ids", params.ids);
	searchParams.append("format", "json");

	// Add optional parameters if provided
	if (params.time) searchParams.append("time", params.time);

	const url = `${baseUrl}?${searchParams.toString()}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch TAF: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching TAF:", error);
		throw error;
	}
}
