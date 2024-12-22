import { DeleteLessonSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export function useCourseDeleteLessonMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: z.infer<typeof DeleteLessonSchema>) => {
      const response = await fetch("/api/creator-studio/course/delete-lesson", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to remove lesson");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Lesson removed");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to remove lesson");
    },
  });
}
