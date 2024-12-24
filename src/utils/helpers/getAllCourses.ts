import { createClient } from "@/utils/supabase/server";

export async function getAllCourses(noDraft: boolean = false) {
	const supabase = await createClient();

	const query = !noDraft
		? supabase.from("courses").select("*").order("title", { ascending: false })
		: supabase
				.from("courses")
				.select("*")
				.order("title", { ascending: false })
				.is("draft", false);

	const { data, error } = await query;

	if (error) {
		console.error(error);
		return [];
	}
	return data;
}

export type Course = NonNullable<
	Awaited<ReturnType<typeof getAllCourses>>
>[number];
export type Courses = NonNullable<Awaited<ReturnType<typeof getAllCourses>>>;
