import { Suspense } from "react";
import { getCreatorCourses } from "@/utils/helpers/getCreatorCourses";

import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseList } from "@/components/CreatorStudio/CourseList";
import { CreatorStats } from "@/components/CreatorStudio/CreatorStats";
import { CreateCourseButton } from "@/components/CreatorStudio/CreateCourseButton";

export default async function CreatorStudioPage() {
	const { userId } = await auth();
	if (!userId) {
		redirect("/dashboard");
	}
	const courses = await getCreatorCourses(userId);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Content Studio</h1>
				<CreateCourseButton />
			</div>

			<Suspense fallback={<Skeleton className="w-full h-32" />}>
				<CreatorStats courses={courses} />
			</Suspense>

			<div className="mt-8">
				<h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
				<CourseList courses={courses} />
			</div>
		</div>
	);
}
