import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Clock, Award } from "lucide-react";

export default function DashboardLoading() {
	return (
		<main className="container mx-auto px-4 py-8 space-y-8">
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
					<Select disabled>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
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
						<Skeleton className="h-8 w-16" />
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
						<Skeleton className="h-8 w-24" />
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
						<Skeleton className="h-8 w-16" />
					</CardContent>
				</Card>
			</section>

			<Tabs defaultValue="enrolled" className="space-y-4">
				<TabsList>
					<TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
					<TabsTrigger value="recommended">Recommended</TabsTrigger>
				</TabsList>
				<TabsContent value="enrolled" className="space-y-4">
					<h2 className="text-3xl font-bold tracking-tight">
						Your Enrolled Courses
					</h2>
					<div className="hidden md:block rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
						<table className="w-full">
							<thead>
								<tr className="bg-neutral-50 dark:bg-neutral-800/50">
									<th className="text-sm font-semibold p-4 text-left">
										Course
									</th>
									<th className="text-sm font-semibold p-4 text-left">
										Progress
									</th>
									<th className="text-sm font-semibold p-4 text-left">
										Status
									</th>
									<th className="text-sm font-semibold p-4 text-right">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{[1, 2, 3].map((i) => (
									<tr
										key={i}
										className="border-t border-neutral-200 dark:border-neutral-800"
									>
										<td className="p-4">
											<div className="flex items-center space-x-4">
												<Skeleton className="h-16 w-16 rounded-lg" />
												<div className="space-y-1">
													<Skeleton className="h-5 w-40" />
													<Skeleton className="h-4 w-32" />
												</div>
											</div>
										</td>
										<td className="p-4">
											<Skeleton className="h-4 w-32 mb-2" />
											<Skeleton className="h-2 w-full max-w-xs" />
										</td>
										<td className="p-4">
											<Skeleton className="h-5 w-24 mb-1" />
											<Skeleton className="h-4 w-32" />
										</td>
										<td className="p-4 text-right">
											<Skeleton className="h-9 w-28 inline-block" />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="md:hidden grid gap-6 sm:grid-cols-2">
						{[1, 2, 3, 4].map((i) => (
							<Card key={i}>
								<CardHeader>
									<Skeleton className="h-40 w-full rounded-md" />
								</CardHeader>
								<CardContent className="space-y-2">
									<Skeleton className="h-6 w-3/4" />
									<Skeleton className="h-4 w-1/2" />
									<div className="flex space-x-2">
										<Skeleton className="h-6 w-20" />
										<Skeleton className="h-6 w-24" />
									</div>
									<div className="space-y-2">
										<div className="flex justify-between">
											<Skeleton className="h-4 w-16" />
											<Skeleton className="h-4 w-12" />
										</div>
										<Skeleton className="h-2 w-full" />
									</div>
									<Skeleton className="h-4 w-3/4" />
									<Skeleton className="h-4 w-1/2" />
								</CardContent>
								<CardContent>
									<Skeleton className="h-10 w-full" />
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>

			<section>
				<Card>
					<CardHeader>
						<CardTitle>Your Learning Journey</CardTitle>
						<p className="text-muted-foreground">
							Track your progress and achievements
						</p>
					</CardHeader>
					<CardContent className="space-y-8">
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Overall Progress</span>
								<Skeleton className="h-4 w-12" />
							</div>
							<Skeleton className="h-2 w-full" />
						</div>
						<div className="grid gap-4 md:grid-cols-3">
							{["Current Streak", "Ranking", "Completed Courses"].map(
								(title) => (
									<div
										key={title}
										className="flex items-center space-x-4 rounded-lg border p-4"
									>
										<Skeleton className="h-6 w-6" />
										<div>
											<p className="text-sm font-medium">{title}</p>
											<Skeleton className="h-6 w-16 mt-1" />
										</div>
									</div>
								),
							)}
						</div>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
