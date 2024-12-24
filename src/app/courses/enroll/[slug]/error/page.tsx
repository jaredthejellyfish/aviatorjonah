import React from "react";
import Link from "next/link";
import {
	ChevronRight,
	AlertCircle,
	Mail,
	Phone,
	MessageCircle,
	ArrowRight,
	HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import PaymentClient from "@/components/payment-client";
import { getCourseBySlug } from "@/utils/helpers/getCourseBySlug";

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function Component({ params }: Props) {
	const slug = (await params).slug;

	if (!slug) {
		return <div>No slug found</div>;
	}

	const course = await getCourseBySlug(slug);

	if (!course) {
		return <div>Course not found</div>;
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
					Enrollment Error
				</span>
			</div>

			<div className="grid lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<Card className="bg-white dark:bg-neutral-900 shadow-xl mb-8">
						<CardContent className="pt-6">
							<div className="flex items-center space-x-4 mb-4">
								<AlertCircle className="h-12 w-12 text-red-500" />
								<div>
									<h2 className="text-2xl font-semibold mb-2">
										Oops! Something went wrong.
									</h2>
									<p className="text-neutral-600 dark:text-neutral-400">
										We encountered an error while trying to enroll you in the
										course. Don&apos;t worry, we&apos;re here to help you
										resolve this issue.
									</p>
								</div>
							</div>
							<div className="mt-6 space-y-4">
								<PaymentClient
									selectedCourse={{
										id: course.id,
										price: course.price ?? 0,
										title: course.title ?? "",
										description: course.description ?? "",
										image: course.image ?? "",
										slug: course.slug ?? "",
									}}
									buttonStyles={
										"bg-indigo-600 hover:bg-indigo-700 text-white mb-0"
									}
									enrolled={false}
									buttonText={"Try Enrolling Again"}
									isAuthenticated={true}
								/>
								<Button variant="outline" className="w-full">
									View Course Details
								</Button>
							</div>
						</CardContent>
					</Card>

					<h3 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
						Troubleshooting Steps
					</h3>
					<Accordion type="single" collapsible className="w-full mb-8">
						<AccordionItem value="item-1">
							<AccordionTrigger>
								Check your internet connection
							</AccordionTrigger>
							<AccordionContent>
								Ensure you have a stable internet connection. Try refreshing the
								page or reconnecting to your network before attempting to enroll
								again.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Clear your browser cache</AccordionTrigger>
							<AccordionContent>
								Clearing your browser&apos;s cache and cookies can often resolve
								enrollment issues. After clearing, restart your browser and try
								enrolling again.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>Verify payment information</AccordionTrigger>
							<AccordionContent>
								If the course requires payment, double-check that your payment
								information is up-to-date and that there are no issues with your
								payment method.
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<h3 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
						Contact Support
					</h3>
					<Card className="bg-white dark:bg-neutral-900 shadow-xl">
						<CardContent className="pt-6">
							<form className="space-y-4">
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
									>
										Email Address
									</label>
									<Input
										type="email"
										id="email"
										placeholder="your@email.com"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="message"
										className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
									>
										Describe the issue
									</label>
									<Textarea
										id="message"
										placeholder="Please provide details about the enrollment error you encountered..."
										required
									/>
								</div>
								<Button
									type="submit"
									className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
								>
									Submit Support Request
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
				<div className="lg:block">
					<Card className="sticky top-24 overflow-hidden bg-white dark:bg-neutral-900 shadow-xl mb-6">
						<CardContent className="pt-6">
							<h3 className="text-xl font-semibold mb-4">
								Need Immediate Assistance?
							</h3>
							<p className="text-neutral-600 dark:text-neutral-400 mb-4">
								Our support team is available to help you resolve any enrollment
								issues.
							</p>
							<div className="space-y-3">
								<div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
									<Mail className="h-5 w-5" />
									<span>support@example.com</span>
								</div>
								<div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
									<Phone className="h-5 w-5" />
									<span>+1 (555) 123-4567</span>
								</div>
								<div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
									<MessageCircle className="h-5 w-5" />
									<span>Live Chat (9 AM - 5 PM EST)</span>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="sticky top-96 overflow-hidden bg-white dark:bg-neutral-900 shadow-xl">
						<CardContent className="pt-6">
							<h3 className="text-xl font-semibold mb-4">Helpful Resources</h3>
							<ul className="space-y-3">
								<li>
									<Link
										href="/faq"
										className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:underline"
									>
										<HelpCircle className="h-5 w-5" />
										<span>Frequently Asked Questions</span>
									</Link>
								</li>
								<li>
									<Link
										href="/enrollment-guide"
										className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:underline"
									>
										<ArrowRight className="h-5 w-5" />
										<span>Enrollment Guide</span>
									</Link>
								</li>
								<li>
									<Link
										href="/system-status"
										className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:underline"
									>
										<AlertCircle className="h-5 w-5" />
										<span>System Status</span>
									</Link>
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
