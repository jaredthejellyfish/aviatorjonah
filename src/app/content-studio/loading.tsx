import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users } from "lucide-react";
import { BookOpen } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Creator Studio</h1>
				<Button>Create New Course</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-8 w-16" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Students
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-8 w-16" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Published Courses
						</CardTitle>
						<BookOpen className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-8 w-16" />
					</CardContent>
				</Card>
			</div>

			{/* Course List Section */}
			<div className="mt-8">
				<h2 className="text-2xl font-semibold mb-4">Your Courses</h2>

				<div className="bg-black p-3 rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Students</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{[...Array(5)].map((_, index) => (
								<TableRow key={index}>
									<TableCell>
										<Skeleton className="h-4 w-[200px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-[60px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-[40px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-4 w-[80px]" />
									</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Skeleton className="h-8 w-[72px]" />{" "}
											{/* Size matches Button with "Edit" text */}
											<Skeleton className="h-8 w-[84px]" />{" "}
											{/* Size matches Button with "Delete" text */}
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
