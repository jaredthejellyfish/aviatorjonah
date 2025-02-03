import { NotamResponse } from "@/types/notams";

interface NotamParams {
	icaoLocation: string;
	featureType?: string;
	classification?: "INTL" | "MIL" | "DOM" | "LMIL" | "FDC";
	notamType?: "N" | "R" | "C";
	effectiveStartDate?: string;
	effectiveEndDate?: string;
	sortBy?:
		| "icaoLocation"
		| "notamNumber"
		| "effectiveStartDate"
		| "effectiveEndDate"
		| "featureType";
	sortOrder?: "Asc" | "Desc";
	pageSize?: number;
	pageNum?: number;
}

export async function getNotams(
	params: NotamParams,
): Promise<NotamResponse | null> {
	const baseUrl = "https://external-api.faa.gov/notamapi/v1/notams";
	const searchParams = new URLSearchParams({
		responseFormat: "geoJson",
		icaoLocation: params.icaoLocation,
	});

	// Add optional parameters if provided
	if (params.featureType)
		searchParams.append("featureType", params.featureType);
	if (params.classification)
		searchParams.append("classification", params.classification);
	if (params.notamType) searchParams.append("notamType", params.notamType);
	if (params.effectiveStartDate)
		searchParams.append("effectiveStartDate", params.effectiveStartDate);
	if (params.effectiveEndDate)
		searchParams.append("effectiveEndDate", params.effectiveEndDate);
	if (params.sortBy) searchParams.append("sortBy", params.sortBy);
	if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder);
	if (params.pageSize)
		searchParams.append("pageSize", params.pageSize.toString());
	if (params.pageNum) searchParams.append("pageNum", params.pageNum.toString());

	const url = `${baseUrl}?${searchParams.toString()}`;

	try {
		const headers = new Headers();
		headers.append("client_id", process.env.FAA_CLIENT_ID || "");
		headers.append("client_secret", process.env.FAA_CLIENT_SECRET || "");
		const init = { method: "GET", headers };
		const response = await fetch(url, init);

		if (!response.ok) {
			throw new Error(`Failed to fetch NOTAMs: ${response.statusText}`);
		}

		const mediaType = response.headers.get("content-type");
		let data;
		if (mediaType?.includes("json")) {
			data = await response.json();
		} else {
			data = await response.text();
		}
		return data;
	} catch (error) {
		console.error("Error fetching NOTAMs:", error);
		return null;
	}
}
