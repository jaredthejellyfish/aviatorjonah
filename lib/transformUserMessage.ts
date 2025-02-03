export function transformUserMessage(userMessage: {
	content: string;
	role: string;
}) {
	return {
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString(),
		role: "user",
		content: userMessage.content,
	};
}
