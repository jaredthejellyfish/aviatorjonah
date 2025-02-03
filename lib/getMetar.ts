export interface CloudData {
	cover: string; // Cloud cover type (e.g., 'BKN', 'OVC', 'SCT', etc.)
	base: number; // Cloud base height in hundreds of feet
	type: string | null; // Cloud type if specified
}

export interface MetarData {
	metar_id: number;
	icaoId: string;
	receiptTime: string;
	obsTime: number;
	reportTime: string;
	temp: number;
	dewp: number;
	wdir: number;
	wspd: number;
	wgst: number | null;
	visib: string;
	altim: number;
	slp: number | null;
	qcField: number;
	wxString: string | null;
	presTend: number | null;
	maxT: number | null;
	minT: number | null;
	maxT24: number | null;
	minT24: number | null;
	precip: number | null;
	pcp3hr: number | null;
	pcp6hr: number | null;
	pcp24hr: number | null;
	snow: number | null;
	vertVis: number | null;
	metarType: string;
	rawOb: string;
	mostRecent: number;
	lat: number;
	lon: number;
	elev: number;
	prior: number;
	name: string;
	clouds: CloudData[];
}

type MetarResponse = MetarData[];

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
