import { Message, ToolInvocation } from "ai";
import { Database } from "@/lib/supabase/db-types";

type SupabaseMessage = Database["public"]["Tables"]["messages"]["Row"];

export function transformSupabaseMessages(
	messages: SupabaseMessage[] | null,
): Message[] {
	if (!messages) return [];

	return messages.map((message) => {
		return {
			id: message.id,
			role: message.role as Message["role"],
			content: message.content || "",
			toolInvocations: message.tool_invocations as unknown as
				| ToolInvocation[]
				| undefined,
		};
	});
}
