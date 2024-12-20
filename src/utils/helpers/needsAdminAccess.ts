import { auth } from "@clerk/nextjs/server";

export async function needsAdminAccess() {
  const { has } = await auth();
  return has({ role: "org:owner" });
}
