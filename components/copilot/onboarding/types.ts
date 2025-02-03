import type { Database } from "@/lib/supabase/db-types";

export type Settings = Database["public"]["Tables"]["settings"]["Row"];

export interface FormData {
	home_airport: string;
	aircraft_type: string;
	rating_goal: string;
	timezone: string;
	units: string;
}

export const DEFAULT_FORM_DATA: FormData = {
	home_airport: "",
	aircraft_type: "",
	rating_goal: "",
	timezone: "",
	units: "imperial",
};
