import { auth } from "@clerk/nextjs/server";

export default async function canEdit(userIdFromCourse?: string) {
  const { userId, orgSlug } = await auth();

  // If no user is logged in, they can't edit
  if (!userId) return { allowed: false, userId };

  // Check if user is an org owner - always allowed to edit
  if (orgSlug === "admins") return { allowed: true, userId };

  // If no course ID is provided, just check if they're a content creator
  if (!userIdFromCourse) {
    return { allowed: orgSlug === "content-creators", userId };
  }

  // If course ID is provided:
  // 1. Check if they own the course (matching userIds)
  // 2. And they are a content creator
  if (userIdFromCourse === userId && orgSlug === "content-creators") {
    return { allowed: true, userId };
  }

  return { allowed: false, userId };
}
