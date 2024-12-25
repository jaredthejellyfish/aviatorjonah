import Link from "next/link";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Users, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentSalesWidget, {
	RecentSalesWidgetSkeleton,
} from "@/components/Admin/RecentSalesWidget";
import PopularCoursesWidget, {
	PopularCoursesWidgetSkeleton,
} from "@/components/Admin/PopularCoursesWidget";
import RevenueChart, {
	RevenueChartSkeleton,
} from "@/components/Admin/RevenueChart";
import { Suspense } from "react";
import TotalRevenue, {
	TotalRevenueSkeleton,
} from "@/components/Admin/Cards/TotalRevenueCard";
import TotalCoursesCard, {
	TotalCoursesCardSkeleton,
} from "@/components/Admin/Cards/TotalCoursesCard";
import {
	ActiveUsersCard,
	ActiveUsersCardSkeleton,
} from "@/components/Admin/Cards/ActiveUsersCard";
import {
	ActiveSalesCard,
	ActiveSalesCardSkeleton,
} from "@/components/Admin/Cards/ActiveSalesCard";
import { redirect } from "next/navigation";
import { needsAdminAccess } from "@/utils/helpers/needsAdminAccess";

export default async function AdminDashboardPage() {
	const hasAdminAccess = await needsAdminAccess();

	if (!hasAdminAccess) {
		return redirect("/admin/not-authorized");
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
			<div className="grid gap-6 grid-cols-2 lg:grid-cols-4 mb-8">
				<Suspense fallback={<TotalRevenueSkeleton />}>
					<TotalRevenue />
				</Suspense>

				<Suspense fallback={<ActiveUsersCardSkeleton />}>
					<ActiveUsersCard />
				</Suspense>

				<Suspense fallback={<TotalCoursesCardSkeleton />}>
					<TotalCoursesCard />
				</Suspense>

				<Suspense fallback={<ActiveSalesCardSkeleton />}>
					<ActiveSalesCard />
				</Suspense>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>Revenue Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<Suspense fallback={<RevenueChartSkeleton />}>
							<RevenueChart />
						</Suspense>
					</CardContent>
				</Card>
				<Card className="col-span-2 lg:col-span-1">
					<CardHeader>
						<CardTitle>Recent Sales</CardTitle>
					</CardHeader>
					<CardContent>
						<Suspense fallback={<RecentSalesWidgetSkeleton />}>
							<RecentSalesWidget />
						</Suspense>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
				<Card>
					<CardHeader>
						<CardTitle>Popular Courses</CardTitle>
					</CardHeader>
					<CardContent>
						<Suspense fallback={<PopularCoursesWidgetSkeleton />}>
							<PopularCoursesWidget />
						</Suspense>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4">
						<Button asChild>
							<Link href="/admin/courses/new">Create New Course</Link>
						</Button>
						<Button asChild variant="outline">
							<Link href="/admin/courses">Course Management</Link>
						</Button>
						<Button asChild variant="outline">
							<Link href="/admin/users">Manage Users</Link>
						</Button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>System Notifications</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-4">
							<li className="flex items-center space-x-2">
								<AlertCircle className="h-5 w-5 text-yellow-500" />
								<span>3 courses need review</span>
							</li>
							<li className="flex items-center space-x-2">
								<TrendingUp className="h-5 w-5 text-green-500" />
								<span>User engagement up by 12%</span>
							</li>
							<li className="flex items-center space-x-2">
								<Users className="h-5 w-5 text-aviatorjonah-500" />
								<span>5 new instructor applications</span>
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Link href="/admin/courses">
					<Card className="hover:bg-accent transition-colors">
						<CardHeader>
							<CardTitle>Course Management</CardTitle>
							<CardDescription>Add, edit, or remove courses</CardDescription>
						</CardHeader>
					</Card>
				</Link>
				<Link href="/admin/users">
					<Card className="hover:bg-accent transition-colors">
						<CardHeader>
							<CardTitle>User Management</CardTitle>
							<CardDescription>
								Manage user accounts and permissions
							</CardDescription>
						</CardHeader>
					</Card>
				</Link>
				<Link href="/admin/analytics">
					<Card className="hover:bg-accent transition-colors">
						<CardHeader>
							<CardTitle>Analytics</CardTitle>
							<CardDescription>
								View detailed site analytics and reports
							</CardDescription>
						</CardHeader>
					</Card>
				</Link>
			</div>
		</div>
	);
}
