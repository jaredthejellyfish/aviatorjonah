import stripe from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";

async function enrollUserInCourse(
	courseId: string,
	sessionId: string,
	userId: string,
) {
	const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
	const isPaid =
		stripeSession.payment_status === "paid" ||
		stripeSession.payment_status === "no_payment_required";

	if (isPaid) {
		const supabase = await createClient();
		const { data: enrollment, error: enrollmentError } = await supabase
			.from("enrollments")
			.select("*")
			.eq("course_id", courseId)
			.eq("user_id", userId);

		if (enrollmentError) {
			console.error(enrollmentError);
			return false;
		}

		if (enrollment.length > 0) {
			return true;
		}

		const { error } = await supabase.from("enrollments").upsert({
			course_id: courseId,
			user_id: userId,
		});

		if (error) {
			console.error(error);
			return false;
		} else {
			return true;
		}
	}

	return false;
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	ChevronRight,
	CheckCircle,
	BookOpen,
	Clock,
	ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCourseBySlug } from "@/utils/helpers/getCourseBySlug";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
type Props = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ session_id: string }>;
};

export default async function EnrollmentSuccess({
	params,
	searchParams,
}: Props) {
	const slug = (await params).slug;
	const sessionId = (await searchParams).session_id;

	if (!slug || !sessionId) {
		return redirect(`/courses/enroll/${slug}/error`);
	}

	const course = await getCourseBySlug(slug);

	if (!course) {
		return redirect(`/courses/enroll/${slug}/error`);
	}

	const authData = await auth();

	if (!authData.userId) {
		return redirect(`/courses/enroll/${slug}/error`);
	}

	const enrolled = await enrollUserInCourse(
		course.id,
		sessionId,
		authData.userId,
	);

	if (!enrolled) {
		return redirect(`/courses/enroll/${slug}/error`);
	}

	return (
		<main className="container mx-auto px-4 py-6">
			<div className="flex items-center justify-start space-x-2 mb-5">
				<Link href="/courses">
					<span className="text-md text-neutral-600 dark:text-neutral-400">
						All Courses
					</span>
				</Link>
				<ChevronRight className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
				<Link href={`/courses/view/${slug}`}>
					<span className="text-md text-neutral-600 dark:text-neutral-400">
						{course.title}
					</span>
				</Link>
				<ChevronRight className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
				<span className="text-md text-indigo-600 dark:text-indigo-400">
					Enrollment Success
				</span>
			</div>

			<div className="grid lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<Card className="bg-white dark:bg-neutral-900 shadow-xl mb-8 overflow-hidden">
						<div className="bg-green-100 dark:bg-green-900 p-6 flex items-center space-x-4">
							<CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
							<div>
								<h1 className="text-3xl font-bold text-green-800 dark:text-green-200">
									Enrollment Successful!
								</h1>
								<p className="text-green-700 dark:text-green-300">
									You&apos;re now enrolled in {course.title}
								</p>
							</div>
						</div>
						<CardContent className="pt-6">
							<h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
								Next Steps
							</h2>
							<ol className="space-y-4 mb-6">
								<li className="flex items-start space-x-3">
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
										1
									</div>
									<div>
										<h3 className="font-semibold">
											Access Your Course Materials
										</h3>
										<p className="text-neutral-600 dark:text-neutral-400">
											Log in to your student dashboard to access all course
											materials and resources.
										</p>
									</div>
								</li>
								<li className="flex items-start space-x-3">
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
										2
									</div>
									<div>
										<h3 className="font-semibold">
											Review the Course Schedule
										</h3>
										<p className="text-neutral-600 dark:text-neutral-400">
											Familiarize yourself with the course timeline and upcoming
											deadlines.
										</p>
									</div>
								</li>
								<li className="flex items-start space-x-3">
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
										3
									</div>
									<div>
										<h3 className="font-semibold">Introduce Yourself</h3>
										<p className="text-neutral-600 dark:text-neutral-400">
											Join the course forum and introduce yourself to your
											instructor and fellow students.
										</p>
									</div>
								</li>
							</ol>
							<div className="flex space-x-4">
								<Button
									className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
									asChild
								>
									<Link href={`/course/${course.slug}`}>Go to Course</Link>
								</Button>
								<Button variant="outline" className="flex-1" asChild>
									<Link href="/courses">View Courses</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="lg:block">
					<Card className="sticky top-24 overflow-hidden bg-white dark:bg-neutral-900 shadow-xl">
						{course.image && (
							<Image
								src={course.image}
								alt={course.title}
								width={600}
								height={400}
								className="w-full h-48 object-cover"
							/>
						)}
						<CardContent className="pt-6">
							<h3 className="text-xl font-semibold mb-4">{course.title}</h3>
							<div className="space-y-3 mb-6">
								<div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
									<BookOpen className="h-5 w-5" />
									<span>Instructor: {course.instructor_name}</span>
								</div>
								<div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
									<Clock className="h-5 w-5" />
									<span>
										Duration: {Math.ceil((course.completion_time ?? 0) / 60)}{" "}
										hours
									</span>
								</div>
							</div>
							<div className="mt-6">
								<Link
									href={`/courses/view/${course.slug}`}
									className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:underline"
								>
									<span>View Course Outline</span>
									<ArrowRight className="h-4 w-4" />
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
