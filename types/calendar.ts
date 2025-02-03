export interface Flight {
	id: string;
	date: Date;
	aircraft: string;
	duration: number;
	departureAirport: string;
	arrivalAirport: string;
	notes: string;
}

export interface Currency {
	id: string;
	name: string;
	expirationDate: Date;
	description: string;
}
