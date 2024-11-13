import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { Database } from "./db-types";

// import { auth } from '@clerk/nextjs/server';
// import { createClient as createSupabaseClient } from '@supabase/supabase-js';
// import { Database } from './db-types';

// export async function createClient() {
//   // The `useAuth()` hook is used to access the `getToken()` method
//   const { getToken } = await auth();

//   return createSupabaseClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       global: {
//         // Get the custom Supabase token from Clerk
//         fetch: async (url, options = {}) => {
//           const clerkToken = await getToken({
//             template: 'supabase',
//           });

//           // Insert the Clerk Supabase token into the headers
//           const headers = new Headers(options?.headers);
//           headers.set('Authorization', `Bearer ${clerkToken}`);

//           // Now call the default fetch
//           return fetch(url, {
//             ...options,
//             headers,
//           });
//         },
//       },
//     }
//   );
// }

export async function createClient() {
  const cookieStore = await cookies();
  const { getToken } = await auth();

  const token = await getToken({ template: "supabase" });
  const authToken = token ? { Authorization: `Bearer ${token}` } : null;

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { "Cache-Control": "no-store", ...authToken },
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken({
            template: "supabase",
          });

          // Insert the Clerk Supabase token into the headers
          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${clerkToken}`);

          // Now call the default fetch
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
