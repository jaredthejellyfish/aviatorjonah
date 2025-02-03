import { Database } from "./supabase/db-types";

type SupabaseMessage = Database["public"]["Tables"]["messages"]["Row"];

export function sortMessagesIntoThread(
	messages: SupabaseMessage[] | null,
): SupabaseMessage[] {
	if (!messages || messages.length === 0) return [];

	// Find the root message (message with no parent)
	const rootMessage = messages.find((msg) => msg.parent_message_id === null);
	if (!rootMessage) return messages; // Fallback to original order if no root found

	const messageMap = new Map<string, SupabaseMessage>();
	const childrenMap = new Map<string, string[]>();

	// Build maps for quick lookups
	messages.forEach((msg) => {
		messageMap.set(msg.id, msg);
		if (msg.parent_message_id) {
			const children = childrenMap.get(msg.parent_message_id) || [];
			children.push(msg.id);
			childrenMap.set(msg.parent_message_id, children);
		}
	});

	// Function to recursively build the thread
	function buildThread(messageId: string, result: SupabaseMessage[]) {
		const message = messageMap.get(messageId);
		if (!message) return;

		result.push(message);
		const children = childrenMap.get(messageId) || [];
		children.forEach((childId) => buildThread(childId, result));
	}

	// Build the final sorted thread
	const sortedMessages: SupabaseMessage[] = [];
	buildThread(rootMessage.id, sortedMessages);

	return sortedMessages;
}
