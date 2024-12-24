import { CourseList } from "@/components/Admin/CourseList";

import { getAllCourses } from "@/utils/helpers/getAllCourses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { needsAdminAccess } from "@/utils/helpers/needsAdminAccess";
import { redirect } from "next/navigation";
import {
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default async function CoursesManagementPage() {
	const hasAdminAccess = await needsAdminAccess();
	if (!hasAdminAccess) {
		return redirect("/admin/not-authorized");
	}

	const courses = await getAllCourses();

	return (
		<div className="container mx-auto px-4 py-4">
			<Breadcrumb className="mb-3">
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link href="/admin">Admin</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Courses Management</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className="text-3xl font-bold mb-6">Courses Management</h1>
			<Card>
				<CardHeader>
					<CardTitle>All Courses</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense fallback={<div>Loading courses...</div>}>
						<CourseList courses={courses} />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}
