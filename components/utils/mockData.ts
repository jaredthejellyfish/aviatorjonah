import type { Flight, Currency } from "types/calendar";

export const mockFlights: Flight[] = [
	{
		id: "1",
		date: new Date(2024, 0, 5),
		aircraft: "C172",
		duration: 2.5,
		departureAirport: "KJFK",
		arrivalAirport: "KBOS",
		notes: "Cross-country flight with moderate turbulence",
	},
	{
		id: "2",
		date: new Date(2024, 0, 12),
		aircraft: "PA28",
		duration: 1.8,
		departureAirport: "KBOS",
		arrivalAirport: "KBOS",
		notes: "Local flight practice, 3 touch-and-gos",
	},
	{
		id: "3",
		date: new Date(2024, 0, 20),
		aircraft: "C182",
		duration: 3.2,
		departureAirport: "KBOS",
		arrivalAirport: "KPHL",
		notes: "Night cross-country flight",
	},
];

export const mockCurrencies: Currency[] = [
	{
		id: "1",
		name: "Medical",
		expirationDate: new Date(2024, 0, 31),
		description: "Class 2 Medical Certificate",
	},
	{
		id: "2",
		name: "BFR",
		expirationDate: new Date(2024, 1, 15),
		description: "Biennial Flight Review",
	},
	{
		id: "3",
		name: "IFR Currency",
		expirationDate: new Date(2024, 0, 25),
		description:
			"6 approaches, holding procedures, and intercepting/tracking courses through the use of navigation systems",
	},
];
