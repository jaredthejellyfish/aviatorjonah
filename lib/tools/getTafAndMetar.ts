import { getMetar } from "./getMetar";
import { getTaf } from "./getTaf";

interface CombinedResponse {
	taf?: {
		data: {
			ICAO: string;
			raw_text: string;
			station: {
				geometry: {
					coordinates: [number, number];
				};
			};
		}[];
	};
	metar?: {
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
	};
}

export async function getTafAndMetar(
	icao: string,
	metar: boolean = false,
	taf: boolean = false,
): Promise<CombinedResponse> {
	try {
		// Fetch both TAF and METAR data concurrently
		const [tafResponse, metarResponse] = await Promise.all([
			taf ? getTaf({ ids: icao }) : null,
			metar ? getMetar(icao) : null,
		]);

		if (!tafResponse && !metarResponse) {
			throw new Error("No data fetched");
		}

		return {
			...(tafResponse && { taf: tafResponse }),
			...(metarResponse && { metar: metarResponse }),
		};
	} catch (error) {
		console.error("Error fetching TAF and METAR data:", error);
		throw error;
	}
}
