import { redirect, RedirectType } from "next/navigation";

export async function GET() {
	return redirect("/courses", RedirectType.replace);
}
