import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ path: string }> },
) {
	try {
		const { path } = await params;

		if (!path) {
			return NextResponse.json({ error: "No path provided" }, { status: 400 });
		}

		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const decodedPath = decodeURIComponent(path);
		const fullPath = `${userId}/${decodedPath}`;

		// Ensure user can only access their own files
		if (!fullPath.startsWith(`${userId}/`)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		const supabase = await createClerkSupabaseClientSsr();

		// Download the file
		const { data, error } = await supabase.storage
			.from("documents")
			.download(fullPath);

		if (error) {
			return NextResponse.json(
				{ error: "Failed to fetch file" },
				{ status: 500 },
			);
		}

		// Create response with appropriate headers
		const response = new NextResponse(data);
		response.headers.set("Content-Type", data.type);
		response.headers.set(
			"Content-Disposition",
			`inline; filename="${decodedPath}"`,
		);

		return response;
	} catch (error) {
		console.error("File fetch error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch file" },
			{ status: 500 },
		);
	}
}
