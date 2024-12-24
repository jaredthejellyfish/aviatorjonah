import Link from "next/link";
import { CreatorCourse } from "@/utils/helpers/getCreatorCourses";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import DeleteDialogWithConfirm from "../DeleteDialogWithConfirm";
import { removeCourse } from "@/actions/course-editor/course";

export function CourseList({ courses }: { courses: CreatorCourse[] }) {
	return (
		<div className="dark:bg-black bg-white p-3 rounded-md">
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
					{courses.map((course) => (
						<TableRow key={course.id}>
							<TableCell className="font-medium">{course.title}</TableCell>
							<TableCell>${course.price || 0}</TableCell>
							<TableCell>{course.enrollment_count || 0}</TableCell>
							<TableCell>{course.draft ? "Draft" : "Published"}</TableCell>
							<TableCell>
								<div className="flex space-x-2">
									<Button variant="outline" size="sm" asChild>
										<Link href={`/content-studio/edit/${course.slug}`}>
											<Pencil className="h-4 w-4 mr-1" />
											Edit
										</Link>
									</Button>
									<DeleteDialogWithConfirm
										courseName={course.title || ""}
										deleteAction={removeCourse}
										userIdFromCourse={course.instructor_id ?? ""}
										courseId={course.id ?? ""}
									>
										<Button variant="destructive" size="sm">
											<Trash2 className="h-4 w-4" />
										</Button>
									</DeleteDialogWithConfirm>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
