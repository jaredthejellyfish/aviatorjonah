"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, Globe, MapPin } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
	firstName: string;
};

export type GeoLocation = {
	ip: string;
	country_code: string;
	country_name: string;
	region_code: string;
	region_name: string;
	city: string;
	zip_code: string;
	time_zone: string;
	latitude: number;
	longitude: number;
	metro_code: number;
};

function LoadingSkeleton() {
	return <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />;
}

export default function Heading({ firstName }: Props) {
	const { data: locationData, isLoading: locationLoading } = useQuery({
		queryKey: ["location-data"],
		queryFn: async () => {
			const ipResponse = await fetch("https://api.ipify.org?format=json");
			const ipData = (await ipResponse.json()) as { ip: string };

			const response = await fetch(`/api/geo-ip?ip=${ipData.ip}`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const locationData = (await response.json()) as GeoLocation;
			return locationData;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	const { data: locationAndTime } = useQuery({
		queryKey: ["location-and-time"],
		queryFn: async () => {
			const now = new Date();
			return {
				location: locationData,
				localTime: now.toLocaleTimeString(),
				zuluTime: now.toLocaleTimeString("en-US", {
					timeZone: "UTC",
					hour12: false,
				}),
			};
		},
		refetchInterval: 1000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	return (
		<div className="mb-8">
			<div className="flex flex-col md:flex-row md:justify-between justify-start items-start md:items-center gap-4 md:gap-0 mb-6">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">
						CoPilot Dashboard
					</h1>
					<p className="text-slate-400">Welcome back, {firstName || "Pilot"}</p>
				</div>
				<div className="w-full md:w-[150px]">
					<div className="flex flex-col space-y-2">
						<div className="flex items-center space-x-2 text-sm text-slate-400 h-5">
							<Clock className="h-4 w-4 shrink-0" />
							<span>{locationAndTime?.localTime || <LoadingSkeleton />}</span>
						</div>
						<div className="flex items-center space-x-2 text-sm text-slate-400 h-5">
							<Globe className="h-4 w-4 shrink-0" />
							<span>{locationAndTime?.zuluTime || <LoadingSkeleton />}</span>
						</div>
						<div
							className={cn(
								"flex items-center space-x-2 text-sm text-slate-400 h-5",
								!locationData?.country_code && "opacity-0",
							)}
						>
							<MapPin className="h-4 w-4 shrink-0" />
							<span>
								{locationLoading ? (
									<LoadingSkeleton />
								) : (
									locationData?.city &&
									`${locationData.city}, (${locationData.country_code})`
								)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
