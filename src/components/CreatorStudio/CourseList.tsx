"use client";

import { useEffect, useState } from "react";
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
import { useDeleteCourseMutation } from "@/hooks/useDeleteCourseMutation";
import DeleteDialogWithConfirm from "../DeleteDialogWithConfirm";

export function CourseList({
  initialCourses,
}: {
  initialCourses: CreatorCourse[];
}) {
  const [courses, setCourses] = useState<CreatorCourse[]>(initialCourses);
  const { mutate: deleteCourse } = useDeleteCourseMutation();

  useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);

  const handleDeleteCourse = (courseId: string) => {
    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== courseId)
    );

    deleteCourse(
      { courseId },
      {
        onError: () => {
          setCourses((currentCourses) => [
            ...currentCourses,
            ...initialCourses.filter((course) => course.id === courseId),
          ]);
        },
      }
    );
  };

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
                    onDelete={() =>
                      course.id && handleDeleteCourse(course.id)
                    }
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
