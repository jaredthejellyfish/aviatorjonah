import { auth, currentUser } from "@clerk/nextjs/server";
import BetaTesterForm from "./BetaTesterForm";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const metadata = {
	title: "AviatorJonah | Beta Program",
	description: "Apply for the AviatorJonah beta program",
};

export default async function BetaPage() {
	const { userId } = await auth();
	const user = await currentUser();

	if (!userId) {
		return (
			<div className="min-h-[50vh] bg-gradient-to-b from-gray-900 to-gray-800 py-32 px-4 sm:px-6 lg:px-8">
				<Card className="max-w-2xl mx-auto bg-gray-800/80 backdrop-blur-lg shadow-2xl border border-red-700/50 rounded-xl mt-10">
					<CardHeader className="space-y-6 pb-8">
						<div className="flex items-center justify-center gap-3">
							<XCircle className="h-8 w-8 text-red-500" />
							<CardTitle className="text-3xl font-bold text-center text-gray-100 tracking-tight">
								Sign In Required
							</CardTitle>
						</div>
						<CardDescription className="text-center text-gray-300 text-lg">
							You must be signed in to apply for the beta program. Please sign
							in or create an account to continue.
						</CardDescription>
						<div className="flex justify-center mt-6 md:hidden">
							<SignInButton mode="modal">
								<button
									type="button"
									className="text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 transition duration-300 ease-in-out rounded-lg px-8 py-3 text-lg font-medium backdrop-blur-sm shadow-lg hover:shadow-red-500/10"
								>
									<span className="flex items-center">
										Sign in to Continue
										<span className="ml-2 text-red-400" aria-hidden="true">
											&rarr;
										</span>
									</span>
								</button>
							</SignInButton>
						</div>
					</CardHeader>
				</Card>
			</div>
		);
	}

	const supabase = await createClerkSupabaseClientSsr();
	const { data, error } = await supabase
		.from("beta_applications")
		.select("*")
		.eq("user_id", userId)
		.maybeSingle();

	if (error) {
		return (
			<div className="min-h-[50vh] bg-gradient-to-b from-gray-900 to-gray-800 py-32 px-4 sm:px-6 lg:px-8">
				<Card className="max-w-2xl mx-auto bg-gray-800/80 backdrop-blur-lg shadow-2xl border border-red-700/50 rounded-xl mt-10">
					<CardHeader className="space-y-2 pb-8">
						<CardTitle className="text-3xl font-bold text-center text-red-400 tracking-tight">
							Error Loading Application
						</CardTitle>
						<CardDescription className="text-center text-gray-300">
							We encountered an error while checking your application status.
							Please try again later.
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	if (data?.granted) redirect("/copilot");

	if (data) {
		return (
			<div className="min-h-[50vh] bg-gradient-to-b from-gray-900 to-gray-800 py-32 px-4 sm:px-6 lg:px-8">
				<Card className="max-w-2xl mx-auto bg-gray-800/80 backdrop-blur-lg shadow-2xl border border-green-700/50 rounded-xl mt-10">
					<CardHeader className="space-y-6 pb-8">
						<div className="flex justify-center">
							<CheckCircle2 className="h-16 w-16 text-green-500" />
						</div>
						<CardTitle className="text-3xl font-bold text-center text-gray-100 tracking-tight">
							Application Received
						</CardTitle>
						<CardDescription className="text-center text-gray-300 text-lg space-y-4">
							<p>
								Thank you for your interest in the CoPilot beta program! Your
								application has been successfully submitted and is currently
								under review.
							</p>
							<p>
								If your application is accepted, we will contact you via email
								with further instructions. In the meantime, you can stay updated
								on our progress by following our weekly updates at{" "}
								<a
									href="https://aviatorjonah.com/updates"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
								>
									aviatorjonah.com/updates
								</a>
							</p>
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<BetaTesterForm
			firstName={user?.firstName ?? ""}
			lastName={user?.lastName ?? ""}
			email={user?.emailAddresses[0].emailAddress ?? ""}
		/>
	);
}
