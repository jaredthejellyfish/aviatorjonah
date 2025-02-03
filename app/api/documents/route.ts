import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const supabase = await createClerkSupabaseClientSsr();
	const userFolder = `${userId}/`;

	// First check if the user's folder exists
	const { data: existingFolder, error: listError } = await supabase.storage
		.from("documents")
		.list(userFolder, {
			limit: 1,
		});

	// If there's an error that's not just "NoSuchKey" (folder doesn't exist), return error
	if (listError && !listError.message.includes("NoSuchKey")) {
		return NextResponse.json(
			{ error: "Error checking folder" },
			{ status: 500 },
		);
	}

	// If folder doesn't exist, create it with an empty .keep file
	if (!existingFolder || existingFolder.length === 0) {
		const { error: uploadError } = await supabase.storage
			.from("documents")
			.upload(`${userFolder}.keep`, new Blob([""]));

		if (uploadError) {
			return NextResponse.json(
				{ error: "Error creating folder" },
				{ status: 500 },
			);
		}
	}

	// Now list the contents of the user's folder
	const { data: files, error: finalListError } = await supabase.storage
		.from("documents")
		.list(userFolder, {
			limit: 100,
			offset: 0,
			sortBy: { column: "name", order: "asc" },
		});

	if (finalListError) {
		return NextResponse.json({ error: "Error listing files" }, { status: 500 });
	}

	return NextResponse.json({
		message: "Success",
		docs: files,
	});
}
