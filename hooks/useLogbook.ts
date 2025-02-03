import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { FlightEntrySchema } from "@/lib/schemas/flight-schema";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
export type FlightEntry = z.infer<typeof FlightEntrySchema> & {
	id: string;
	clerk_user_id: string;
	created_at: string;
};

async function fetchLogbookEntries(): Promise<FlightEntry[]> {
	const response = await fetch("/api/logbook");
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to fetch logbook entries");
	}
	return response.json();
}

async function createLogbookEntry(
	entry: z.infer<typeof FlightEntrySchema>,
): Promise<FlightEntry> {
	const response = await fetch("/api/logbook", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(entry),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to create logbook entry");
	}

	return response.json();
}

async function deleteLogbookEntry(id: string): Promise<void> {
	const response = await fetch(`/api/logbook?id=${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to delete logbook entry");
	}
}

interface SearchFlightEntry {
	id: string;
	date: string;
	aircraft_type: string;
	aircraft_registration: string;
	departure_airport: string;
	arrival_airport: string;
	departure_time: string;
	arrival_time: string;
	total_time: string;
	night_time: string;
	landings: number;
	conditions: string;
	remarks: string;
	rank: number;
}

async function searchLogbookEntries(
	query: string,
): Promise<SearchFlightEntry[]> {
	const response = await fetch(
		`/api/logbook/search?query=${encodeURIComponent(query)}`,
	);
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to search logbook entries");
	}
	return response.json();
}

export function useLogbook({
	initialEntries = [],
	enableFetch = true,
}: { initialEntries?: FlightEntry[]; enableFetch?: boolean }) {
	const queryClient = useQueryClient();
	const router = useRouter();

	const {
		data: entries = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["logbook"],
		initialData: initialEntries,
		queryFn: fetchLogbookEntries,
		enabled: enableFetch,
	});

	const createMutation = useMutation({
		mutationFn: createLogbookEntry,
		onSuccess: (newEntry) => {
			// Optimistically update the cache
			queryClient.setQueryData<FlightEntry[]>(["logbook"], (old = []) => [
				...old,
				newEntry,
			]);

			router.refresh();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteLogbookEntry,
		onSuccess: (_, deletedId) => {
			// Optimistically update the cache
			queryClient.invalidateQueries({ queryKey: ["logbook"] });
		},
	});

	return {
		entries,
		isLoading,
		error,
		createEntry: createMutation.mutate,
		isCreating: createMutation.isPending,
		createError: createMutation.error,
		deleteEntry: deleteMutation.mutate,
		isDeleting: deleteMutation.isPending,
		deleteError: deleteMutation.error,
	};
}

export function useLogbookSearch() {
	const [currentQuery, setCurrentQuery] = useState<string>("");
	const queryClient = useQueryClient();
	const {
		data: searchResults = [],
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["logbook-search", currentQuery],
		queryFn: () =>
			currentQuery.trim()
				? searchLogbookEntries(currentQuery)
				: Promise.resolve([]),
		staleTime: 0,
		gcTime: 0,
		retry: false,
	});

	const performSearch = useCallback(
		async (query: string) => {
			setCurrentQuery(query);
			if (!query.trim()) {
				queryClient.setQueryData(["logbook-search", ""], []);
				return;
			}
			await refetch();
		},
		[refetch, queryClient],
	);

	return {
		searchResults: currentQuery.trim() ? searchResults : [],
		isLoading,
		error,
		performSearch,
	};
}
