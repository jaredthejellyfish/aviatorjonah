import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface DocumentMetadata {
	issue_date?: string;
	expiry_date?: string;
	document_number?: string;
	document_type?:
		| "medical_certificate"
		| "pilot_license"
		| "type_rating"
		| "insurance"
		| "logbook"
		| "other";
	issuing_authority?: string;
	class?: "class_1" | "class_2" | "class_3" | "other";
	ratings?: string[];
	remarks?: string;
}

export async function GET() {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const supabase = await createClerkSupabaseClientSsr();

		// Get files from storage
		const { data: files, error: storageError } = await supabase.storage
			.from("documents")
			.list(`${userId}/`, {
				sortBy: { column: "created_at", order: "desc" },
			});

		if (storageError) {
			return NextResponse.json(
				{ error: "Failed to fetch documents" },
				{ status: 500 },
			);
		}

		// Get metadata for all files
		const { data: metadataList, error: metadataError } = await supabase
			.from("document_metadata")
			.select("*")
			.eq("user_id", userId);

		if (metadataError) {
			console.error("Metadata fetch error:", metadataError);
			return NextResponse.json(
				{ error: "Failed to fetch metadata" },
				{ status: 500 },
			);
		}

		// Create a map of file paths to metadata
		const metadataMap = new Map(metadataList.map((m) => [m.file_path, m]));

		// Get public URLs and combine with metadata
		const filesWithMetadata = files.map((file) => {
			const {
				data: { publicUrl },
			} = supabase.storage
				.from("documents")
				.getPublicUrl(`${userId}/${file.name}`);

			const metadata = metadataMap.get(`${userId}/${file.name}`);

			return {
				name: file.name,
				path: `${userId}/${file.name}`,
				url: publicUrl,
				created_at: metadata?.created_at || file.created_at,
				updated_at: metadata?.updated_at || file.updated_at,
				size: file.metadata?.size,
				metadata: metadata
					? {
							document_type: metadata.document_type,
							document_number: metadata.document_number,
							issue_date: metadata.issue_date,
							expiry_date: metadata.expiry_date,
							issuing_authority: metadata.issuing_authority,
							class: metadata.class,
							ratings: metadata.ratings,
							remarks: metadata.remarks,
						}
					: undefined,
			};
		});

		return NextResponse.json({
			files: filesWithMetadata,
		});
	} catch (error) {
		console.error("Fetch error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch documents" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const formData = await request.formData();
		const file = formData.get("file") as File;
		const metadataStr = formData.get("metadata") as string;
		const metadata = metadataStr
			? (JSON.parse(metadataStr) as DocumentMetadata)
			: null;

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		const supabase = await createClerkSupabaseClientSsr();

		// Upload file to storage
		const { error: uploadError } = await supabase.storage
			.from("documents")
			.upload(`${userId}/${file.name}`, file);

		if (uploadError) {
			return NextResponse.json(
				{ error: "Failed to upload file" },
				{ status: 500 },
			);
		}

		// Create metadata record
		if (metadata) {
			const { error: metadataError } = await supabase
				.from("document_metadata")
				.insert({
					user_id: userId,
					file_path: `${userId}/${file.name}`,
					file_name: file.name,
					document_type: metadata.document_type || "other",
					document_number: metadata.document_number,
					issue_date: metadata.issue_date,
					expiry_date: metadata.expiry_date,
					issuing_authority: metadata.issuing_authority,
					class: metadata.class,
					ratings: metadata.ratings,
					remarks: metadata.remarks,
				});

			if (metadataError) {
				console.error("Metadata creation error:", metadataError);
				// Don't return error here as the file was uploaded successfully
			}
		}

		// Get public URL for the uploaded file
		const {
			data: { publicUrl },
		} = supabase.storage
			.from("documents")
			.getPublicUrl(`${userId}/${file.name}`);

		return NextResponse.json({
			message: "File uploaded successfully",
			file: {
				name: file.name,
				path: `${userId}/${file.name}`,
				url: publicUrl,
			},
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json(
			{ error: "Failed to upload file" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const path = searchParams.get("path");

		if (!path) {
			return NextResponse.json({ error: "No path provided" }, { status: 400 });
		}

		// Ensure user can only delete their own files
		if (!path.startsWith(`${userId}/`)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		const supabase = await createClerkSupabaseClientSsr();

		// Delete metadata first
		const { error: metadataError } = await supabase
			.from("document_metadata")
			.delete()
			.eq("file_path", path);

		if (metadataError) {
			console.error("Metadata deletion error:", metadataError);
			// Continue with file deletion even if metadata deletion fails
		}

		// Delete the file from storage
		const { error: storageError } = await supabase.storage
			.from("documents")
			.remove([path]);

		if (storageError) {
			return NextResponse.json(
				{ error: "Failed to delete file" },
				{ status: 500 },
			);
		}

		return NextResponse.json({
			message: "File deleted successfully",
		});
	} catch (error) {
		console.error("Delete error:", error);
		return NextResponse.json(
			{ error: "Failed to delete file" },
			{ status: 500 },
		);
	}
}

export async function PATCH(request: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const formData = await request.formData();
		const file = formData.get("file") as File;
		const path = formData.get("path") as string;
		const metadataStr = formData.get("metadata") as string;
		const metadata = metadataStr
			? (JSON.parse(metadataStr) as DocumentMetadata)
			: null;

		if (!path) {
			return NextResponse.json({ error: "No path provided" }, { status: 400 });
		}

		// Ensure user can only update their own files
		if (!path.startsWith(`${userId}/`)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		const supabase = await createClerkSupabaseClientSsr();

		// Update file if provided
		if (file) {
			const { error: uploadError } = await supabase.storage
				.from("documents")
				.update(path, file);

			if (uploadError) {
				return NextResponse.json(
					{ error: "Failed to update file" },
					{ status: 500 },
				);
			}
		}

		// Update metadata if provided
		if (metadata) {
			const { error: metadataError } = await supabase
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
				.eq("file_path", path);

			if (metadataError) {
				console.error("Metadata update error:", metadataError);
				return NextResponse.json(
					{ error: "Failed to update metadata" },
					{ status: 500 },
				);
			}
		}

		// Get public URL for the file
		const {
			data: { publicUrl },
		} = supabase.storage.from("documents").getPublicUrl(path);

		return NextResponse.json({
			message: "File updated successfully",
			file: {
				name: path.split("/").pop()!,
				path: path,
				url: publicUrl,
			},
		});
	} catch (error) {
		console.error("Update error:", error);
		return NextResponse.json(
			{ error: "Failed to update file" },
			{ status: 500 },
		);
	}
}
