import { Database } from "@/lib/supabase/db-types";

type FlightEntry = Database["public"]["Tables"]["flight_entries"]["Row"] & {
	aircraft_id: Database["public"]["Tables"]["aircrafts"]["Row"] | null;
};

export type TransformedFlightEntry = {
	id: string;
	clerk_user_id: string;
	created_at: string;
	date: string;
	aircraft_type: string;
	registration: string;
	departure_airport: string;
	arrival_airport: string;
	departure_time: string;
	arrival_time: string;
	total_time: string;
	night_time: string;
	conditions: "VFR" | "IFR" | "SVFR";
	landings: number;
	remarks: string;
	status: "completed" | "pending" | "draft";
};

export function transformFlightEntries(
	entries: FlightEntry[] | null,
): TransformedFlightEntry[] {
	return (
		entries?.map((entry) => ({
			id: entry.id,
			clerk_user_id: entry.clerk_user_id,
			created_at: entry.created_at ?? new Date().toISOString(),
			date: entry.date,
			aircraft_type: entry.aircraft_id?.aircraft_type ?? "",
			registration: entry.aircraft_id?.registration ?? "",
			departure_airport: entry.departure_airport,
			arrival_airport: entry.arrival_airport,
			departure_time: (entry.departure_time as string).substring(0, 5),
			arrival_time: (entry.arrival_time as string).substring(0, 5),
			total_time: (entry.total_time as string).substring(0, 5),
			night_time: ((entry.night_time as string) ?? "00:00:00").substring(0, 5),
			conditions: entry.conditions as "VFR" | "IFR" | "SVFR",
			landings: entry.landings ?? 1,
			remarks: entry.remarks ?? "",
			status:
				(entry.status as "completed" | "pending" | "draft") ?? "completed",
		})) ?? []
	);
}

interface SearchResult {
	id: string;
	date: string;
	aircraft_type: string;
	aircraft_registration: string;
	departure_airport: string;
	arrival_airport: string;
	total_time: string;
}

interface SearchTransformedEntry {
	id: number;
	date: string;
	aircraft: string;
	from: string;
	to: string;
	duration: string;
}

export function transformFlightEntry(
	entry: SearchResult,
): SearchTransformedEntry {
	return {
		id: parseInt(entry.id.replace(/-/g, "").slice(0, 8), 16),
		date: entry.date,
		aircraft: `${entry.aircraft_type} (${entry.aircraft_registration})`,
		from: entry.departure_airport,
		to: entry.arrival_airport,
		duration: entry.total_time,
	};
}
