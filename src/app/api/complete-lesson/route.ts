import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { takeaway, lesson_id, course_id } = await request.json();

  const supabase = await createClient();
  const authData = await auth();

  if (!authData.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // First check if progress already exists
  const { data: existingProgress, error: fetchError } = await supabase
    .from("progress")
    .select("*")
    .eq("lesson_id", lesson_id)
    .eq("course_id", course_id)
    .eq("user_id", authData.userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 is "not found" error
    return NextResponse.json(
      { message: "Error checking progress" },
      { status: 500 },
    );
  }

  if (existingProgress) {
    return NextResponse.json(
      {
        message: "Lesson already completed",
        details: `You completed this lesson on ${existingProgress.completed_at ? new Date(existingProgress.completed_at).toLocaleDateString() : "an unknown date"}. Each lesson can only be completed once.`,
      },
      { status: 400 },
    );
  }

  // If we get here, no existing progress exists, so create new progress
  const { error: insertError } = await supabase.from("progress").insert([
    {
      lesson_id,
      course_id,
      user_id: authData.userId,
      completed_at: new Date().toISOString(),
      takeaways: takeaway,
      completed: true,
    },
  ]);

  if (insertError) {
    return NextResponse.json(
      { message: "Error saving progress" },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Lesson completed successfully" });
}
