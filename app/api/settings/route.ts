// app/api/settings/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/db-types";

type Settings = Database["public"]["Tables"]["settings"]["Row"];
type SettingsInsert = Database["public"]["Tables"]["settings"]["Insert"];
type Json = Database["public"]["Tables"]["settings"]["Row"]["subscription"];

// Add CORS headers helper
const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Default settings object - set required fields to null to trigger onboarding
const DEFAULT_SETTINGS: Omit<
	Settings,
	"id" | "clerk_user_id" | "created_at" | "updated_at"
> = {
	home_airport: null,
	aircraft_type: null,
	rating_goal: null,
	units: "imperial",
	pilot_certificate: null,
	medical_certificate: null,
	photo_id: null,
	subscription: null,
	cookie_preferences: {
		analytics: true,
		marketing: false,
		functional: true,
	},
	onboarding_complete: false,
};

export async function GET() {
	try {
		const session = await auth();
		const userId = session?.userId;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const supabase = await createClerkSupabaseClientSsr();
		const { data: userSettings, error } = await supabase
			.from("settings")
			.select("*")
			.eq("clerk_user_id", userId)
			.single();

		if (error && error.code !== "PGRST116") {
			// PGRST116 is "no rows returned"
			console.error("Error fetching settings:", error);
			return new NextResponse("Internal Server Error", { status: 500 });
		}

		// Return the settings with proper typing
		return NextResponse.json({
			settings:
				userSettings ||
				({
					id: "",
					clerk_user_id: userId,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
					...DEFAULT_SETTINGS,
				} as Settings),
		});
	} catch (error) {
		console.error("Error fetching settings:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const session = await auth();
		const userId = session?.userId;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const partialSettings = (await req.json()) as Partial<Settings>;
		const supabase = await createClerkSupabaseClientSsr();

		// Find existing settings
		const { data: existingSettings, error: fetchError } = await supabase
			.from("settings")
			.select("*")
			.eq("clerk_user_id", userId)
			.single();

		if (fetchError && fetchError.code !== "PGRST116") {
			console.error("Error fetching existing settings:", fetchError);
			return new NextResponse("Error fetching settings", { status: 500 });
		}

		// Prepare the settings object by merging with existing or default settings
		const baseSettings: Omit<Settings, "id"> = existingSettings || {
			clerk_user_id: userId,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			...DEFAULT_SETTINGS,
		};

		// Helper function to safely merge JSON objects
		const mergeJsonObjects = (
			base: Json | null,
			update: Json | null | undefined,
		): Json | null => {
			if (!update) return base;
			if (!base) return update;
			return { ...(base as object), ...(update as object) } as Json;
		};

		const newSettings: SettingsInsert = {
			clerk_user_id: userId,
			home_airport: partialSettings.home_airport ?? baseSettings.home_airport,
			aircraft_type:
				partialSettings.aircraft_type ?? baseSettings.aircraft_type,
			rating_goal: partialSettings.rating_goal ?? baseSettings.rating_goal,
			units: partialSettings.units ?? baseSettings.units,
			subscription: mergeJsonObjects(
				baseSettings.subscription,
				partialSettings.subscription,
			),
			cookie_preferences: mergeJsonObjects(
				baseSettings.cookie_preferences,
				partialSettings.cookie_preferences,
			),
			pilot_certificate: mergeJsonObjects(
				baseSettings.pilot_certificate,
				partialSettings.pilot_certificate,
			),
			medical_certificate: mergeJsonObjects(
				baseSettings.medical_certificate,
				partialSettings.medical_certificate,
			),
			photo_id: mergeJsonObjects(
				baseSettings.photo_id,
				partialSettings.photo_id,
			),
			updated_at: new Date().toISOString(),
			onboarding_complete:
				partialSettings.onboarding_complete ?? baseSettings.onboarding_complete,
		};

		let error;
		let updatedSettings;

		if (existingSettings) {
			// Update existing settings
			const { error: updateError, data } = await supabase
				.from("settings")
				.update(newSettings)
				.eq("clerk_user_id", userId)
				.select()
				.single();

			error = updateError;
			updatedSettings = data;
		} else {
			// Create new settings
			const { error: insertError, data } = await supabase
				.from("settings")
				.insert(newSettings)
				.select()
				.single();

			error = insertError;
			updatedSettings = data;
		}

		if (error) {
			console.error("Error saving settings:", error);
			return new NextResponse(error.message, { status: 500 });
		}

		return NextResponse.json({
			success: true,
			settings: updatedSettings,
			message: "Settings saved successfully",
		});
	} catch (error) {
		console.error("Error saving settings:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}

export async function OPTIONS() {
	return NextResponse.json(
		{},
		{
			headers: {
				...corsHeaders,
				"Access-Control-Max-Age": "86400",
			},
		},
	);
}
