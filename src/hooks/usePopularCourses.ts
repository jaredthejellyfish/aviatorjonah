import { Course } from "@/utils/helpers/getAllCourses";
import { useQuery } from "@tanstack/react-query";

export const usePopularCourses = (enabled: boolean = true) => {
	return useQuery({
		queryKey: ["popular-courses"],
		queryFn: async () => {
			const response = await fetch("/api/popular-courses");
			if (!response.ok) {
				throw new Error("Failed to fetch popular courses");
			}
			return response.json() as Promise<Course[]>;
		},
		enabled,
	});
};
