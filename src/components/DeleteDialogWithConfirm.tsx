"use client";

import React, { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  courseName: string;
  courseId: string;
  userIdFromCourse: string;
  deleteAction: (formData: FormData) => Promise<{ success: boolean }>;
};

function DeleteDialogWithConfirm({
  children,
  deleteAction,
  courseName,
  courseId,
  userIdFromCourse,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [courseNameInput, setCourseNameInput] = useState("");

  const doesTextMatch = useMemo(
    () => currentText.toLowerCase() === "delete my course",
    [currentText],
  );

  const handleDelete = async (formData: FormData) => {
    const res = (await new Promise((resolve) => {
      startTransition(async () => {
        const res = await deleteAction(formData);
        resolve(res);
      });
    })) as { success: boolean };

    if (res.success) {
      toast.success("Course deleted successfully");
      router.refresh();
      setOpen(false);
    } else {
      toast.error("Failed to delete course");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl p-6 gap-6 border-neutral-800">
        <AlertDialogHeader className="gap-2">
          <AlertDialogTitle className="text-3xl font-normal">
            Delete Course
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base font-normal text-neutral-400">
            This course will be deleted, along with all of its Lessons, Content,
            Student Progress, Comments, and Associated Data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-red-950/30 border border-red-900/50 text-red-400 rounded-md p-4 text-sm">
          Warning: This action is not reversible. Please be certain.
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-neutral-400">
              Enter the course name{" "}
              <span className="text-neutral-200">{courseName}</span> to
              continue:
            </p>
            <Input
              value={courseNameInput}
              onChange={(e) => setCourseNameInput(e.target.value)}
              className="bg-neutral-900 border-neutral-800 h-12"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm text-neutral-400">
              To verify, type{" "}
              <span className="text-neutral-200">delete my course</span> below:
            </p>
            <Input
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              className="bg-neutral-900 border-neutral-800 h-12"
            />
          </div>
        </div>

        <form action={handleDelete}>
          <input defaultValue={courseId} name="courseId" className="hidden" />
          <input
            defaultValue={userIdFromCourse}
            name="userIdFromCourse"
            className="hidden"
          />
          <AlertDialogFooter className="gap-3 sm:gap-3">
            <AlertDialogCancel className="h-11 px-6 bg-transparent border-neutral-800 hover:bg-neutral-900 transition-colors">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={
                !doesTextMatch || courseNameInput !== courseName || isPending
              }
              className={cn(
                "h-11 px-6 bg-white text-black hover:bg-neutral-200 transition-colors",
                (!doesTextMatch ||
                  courseNameInput !== courseName ||
                  isPending) &&
                  "opacity-50 cursor-not-allowed",
              )}
            >
              {isPending ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDialogWithConfirm;
