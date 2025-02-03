interface TafForecast {
	timeFrom: number;
	timeTo: number;
	probability: number | null;
	wind: {
		degrees: number;
		speed: number;
		gust: number | null;
		variable: boolean;
	};
	visibility: {
		prevailing: number;
		vertical: number | null;
	};
	conditions: Array<{
		code: string;
		text: string;
	}>;
	clouds: Array<{
		cover: string;
		base: number;
		type: string | null;
	}>;
	turbulence: {
		intensity: string | null;
		minAlt: number | null;
		maxAlt: number | null;
	} | null;
	icing: {
		intensity: string | null;
		minAlt: number | null;
		maxAlt: number | null;
	} | null;
}

interface TafData {
	tafId: number;
	icaoId: string;
	dbPopTime: string;
	bulletinTime: string;
	issueTime: string;
	validTimeFrom: number;
	validTimeTo: number;
	rawTAF: string;
	mostRecent: number;
	remarks: string;
	lat: number;
	lon: number;
	elev: number;
	prior: number;
	name: string;
	fcsts: TafForecast[];
}

type TafResponse = TafData[];

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
