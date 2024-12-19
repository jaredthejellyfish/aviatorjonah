import { createClient } from "../supabase/server";

export async function getActiveUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_active_users")
  if (error) {
    console.error(error);
    return null;
  }
  return data as ActiveUsers;
}

export type ActiveUsers = {
  activeUsersThisMonth: number;
  activeUsersLastMonth: number;
} | null;
