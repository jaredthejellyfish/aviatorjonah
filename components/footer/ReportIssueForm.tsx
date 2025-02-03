"use client";

import { useState, useCallback } from "react";
import { useIssueReport } from "@/hooks/useIssueReport";
import { toast } from "sonner";

interface ReportIssueFormProps {
	isOpen: boolean;
	onClose: () => void;
}

export function ReportIssueForm({ isOpen, onClose }: ReportIssueFormProps) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		issueCategory: "",
		details: "",
	});

	const { submitReportAsync, isSubmitting } = useIssueReport();

	const handleChange = useCallback(
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			>,
		) => {
			const { name, value } = e.target;
			setFormData((prev) => ({ ...prev, [name]: value }));
		},
		[],
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			try {
				await submitReportAsync(formData);
				toast.success(
					"Issue reported successfully. We'll get back to you via email.",
				);
				setFormData({ name: "", email: "", issueCategory: "", details: "" });
				onClose();
			} catch (error) {
				toast.error(
					error instanceof Error
						? error.message
						: "An error occurred while submitting the form.",
				);
			}
		},
		[formData, onClose, submitReportAsync],
	);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
			<div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4">Report an Issue</h2>
				<p className="text-sm text-gray-300 mb-4">
					Please provide details about the issue you&apos;re experiencing.
					We&apos;ll get back to you via email as soon as possible.
				</p>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="name" className="block text-sm font-medium mb-1">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="email" className="block text-sm font-medium mb-1">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="issueCategory"
							className="block text-sm font-medium mb-1"
						>
							Issue Category
						</label>
						<select
							id="issueCategory"
							name="issueCategory"
							value={formData.issueCategory}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Select a category</option>
							<option value="technical">Technical</option>
							<option value="billing">Billing</option>
							<option value="general">General</option>
						</select>
					</div>
					<div className="mb-4">
						<label htmlFor="details" className="block text-sm font-medium mb-1">
							Describe the Issue
						</label>
						<textarea
							id="details"
							name="details"
							value={formData.details}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							rows={4}
						></textarea>
					</div>
					<div className="flex justify-end space-x-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50"
						>
							{isSubmitting ? "Submitting..." : "Submit"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
