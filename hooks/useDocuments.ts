import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Database } from "@/lib/supabase/db-types";

export type Document =
	Database["public"]["Tables"]["document_metadata"]["Row"] & {
		name: string;
		path: string;
		url: string;
		created_at: string;
		updated_at: string;
		size?: number;
		metadata?: DocumentMetadata;
	};

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

interface FileResponse {
	message: string;
	file?: {
		name: string;
		path: string;
		url: string;
	};
}

interface DocumentsResponse {
	files: Document[];
}

interface FileError {
	error: string;
}

interface UploadParams {
	file: File;
	metadata?: DocumentMetadata;
}

interface UpdateParams {
	file: File;
	path: string;
	metadata?: DocumentMetadata;
}

interface ViewFileParams {
	path: string;
	name: string;
}

interface ViewFileResponse {
	url: string;
	type: string;
	metadata?: DocumentMetadata;
}

interface DownloadParams {
	name: string;
}

export const useDocuments = () => {
	const queryClient = useQueryClient();

	// Query for fetching documents
	const {
		data: documents,
		isLoading: isLoadingDocuments,
		isError: isErrorDocuments,
		error: documentsError,
		refetch: refetchDocuments,
	} = useQuery<DocumentsResponse, FileError>({
		queryKey: ["documents"],
		queryFn: async () => {
			const response = await fetch("/api/documents/file");
			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to fetch documents");
			}
			return response.json();
		},
		refetchInterval: 60000, // Refetch every 60 seconds
	});

	// Upload file mutation
	const {
		mutateAsync: uploadFileMutation,
		isPending: isUploadLoading,
		isError: isUploadError,
		error: uploadError,
		reset: resetUpload,
	} = useMutation<FileResponse, FileError, UploadParams>({
		mutationFn: async ({ file, metadata }) => {
			const formData = new FormData();
			formData.append("file", file);
			if (metadata) {
				formData.append("metadata", JSON.stringify(metadata));
			}

			const response = await fetch("/api/documents/file", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Upload failed");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
		},
	});

	// Update file mutation
	const {
		mutateAsync: updateFileMutation,
		isPending: isUpdateLoading,
		isError: isUpdateError,
		error: updateError,
		reset: resetUpdate,
	} = useMutation<FileResponse, FileError, UpdateParams>({
		mutationFn: async ({ file, path, metadata }) => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("path", path);
			if (metadata) {
				formData.append("metadata", JSON.stringify(metadata));
			}

			const response = await fetch("/api/documents/file", {
				method: "PATCH",
				body: formData,
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Update failed");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
		},
	});

	// Delete file mutation
	const {
		mutateAsync: deleteFileMutation,
		isPending: isDeleteLoading,
		isError: isDeleteError,
		error: deleteError,
		reset: resetDelete,
	} = useMutation<FileResponse, FileError, string>({
		mutationFn: async (path: string) => {
			const response = await fetch(
				`/api/documents/file?path=${encodeURIComponent(path)}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Delete failed");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
		},
	});

	// Download file mutation
	const {
		mutateAsync: downloadFileMutation,
		isPending: isDownloadLoading,
		isError: isDownloadError,
		error: downloadError,
		reset: resetDownload,
	} = useMutation<void, FileError, DownloadParams>({
		mutationFn: async ({ name }) => {
			if (!name.split("/").pop()) throw new Error("Invalid file name");

			const response = await fetch(
				`/api/documents/file/${encodeURIComponent(name.split("/").pop()!)}`,
			);

			if (!response.ok) throw new Error("Download failed");

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = name.split("/").pop()!;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		},
	});

	// View file function
	const viewFile = async ({
		path,
		name,
	}: ViewFileParams): Promise<ViewFileResponse> => {
		const fileName = path.split("/").pop() || name;

		// Fetch file and metadata in parallel
		const [fileResponse, metadataResponse] = await Promise.all([
			fetch(`/api/documents/file/${encodeURIComponent(fileName)}`),
			fetch(`/api/documents/metadata/${encodeURIComponent(fileName)}`),
		]);

		if (!fileResponse.ok) {
			const error = await fileResponse.json();
			throw new Error(error.error || "Failed to view file");
		}

		// Create object URL for the file
		const blob = await fileResponse.blob();
		const url = URL.createObjectURL(blob);

		// Get metadata if available
		let metadata = undefined;
		if (metadataResponse.ok) {
			const metadataData = await metadataResponse.json();
			metadata = metadataData.metadata;
		}

		return {
			url,
			type: blob.type,
			metadata,
		};
	};

	return {
		// Documents query
		documents: documents?.files || [],
		isLoadingDocuments,
		isErrorDocuments,
		documentsError,
		refetchDocuments,

		// Upload mutation
		uploadFile: uploadFileMutation,
		isUploadLoading,
		isUploadError,
		uploadError,
		resetUpload,

		// Update mutation
		updateFile: updateFileMutation,
		isUpdateLoading,
		isUpdateError,
		updateError,
		resetUpdate,

		// Delete mutation
		deleteFile: deleteFileMutation,
		isDeleteLoading,
		isDeleteError,
		deleteError,
		resetDelete,

		// Download mutation
		downloadFile: downloadFileMutation,
		isDownloadLoading,
		isDownloadError,
		downloadError,
		resetDownload,

		// Combined loading state
		isLoading:
			isLoadingDocuments ||
			isUploadLoading ||
			isUpdateLoading ||
			isDeleteLoading ||
			isDownloadLoading,

		viewFile,
	};
};
