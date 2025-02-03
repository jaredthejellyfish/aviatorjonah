import { useMutation } from "@tanstack/react-query";

interface IssueReportData {
	name: string;
	email: string;
	issueCategory: string;
	details: string;
}

interface IssueReportResponse {
	success: boolean;
	error?: string;
}

const submitIssueReport = async (
	data: IssueReportData,
): Promise<IssueReportResponse> => {
	const response = await fetch("/api/issues", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: data.email,
			name: data.name,
			issueCategory: data.issueCategory,
			details: data.details,
		}),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to submit issue report");
	}

	return response.json();
};

export function useIssueReport() {
	const mutation = useMutation({
		mutationFn: submitIssueReport,
	});

	return {
		submitReport: mutation.mutate,
		submitReportAsync: mutation.mutateAsync,
		isSubmitting: mutation.isPending,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
		data: mutation.data,
	};
}
