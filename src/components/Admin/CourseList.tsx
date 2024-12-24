"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Course } from "@/utils/helpers/getAllCourses";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import DeleteDialogWithConfirm from "../DeleteDialogWithConfirm";
import {
	removeCourse,
	setCourseDraftStatus,
} from "@/actions/course-editor/course";
import { toast } from "sonner";

export function CourseList({ courses }: { courses: Course[] }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [pendingCourseId, setPendingCourseId] = useState<string | null>(null);

	const handleDraftToggle = async (courseId: string, draftStatus: boolean) => {
		setPendingCourseId(courseId);

		const res = (await new Promise((resolve) => {
			startTransition(async () => {
				const formData = new FormData();
				formData.append("courseId", courseId);
				formData.append("draftStatus", draftStatus.toString());
				const res = await setCourseDraftStatus(formData);
				resolve(res);
			});
		})) as { success: boolean };

		if (res.success) {
			toast.success("Draft status updated");
			router.refresh();
			setPendingCourseId(null);
		} else {
			toast.error("Failed to update draft status");
		}
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Level</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{courses?.map((course) => (
						<TableRow key={course.id}>
							<TableCell className="font-medium">{course.title}</TableCell>
							<TableCell>${course.price?.toFixed(2) ?? "N/A"}</TableCell>
							<TableCell>
								<Badge variant="secondary">{course.category}</Badge>
							</TableCell>
							<TableCell>
								<Badge variant="outline">{course.level}</Badge>
							</TableCell>
							<TableCell>
								<Badge
									variant="default"
									className={
										course.draft
											? "bg-secondary"
											: "bg-green-500 hover:bg-green-600"
									}
								>
									<span className="text-black dark:text-white">
										{course.draft ? "Draft" : "Published"}
									</span>
								</Badge>
							</TableCell>
							<TableCell className="text-right space-x-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleDraftToggle(course.id, !course.draft)}
									disabled={isPending && pendingCourseId === course.id}
								>
									{course.draft ? (
										<Eye className="h-4 w-4 mr-1" />
									) : (
										<EyeOff className="h-4 w-4 mr-1" />
									)}
									{isPending && pendingCourseId === course.id
										? "Updating..."
										: course.draft
											? "Publish"
											: "Unpublish"}
								</Button>
								<Button variant="outline" size="sm">
									<Pencil className="h-4 w-4" />
								</Button>
								<DeleteDialogWithConfirm
									courseName={course.title || ""}
									deleteAction={removeCourse}
									courseId={course.id}
									userIdFromCourse={course.instructor_id}
								>
									<Button variant="destructive" size="sm">
										<Trash2 className="h-4 w-4" />
									</Button>
								</DeleteDialogWithConfirm>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
