"use server";

import { CreateCourseSchema, UpdateCourseSchema } from "@/lib/schemas";
import canEdit from "@/utils/helpers/canEdit";
import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

export async function addCourse(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    level: formData.get("level"),
  };

  const parsed = CreateCourseSchema.safeParse(rawData);

  if (!parsed.success) {
    console.error(parsed.error);
    return { success: false };
  }

  const { allowed, userId } = await canEdit();

  if (!allowed) return { success: false };

  const supabase = await createClient();

  const userData = await currentUser();
  if (!userData) return { success: false };
  const { firstName, lastName } = userData;
  const instructorName = `${firstName} ${lastName}`;

  const { error, data } = await supabase
    .from("courses")
    .insert({
      title: parsed.data.title,
      description: parsed.data.description || null,
      price: parsed.data.price,
      category: parsed.data.category,
      level: parsed.data.level,
      instructor_id: userId || "",
      instructor_name: instructorName,
      draft: true,
    })
    .select();

  if (error) return { success: false };

  return { success: true, data };
}

export async function removeCourse(formData: FormData) {
  const courseId = formData.get("courseId");
  const userIdFromCourse = formData.get("userIdFromCourse");
  if (!courseId) return { success: false };
  if (!userIdFromCourse) return { success: false };

  const { allowed } = await canEdit(userIdFromCourse as string);
  if (!allowed) return { success: false };

  const supabase = await createClient();

  const { error } = await supabase.from("courses").delete().eq("id", courseId);

  if (error) return { success: false };

  return { success: true };
}

export async function updateCourse(formData: FormData) {
  const courseId = formData.get("courseId");
  if (!courseId) throw new Error("Course ID is required");

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    level: formData.get("level"),
  };

  const parsed = UpdateCourseSchema.safeParse(rawData);
  if (!parsed.success) throw new Error(parsed.error.message);

  const { allowed } = await canEdit(courseId as string);
  if (!allowed) throw new Error("You are not a creator");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .update(parsed.data)
    .eq("id", courseId);

  if (error) throw new Error("Failed to update course");

  return { data };
}

export async function setCourseDraftStatus(formData: FormData) {
  const courseId = formData.get("courseId");
  const draftStatus = formData.get("draftStatus");

  if (!courseId) return { success: false };
  if (!draftStatus) return { success: false };

  const { allowed } = await canEdit(courseId as string);
  if (!allowed) return { success: false };

  const supabase = await createClient();

  const { error } = await supabase
    .from("courses")
    .update({ draft: draftStatus === "true" })
    .eq("id", courseId);

  if (error) return { success: false };

  return { success: true };
}
