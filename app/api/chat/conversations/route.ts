import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const supabase = await createClerkSupabaseClientSsr();
		const conversations = await supabase
			.from("conversations")
			.select("*")
			.eq("user_id", userId)
			.order("created_at", { ascending: false });
		if (conversations.error) {
			return NextResponse.json(
				{ error: conversations.error.message },
				{ status: 500 },
			);
		}

		return NextResponse.json(conversations.data);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
