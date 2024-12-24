import { Skeleton } from "@/components/ui/skeleton";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">All Courses</h1>

			{/* Filters section skeleton */}
			<div className="flex flex-col md:flex-row gap-4 mb-8">
				<div className="flex-grow relative">
					<Input
						type="text"
						placeholder="Search courses..."
						className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-indigo-400"
					/>
					<Search className="h-5 w-5 text-indigo-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
				</div>
				<Select>
					<SelectTrigger className="w-full md:w-[200px] rounded-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-indigo-400">
						<SelectValue placeholder=" " />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Categories</SelectItem>
						<SelectItem value="Fundamentals">Fundamentals</SelectItem>
						<SelectItem value="Navigation">Navigation</SelectItem>
						<SelectItem value="Technical">Technical</SelectItem>
						<SelectItem value="Meteorology">Meteorology</SelectItem>
						<SelectItem value="Safety">Safety</SelectItem>
						<SelectItem value="Legal">Legal</SelectItem>
						<SelectItem value="Physics">Physics</SelectItem>
						<SelectItem value="Career">Career</SelectItem>
					</SelectContent>
				</Select>
				<Select>
					<SelectTrigger className="w-full md:w-[200px] rounded-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:focus:border-indigo-400">
						<SelectValue placeholder=" " />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Levels</SelectItem>
						<SelectItem value="Beginner">Beginner</SelectItem>
						<SelectItem value="Intermediate">Intermediate</SelectItem>
						<SelectItem value="Advanced">Advanced</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Courses grid skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[...Array(4)].map((_, index) => (
					<Card
						key={index}
						className="overflow-hidden bg-white dark:bg-neutral-900 shadow-lg"
					>
						<Skeleton className="w-full h-48" />
						<CardHeader className="pb-2 pt-5">
							<Skeleton className="h-6 w-3/4" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-4 w-full mb-2" />
							<Skeleton className="h-4 w-5/6 mb-4" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-1/2" />
								<Skeleton className="h-4 w-1/3" />
								<Skeleton className="h-4 w-1/4" />
							</div>
						</CardContent>
						<CardFooter>
							<Skeleton className="h-10 w-full rounded-md" />
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
