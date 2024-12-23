import { createClient } from "../supabase/server";

export async function getEnrolledStudents(courseId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses_with_enrollment_count")
    .select("enrollment_count")
    .eq("id", courseId)
    .maybeSingle();

  if (error || !data) {
    console.error(error);
    return null;
  }
  return data;
}

export type EnrolledStudents = {
  enrolledStudents: number;
} | null;
