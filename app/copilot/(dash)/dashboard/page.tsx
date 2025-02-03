import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
	Plane,
	Cloud,
	ExternalLink,
	Bell,
	Clock,
	Calendar,
	AlertTriangle,
	Newspaper,
	IdCard,
	ChevronRight,
} from "lucide-react";

import { currentUser } from "@clerk/nextjs/server";
import Heading from "@/components/copilot/home/Heading";
import { redirect } from "next/navigation";
import { getWeatherData } from "@/lib/getWeatherDat";
import { getNotams } from "@/lib/getNotams";
import type { NotamResponse, NotamFeature } from "@/types/notams";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";

export const metadata = {
	title: "Copilot | Dashboard",
	description: "Your digital flight companion",
};

// Static data

const DEFAULT_LAST_FLIGHT = {
	route: "KJFK → KLAX",
	duration: "5h 45m",
	aircraft: "B737-800",
	date: "Jan 18, 2025",
};

const quickLinks = [
	{
		title: "Charts & Publications",
		description: "Access digital charts and publications",
		href: "#",
	},
	{
		title: "Flight Planning Tools",
		description: "Plan your next flight",
		href: "#",
	},
	{
		title: "Weather Briefing",
		description: "Get detailed weather information",
		href: "#",
	},
	{
		title: "Training Resources",
		description: "Access training materials",
		href: "#",
	},
];

// Helper function to determine NOTAM priority
function getNotamPriority(notam: NotamFeature): "high" | "normal" {
	const text = notam.properties.coreNOTAMData.notam.text.toLowerCase();
	const highPriorityKeywords = [
		"closed",
		"closure",
		"emergency",
		"hazard",
		"warning",
		"danger",
		"prohibited",
	];
	return highPriorityKeywords.some((keyword) => text.includes(keyword))
		? "high"
		: "normal";
}

export default async function Home() {
	const user = await currentUser();

	if (!user) {
		return redirect("/sign-in");
	}

	// Get user settings from Supabase
	const supabase = await createClerkSupabaseClientSsr();
	const { data: userSettings, error: settingsError } = await supabase
		.from("settings")
		.select("*")
		.eq("clerk_user_id", user.id)
		.single();

	if (settingsError && settingsError.code !== "PGRST116") {
		// PGRST116 is "no rows returned"
		console.error("Error fetching settings:", settingsError);
	}

	const { weather, homeAirport } = await getWeatherData(userSettings);

	// Fetch NOTAMs for the home airport
	let notamData: NotamResponse | null = null;
	if (homeAirport?.icao) {
		try {
			notamData = await getNotams({
				icaoLocation: homeAirport.icao,
				pageSize: 10,
				sortBy: "effectiveStartDate",
				sortOrder: "Desc",
			});
		} catch (error) {
			console.error("Error fetching NOTAMs:", error);
		}
	}

	const lastFlight = DEFAULT_LAST_FLIGHT;

	return (
		<div className="min-h-screen w-full p-4 sm:p-6">
			<div className="w-full space-y-6 max-w-[1800px] mx-auto">
				{/* Header */}
				<Heading firstName={user?.firstName || "Pilot"} />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
					{/* Last Flight Card */}
					<Card className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border-slate-700/30 hover:border-sky-500/30 transition-all duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<Plane className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
								<span className="text-lg sm:text-xl">Last Flight</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between text-sm">
									<span className="text-slate-400">Route</span>
									<span className="font-medium text-sky-400">
										{lastFlight.route}
									</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-slate-400">Duration</span>
									<div className="flex items-center space-x-2">
										<Clock className="h-4 w-4 text-slate-500" />
										<span className="font-medium text-white">
											{lastFlight.duration}
										</span>
									</div>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-slate-400">Aircraft</span>
									<span className="font-medium text-white">
										{lastFlight.aircraft}
									</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-slate-400">Date</span>
									<div className="flex items-center space-x-2">
										<Calendar className="h-4 w-4 text-slate-500" />
										<span className="font-medium text-white">
											{lastFlight.date}
										</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Currency Card */}
					<Card className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border-slate-700/30 hover:border-emerald-500/30 transition-all duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<IdCard className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
								<span className="text-lg sm:text-xl">Currency Status</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="space-y-4">
								<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
									<div className="flex items-center justify-between text-sm">
										<span className="text-slate-400">Medical</span>
										<span className="font-medium text-emerald-400">
											Valid until Mar 15
										</span>
									</div>
								</div>
								<div className="p-3 rounded-lg bg-white/5 border border-slate-700/30">
									<div className="flex items-center justify-between text-sm">
										<span className="text-slate-400">BFR</span>
										<span className="font-medium text-white">
											Due in 4 months
										</span>
									</div>
								</div>
								<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
									<div className="flex items-center justify-between text-sm">
										<span className="text-slate-400">Night Currency</span>
										<span className="font-medium text-emerald-400">
											Current
										</span>
									</div>
								</div>
								<div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
									<div className="flex items-center justify-between text-sm">
										<span className="text-slate-400">IFR Currency</span>
										<span className="font-medium text-amber-400">
											4 approaches needed
										</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Weather Card */}
					<Card className="group relative overflow-hidden bg-white/5 backdrop-blur-lg border-slate-700/30 hover:border-sky-500/30 transition-all duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<Cloud className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
								<span className="text-lg sm:text-xl">
									{homeAirport?.icao} Weather
								</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							{!weather ? (
								<div className="space-y-4">
									<div className="p-3 sm:p-4 rounded-lg bg-white/5 border border-slate-700/30">
										<div className="flex items-center space-x-2">
											<AlertTriangle className="h-5 w-5 text-slate-400" />
											<p className="text-sm text-slate-400">
												Weather data unavailable. Please check your home airport
												settings.
											</p>
										</div>
									</div>
								</div>
							) : (
								<div className="grid grid-cols-2 gap-4">
									<div className="p-3 sm:p-4 rounded-lg bg-white/5 border border-slate-700/30">
										<p className="text-sm text-slate-400 mb-1">Temperature</p>
										<p className="text-base sm:text-lg font-medium text-white">
											{weather?.temperature}
										</p>
									</div>
									<div className="p-3 sm:p-4 rounded-lg bg-white/5 border border-slate-700/30">
										<p className="text-sm text-slate-400 mb-1">Wind</p>
										<p className="text-base sm:text-lg font-medium text-white">
											{weather?.wind}
										</p>
									</div>
									<div className="p-3 sm:p-4 rounded-lg bg-white/5 border border-slate-700/30">
										<p className="text-sm text-slate-400 mb-1">Visibility</p>
										<p className="text-base sm:text-lg font-medium text-sky-400">
											{weather?.visibility}
										</p>
									</div>
									<div className="p-3 sm:p-4 rounded-lg bg-white/5 border border-slate-700/30">
										<p className="text-sm text-slate-400 mb-1">Ceiling</p>
										<p className="text-base sm:text-lg font-medium text-white">
											{weather?.ceiling}
										</p>
									</div>

									<div className=" flex-row w-full block">
										<p className="text-sm text-slate-400 mb-1">Updated at</p>
										<p className="text-sm font-medium text-slate-300">
											{new Date(
												Number(weather?.updatedAt) * 1000,
											).toLocaleString()}
										</p>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* NOTAMs */}
					<Card className="group relative overflow-hidden md:col-span-3 bg-white/5 backdrop-blur-lg border-slate-700/30 hover:border-rose-500/30 transition-all duration-300">
						<div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<Bell className="h-5 w-5 sm:h-6 sm:w-6 text-rose-400" />
								<span className="text-lg sm:text-xl">NOTAMs Center</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="space-y-4">
								{!homeAirport?.icao ? (
									<Alert className="bg-white/5 border-slate-700/30 backdrop-blur-lg flex flex-col items-start justify-center">
										<AlertTriangle className="h-5 w-5 text-amber-400" />
										<AlertTitle>
											<span className="text-amber-400">
												No Home Airport Set
											</span>
										</AlertTitle>
										<AlertDescription>
											<span className="text-slate-300">
												Please set your home airport in settings to view NOTAMs.
											</span>
										</AlertDescription>
									</Alert>
								) : !notamData ? (
									<Alert className="bg-white/5 border-slate-700/30 backdrop-blur-lg flex flex-col items-start justify-center">
										<AlertTriangle className="h-5 w-5 text-amber-400" />
										<AlertTitle>
											<span className="text-amber-400">
												Unable to Load NOTAMs
											</span>
										</AlertTitle>
										<AlertDescription>
											<span className="text-slate-300">
												There was an error loading NOTAMs. Please try again
												later.
											</span>
										</AlertDescription>
									</Alert>
								) : notamData.items.length === 0 ? (
									<Alert className="bg-white/5 border-slate-700/30 backdrop-blur-lg flex flex-col items-start justify-center">
										<AlertTriangle className="h-5 w-5 text-red-400" />
										<AlertTitle>
											<span className="text-red-400">No Active NOTAMs</span>
										</AlertTitle>
										<AlertDescription>
											<span className="text-slate-300">
												There are no active NOTAMs for {homeAirport.icao}.
											</span>
										</AlertDescription>
									</Alert>
								) : (
									<>
										{notamData.items.slice(0, 2).map((notam, index) => {
											const priority = getNotamPriority(notam);
											return (
												<Alert
													key={index}
													className={`
                            ${
															priority === "high"
																? "bg-amber-500/10 border-amber-500/30"
																: "bg-white/5 border-slate-700/30"
														} backdrop-blur-lg flex flex-col items-start justify-center
                          `}
												>
													<AlertTriangle
														className={`
                              h-5 w-5 ${priority === "high" ? "text-amber-400" : "text-red-400"}
                            `}
													/>
													<AlertTitle>
														<span
															className={`
                                font-medium ${priority === "high" ? "text-amber-400" : "text-red-400"}
                              `}
														>
															{notam.properties.coreNOTAMData.notam.location}
														</span>
													</AlertTitle>
													<AlertDescription>
														<span className="text-slate-300">
															{notam.properties.coreNOTAMData.notam.text}
														</span>
													</AlertDescription>
												</Alert>
											);
										})}

										{notamData.items.length > 2 && (
											<Dialog>
												<DialogTrigger asChild>
													<Button
														variant="ghost"
														className="w-full mt-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10"
													>
														<span>
															Show {notamData.items.length - 2} More NOTAMs
														</span>
														<ChevronRight className="h-4 w-4 ml-2" />
													</Button>
												</DialogTrigger>
												<DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-slate-200">
													<DialogHeader>
														<DialogTitle className="text-lg font-semibold text-slate-200">
															All Active NOTAMs for {homeAirport.icao}
														</DialogTitle>
													</DialogHeader>
													<div className="space-y-4 pt-4 divide-y divide-slate-700/50">
														{notamData.items.map((notam, index) => {
															const priority = getNotamPriority(notam);
															return (
																<Alert
																	key={index}
																	className={`
                                    ${
																			priority === "high"
																				? "bg-amber-500/10 border-amber-500/30"
																				: "bg-white/5 border-slate-700/30"
																		} backdrop-blur-lg flex flex-col items-start justify-center
                                  `}
																>
																	<AlertTriangle
																		className={`
                                      h-5 w-5 ${priority === "high" ? "text-amber-400" : "text-red-400"}
                                    `}
																	/>
																	<AlertTitle>
																		<span
																			className={`
                                        font-medium ${priority === "high" ? "text-amber-400" : "text-red-400"}
                                      `}
																		>
																			{
																				notam.properties.coreNOTAMData.notam
																					.location
																			}
																		</span>
																	</AlertTitle>
																	<AlertDescription>
																		<span className="text-slate-300">
																			{
																				notam.properties.coreNOTAMData.notam
																					.text
																			}
																		</span>
																	</AlertDescription>
																</Alert>
															);
														})}
													</div>
												</DialogContent>
											</Dialog>
										)}
									</>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Quick Links */}
					<Card className="group relative overflow-hidden md:col-span-2 bg-white/5 backdrop-blur-lg border-slate-700/30 hover:border-purple-500/30 transition-all duration-300 h-fit">
						<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-violet-400" />
								<span className="text-lg sm:text-xl">Quick Links</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{quickLinks.map((link, index) => (
									<a
										key={index}
										href={link.href}
										className="group p-4 rounded-lg bg-white/5 border border-slate-700/30 hover:bg-white/10 hover:border-violet-500/30 transition-all duration-300"
									>
										<h3 className="font-medium text-white group-hover:text-violet-400 transition-colors">
											{link.title}
										</h3>
										<p className="text-sm text-slate-400 mt-1">
											{link.description}
										</p>
									</a>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Latest News */}
					<Card className="group relative overflow-hidden md:col-span-1 bg-white/5 backdrop-blur-lg border-slate-700/30 hover:border-indigo-500/30 transition-all duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
						<CardHeader className="px-4 sm:px-6">
							<CardTitle className="flex items-center space-x-3 text-white">
								<Newspaper className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
								<span className="text-lg sm:text-xl">Latest News</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 sm:px-6">
							<div className="space-y-4">
								<div className="group p-4 rounded-lg bg-white/5 border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300">
									<div className="flex items-center justify-between mb-2">
										<span className="text-xs text-indigo-400 font-medium">
											FAA UPDATE
										</span>
										<span className="text-xs text-slate-400">2h ago</span>
									</div>
									<h3 className="font-medium text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
										New ADS-B Requirements for International Flights
									</h3>
									<p className="text-sm text-slate-400 mt-1 line-clamp-2">
										The FAA announces updated requirements for ADS-B equipment
										on international flights, effective June 2024.
									</p>
								</div>

								<div className="group p-4 rounded-lg bg-white/5 border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300">
									<div className="flex items-center justify-between mb-2">
										<span className="text-xs text-indigo-400 font-medium">
											SAFETY ALERT
										</span>
										<span className="text-xs text-slate-400">5h ago</span>
									</div>
									<h3 className="font-medium text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
										Weather Radar System Updates Coming Soon
									</h3>
									<p className="text-sm text-slate-400 mt-1 line-clamp-2">
										Major updates to the national weather radar system will
										improve accuracy and reduce latency in weather reporting.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
