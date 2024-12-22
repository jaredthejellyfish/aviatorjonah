import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface ToggleDraftStatusParams {
  courseId: string;
}

export function useCourseDraftStatusMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ courseId }: ToggleDraftStatusParams) => {
      const response = await fetch("/api/admin/courses/toggle-visibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to toggle course visibility");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Course Draft Status Updated", {
        description: "The course draft status has been successfully updated.",
      });
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to update course draft status");
    },
  });
}
