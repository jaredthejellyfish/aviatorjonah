import React from "react";
import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Logbook } from "./Logbook";
import { transformFlightEntries } from "@/lib/utils/transform-flight-entries";

async function LogbookWrapper() {
	const { userId } = await auth();
	if (!userId) {
		return redirect("/");
	}

	const supabase = await createClerkSupabaseClientSsr();
	const { data } = await supabase
		.from("flight_entries")
		.select("*, aircraft_id(*)")
		.eq("clerk_user_id", userId);

	const transformedEntries = transformFlightEntries(data);

	return <Logbook initialEntries={transformedEntries} />;
}

export default LogbookWrapper;
