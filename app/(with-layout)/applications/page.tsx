import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export const metadata = {
	title: "AviatorJonah | Applications",
	description: "View and manage beta program applications",
};

function truncateText(text: string, length: number = 30) {
	if (text.length <= length) return text;
	return text.slice(0, length) + "...";
}

export default async function ApplicationsPage() {
	const { userId } = await auth();

	if (!userId) {
		return (
			<div className="min-h-[50vh] bg-gradient-to-b from-gray-900 to-gray-800 py-32 px-4 sm:px-6 lg:px-8">
				<Card className="max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-lg shadow-2xl border border-red-700/50 rounded-xl mt-10">
					<CardHeader className="space-y-2 pb-8">
						<CardTitle className="text-3xl font-bold text-center text-red-400 tracking-tight">
							Access Denied
						</CardTitle>
						<CardDescription className="text-center text-gray-300">
							You must be signed in to view applications.
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	const supabase = await createClerkSupabaseClientSsr();
	const { data: applications, error } = await supabase
		.from("beta_applications")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		return (
			<div className="min-h-[50vh] bg-gradient-to-b from-gray-900 to-gray-800 py-32 px-4 sm:px-6 lg:px-8">
				<Card className="max-w-4xl mx-auto bg-gray-800/80 backdrop-blur-lg shadow-2xl border border-red-700/50 rounded-xl mt-10">
					<CardHeader className="space-y-2 pb-8">
						<CardTitle className="text-3xl font-bold text-center text-red-400 tracking-tight">
							Error Loading Applications
						</CardTitle>
						<CardDescription className="text-center text-gray-300">
							We encountered an error while loading the applications. Please try
							again later.
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-[50vh] bg-gradient-to-b from-gray-900 to-gray-800 py-32 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col gap-2 w-full items-center mt-10 mb-4">
					<span className="text-2xl font-bold text-gray-100">
						Beta Program Applications
					</span>
					<span className="text-sm text-gray-300">
						View and manage applications for the CoPilot beta program.
					</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{applications?.map((application) => (
						<Card
							key={application.id}
							className="bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300"
						>
							<CardHeader>
								<div className="flex justify-between items-start">
									<div>
										<CardTitle className="text-xl font-semibold text-gray-100">
											{application.name}
										</CardTitle>
										<CardDescription className="mt-1">
											{application.email}
										</CardDescription>
									</div>
									<Badge
										className={cn(
											application.granted
												? "bg-green-500/50"
												: "bg-yellow-500/50",
										)}
									>
										{application.granted ? "Approved" : "Pending"}
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-sm font-medium text-gray-400">Country</p>
										<p className="text-sm text-gray-200">
											{application.country}
										</p>
									</div>
									<div>
										<p className="text-sm font-medium text-gray-400">
											Applied On
										</p>
										<p className="text-sm text-gray-200">
											{format(new Date(application.created_at), "MMM d, yyyy")}
										</p>
									</div>
								</div>

								<div>
									<p className="text-sm font-medium text-gray-400 mb-1">
										Aviation Experience
									</p>
									<HoverCard>
										<HoverCardTrigger className="cursor-help text-sm text-gray-200">
											{truncateText(application.aviation_experience, 50)}
										</HoverCardTrigger>
										<HoverCardContent>
											<div className="space-y-2">
												<p className="text-sm">
													{application.aviation_experience}
												</p>
											</div>
										</HoverCardContent>
									</HoverCard>
								</div>

								<div>
									<p className="text-sm font-medium text-gray-400 mb-1">
										Current Roles
									</p>
									<HoverCard>
										<HoverCardTrigger className="cursor-help text-sm text-gray-200">
											{truncateText(application.current_roles, 50)}
										</HoverCardTrigger>
										<HoverCardContent>
											<div className="space-y-2">
												<p className="text-sm">{application.current_roles}</p>
											</div>
										</HoverCardContent>
									</HoverCard>
								</div>

								{application.discord && (
									<div>
										<p className="text-sm font-medium text-gray-400">Discord</p>
										<p className="text-sm text-gray-200">
											{application.discord}
										</p>
									</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
