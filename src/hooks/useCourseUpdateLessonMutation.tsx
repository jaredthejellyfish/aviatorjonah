import { UpdateLessonSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export function useCourseUpdateLessonMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Partial<z.infer<typeof UpdateLessonSchema>>) => {
      const response = await fetch("/api/creator-studio/course/update-lesson", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update lesson");
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast.success("Lesson updated");
      if (data.slug) {
        router.push(`/content-studio/edit/${data.courseSlug}/${data.slug}`);
      } else {
        router.refresh();
      }
    },
    onError: () => {
      toast.error("Failed to update lesson");
    },
  });
}
