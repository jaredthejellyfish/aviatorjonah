import { DeleteModuleSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = DeleteModuleSchema.safeParse(body);

  if (!parsed.success) {
    console.error(parsed.error);
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const supabase = await createClient();

  const { moduleId } = parsed.data;

  const { error } = await supabase
    .from("modules")
    .delete()
    .eq("id", moduleId)
    .select();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Module removed", moduleId }, { status: 200 });
}
