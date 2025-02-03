"use client";

import { createContext, ReactNode, use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type CopilotSettings,
	type CopilotSettingsUpdate,
} from "@/lib/schemas/copilot-settings-schema";
import { toast } from "sonner";

interface CopilotSettingsContextType {
	settings: CopilotSettings | undefined;
	updateSettings: (newSettings: CopilotSettingsUpdate) => void;
	isLoading: boolean;
	error: Error | null;
}

const CopilotSettingsContext = createContext<
	CopilotSettingsContextType | undefined
>(undefined);

async function fetchCopilotSettings(): Promise<CopilotSettings> {
	const response = await fetch("/api/chat/settings", {
		headers: {
			"Cache-Control": "no-store",
			Pragma: "no-cache",
			Expires: "0",
			Vary: "Accept-Encoding",
			"Accept-Encoding": "gzip, deflate, br",
			Accept: "*/*",
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to fetch copilot settings");
	}

	const data = await response.json();

	if (data?.error) {
		throw new Error("Error fetching data.");
	}

	return data.settings;
}

async function updateCopilotSettings(
	settings: CopilotSettingsUpdate,
): Promise<CopilotSettings> {
	const response = await fetch("/api/chat/settings", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store",
		},
		body: JSON.stringify({ settings }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to update copilot settings");
	}

	const data = await response.json();

	if (data?.error) {
		throw new Error("Error updating settings.");
	}

	return data.settings;
}

export function CopilotSettingsProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient();

	const {
		data: settings,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["copilot-settings"],
		queryFn: fetchCopilotSettings,
		staleTime: 30000, // Consider data fresh for 30 seconds
	});

	const updateMutation = useMutation({
		mutationFn: updateCopilotSettings,
		onMutate: async (newSettings) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: ["copilot-settings"] });

			// Snapshot the previous value
			const previousSettings = queryClient.getQueryData<CopilotSettings>([
				"copilot-settings",
			]);

			// Create an optimistic version of the settings
			const optimisticSettings: CopilotSettings = {
				...previousSettings!,
				...newSettings,
			};

			// Optimistically update to the new value
			queryClient.setQueryData<CopilotSettings>(
				["copilot-settings"],
				optimisticSettings,
			);

			// Return a context object with the snapshotted value
			return { previousSettings };
		},
		onError: (_err, _newSettings, context) => {
			// If the mutation fails, use the context returned from onMutate to roll back
			queryClient.setQueryData(["copilot-settings"], context?.previousSettings);
			toast.error("Failed to save settings. Please try again.");
		},
		onSuccess: (updatedSettings) => {
			// On successful update, directly set the new data without refetching
			queryClient.setQueryData(["copilot-settings"], updatedSettings);
		},
	});

	return (
		<CopilotSettingsContext.Provider
			value={{
				settings,
				updateSettings: updateMutation.mutate,
				isLoading,
				error: error as Error | null,
			}}
		>
			{children}
		</CopilotSettingsContext.Provider>
	);
}

export function useCopilotSettings() {
	const context = use(CopilotSettingsContext);
	if (context === undefined) {
		throw new Error(
			"useCopilotSettings must be used within a CopilotSettingsProvider",
		);
	}
	return context;
}
