import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface DeleteCourseParams {
  courseId: string;
}

export function useDeleteCourseMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ courseId }: DeleteCourseParams) => {
      const response = await fetch("/api/admin/courses/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete course");
      }

      return response.json();
    },
    onSuccess: () => {
      router.refresh();
    },
  });
}
