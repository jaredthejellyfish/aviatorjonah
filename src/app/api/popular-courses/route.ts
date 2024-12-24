import { NextResponse } from "next/server";

import { getAllCourses } from "@/utils/helpers/getAllCourses";

export async function GET() {
  const courses = await getAllCourses(true);
  return NextResponse.json(courses);
}
