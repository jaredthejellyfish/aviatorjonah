import { createClient } from "@/utils/supabase/server";

export async function getCreatorCourses(creatorId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses_with_enrollment_count")
    .select("*")
    .eq("instructor_id", creatorId)
    .order("title", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export type CreatorCourse = NonNullable<
  Awaited<ReturnType<typeof getCreatorCourses>>
>[number];
export type CreatorCourses = NonNullable<
  Awaited<ReturnType<typeof getCreatorCourses>>
>;
