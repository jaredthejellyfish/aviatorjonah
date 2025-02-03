"use client";

import { useRef, useState } from "react";
import { FileUp, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDocuments } from "@/hooks/useDocuments";
import { toast } from "sonner";
import { DocumentMetadata } from "@/hooks/useDocuments";

interface Document {
	name: string;
	path: string;
	url: string;
	created_at: string;
	updated_at: string;
	size?: number;
	metadata?: DocumentMetadata;
}

const documentSchema = z.object({
	metadata: z.object({
		document_type: z.enum([
			"medical_certificate",
			"pilot_license",
			"type_rating",
			"insurance",
			"logbook",
			"other",
		]),
		document_number: z.string().min(1, "Document number is required"),
		issue_date: z.string().min(1, "Issue date is required"),
		expiry_date: z.string().default(""),
		issuing_authority: z.string().min(1, "Issuing authority is required"),
		class: z.enum(["class_1", "class_2", "class_3", "other"]).default("other"),
		ratings: z.array(z.string()).default([]),
		remarks: z.string().default(""),
	}),
});

interface UpdateModalProps {
	isOpen: boolean;
	onClose: () => void;
	currentFile: Document | null;
}

export default function UpdateModal({
	isOpen,
	onClose,
	currentFile,
}: UpdateModalProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { updateFile, isUpdateLoading } = useDocuments();

	const form = useForm<z.infer<typeof documentSchema>>({
		resolver: zodResolver(documentSchema),
		defaultValues: {
			metadata: {
				document_type: currentFile?.metadata?.document_type || "other",
				document_number: currentFile?.metadata?.document_number || "",
				issue_date:
					currentFile?.metadata?.issue_date ||
					new Date().toISOString().split("T")[0],
				expiry_date: currentFile?.metadata?.expiry_date || "",
				issuing_authority: currentFile?.metadata?.issuing_authority || "",
				class: currentFile?.metadata?.class || "other",
				ratings: currentFile?.metadata?.ratings || [],
				remarks: currentFile?.metadata?.remarks || "",
			},
		},
	});

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const handleUpdate = async (values: z.infer<typeof documentSchema>) => {
		if (!currentFile) return;

		try {
			await updateFile({
				file: selectedFile || new File([], currentFile.name),
				path: currentFile.path,
				metadata: values.metadata,
			});
			toast.success("Document updated successfully", {
				description: currentFile.name,
			});
			onClose();
			setSelectedFile(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
		} catch {
			toast.error("Failed to update document", {
				description: "Please try again later",
			});
		}
	};

	if (!currentFile) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md bg-slate-800 border border-slate-700/50">
				<DialogHeader>
					<DialogTitle className="text-slate-200">
						Update Document: {currentFile.name}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleUpdate)}
						className="space-y-4"
					>
						<div
							className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700/50 rounded-lg p-6 cursor-pointer"
							onClick={() => fileInputRef.current?.click()}
						>
							<FileUp className="h-8 w-8 text-slate-400 mb-2" />
							<p className="text-sm text-slate-400">
								{selectedFile
									? selectedFile.name
									: "Click to select a new version of this file (optional)"}
							</p>
							<input
								type="file"
								ref={fileInputRef}
								className="hidden"
								onChange={handleFileSelect}
								accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
							/>
						</div>

						<FormField
							control={form.control}
							name="metadata.document_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-slate-200">
										Document Type
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
												<SelectValue placeholder="Select document type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-slate-800 border-slate-700">
											<SelectItem value="medical_certificate">
												Medical Certificate
											</SelectItem>
											<SelectItem value="pilot_license">
												Pilot License
											</SelectItem>
											<SelectItem value="type_rating">Type Rating</SelectItem>
											<SelectItem value="insurance">Insurance</SelectItem>
											<SelectItem value="logbook">Logbook</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="metadata.document_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-slate-200">
										Document Number
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="bg-slate-700/50 border-slate-600/50 text-slate-200"
											placeholder="Enter document number"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="metadata.issue_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-200">Issue Date</FormLabel>
										<FormControl>
											<Input
												type="date"
												className="bg-slate-700/50 border-slate-600/50 text-slate-200"
												onChange={(e) => field.onChange(e.target.value || "")}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="metadata.expiry_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-slate-200">
											Expiry Date
										</FormLabel>
										<FormControl>
											<Input
												type="date"
												className="bg-slate-700/50 border-slate-600/50 text-slate-200"
												onChange={(e) => field.onChange(e.target.value || "")}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="metadata.issuing_authority"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-slate-200">
										Issuing Authority
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="bg-slate-700/50 border-slate-600/50 text-slate-200"
											placeholder="Enter issuing authority"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="metadata.class"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-slate-200">
										Class (if applicable)
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-slate-200">
												<SelectValue placeholder="Select class" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-slate-800 border-slate-700">
											<SelectItem value="class_1">Class 1</SelectItem>
											<SelectItem value="class_2">Class 2</SelectItem>
											<SelectItem value="class_3">Class 3</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="metadata.remarks"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-slate-200">Remarks</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="bg-slate-700/50 border-slate-600/50 text-slate-200"
											placeholder="Additional remarks"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end gap-3 pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={onClose}
								className="border-slate-700 text-slate-300 hover:bg-slate-700/50"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isUpdateLoading}
								className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
							>
								{isUpdateLoading ? (
									<>
										<Loader2 className="h-4 w-4 animate-spin mr-2" />
										Updating...
									</>
								) : (
									"Update"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
