import { AddLessonSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export function useCourseAddLessonMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: z.infer<typeof AddLessonSchema>) => {
      const response = await fetch("/api/creator-studio/course/add-lesson", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to add lesson");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Lesson added");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to add lesson");
    },
  });
}
