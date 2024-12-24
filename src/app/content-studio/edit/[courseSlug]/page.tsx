import React from "react";
import LeftSidebar from "@/components/CreatorStudio/Sidebar";
import { notFound } from "next/navigation";
import { getCourseBySlugWithProgress } from "@/utils/helpers/getCourseBySlugWithProgress";
import { BookOpen, Clock, Save, Users } from "lucide-react";

import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration } from "date-fns";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import UpdateCourseForm from "@/components/CreatorStudio/UpdateCourseForm";
import { getEnrolledStudents } from "@/utils/helpers/getEnrolledStudents";
import EditCourseImage from "@/components/CreatorStudio/EditCourseImage";

type Props = {
	params: Promise<{ courseSlug: string }>;
};

async function EditCoursePage({ params }: Props) {
	const courseSlug = (await params).courseSlug;

	const course = await getCourseBySlugWithProgress(courseSlug);

	if (!course) {
		return notFound();
	}
	const enrolledStudents = await getEnrolledStudents(course.id);

	return (
		<div className="grid md:grid-cols-[300px_1fr] grid-cols-1">
			<LeftSidebar course={course} courseSlug={courseSlug} />
			<UpdateCourseForm courseId={course.id} courseSlug={courseSlug}>
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
							<div className="w-full">
								<Input
									className="text-3xl h-9 font-bold mb-2 p-0 w-4/5"
									name="title"
									defaultValue={course.title}
									style={{ fontSize: "2.25rem" }}
								/>
								<div className="flex items-center text-muted-foreground">
									<User className="mr-2 h-4 w-4" />
									<span>{course.instructor_name}</span>
								</div>
							</div>
							<div className="mt-4 md:mt-0">
								<Button>
									<span className="mr-2">Update Course</span>
									<Save className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<Card>
								<CardContent className="flex items-center p-4">
									<BookOpen className="h-8 w-8 text-primary mr-4" />
									<div>
										<p className="text-sm text-muted-foreground">
											Total Lessons
										</p>
										<p className="text-2xl font-bold">
											{course.modules.reduce(
												(sum, module) => sum + module.lessons.length,
												0,
											)}
										</p>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="flex items-center p-4">
									<Clock className="h-8 w-8 text-primary mr-4" />
									<div>
										<p className="text-sm text-muted-foreground">
											Total Duration
										</p>
										<p className="text-2xl font-bold">
											{formatDuration({
												hours: Math.floor(
													course.modules.reduce(
														(sum, module) =>
															sum +
															module.lessons.reduce(
																(sum, lesson) =>
																	sum + (lesson.reading_time ?? 0),
																0,
															),
														0,
													) / 3600,
												),
												minutes: Math.floor(
													(course.modules.reduce(
														(sum, module) =>
															sum +
															module.lessons.reduce(
																(sum, lesson) =>
																	sum + (lesson.reading_time ?? 0),
																0,
															),
														0,
													) %
														3600) /
														60,
												),
												seconds:
													course.modules.reduce(
														(sum, module) =>
															sum +
															module.lessons.reduce(
																(sum, lesson) =>
																	sum + (lesson.reading_time ?? 0),
																0,
															),
														0,
													) % 60,
											})}
										</p>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="flex items-center p-4">
									<Users className="h-8 w-8 text-primary mr-4" />
									<div>
										<p className="text-sm text-muted-foreground">
											Students Enrolled
										</p>
										<p className="text-2xl font-bold">
											{enrolledStudents?.enrollment_count || 0}
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="md:col-span-2">
							<EditCourseImage
								courseTitle={course.title}
								courseImage={course.image}
								courseId={course.id}
							/>
							<Card className="mb-6">
								<CardHeader>
									<CardTitle>Course Description</CardTitle>
								</CardHeader>
								<CardContent>
									<Textarea
										name="description"
										className="h-32"
										defaultValue={course.description || ""}
									/>
								</CardContent>
							</Card>
						</div>
						<div>
							<div className="sticky top-8">
								<Card>
									<CardHeader>
										<CardTitle>Price</CardTitle>
									</CardHeader>
									<CardContent className="flex flex-row items-center gap-x-2">
										<span>$</span>
										<Input name="price" defaultValue={course.price || ""} />
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</UpdateCourseForm>
		</div>
	);
}

export default EditCoursePage;
