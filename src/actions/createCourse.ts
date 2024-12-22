"use server";

import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.string().transform((val) => parseFloat(val)),
  category: z.enum(["programming", "design", "business", "marketing"]),
  level: z.enum(["beginner", "intermediate", "advanced"]),
});

export async function createCourse(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    level: formData.get("level"),
  };

  const userData = await currentUser();
  if (!userData) {
    throw new Error("User not found");
  }
  const { id: userId, firstName, lastName } = userData;
  const instructorName = `${firstName} ${lastName}`;
  const validatedData = createCourseSchema.parse(rawData);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .insert({
      title: validatedData.title,
      description: validatedData.description || null,
      price: validatedData.price,
      category: validatedData.category,
      level: validatedData.level,
      instructor_id: userId || "",
      instructor_name: instructorName,
      draft: true,
    })
    .select();

  if (error || !data || data.length === 0) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course");
  }

  const courseSlug = data[0]?.slug;
  if (!courseSlug) {
    throw new Error("No slug found in response");
  }

  revalidatePath("/content-studio");
  redirect(`/content-studio/edit/${courseSlug}`);
}
