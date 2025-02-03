export async function getWeather(
	city: string,
	state: string,
	countryCode: string,
) {
	const geocodingurl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${countryCode}&limit=1&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
	const geocodingResponse = await fetch(geocodingurl);
	const geocodingData = await geocodingResponse.json();
	const lat = geocodingData[0].lat;
	const lon = geocodingData[0].lon;

	const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
	const response = await fetch(url);
	const weatherData = await response.json();
	return weatherData;
}
