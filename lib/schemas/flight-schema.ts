import { z } from "zod";

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const FlightEntrySchema = z.object({
	date: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
	aircraft_type: z
		.string()
		.max(10, "Aircraft type cannot exceed 10 characters"),
	registration: z.string().max(10, "Registration cannot exceed 10 characters"),
	departure_airport: z.string().length(4, "Airport code must be 4 characters"),
	arrival_airport: z.string().length(4, "Airport code must be 4 characters"),
	departure_time: z.string().regex(timeRegex, "Time must be in HH:MM format"),
	arrival_time: z.string().regex(timeRegex, "Time must be in HH:MM format"),
	total_time: z.string().regex(timeRegex, "Time must be in HH:MM format"),
	night_time: z
		.string()
		.regex(timeRegex, "Time must be in HH:MM format")
		.optional()
		.default("00:00"),
	conditions: z.enum(["VFR", "IFR", "SVFR"]),
	landings: z.number().int().min(1).optional().default(1),
	remarks: z.string().optional().default(""),
	status: z
		.enum(["completed", "pending", "draft"])
		.optional()
		.default("completed"),
});

export type FlightEntry = z.infer<typeof FlightEntrySchema>;

export { FlightEntrySchema };
