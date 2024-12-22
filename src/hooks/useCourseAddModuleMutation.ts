import { AddModuleSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export function useCourseAddModuleMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: z.infer<typeof AddModuleSchema>) => {
      const response = await fetch("/api/creator-studio/course/add-module", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to add module");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Module added");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to add module");
    },
  });
}
