import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { getWeatherData } from "@/lib/getWeatherDat";
import { getMetar, MetarData } from "@/lib/getMetar";
import { getTaf } from "@/lib/getTaf";
import { getNotams } from "@/lib/getNotams";
import { currentUser } from "@clerk/nextjs/server";
import { Cloud, AlertTriangle, ChevronRight, InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import AirportSearch from "@/components/copilot/weather/airport-search";
import { getFlightCategory } from "@/lib/getFlightCategory";
import { NotamResponse } from "@/types/notams";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import { getSIGMETs } from "@/lib/getSIGMETs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

// Define SIGMET type
export interface SIGMET {
	airSigmetId: number;
	icaoId: string;
	alphaChar: string;
	validTimeFrom: number;
	validTimeTo: number;
	airSigmetType: string;
	hazard: string;
	severity: number;
	altitudeLow1: number | null;
	altitudeHi1: number | null;
	rawAirSigmet: string;
}

export const metadata = {
	title: "Copilot | Weather",
	description: "Get weather information for your home airport and beyond",
};

export default async function WeatherComponent() {
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

	const sigmetData = await getSIGMETs({
		icao: userSettings?.home_airport || undefined,
		country: homeAirport?.country || undefined,
	});

	// Filter out any empty or invalid SIGMETs
	const validSigmets = sigmetData.filter(
		(sigmet: SIGMET) =>
			sigmet && sigmet.rawAirSigmet && sigmet.airSigmetType === "SIGMET",
	);

	// Fetch METAR, TAF, and NOTAM data
	let metarData: MetarData | null = null;
	let tafData = null;
	let notamData: NotamResponse | null = null;

	if (homeAirport?.icao) {
		try {
			const getCachedWeather = unstable_cache(
				async ({ homeICAO }: { homeICAO: string }) =>
					await Promise.all([
						getMetar(homeICAO),
						getTaf({ ids: homeICAO }),
						getNotams({
							icaoLocation: homeICAO,
							pageSize: 10,
							sortBy: "effectiveStartDate",
							sortOrder: "Desc",
						}).catch((error) => {
							console.error("Error fetching NOTAMs:", error);
							return null;
						}),
					]),
				["weather-dashboard", homeAirport.icao],
				{ revalidate: 300 }, // Cache for 5 minutes
			);

			const [metarResponse, tafResponse, notamResponse] =
				await getCachedWeather({ homeICAO: homeAirport.icao });

			metarData = metarResponse[0];
			tafData = tafResponse[0];
			notamData = notamResponse ?? null;
		} catch (error) {
			console.error("Error fetching aviation weather:", error);
		}
	}

	const flightCategory = metarData ? getFlightCategory(metarData) : null;

	if (!weather || !homeAirport || weather.error) {
		return (
			<div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6">
				<h2 className="text-2xl font-semibold text-slate-200 mb-4">
					Weather Information
				</h2>
				<div className="space-y-4">
					<div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600/50">
						<div className="flex items-center space-x-3">
							<Cloud className="h-5 w-5 text-slate-400" />
							<p className="text-sm text-slate-400">
								{weather?.error ||
									"Unable to fetch weather data. Please verify your home airport is set correctly in your settings."}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6 p-3 md:p-0">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div className="flex flex-col items-start justify-center">
					<h2 className="text-2xl font-semibold text-slate-200">
						Weather at {homeAirport.name}
					</h2>
					<p className="text-slate-400 text-sm">
						{homeAirport.city}, {homeAirport.country}
					</p>
				</div>
				<div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
					<div className="w-full md:w-[300px]">
						<AirportSearch />
					</div>
					<div className="flex items-center gap-2">
						<Image
							src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
							alt={weather.description}
							className="w-16 h-16"
							width={64}
							height={64}
						/>
						<div className="text-right">
							<p className="text-3xl font-bold text-slate-200">
								{weather.temperature}
							</p>
							<p className="text-slate-400 capitalize">{weather.description}</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Primary Weather Info */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium text-slate-300">
							Current Conditions
						</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Feels Like</p>
								<p className="text-lg font-medium text-slate-200">
									{weather.feelsLike}
								</p>
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4 relative">
								<p className="text-sm text-slate-400">Wind</p>
								<p className="text-lg font-medium text-slate-200">
									{weather.wind}
								</p>
								{weather.windGust && (
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger
												asChild
												className="w-4 h-4 absolute top-3 right-3 text-blue-500"
											>
												<InfoIcon className="cursor-help" />
											</TooltipTrigger>
											<TooltipContent className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-4">
												<span>
													<span className="text-neutral-400">Gusts:</span>{" "}
													{weather.windGust}
												</span>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								)}
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Visibility</p>
								<p className="text-lg font-medium text-slate-200">
									{weather.visibility}
								</p>
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Ceiling</p>
								<p className="text-lg font-medium text-slate-200">
									{weather.ceiling}
								</p>
							</div>
						</div>
					</div>

					{/* Additional Details */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium text-slate-300">Details</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Temperature Range</p>
								<p className="text-lg font-medium text-slate-200">
									{weather.tempMin} - {weather.tempMax}
								</p>
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Humidity</p>
								<p className="text-lg font-medium text-slate-200">
									{weather.humidity}%
								</p>
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Pressure</p>
								<p className="text-lg font-medium text-slate-200">
									{weather.pressure} hPa
								</p>
							</div>
							<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
								<p className="text-sm text-slate-400">Sun Times</p>
								<div className="flex flex-row items-center gap-x-3">
									<span className="text-slate-200 flex flex-row items-center gap-x-1">
										<span className="text-neutral-400 sm:block hidden">↑</span>{" "}
										{weather.sunrise?.replace(/:\d{2}\s/, " ")}
									</span>
									<span className="text-slate-200 flex flex-row items-center gap-x-1">
										<span className="text-neutral-400 sm:block hidden">↓</span>{" "}
										{weather.sunset?.replace(/:\d{2}\s/, " ")}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Aviation Weather Section */}
				<div className="mt-6 space-y-4">
					<h3 className="text-lg font-medium text-slate-300">
						Aviation Weather
					</h3>

					{/* METAR and TAF */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<div className="flex justify-between items-center mb-2">
								<p className="text-sm text-slate-400">METAR</p>
								{metarData && (
									<span className="text-xs text-green-400 px-2 py-1 rounded-full bg-green-400/10">
										{new Date(metarData.reportTime).toLocaleTimeString()}
									</span>
								)}
							</div>
							<p className="text-sm font-mono text-slate-200">
								{metarData?.rawOb || "No METAR data available"}
							</p>
						</div>
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<div className="flex justify-between items-center mb-2">
								<p className="text-sm text-slate-400">TAF</p>
								<span className="text-xs text-blue-400 px-2 py-1 rounded-full bg-blue-400/10">
									24HR Forecast
								</span>
							</div>
							<p className="text-sm font-mono text-slate-200">
								{tafData?.rawTAF || "No TAF data available"}
							</p>
						</div>
					</div>

					{/* Flight Conditions Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<p className="text-sm text-slate-400">Flight Category</p>
							{metarData && (
								<>
									<div className={`text-lg font-medium flex items-center`}>
										<span
											className={cn("h-3 w-3 rounded-full mr-2", {
												"bg-green-400": flightCategory === "VFR",
												"bg-blue-400": flightCategory === "MVFR",
												"bg-red-400": flightCategory === "IFR",
												"bg-purple-400": flightCategory === "LIFR",
												"bg-blue-200": !flightCategory,
											})}
										/>
										{flightCategory}
									</div>
									<p className="text-xs text-slate-400">
										Visibility {metarData.visib}
										{metarData.clouds.find(
											(c) => c.cover === "BKN" || c.cover === "OVC",
										)?.base &&
											` • Ceiling ${metarData.clouds.find((c) => c.cover === "BKN" || c.cover === "OVC")?.base}ft`}
									</p>
								</>
							)}
							{!metarData && (
								<p className="text-lg font-medium text-slate-200">No data</p>
							)}
						</div>
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<p className="text-sm text-slate-400">Wind</p>
							<p className="text-lg font-medium text-slate-200">
								{metarData?.wdir
									? `${metarData.wdir}° at ${metarData.wspd}kt`
									: "N/A"}
							</p>
							<p className="text-xs text-slate-400">
								{homeAirport?.icao || "No airport data"}
							</p>
						</div>
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<p className="text-sm text-slate-400">Temperature/Dewpoint</p>
							<p className="text-lg font-medium text-slate-200">
								{metarData?.temp !== undefined
									? `${metarData.temp}°C/${metarData.dewp}°C`
									: "N/A"}
							</p>
							<p className="text-xs text-slate-400">
								{metarData?.temp !== undefined
									? `${((metarData.temp * 9) / 5 + 32).toFixed(1)}°F`
									: ""}
							</p>
						</div>
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4">
							<p className="text-sm text-slate-400">Altimeter</p>
							<p className="text-lg font-medium text-slate-200">
								{metarData?.altim
									? `${(metarData.altim / 33.8639).toFixed(2)} inHg`
									: "N/A"}
							</p>
							<p className="text-xs text-slate-400">
								{metarData?.altim ? `${metarData.altim} hPa` : ""}
							</p>
						</div>
					</div>

					{/* Warnings and NOTAMs */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* NOTAMs Section */}
						<div className="bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-lg p-4 h-fit">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center space-x-2">
									<AlertTriangle className="w-5 h-5 text-amber-500" />
									<p className="text-sm font-medium text-amber-500">
										Active NOTAMs
									</p>
								</div>
								{notamData?.items && notamData.items.length > 0 && (
									<span className="text-xs text-amber-500 px-2 py-1 rounded-full bg-amber-500/10">
										{notamData.items.length} Active
									</span>
								)}
							</div>

							<div className="space-y-3">
								{notamData?.items && notamData.items.length > 0 ? (
									<div>
										{/* Preview first NOTAM */}
										<div className="p-4 bg-amber-500/5 rounded-lg border border-amber-500/20">
											<div className="flex items-center gap-2 mb-2">
												<span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
													{
														notamData?.items[0].properties.coreNOTAMData.notam
															.type
													}
												</span>
												<span className="text-xs text-amber-200/60">
													{
														notamData?.items[0].properties.coreNOTAMData.notam
															.number
													}
												</span>
											</div>
											<p className="text-sm text-amber-200/80 font-mono whitespace-pre-wrap">
												{
													notamData?.items[0].properties.coreNOTAMData.notam
														.text
												}
											</p>
											{notamData?.items[0].properties.coreNOTAMData.notam
												.effectiveStart && (
												<div className="mt-2 text-xs text-amber-200/60">
													<span>Valid: </span>
													<span>
														From:{" "}
														{new Date(
															notamData.items[0].properties.coreNOTAMData.notam
																.effectiveStart,
														).toLocaleDateString()}
													</span>
													{notamData.items[0].properties.coreNOTAMData.notam
														.effectiveEnd && (
														<span>
															{" "}
															To:{" "}
															{new Date(
																notamData.items[0].properties.coreNOTAMData
																	.notam.effectiveEnd,
															).toLocaleDateString()}
														</span>
													)}
												</div>
											)}
										</div>

										{/* Show More Button */}
										{notamData?.items?.length > 1 && (
											<Dialog>
												<DialogTrigger asChild>
													<Button
														variant="ghost"
														className="w-full mt-2 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 text-xs"
													>
														Show {(notamData?.items?.length || 1) - 1} More
														<ChevronRight className="h-4 w-4 ml-2" />
													</Button>
												</DialogTrigger>
												<DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-slate-200">
													<DialogHeader>
														<DialogTitle className="text-lg font-semibold text-amber-500">
															All Active NOTAMs
														</DialogTitle>
													</DialogHeader>
													<div className="space-y-4 pt-4">
														{notamData?.items?.map((notam, index) => (
															<div
																key={index}
																className="p-4 bg-amber-500/5 rounded-lg border border-amber-500/20"
															>
																<div className="flex items-center gap-2 mb-2">
																	<span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
																		{notam.properties.coreNOTAMData.notam.type}
																	</span>
																	<span className="text-xs text-amber-200/60">
																		{
																			notam.properties.coreNOTAMData.notam
																				.number
																		}
																	</span>
																</div>
																<p className="text-sm text-amber-200/80 font-mono whitespace-pre-wrap">
																	{notam.properties.coreNOTAMData.notam.text}
																</p>
																{notam.properties.coreNOTAMData.notam
																	.effectiveStart && (
																	<div className="mt-2 text-xs text-amber-200/60">
																		<span>Valid: </span>
																		<span>
																			From:{" "}
																			{new Date(
																				notam.properties.coreNOTAMData.notam
																					.effectiveStart,
																			).toLocaleDateString()}
																		</span>
																		{notam.properties.coreNOTAMData.notam
																			.effectiveEnd && (
																			<span>
																				{" "}
																				To:{" "}
																				{new Date(
																					notam.properties.coreNOTAMData.notam
																						.effectiveEnd,
																				).toLocaleDateString()}
																			</span>
																		)}
																	</div>
																)}
															</div>
														))}
													</div>
												</DialogContent>
											</Dialog>
										)}
									</div>
								) : (
									<p className="text-sm text-amber-200/80">
										No active NOTAMs for this airport.
									</p>
								)}
							</div>
						</div>

						{/* Weather Advisories Section */}
						<div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4 h-fit">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center space-x-2">
									<Cloud className="w-5 h-5 text-slate-400" />
									<p className="text-sm font-medium text-slate-300">
										Weather Advisories
									</p>
								</div>
								{validSigmets.length > 0 && (
									<span className="text-xs text-red-400 px-2 py-1 rounded-full bg-red-400/10">
										{validSigmets.length} Active
									</span>
								)}
							</div>
							<div className="space-y-3">
								{/* Current Weather */}
								{metarData?.wxString && (
									<div>
										<p className="text-xs text-slate-400 mb-1">
											Current Weather
										</p>
										<p className="text-sm text-slate-200">
											{metarData.wxString}
										</p>
									</div>
								)}

								{/* SIGMETs */}
								{validSigmets.length > 0 ? (
									<div>
										{/* Preview first SIGMET */}
										<div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
											<div className="flex items-center gap-2 mb-2">
												<span className="text-xs font-medium px-2 py-0.5 rounded bg-red-500/10 text-red-400">
													{validSigmets[0].airSigmetType}
												</span>
												{validSigmets[0].hazard && (
													<span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-500/10">
														{validSigmets[0].hazard}
													</span>
												)}
												{validSigmets[0].alphaChar && (
													<span className="text-xs text-slate-400">
														#{validSigmets[0].alphaChar}
													</span>
												)}
											</div>
											<p className="text-sm text-slate-200 whitespace-pre-wrap font-mono">
												{validSigmets[0].rawAirSigmet}
											</p>
											<div className="mt-2 text-xs text-slate-400">
												<span>Valid: </span>
												{validSigmets[0].validTimeFrom && (
													<span>
														From:{" "}
														{new Date(
															validSigmets[0].validTimeFrom * 1000,
														).toLocaleString()}
													</span>
												)}
												{validSigmets[0].validTimeTo && (
													<span>
														{" "}
														To:{" "}
														{new Date(
															validSigmets[0].validTimeTo * 1000,
														).toLocaleString()}
													</span>
												)}
											</div>
											{(validSigmets[0].altitudeLow1 ||
												validSigmets[0].altitudeHi1) && (
												<div className="mt-1 text-xs text-slate-400">
													Altitude:{" "}
													{validSigmets[0].altitudeLow1 &&
														`FL${validSigmets[0].altitudeLow1}`}
													{validSigmets[0].altitudeLow1 &&
														validSigmets[0].altitudeHi1 &&
														" - "}
													{validSigmets[0].altitudeHi1 &&
														`FL${validSigmets[0].altitudeHi1}`}
												</div>
											)}
										</div>
										<div className="flex items-center justify-between">
											<Dialog>
												<DialogTrigger asChild>
													<Button
														variant="ghost"
														size="sm"
														className="text-slate-400 hover:text-slate-300 hover:bg-slate-600/50 py-2 w-full mt-2"
													>
														Show {validSigmets.length - 1} More
														<ChevronRight className="h-4 w-4 ml-1" />
													</Button>
												</DialogTrigger>
												<DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 text-slate-200">
													<DialogHeader>
														<DialogTitle className="text-lg font-semibold text-slate-200">
															Active SIGMETs
														</DialogTitle>
													</DialogHeader>
													<div className="space-y-4 pt-4">
														{validSigmets.map(
															(sigmet: SIGMET, index: number) => (
																<div
																	key={index}
																	className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50"
																>
																	<div className="flex items-center gap-2 mb-2">
																		<span className="text-xs font-medium px-2 py-0.5 rounded bg-red-500/10 text-red-400">
																			{sigmet.airSigmetType}
																		</span>
																		{sigmet.hazard && (
																			<span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-500/10">
																				{sigmet.hazard}
																			</span>
																		)}
																		{sigmet.alphaChar && (
																			<span className="text-xs text-slate-400">
																				#{sigmet.alphaChar}
																			</span>
																		)}
																	</div>
																	<p className="text-sm text-slate-200 whitespace-pre-wrap font-mono">
																		{sigmet.rawAirSigmet}
																	</p>
																	<div className="mt-2 text-xs text-slate-400">
																		<span>Valid: </span>
																		{sigmet.validTimeFrom && (
																			<span>
																				From:{" "}
																				{new Date(
																					sigmet.validTimeFrom * 1000,
																				).toLocaleString()}
																			</span>
																		)}
																		{sigmet.validTimeTo && (
																			<span>
																				{" "}
																				To:{" "}
																				{new Date(
																					sigmet.validTimeTo * 1000,
																				).toLocaleString()}
																			</span>
																		)}
																	</div>
																	{(sigmet.altitudeLow1 ||
																		sigmet.altitudeHi1) && (
																		<div className="mt-1 text-xs text-slate-400">
																			Altitude:{" "}
																			{sigmet.altitudeLow1 &&
																				`FL${sigmet.altitudeLow1}`}
																			{sigmet.altitudeLow1 &&
																				sigmet.altitudeHi1 &&
																				" - "}
																			{sigmet.altitudeHi1 &&
																				`FL${sigmet.altitudeHi1}`}
																		</div>
																	)}
																</div>
															),
														)}
													</div>
												</DialogContent>
											</Dialog>
										</div>
									</div>
								) : (
									<p className="text-sm text-slate-400">
										No active SIGMETs for this area
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-4 text-xs text-slate-400 text-right">
				Last updated:{" "}
				{new Date(Number(weather.updatedAt) * 1000).toLocaleTimeString()}
			</div>
		</div>
	);
}
