import { createClient } from "../supabase/server";

export async function getAllCourses() {
    const supabase = await createClient();


    const { data, error } = await supabase.from("courses").select("*");
    if (error) {
        console.error(error);
        return [];
    }
    return data;


}

export type Course = NonNullable<Awaited<ReturnType<typeof getAllCourses>>>[number];
export type Courses = NonNullable<Awaited<ReturnType<typeof getAllCourses>>>;
