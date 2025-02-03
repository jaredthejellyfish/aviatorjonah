import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./db-types";

export async function createClerkSupabaseClientSsr() {
	// The `useAuth()` hook is used to access the `getToken()` method
	const { getToken } = await auth();

	return createClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			global: {
				// Get the custom Supabase token from Clerk
				fetch: async (url, options = {}) => {
					const clerkToken = await getToken({
						template: "supabase",
					});

					// Insert the Clerk Supabase token into the headers
					const headers = new Headers(options?.headers);
					headers.set("Authorization", `Bearer ${clerkToken}`);
					headers.set("Cache-Control", "no-store");

					// Now call the default fetch
					return fetch(url, {
						...options,
						headers,
					});
				},
			},
		},
	);
}
