import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseClientSsr } from "../server";

export default async function needsBetaAccess(): Promise<{
	redirect: boolean;
}> {
	const { userId } = await auth();

	if (!userId) {
		return { redirect: true };
	}

	const supabase = await createClerkSupabaseClientSsr();

	const { data } = userId
		? await supabase
				.from("beta_applications")
				.select("*")
				.eq("user_id", userId)
				.maybeSingle()
		: { data: null };

	const hasAccess = data?.granted;
	return { redirect: !hasAccess };
}
