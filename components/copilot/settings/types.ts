// types.ts
export interface UserPreferences {
	homeAirport: string;
	aircraft: string;
	rating: string;
}

export interface TabProps {
	isLoading?: boolean;
	isSubmitting?: boolean;
	onSubmit: () => Promise<void>;
}
