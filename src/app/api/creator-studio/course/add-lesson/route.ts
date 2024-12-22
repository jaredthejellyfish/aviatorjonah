import { AddLessonSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = AddLessonSchema.safeParse(body);

  if (!parsed.success) {
    console.error(parsed.error);
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const supabase = await createClient();

  const { title, description, moduleId } = parsed.data;

  const { error } = await supabase.from("lessons").insert({
    title,
    description,
    module_id: moduleId,
    order_index: 0,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Module added" }, { status: 200 });
}
