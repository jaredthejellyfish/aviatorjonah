"use client";

import { useState } from "react";
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
import { useCourseDraftStatusMutation } from "@/hooks/useCourseDraftStatusMutation";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { useDeleteCourseMutation } from "@/hooks/useDeleteCourseMutation";

export function CourseList({ courses: initialCourses }: { courses: Course[] }) {
  const [courses, setCourses] = useState(initialCourses);
  const { mutate: toggleDraftStatus } = useCourseDraftStatusMutation();
  const { mutate: deleteCourse } = useDeleteCourseMutation();

  const handleDraftToggle = (courseId: string) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId ? { ...course, draft: !course.draft } : course
      )
    );

    toggleDraftStatus(
      { courseId },
      {
        onError: () => {
          setCourses((currentCourses) =>
            currentCourses.map((course) =>
              course.id === courseId
                ? { ...course, draft: !course.draft }
                : course
            )
          );
        },
      }
    );
  };

  const handleDelete = (courseId: string) => {
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
                  {course.draft ? "Draft" : "Published"}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDraftToggle(course.id)}
                >
                  {course.draft ? (
                    <Eye className="h-4 w-4 mr-1" />
                  ) : (
                    <EyeOff className="h-4 w-4 mr-1" />
                  )}
                  {course.draft ? "Publish" : "Unpublish"}
                </Button>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This course will be deleted permanently. All associated
                        data will be lost. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
