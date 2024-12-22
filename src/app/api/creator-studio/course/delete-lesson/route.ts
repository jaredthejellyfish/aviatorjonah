import { DeleteLessonSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = DeleteLessonSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const { lessonId } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.from("lessons").delete().eq("id", lessonId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Lesson deleted" }, { status: 200 });
}
