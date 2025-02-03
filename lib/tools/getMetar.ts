interface MetarResponse {
	data: {
		ICAO: string;
		raw_text: string;
		station: {
			geometry: {
				coordinates: [number, number];
			};
		};
		observed: string;
		temp_c?: number;
		dewpoint_c?: number;
		wind_speed_kt?: number;
		wind_dir_degrees?: number;
		visibility_statute_mi?: number;
		altim_in_hg?: number;
		flight_category?: string;
	}[];
}

export async function getMetar(icao: string): Promise<MetarResponse> {
	const baseUrl = "https://aviationweather.gov/api/data/metar";
	const params = new URLSearchParams({
		ids: icao,
		format: "json",
		hours: "1",
	});

	const url = `${baseUrl}?${params.toString()}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch METAR: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching METAR:", error);
		throw error;
	}
}
