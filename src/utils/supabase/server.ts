import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { Database } from "./db-types";

export async function createClient() {
  const cookieStore = await cookies();
  const { getToken } = await auth();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { "Cache-Control": "no-store" },
        fetch: async (url, options = {}) => {
          // Try to get the Clerk token
          const clerkToken = await getToken({
            template: "supabase",
          });

          const headers = new Headers(options?.headers);
          
          // Only set the Authorization header if we have a token
          if (clerkToken) {
            headers.set("Authorization", `Bearer ${clerkToken}`);
          }

          // Call fetch with or without the Authorization header
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch (error) {
            console.error(error);
          }
        },
      },
    },
  );
}