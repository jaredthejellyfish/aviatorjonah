import { DeleteModuleSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export function useCourseDeleteModuleMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: z.infer<typeof DeleteModuleSchema>) => {
      const response = await fetch("/api/creator-studio/course/delete-module", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to remove module");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Module removed");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to remove module");
    },
  });
}
