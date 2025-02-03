export interface ChatMessage {
	id: string;
	role: string;
	content: string;
	timestamp: Date;
}

export interface Resource {
	id: string;
	type: "message" | "link" | "note";
	content: string;
	title: string;
	timestamp: Date;
}

export interface ResourcesPanelProps {
	isOpen: boolean;
	onClose: () => void;
}
