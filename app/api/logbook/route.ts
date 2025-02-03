import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { FlightEntrySchema } from "@/lib/schemas/flight-schema";
import { transformFlightEntries } from "@/lib/utils/transform-flight-entries";

export async function GET() {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const supabase = await createClerkSupabaseClientSsr();
	const { data, error } = await supabase
		.from("flight_entries")
		.select("*, aircraft_id(*)")
		.eq("clerk_user_id", userId);

	if (error) {
		return NextResponse.json(
			{ error: "Failed to fetch flight entries", message: error.message },
			{ status: 500 },
		);
	}

	const transformedEntries = transformFlightEntries(data);
	return NextResponse.json([...transformedEntries]);
}

export async function POST(request: NextRequest) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const validationResult = FlightEntrySchema.safeParse(body);

		if (!validationResult.success) {
			return NextResponse.json(
				{ error: "Validation failed", details: validationResult.error.errors },
				{ status: 400 },
			);
		}

		const validatedData = validationResult.data;
		const supabase = await createClerkSupabaseClientSsr();

		// First, create or get the aircraft
		const { data: aircraft, error: aircraftError } = await supabase
			.from("aircrafts")
			.upsert(
				{
					registration: validatedData.registration,
					aircraft_type: validatedData.aircraft_type,
					clerk_user_id: userId,
				},
				{
					onConflict: "registration,clerk_user_id",
				},
			)
			.select()
			.single();

		if (aircraftError) {
			return NextResponse.json(
				{ error: "Failed to create aircraft", message: aircraftError.message },
				{ status: 500 },
			);
		}

		// Then create the flight entry
		const { data: flightEntry, error: flightError } = await supabase
			.from("flight_entries")
			.insert({
				clerk_user_id: userId,
				aircraft_id: aircraft.id,
				date: validatedData.date,
				departure_airport: validatedData.departure_airport,
				arrival_airport: validatedData.arrival_airport,
				departure_time: validatedData.departure_time,
				arrival_time: validatedData.arrival_time,
				total_time: validatedData.total_time,
				night_time: validatedData.night_time,
				landings: validatedData.landings,
				conditions: validatedData.conditions,
				status: validatedData.status,
				remarks: validatedData.remarks,
			})
			.select("*, aircraft_id(*)")
			.single();

		if (flightError) {
			return NextResponse.json(
				{
					error: "Failed to create flight entry",
					message: flightError.message,
				},
				{ status: 500 },
			);
		}

		const transformedEntry = {
			id: flightEntry.id,
			clerk_user_id: flightEntry.clerk_user_id,
			created_at: flightEntry.created_at ?? new Date().toISOString(),
			date: flightEntry.date,
			aircraft_type: flightEntry.aircraft_id?.aircraft_type ?? "",
			registration: flightEntry.aircraft_id?.registration ?? "",
			departure_airport: flightEntry.departure_airport,
			arrival_airport: flightEntry.arrival_airport,
			departure_time: (flightEntry.departure_time as string).substring(0, 5),
			arrival_time: (flightEntry.arrival_time as string).substring(0, 5),
			total_time: (flightEntry.total_time as string).substring(0, 5),
			night_time: ((flightEntry.night_time as string) ?? "00:00:00").substring(
				0,
				5,
			),
			conditions: flightEntry.conditions as "VFR" | "IFR" | "SVFR",
			landings: flightEntry.landings ?? 1,
			remarks: flightEntry.remarks ?? "",
			status:
				(flightEntry.status as "completed" | "pending" | "draft") ??
				"completed",
		};

		return NextResponse.json(transformedEntry, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Invalid request body", details: (error as Error).message },
			{ status: 400 },
		);
	}
}

export async function DELETE(request: NextRequest) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const entryId = request.nextUrl.clone().searchParams.get("id");

		if (!entryId) {
			return NextResponse.json(
				{ error: "Flight entry ID is required" },
				{ status: 400 },
			);
		}

		const supabase = await createClerkSupabaseClientSsr();

		// First verify the entry belongs to the user
		const { data: existingEntry } = await supabase
			.from("flight_entries")
			.select()
			.eq("id", entryId)
			.eq("clerk_user_id", userId)
			.single();

		if (!existingEntry) {
			return NextResponse.json(
				{ error: "Flight entry not found or unauthorized" },
				{ status: 404 },
			);
		}

		// Delete the entry
		const { error: deleteError } = await supabase
			.from("flight_entries")
			.delete()
			.eq("id", entryId)
			.eq("clerk_user_id", userId);

		if (deleteError) {
			return NextResponse.json(
				{
					error: "Failed to delete flight entry",
					message: deleteError.message,
				},
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{ message: "Flight entry deleted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: "Failed to process delete request",
				message: (error as Error).message,
			},
			{ status: 500 },
		);
	}
}
