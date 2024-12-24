import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export function OrganizationDashboardSkeleton() {
	return (
		<div className="container mx-auto px-4 py-4">
			<Breadcrumb className="mb-3">
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link href="/admin">Admin</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>User Management</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className="text-3xl font-bold mb-6">Organization Management</h1>

			<Tabs defaultValue="members" className="space-y-4">
				<div className="flex md:flex-row flex-col justify-between items-center gap-y-3">
					<TabsList>
						<TabsTrigger value="members">Members</TabsTrigger>
						<TabsTrigger value="invites">Invitations</TabsTrigger>
					</TabsList>

					<Select disabled>
						<SelectTrigger className="bg-black max-w-[300px]">
							<SelectValue></SelectValue>
						</SelectTrigger>
					</Select>
				</div>

				<TabsContent value="members">
					<Card>
						<CardHeader>
							<CardTitle>Invite New Member</CardTitle>
						</CardHeader>
						<CardContent>
							<form className="flex gap-4 mb-6">
								<Input
									type="email"
									placeholder="Email address"
									disabled
									className="flex-1"
								/>
								<Button type="submit" disabled>
									Send Invite
								</Button>
							</form>

							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{[...Array(5)].map((_, i) => (
										<TableRow key={i}>
											<TableCell>
												<Skeleton className="h-5 w-32" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-5 w-40" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-5 w-24" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-9 w-[180px]" />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
