import { createClient } from "../supabase/server";

export async function getCourseBySlugWithProgress(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select(
      ` *,
            instructor:instructor_id,
            modules:modules (
              *,
              lessons:lessons (
                id, title, description, reading_time, slug, order_index, content,
                progress:progress (*)
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

export type Course = Awaited<ReturnType<typeof getCourseBySlugWithProgress>>;
