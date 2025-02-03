import { useQuery } from "@tanstack/react-query";

export type ServiceStatus = {
	url: string;
	name: string;
	latency: number;
	isReachable: boolean;
};

const SERVICES = [
	{
		url: "/api/heartbeat",
		name: "AviatorJonah",
		latency: 0,
		isReachable: true,
	},
	{
		url: "/copilot",
		name: "CoPilot",
		latency: 0,
		isReachable: true,
	},
];

const measureLatency = async (): Promise<ServiceStatus[]> => {
	const controller = new AbortController();

	try {
		const results = await Promise.all(
			SERVICES.map(async (service) => {
				try {
					const start = performance.now();
					const response = await fetch(`${service.url}`, {
						method: "GET",
						mode: "no-cors",
						cache: "no-store",
						signal: controller.signal,
					});
					if (!response.ok) {
						return {
							...service,
							latency: -1,
							isReachable: false,
						};
					}
					return {
						...service,
						latency: Math.round(performance.now() - start),
						isReachable: true,
					};
				} catch {
					return {
						...service,
						latency: -1,
						isReachable: false,
					};
				}
			}),
		);

		return results;
	} catch (error) {
		controller.abort();
		throw error;
	} finally {
		controller.abort();
	}
};

export function useServiceStatus() {
	const {
		data: statuses = SERVICES,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["service-status"],
		queryFn: measureLatency,
		refetchInterval: 180000, // Refetch every 3 minutes
		refetchOnWindowFocus: false,
	});

	const averageLatency =
		statuses
			.filter((s) => s.isReachable)
			.reduce((acc, curr) => acc + curr.latency, 0) /
		statuses.filter((s) => s.isReachable).length;

	return {
		statuses,
		averageLatency: !isNaN(averageLatency) ? Math.round(averageLatency) : null,
		error,
		isLoading,
	};
}
