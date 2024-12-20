import { auth } from "@clerk/nextjs/server";

export async function needsCreatorAccess() {
  const { has } = await auth();
  return has({ role: "org:content_creators" });
}
