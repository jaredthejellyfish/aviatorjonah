import { NextResponse } from "next/server";

import { getAllCourses } from "@/utils/helpers/getAllCourses";

export async function GET() {
	const courses = await getAllCourses(true);
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return NextResponse.json(courses);
}
