import { auth } from "@clerk/nextjs/server";

export async function needsAdminAccess() {
  const { orgSlug } = await auth();
  return orgSlug === "admins";
}
