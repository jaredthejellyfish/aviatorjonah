import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllCourses } from "@/utils/helpers/getAllCourses";
import { BookOpen } from "lucide-react";

export default async function TotalCoursesCard() {
	const courses = await getAllCourses();

	const totalCourses = courses.length;

	const totalCoursesThisMonth = courses.filter((course) => {
		const courseDate = new Date(course.created_at || "");
		const currentDate = new Date();
		return (
			courseDate.getMonth() === currentDate.getMonth() &&
			courseDate.getFullYear() === currentDate.getFullYear()
		);
	}).length;

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Total Courses</CardTitle>
				<BookOpen className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{totalCourses}</div>
				<p className="text-xs text-muted-foreground">
					+{totalCoursesThisMonth} new this month
				</p>
			</CardContent>
		</Card>
	);
}

export function TotalCoursesCardSkeleton() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Total Courses</CardTitle>
				<BookOpen className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-6 mb-2 w-24" />
				<Skeleton className="h-4 w-32" />
			</CardContent>
		</Card>
	);
}
