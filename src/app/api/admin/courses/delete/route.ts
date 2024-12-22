import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const RequestBody = z.object({
  courseId: z.string(),
});

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { courseId: string };

  const { courseId } = RequestBody.parse(body);

  const supabase = await createClient();
  const authData = await auth();

  if (!authData.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // First check if course exists
  const { data: course, error: fetchError } = await supabase
    .from("courses")
    .select("id, instructor_id")
    .eq("id", courseId)
    .single();


  if (fetchError) {
    return NextResponse.json({ message: "Failed to fetch course" }, { status: 500 });
  }

  if (!course) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }

  if ((course.instructor_id !== authData.userId) && (authData.orgRole !== "org:owner")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Delete the course
  const { error: deleteError } = await supabase
    .from("courses")
    .delete()
    .eq("id", courseId);

  if (deleteError) {
    return NextResponse.json({ message: "Failed to delete course" }, { status: 500 });
  }

  return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 });
}
