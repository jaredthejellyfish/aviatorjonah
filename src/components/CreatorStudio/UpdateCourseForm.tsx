"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/actions/course-editor/course";
import { toast } from "sonner";

function UpdateCourseForm({
  children,
  courseId,
  courseSlug: initialCourseSlug,
}: {
  children: React.ReactNode;
  courseId: string;
  courseSlug: string;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleUpdate = async (formData: FormData) => {
    formData.append("courseId", courseId);

    const res = await new Promise((resolve) => {
      startTransition(async () => {
        const res = await updateCourse(formData);
        resolve(res);
      });
    }) as { success: boolean, slug?: string | null };

    if (res.success) {
      toast.success("Course updated successfully");
      if (initialCourseSlug !== res.slug) {
        router.push(`/content-studio/edit/${res.slug}`);
      } else {
        router.refresh();
      }
    } else {
      toast.error("Failed to update course");
    }
  };

  return <form action={handleUpdate}>{children}</form>;
}

export default UpdateCourseForm;
