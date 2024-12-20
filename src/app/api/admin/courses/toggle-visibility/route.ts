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



  if (!authData.userId || authData.orgRole !== "org:owner") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data: course, error: fetchError } = await supabase
    .from("courses")
    .select("draft")
    .eq("id", courseId)
    .single();

  if (fetchError) {
    return NextResponse.json({ message: "Failed to fetch course" }, { status: 500 });
  }

  const { error: updateError } = await supabase
    .from("courses")
    .update({
      draft: !course.draft,
    })
    .eq("id", courseId);

  if (updateError) {
    return NextResponse.json({ message: "Failed to update course" }, { status: 500 });
  }

  return NextResponse.json({ message: "Course visibility toggled" }, { status: 200 });
}
