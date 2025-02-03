import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const url = request.nextUrl.clone();
		const query = url.searchParams.get("query");

		if (!query) {
			return NextResponse.json({ error: "No query provided" }, { status: 400 });
		}

		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const supabase = await createClerkSupabaseClientSsr();
		const { data, error } = await supabase.rpc("search_flights_fts", {
			search_query: query,
			user_id: userId,
		});

		if (error) {
			return NextResponse.json(
				{ error: "Failed to search flight entries" },
				{ status: 500 },
			);
		}

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal server error", message: error },
			{ status: 500 },
		);
	}
}
