import type { Database } from "@/lib/supabase/db-types";

type Settings = Database["public"]["Tables"]["settings"]["Row"];

export async function fetchSettings(): Promise<{
	settings: Partial<Settings>;
}> {
	const response = await fetch("/api/settings");
	if (!response.ok) {
		throw new Error("Failed to fetch settings");
	}
	return response.json();
}

export async function updateSettings(
	newSettings: Partial<Settings>,
): Promise<{ success: boolean; message: string }> {
	const response = await fetch("/api/settings", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newSettings),
	});

	if (!response.ok) {
		throw new Error("Failed to update settings");
	}
	return response.json();
}
