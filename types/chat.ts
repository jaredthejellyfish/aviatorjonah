export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp?: Date;
}

export interface UsageResponse {
	remaining: number;
	limitReached: boolean;
}

export interface ErrorResponse {
	message: string;
}
