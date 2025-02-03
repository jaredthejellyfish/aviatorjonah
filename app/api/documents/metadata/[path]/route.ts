import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ path: string }> },
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { path } = await params;
		const fullPath = `${userId}/${path}`;

		// Ensure user can only access their own files
		if (!fullPath.startsWith(`${userId}/`)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		const supabase = await createClerkSupabaseClientSsr();

		// Get the file metadata from the document_metadata table
		const { data: metadata, error } = await supabase
			.from("document_metadata")
			.select("*")
			.eq("file_path", fullPath)
			.single();

		if (error) {
			console.error("Metadata fetch error:", error);
			return NextResponse.json({ error: "File not found" }, { status: 404 });
		}

		return NextResponse.json({
			metadata: {
				document_type: metadata.document_type,
				document_number: metadata.document_number,
				issue_date: metadata.issue_date,
				expiry_date: metadata.expiry_date,
				issuing_authority: metadata.issuing_authority,
				class: metadata.class,
				ratings: metadata.ratings,
				remarks: metadata.remarks,
			},
			created_at: metadata.created_at,
			updated_at: metadata.updated_at,
		});
	} catch (error) {
		console.error("Metadata fetch error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch metadata" },
			{ status: 500 },
		);
	}
}

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ path: string }> },
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { path } = await params;
		const fullPath = `${userId}/${path}`;

		// Ensure user can only access their own files
		if (!fullPath.startsWith(`${userId}/`)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		const metadata = await request.json();
		const supabase = await createClerkSupabaseClientSsr();

		// Update the metadata in the document_metadata table
		const { error } = await supabase
			.from("document_metadata")
			.update({
				document_type: metadata.document_type,
				document_number: metadata.document_number,
				issue_date: metadata.issue_date,
				expiry_date: metadata.expiry_date,
				issuing_authority: metadata.issuing_authority,
				class: metadata.class,
				ratings: metadata.ratings,
				remarks: metadata.remarks,
			})
			.eq("file_path", fullPath);

		if (error) {
			console.error("Metadata update error:", error);
			return NextResponse.json(
				{ error: "Failed to update metadata" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ message: "Metadata updated successfully" });
	} catch (error) {
		console.error("Metadata update error:", error);
		return NextResponse.json(
			{ error: "Failed to update metadata" },
			{ status: 500 },
		);
	}
}
