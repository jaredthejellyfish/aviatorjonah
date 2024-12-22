import { UpdateLessonSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = UpdateLessonSchema.safeParse(body);

  if (!parsed.success) {
    console.error(parsed.error);
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const supabase = await createClient();

  const { lessonId, ...updateData } = parsed.data;

  if (!lessonId) {
    return NextResponse.json({ error: "Lesson ID is required" }, { status: 400 });
  }

  // Create update object with only provided fields
  const updateObject: {
    title?: string;
    description?: string;
    content?: string;
    order_index?: number;
  } = {};
  if ('title' in updateData) updateObject.title = updateData.title;
  if ('description' in updateData) updateObject.description = updateData.description;
  if ('content' in updateData) updateObject.content = updateData.content;
  if ('orderIndex' in updateData) updateObject.order_index = updateData.orderIndex;

  const { error, data } = await supabase
    .from("lessons")
    .update(updateObject)
    .eq("id", lessonId)
    .select(`
      slug,
      modules (
        courses (
          slug
        )
      )
    `);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }

  return NextResponse.json({ 
    message: "Lesson updated",
    slug: data[0].slug,
    courseSlug: data?.[0]?.modules?.courses?.slug ?? null,
  }, { status: 200 });
}
