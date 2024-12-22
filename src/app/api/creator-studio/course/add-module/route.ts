import { AddModuleSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = AddModuleSchema.safeParse(body);

  if (!parsed.success) {
    console.error(parsed.error);
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const supabase = await createClient();

  const { title, description, courseId, orderIndex } = parsed.data;

  const { error } = await supabase.from("modules").insert({
    title,
    description,
    course_id: courseId,
    order_index: orderIndex,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Module added" }, { status: 200 });
}
