import { NextRequest, NextResponse } from "next/server";
import { CopilotSettingsUpdateSchema } from "@/lib/schemas/copilot-settings-schema";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import type { Database } from "@/lib/supabase/db-types";

type CopilotSettingsRow =
	Database["public"]["Tables"]["copilot_settings"]["Row"];
type CopilotSettingsInsert =
	Database["public"]["Tables"]["copilot_settings"]["Insert"];

// Add CORS headers helper
const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Default settings that match our schema and database constraints
const DEFAULT_SETTINGS: Omit<
	CopilotSettingsRow,
	"id" | "user_id" | "created_at" | "updated_at"
> = {
	tone: "professional",
	temperature: 0.0, // Conservative setting for more deterministic outputs
	top_p: 0.9, // Good balance between creativity and consistency
	top_k: 40, // Reasonable value for token selection
	max_tokens: 2048, // Standard length limit
	presence_penalty: 0, // No penalty for topic presence
	frequency_penalty: 0, // Correctly set to zero as required
	show_intermediate_steps: false, // Default to not showing intermediate steps
};

export async function GET() {
	try {
		const session = await auth();
		const userId = session?.userId;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const supabase = await createClerkSupabaseClientSsr();
		const { data: settings, error } = await supabase
			.from("copilot_settings")
			.select("*")
			.eq("user_id", userId)
			.single();

		if (error && error.code !== "PGRST116") {
			console.error("Error fetching settings:", error);
			return new NextResponse("Internal Server Error", { status: 500 });
		}

		// Return the settings with proper typing
		return NextResponse.json({
			settings:
				settings ||
				({
					user_id: userId,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
					...DEFAULT_SETTINGS,
				} as CopilotSettingsRow),
		});
	} catch (error) {
		console.error("Error fetching settings:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const session = await auth();
		const userId = session?.userId;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { settings: partialSettings } = await req.json();
		const parsedUpdate = CopilotSettingsUpdateSchema.parse(partialSettings);
		const supabase = await createClerkSupabaseClientSsr();

		// Find existing settings
		const { data: existingSettings, error: fetchError } = await supabase
			.from("copilot_settings")
			.select("*")
			.eq("user_id", userId)
			.single();

		if (fetchError && fetchError.code !== "PGRST116") {
			console.error("Error fetching existing settings:", fetchError);
			return new NextResponse("Error fetching settings", { status: 500 });
		}

		// Prepare the settings object by merging with existing or default settings
		const baseSettings: Omit<CopilotSettingsRow, "id"> = existingSettings || {
			user_id: userId,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			...DEFAULT_SETTINGS,
		};

		// Create the new settings object with proper database column names
		const newSettings: CopilotSettingsInsert = {
			user_id: userId,
			top_k: parsedUpdate.topK ?? baseSettings.top_k,
			max_tokens: parsedUpdate.maxTokens ?? baseSettings.max_tokens,
			temperature: parsedUpdate.temperature ?? baseSettings.temperature,
			top_p: parsedUpdate.topP ?? baseSettings.top_p,
			presence_penalty:
				parsedUpdate.presencePenalty ?? baseSettings.presence_penalty,
			frequency_penalty:
				parsedUpdate.frequencyPenalty ?? baseSettings.frequency_penalty,
			tone: parsedUpdate.tone ?? baseSettings.tone,
			show_intermediate_steps:
				parsedUpdate.show_intermediate_steps ??
				baseSettings.show_intermediate_steps,
			updated_at: new Date().toISOString(),
		};

		let error;
		let updatedSettings;

		if (existingSettings) {
			// Update existing settings
			const { error: updateError, data } = await supabase
				.from("copilot_settings")
				.update(newSettings)
				.eq("user_id", userId)
				.select()
				.single();

			error = updateError;
			updatedSettings = data;
		} else {
			// Create new settings
			const { error: insertError, data } = await supabase
				.from("copilot_settings")
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
		if (error instanceof Error) {
			return new NextResponse(error.message, { status: 400 });
		}
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
