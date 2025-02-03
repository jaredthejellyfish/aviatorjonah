import { Database } from "@/lib/supabase/db-types";
import { useQuery } from "@tanstack/react-query";

const getConversations = async () => {
	const abortController = new AbortController();
	try {
		const response = await fetch("/api/chat/conversations", {
			signal: abortController.signal,
			headers: {
				"Cache-Control": "no-store",
			},
		});
		return (await response.json()) as Database["public"]["Tables"]["conversations"]["Row"][];
	} catch (error) {
		console.error(error);
		if (abortController.signal.aborted) {
			return [];
		}
		throw error;
	} finally {
		abortController.abort();
	}
};

export function useConversations({
	initialConversations,
}: {
	initialConversations?: Database["public"]["Tables"]["conversations"]["Row"][];
}) {
	const { data, error, refetch, isLoading } = useQuery({
		queryKey: ["conversations"],
		initialData: initialConversations || undefined,
		queryFn: () => getConversations(),
		refetchInterval: 30 * 1000,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
	});

	return {
		conversations: data,
		error,
		mutate: refetch,
		isLoading,
	};
}
