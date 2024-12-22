import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      toast.success("Course Deleted", {
        description: "The course has been successfully deleted.",
      });
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to delete course");
    },
  });
}
