"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Document } from "@/hooks/useDocuments";
import { useQuery } from "@tanstack/react-query";
import { stringToTitleCase } from "@/components/utils/stringToTitleCase";

interface ViewModalProps {
	isOpen: boolean;
	onClose: () => void;
	file: Document | null;
}

interface DocumentResponse {
	url: string;
	type: string;
	metadata: {
		document_type?:
			| "medical_certificate"
			| "pilot_license"
			| "type_rating"
			| "insurance"
			| "logbook"
			| "other";
		document_number?: string;
		issue_date?: string;
		expiry_date?: string;
		issuing_authority?: string;
		class?: "class_1" | "class_2" | "class_3" | "other";
		ratings?: string[];
		remarks?: string;
	};
}

async function fetchDocument({
	path,
	name,
}: {
	path: string;
	name: string;
}): Promise<DocumentResponse> {
	const fileName = path.split("/").pop() || name;
	const [fileResponse, metadataResponse] = await Promise.all([
		fetch(`/api/documents/file/${encodeURIComponent(fileName)}`),
		fetch(`/api/documents/metadata/${encodeURIComponent(fileName)}`),
	]);

	if (!fileResponse.ok) {
		const error = await fileResponse.json();
		throw new Error(error.error || "Failed to view file");
	}

	const blob = await fileResponse.blob();
	const url = URL.createObjectURL(blob);

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
}

export default function ViewModal({ isOpen, onClose, file }: ViewModalProps) {
	const { data, isLoading, error } = useQuery<DocumentResponse, Error>({
		queryKey: ["document", file?.path, file?.name],
		queryFn: () => {
			if (!file?.path || !file?.name) {
				throw new Error("No file selected");
			}
			return fetchDocument({ path: file.path, name: file.name });
		},
		enabled: isOpen && !!file && !!file.path && !!file.name,
		staleTime: 500,
		gcTime: 500,
		refetchOnWindowFocus: false,
	});

	// Cleanup object URL when component unmounts or data changes
	useEffect(() => {
		return () => {
			if (data?.url) {
				URL.revokeObjectURL(data.url);
			}
		};
	}, [data?.url]);

	if (!file) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className="sm:max-w-5xl p-0 bg-slate-800 border border-slate-700/50 overflow-hidden"
				aria-labelledby="view-document"
				aria-describedby="view-document"
			>
				<DialogHeader>
					<DialogTitle className="mt-5 text-start text-2xl px-3">
						{stringToTitleCase(
							file.metadata?.document_type?.replace("_", " ") || "-",
						)}
					</DialogTitle>
					<DialogDescription className="px-3 text-slate-400 hidden">
						{file.metadata?.document_type &&
							`Type: ${file.metadata?.document_type.replace("_", " ")}`}
						{file.metadata?.document_number &&
							` • Number: ${file.metadata?.document_number}`}
						{file.metadata?.expiry_date &&
							` • ${
								new Date(file.metadata?.expiry_date) < new Date()
									? "Expired"
									: `Expires: ${new Date(file.metadata?.expiry_date).toLocaleDateString()}`
							}`}
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col h-full">
					{/* Document Viewer */}
					<div className="flex-1 min-h-0 relative">
						<div
							className="relative w-full"
							style={{ paddingBottom: "56.25%" }}
						>
							{" "}
							{/* 16:9 Aspect Ratio (9/16 = 0.5625) */}
							{isLoading ? (
								<div className="absolute inset-0 flex items-center justify-center">
									<Loader2 className="h-6 w-6 animate-spin text-slate-400" />
								</div>
							) : error ? (
								<div className="absolute inset-0 flex items-center justify-center text-red-400">
									{error instanceof Error
										? error.message
										: "Failed to load file"}
								</div>
							) : data?.url ? (
								<Image
									src={data.url}
									alt={file.name}
									fill
									className="object-contain"
									unoptimized
									priority
								/>
							) : null}
						</div>
					</div>

					{/* Metadata Section */}
					<div className="flex-none px-6 pb-6 bg-slate-800/95 backdrop-blur supports-[backdrop-filter]:bg-slate-800/75">
						<div className="space-y-2">
							{/* Detailed Metadata */}
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
								{data?.metadata?.document_type && (
									<div>
										<label className="text-xs text-slate-400">Type</label>
										<p className="text-sm text-slate-200">
											{stringToTitleCase(
												data.metadata.document_type.replace("_", " "),
											)}
										</p>
									</div>
								)}
								{data?.metadata?.document_number && (
									<div>
										<label className="text-xs text-slate-400">
											Document Number
										</label>
										<p className="text-sm text-slate-200">
											{data.metadata.document_number.toUpperCase()}
										</p>
									</div>
								)}
								{data?.metadata?.issuing_authority && (
									<div>
										<label className="text-xs text-slate-400">
											Issuing Authority
										</label>
										<p className="text-sm text-slate-200">
											{stringToTitleCase(data.metadata.issuing_authority) ||
												"-"}
										</p>
									</div>
								)}
								{data?.metadata?.class && (
									<div>
										<label className="text-xs text-slate-400">Class</label>
										<p className="text-sm text-slate-200">
											{stringToTitleCase(data.metadata.class.replace("_", " "))}
										</p>
									</div>
								)}
								{data?.metadata?.issue_date && (
									<div>
										<label className="text-xs text-slate-400">Issue Date</label>
										<p className="text-sm text-slate-200">
											{new Date(data.metadata.issue_date).toLocaleDateString()}
										</p>
									</div>
								)}
								{data?.metadata?.expiry_date && (
									<div>
										<label className="text-xs text-slate-400">
											Expiry Date
										</label>
										<p className="text-sm text-slate-200">
											{new Date(data.metadata.expiry_date).toLocaleDateString()}
										</p>
									</div>
								)}
								{data?.metadata?.remarks && (
									<div className="col-span-2 sm:col-span-3">
										<label className="text-xs text-slate-400">Remarks</label>
										<p className="text-sm text-slate-200">
											{data.metadata.remarks}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
