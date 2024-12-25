import React from "react";
import { BookOpen, Clock, Search, Award, Zap, Trophy } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CourseTable from "@/components/Dashboard/courses-table";
import { getDashboardData } from "@/utils/helpers/getDashboardData";
import { Metadata } from "next";
import OrgDisplay from "@/components/OrgDisplay";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "AviatorJonah | Dashboard",
	description: "Your dashboard for AviatorJonah.",
};

export default async function CoursesDashboard() {
	const {
		enrolledCourses,
		recommendedCourses,
		totalTime,
		currentStreak,
		userPercentile,
		overallProgress,
	} = await getDashboardData();

	return (
		<main className="container mx-auto px-4 py-8 space-y-8">
			<OrgDisplay />
			<header className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
				<div>
					<h1 className="text-4xl font-bold text-primary">
						My Learning Dashboard
					</h1>
					<p className="text-muted-foreground mt-2">
						Track your progress and discover new courses
					</p>
				</div>
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							type="search"
							placeholder="Search courses"
							className="pl-10 w-full sm:w-[300px]"
						/>
					</div>
					<Select>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="progress">Progress</SelectItem>
							<SelectItem value="recent">Recently Added</SelectItem>
							<SelectItem value="alphabetical">Alphabetical</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</header>

			<section className="grid gap-6 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Courses in Progress
						</CardTitle>
						<BookOpen className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{enrolledCourses?.length ?? 0}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Time Spent Learning
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{totalTime} {totalTime && totalTime < 60 ? "minutes" : "hours"}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Certificates Earned
						</CardTitle>
						<Award className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">7</div>
					</CardContent>
				</Card>
			</section>

			<CourseTable
				enrolledCourses={enrolledCourses}
				recommendedCourses={recommendedCourses}
			/>

			<section>
				<Card>
					<CardHeader>
						<CardTitle>Your Learning Journey</CardTitle>
						<CardDescription>
							Track your progress and achievements
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-8">
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Overall Progress</span>
								<span className="font-medium">{overallProgress}%</span>
							</div>
							<Progress
								value={overallProgress ? parseInt(overallProgress) : 0}
								className="h-2"
							/>
						</div>
						<div className="grid gap-4 md:grid-cols-3">
							<div className="flex items-center space-x-4 rounded-lg border p-4">
								<Zap className="h-6 w-6 text-yellow-500" />
								<div>
									<p className="text-sm font-medium">Current Streak</p>
									<p className="text-2xl font-bold">
										{currentStreak} {currentStreak === 1 ? "day" : "days"}
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-4 rounded-lg border p-4">
								<Trophy className="h-6 w-6 text-primary" />
								<div>
									<p className="text-sm font-medium">Ranking</p>
									<p className="text-2xl font-bold">{userPercentile}</p>
								</div>
							</div>
							<div className="flex items-center space-x-4 rounded-lg border p-4">
								<BookOpen className="h-6 w-6 text-green-500" />
								<div>
									<p className="text-sm font-medium">Completed Courses</p>
									<p className="text-2xl font-bold">
										{enrolledCourses?.filter(
											(course) => course.totalProgress === 100,
										).length ?? 0}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
