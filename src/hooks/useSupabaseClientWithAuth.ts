import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/utils/supabase/db-types";
import { useAuth } from "@clerk/nextjs";

export function useSupabaseClientWithAuth() {
	const { getToken } = useAuth();

	return createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			global: {
				fetch: async (url, options = {}) => {
					const clerkToken = await getToken({ template: "supabase" });

					// Set up headers
					const headers = new Headers(options?.headers);
					if (clerkToken) {
						headers.set("Authorization", `Bearer ${clerkToken}`);
					}

					// Return fetch with auth headers
					return fetch(url, {
						...options,
						headers,
					});
				},
			},
		},
	);
}
