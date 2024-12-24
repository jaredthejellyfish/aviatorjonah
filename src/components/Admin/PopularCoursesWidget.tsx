import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getPopularCourses } from "@/utils/helpers/getPopularCourses";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function PopularCoursesWidget() {
	const popularCourses = await getPopularCourses();

	return (
		<div className="space-y-8">
			{popularCourses?.map((course) => (
				<div key={course.title} className="space-y-2">
					<div className="flex items-center">
						<span className="text-sm font-medium">{course.title}</span>
						<span className="ml-auto text-sm text-muted-foreground">
							{course.enrollments} enrollments
						</span>
					</div>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="w-full">
								<Progress value={course.totalPercent} className="h-2 w-full" />
							</TooltipTrigger>
							<TooltipContent>{course.totalPercent}%</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			))}
		</div>
	);
}

export function PopularCoursesWidgetSkeleton() {
	// Create an array of 3 items to show as loading state
	const skeletonItems = Array(3).fill(null);

	return (
		<div className="space-y-8">
			{skeletonItems.map((_, index) => (
				<div key={index} className="space-y-2">
					<div className="flex items-center">
						<Skeleton className="h-5 w-48" />
						<Skeleton className="ml-auto h-4 w-24" />
					</div>
					<Skeleton className="h-2" />
				</div>
			))}
		</div>
	);
}
