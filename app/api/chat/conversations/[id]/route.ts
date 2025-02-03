import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const supabase = await createClerkSupabaseClientSsr();
		const { id } = await params;

		// First verify the conversation belongs to the user
		const { data: conversation } = await supabase
			.from("conversations")
			.select("id")
			.eq("id", id)
			.eq("user_id", userId)
			.single();

		if (!conversation) {
			return NextResponse.json(
				{ error: "Conversation not found" },
				{ status: 404 },
			);
		}

		// Delete all messages first (due to foreign key constraint)
		await supabase.from("messages").delete().eq("conversation_id", id);

		// Then delete the conversation
		await supabase.from("conversations").delete().eq("id", id);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting conversation:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { title } = await request.json();
		if (!title) {
			return NextResponse.json({ error: "Title is required" }, { status: 400 });
		}

		const supabase = await createClerkSupabaseClientSsr();

		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ error: "Conversation ID is required" },
				{ status: 400 },
			);
		}

		// First verify the conversation belongs to the user
		const { data: conversation } = await supabase
			.from("conversations")
			.select("id")
			.eq("id", id)
			.eq("user_id", userId)
			.single();

		if (!conversation) {
			return NextResponse.json(
				{ error: "Conversation not found" },
				{ status: 404 },
			);
		}

		// Update the conversation title
		await supabase.from("conversations").update({ title }).eq("id", id);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error updating conversation:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
