import { createClient } from "../supabase/server";

export async function getPopularCourses() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_popular_courses");
  if (error) {
    console.error(error);
    return null;
  }
  return data as PopularCourses;
}

export type PopularCourses =
  | {
      title: string;
      enrollments: number;
      totalPercent: number;
    }[]
  | null;
