import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export function LoadingStateBetaAccess() {
	return (
		<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
			<div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse">
				<span className="w-32 h-6 bg-gray-200 rounded"></span>
			</div>
		</div>
	);
}

async function BetaAccess() {
	const { userId } = await auth();

	const supabase = await createClerkSupabaseClientSsr();
	const { data } = userId
		? await supabase
				.from("beta_applications")
				.select("*")
				.eq("user_id", userId)
				.maybeSingle()
		: { data: null };

	if (data?.granted) {
		return (
			<Link
				href="/copilot/dashboard"
				className="flex flex-col sm:flex-row justify-center items-center gap-4"
			>
				<p className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
					Access CoPilot
				</p>
			</Link>
		);
	}

	return data ? (
		<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
			<p className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
				You have already applied for the beta program.
			</p>
		</div>
	) : (
		<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
			<Link
				href="/applications/beta"
				className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
			>
				Request Beta Access
			</Link>
		</div>
	);
}

export default BetaAccess;
