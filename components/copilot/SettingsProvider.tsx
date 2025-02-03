"use client";

import { createContext, ReactNode, use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSettings, updateSettings } from "@/lib/api/settings";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Database } from "@/lib/supabase/db-types";

type Settings = Database["public"]["Tables"]["settings"]["Row"];

interface SettingsContextType {
	settings: Partial<Settings>;
	updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
	isLoading: boolean;
	error: Error | null;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
	undefined,
);

export function SettingsProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { data, isLoading, error } = useQuery({
		queryKey: ["settings"],
		queryFn: fetchSettings,
	});

	const { mutateAsync: mutateSettings } = useMutation({
		mutationFn: updateSettings,
		onMutate: async (newSettings) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: ["settings"] });

			// Snapshot the previous value
			const previousSettings = queryClient.getQueryData(["settings"]);

			// Optimistically update to the new value
			queryClient.setQueryData(
				["settings"],
				(old: { settings: Partial<Settings> } | undefined) => ({
					settings: {
						...(old?.settings || {}),
						...newSettings,
					},
				}),
			);

			// Return a context object with the snapshotted value
			return { previousSettings };
		},
		onError: (err, newSettings, context) => {
			// If the mutation fails, use the context returned from onMutate to roll back
			queryClient.setQueryData(["settings"], context?.previousSettings);
			toast.error("Failed to update settings");
		},
		onSuccess: () => {
			toast.success("Settings updated successfully");
		},
		onSettled: () => {
			// Always refetch after error or success to ensure we have the latest data
			queryClient.invalidateQueries({ queryKey: ["settings"] });
			router.refresh();
		},
	});

	const handleUpdateSettings = async (newSettings: Partial<Settings>) => {
		await mutateSettings(newSettings);
	};

	return (
		<SettingsContext.Provider
			value={{
				settings: data?.settings ?? {},
				updateSettings: handleUpdateSettings,
				isLoading,
				error: error as Error | null,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
}

export function useSettings() {
	const context = use(SettingsContext);
	if (context === undefined) {
		throw new Error("useSettings must be used within a SettingsProvider");
	}
	return context;
}
