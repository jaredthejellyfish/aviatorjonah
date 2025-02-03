"use client";

import { useState } from "react";
import {
	FileText,
	Download,
	Eye,
	Clock,
	Loader2,
	MoreVertical,
	Trash,
	FileUp,
	Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDocuments, Document } from "@/hooks/useDocuments";
import { toast } from "sonner";
import { stringToTitleCase } from "@/components/utils/stringToTitleCase";

import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { UploadButton } from "./upload-button";
import { Skeleton } from "@/components/ui/skeleton";

const UpdateModal = dynamic(() => import("./update-modal"), {
	ssr: false,
});

const ViewModal = dynamic(() => import("./view-modal"), {
	ssr: false,
});

export function DocumentsList() {
	const [updateFile, setUpdateFile] = useState<Document | null>(null);
	const [viewFile, setViewFile] = useState<Document | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const {
		documents,
		isLoadingDocuments,
		deleteFile,
		isDeleteLoading,
		downloadFile,
		isDownloadLoading,
		resetDownload,
	} = useDocuments();

	const filteredDocuments = documents.filter((doc) => {
		if (!searchQuery.trim()) return true;

		const query = searchQuery.toLowerCase().trim();

		// Search in document name
		if (doc.name.toLowerCase().includes(query)) return true;

		// Search in metadata fields if they exist
		if (doc.metadata) {
			// Search in document type
			if (
				doc.metadata.document_type
					?.toLowerCase()
					.replace("_", " ")
					.includes(query)
			)
				return true;

			// Search in document number
			if (doc.metadata.document_number?.toLowerCase().includes(query))
				return true;

			// Search in issuing authority
			if (doc.metadata.issuing_authority?.toLowerCase().includes(query))
				return true;

			// Search in remarks
			if (doc.metadata.remarks?.toLowerCase().includes(query)) return true;
		}

		return false;
	});

	const handleDownload = async (name: string) => {
		try {
			await downloadFile({ name });
		} catch {
			toast.error("Failed to download document", {
				description: "Please try again later",
			});
			resetDownload();
		}
	};

	const handleDelete = async (path: string, name: string) => {
		try {
			await deleteFile(path);
			toast.success("Document deleted successfully", {
				description: name,
			});
		} catch {
			toast.error("Failed to delete document", {
				description: "Please try again later",
			});
		}
	};

	return (
		<>
			{/* Search and Filter Section */}
			<div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div className="relative w-full md:w-2/3">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
					<Input
						placeholder="Search documents..."
						className="pl-10 bg-slate-700/50 border-slate-600/50 text-slate-200 w-full"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-auto">
					<UploadButton />
				</div>
			</div>

			{/* Documents List */}
			<div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg">
				<div className="p-4">
					<h3 className="text-lg font-medium text-slate-200 px-2">
						Recent Documents
					</h3>
				</div>

				<div className="divide-y divide-slate-700/50">
					{isLoadingDocuments ? (
						<>
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className="p-4 hover:bg-slate-700/30 transition-colors"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-start space-x-4">
											{/* Document Icon */}
											<div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
												<Skeleton className="h-6 w-6" />
											</div>

											{/* Document Info */}
											<div>
												<Skeleton className="h-5 w-48 mb-2" />
												<div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-0.5 my-2">
													<Skeleton className="h-4 w-24" />
													<Skeleton className="h-4 w-32" />
												</div>
												<div className="mt-2 flex flex-wrap gap-2">
													<Skeleton className="h-6 w-24 rounded-full" />
													<Skeleton className="h-6 w-32 rounded-full" />
													<Skeleton className="h-6 w-20 rounded-full" />
												</div>
											</div>
										</div>

										{/* Actions */}
										<div className="flex items-center gap-2">
											<Skeleton className="h-9 w-9 rounded-lg" />
											<Skeleton className="h-9 w-9 rounded-lg" />
											<Skeleton className="h-9 w-9 rounded-lg" />
										</div>
									</div>
								</div>
							))}
						</>
					) : filteredDocuments.length === 0 ? (
						<div className="p-8 text-center">
							<p className="text-slate-400">
								{searchQuery.trim()
									? "No documents found matching your search"
									: "No documents uploaded yet"}
							</p>
						</div>
					) : (
						filteredDocuments.map((doc) => (
							<div
								key={doc.path}
								className="p-4 hover:bg-slate-700/30 transition-colors"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-start space-x-4">
										{/* Document Icon */}
										<div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
											<FileText className="h-6 w-6 text-blue-400" />
										</div>

										{/* Document Info */}
										<div>
											<h4 className="text-slate-200 font-medium">
												{stringToTitleCase(
													doc.metadata?.document_type?.replace("_", " ") || "-",
												)}
											</h4>
											<div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-0.5 my-2">
												<span className="text-xs text-slate-400">
													{doc.size
														? `${(doc.size / 1024).toFixed(2)} KB`
														: "Unknown size"}
												</span>
												<div className="flex items-center gap-1">
													<Clock className="h-3 w-3 text-slate-500" />
													<span className="text-sm text-slate-400">
														Modified{" "}
														{new Date(doc.updated_at).toLocaleDateString()}
													</span>
												</div>
											</div>
											{doc.metadata && (
												<div className="mt-2 flex flex-wrap gap-2">
													{doc.metadata.document_type && (
														<span className="px-2 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
															{stringToTitleCase(
																doc.metadata.document_type.replace("_", " "),
															)}
														</span>
													)}
													{doc.metadata.expiry_date && (
														<span
															className={`px-2 py-1 rounded-full text-xs ${
																new Date(doc.metadata.expiry_date) < new Date()
																	? "bg-red-500/10 text-red-400 border border-red-500/20"
																	: "bg-green-500/10 text-green-400 border border-green-500/20"
															}`}
														>
															{new Date(doc.metadata.expiry_date) < new Date()
																? "Expired"
																: `Expires ${new Date(doc.metadata.expiry_date).toLocaleDateString()}`}
														</span>
													)}
													{doc.metadata.document_number && (
														<span className="px-2 py-1 rounded-full text-xs bg-slate-500/10 text-slate-400 border border-slate-500/20">
															#{doc.metadata.document_number}
														</span>
													)}
												</div>
											)}
										</div>
									</div>

									{/* Actions */}
									<div className="flex items-center gap-2">
										<Button
											variant="ghost"
											size="icon"
											className="text-slate-400 hover:text-slate-200"
											onClick={() => setViewFile(doc)}
										>
											<Eye className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="text-slate-400 hover:text-slate-200"
											onClick={() => handleDownload(doc.path)}
											disabled={isDownloadLoading}
										>
											{isDownloadLoading ? (
												<Loader2 className="h-4 w-4 animate-spin" />
											) : (
												<Download className="h-4 w-4" />
											)}
										</Button>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													className="text-slate-400 hover:text-slate-200"
												>
													<MoreVertical className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												align="end"
												className="w-[160px] bg-slate-800 border-slate-700"
											>
												<DropdownMenuItem
													className="text-slate-200 focus:text-slate-200 focus:bg-slate-700/50 cursor-pointer"
													onClick={() => setUpdateFile(doc)}
												>
													<FileUp className="h-4 w-4 mr-2" />
													Update
												</DropdownMenuItem>
												<DropdownMenuItem
													className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer"
													onClick={() => handleDelete(doc.path, doc.name)}
													disabled={isDeleteLoading}
												>
													<Trash className="h-4 w-4 mr-2" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>

			{/* Update Modal */}
			{updateFile && (
				<UpdateModal
					isOpen={updateFile !== null}
					onClose={() => setUpdateFile(null)}
					currentFile={updateFile}
				/>
			)}

			{/* View Modal */}
			{viewFile && (
				<ViewModal
					isOpen={viewFile !== null}
					onClose={() => setViewFile(null)}
					file={viewFile}
				/>
			)}
		</>
	);
}
