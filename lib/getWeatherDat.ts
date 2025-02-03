import { airports } from "@nwpr/airport-codes";
import type { Database } from "@/lib/supabase/db-types";

type Settings = Database["public"]["Tables"]["settings"]["Row"];
const DEFAULT_HOME_AIRPORT = "KJFK";

type WeatherData = {
	temperature: string;
	wind: string;
	visibility: string;
	ceiling: string;
	error: string | null;
	updatedAt: string;
	feelsLike: string;
	tempMin: string;
	tempMax: string;
	pressure: number;
	humidity: number;
	description: string;
	icon: string;
	windGust?: string;
	sunrise?: string;
	sunset?: string;
};

export async function getWeatherData(
	userSettings?: Settings | null,
	icao?: string,
) {
	try {
		if (!userSettings) {
			return { weather: null, homeAirport: null };
		}

		const homeAirport = airports.find(
			(airport) =>
				airport.icao ===
				(icao ?? userSettings?.home_airport ?? DEFAULT_HOME_AIRPORT),
		);

		const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=${userSettings?.units === "imperial" ? "imperial" : "metric"}&lat=${homeAirport?.latitude}&lon=${homeAirport?.longitude}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;

		const response = await fetch(weatherUrl);

		const data = await response.json();

		const weather: WeatherData = {
			temperature: `${Math.round(data.main.temp)}°${userSettings?.units === "imperial" ? "F" : "C"}`,
			wind: `${Math.round(data.wind.deg)}° at ${Math.round(data.wind.speed)}kt`,
			visibility:
				userSettings?.units === "imperial"
					? `${(data.visibility / 1609.34).toFixed(1)}SM`
					: `${(data.visibility / 1000).toFixed(1)}KM`,
			ceiling: data.clouds
				? `${data.clouds.all < 50 ? "SCT" : "BKN"}${Math.round(data.clouds.all / 10)}`
				: "CLR",
			error: null,
			updatedAt: data.dt,
			feelsLike: `${Math.round(data.main.feels_like)}°${userSettings?.units === "imperial" ? "F" : "C"}`,
			tempMin: `${Math.round(data.main.temp_min)}°${userSettings?.units === "imperial" ? "F" : "C"}`,
			tempMax: `${Math.round(data.main.temp_max)}°${userSettings?.units === "imperial" ? "F" : "C"}`,
			pressure: data.main.pressure,
			humidity: data.main.humidity,
			description: data.weather[0].description,
			icon: data.weather[0].icon,
			windGust: data.wind.gust ? `${Math.round(data.wind.gust)}kt` : undefined,
			sunrise: data.sys.sunrise
				? new Date(data.sys.sunrise * 1000).toLocaleTimeString()
				: undefined,
			sunset: data.sys.sunset
				? new Date(data.sys.sunset * 1000).toLocaleTimeString()
				: undefined,
		};
		return { weather, homeAirport };
	} catch (error) {
		console.error(error);
		return {
			weather: {
				temperature: null,
				wind: null,
				visibility: null,
				ceiling: null,
				error: (error as Error).message,
				updatedAt: null,
				feelsLike: null,
				tempMin: null,
				tempMax: null,
				pressure: null,
				humidity: null,
				description: null,
				icon: null,
				windGust: null,
				sunrise: null,
				sunset: null,
			},
			homeAirport: null,
		};
	}
}
