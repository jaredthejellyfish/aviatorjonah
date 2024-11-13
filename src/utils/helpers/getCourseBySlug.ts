import { createClient } from "../supabase/server";

export async function getCourseBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select(
      ` *,
        instructor:instructor_id,
        modules:modules (
          *,
          lessons:lessons_public (
            id, title, description, reading_time, slug, order_index
          )
        ),
        enrollments:enrollments (
          *,
          user:user_id
        ),
        assignments:assignments (
          *,
          submissions:submissions (*)
        )`,
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

export type Course = Awaited<ReturnType<typeof getCourseBySlug>>;
