import CopyToClipboard from "@/components/copy-to-clipboard";
import { Markdown } from "./markdown";
import { ToolCalls } from "./message-components";
import { Message } from "ai";

type CopilotSettings = {
	tone: "professional" | "balanced" | "friendly";
	temperature: number;
	topP: number;
	topK: number;
	maxTokens: number;
	presencePenalty: number;
	frequencyPenalty: number;
	show_intermediate_steps?: boolean;
};

const MessageContainer = ({
	message,
	settings,
}: {
	message: Message;
	settings?: CopilotSettings;
}) => {
	return (
		<div
			className={`flex flex-col group ${message.role === "user" ? "items-end" : "w-full"} ${message.role === "assistant" && !settings?.show_intermediate_steps && !message.content ? "hidden" : ""}`}
		>
			<div
				className={`${
					message.role === "user"
						? "max-w-[80%] bg-blue-600 text-white rounded-2xl rounded-tr-sm"
						: "w-full text-gray-100 rounded-lg"
				} shadow-sm`}
			>
				{message.role === "assistant" &&
					message.toolInvocations &&
					message.toolInvocations.length > 0 && (
						<div className="mb-2">
							<ToolCalls toolCalls={message.toolInvocations} />
						</div>
					)}
				{message.content && (
					<div
						className={`p-4 bg-gray-800/50 rounded-lg ${message.role === "assistant" ? "prose prose-invert max-w-none" : ""}`}
					>
						<Markdown>{message.content}</Markdown>
					</div>
				)}
			</div>
			{message.role === "assistant" && message.content && (
				<div className="flex items-center justify-end">
					<CopyToClipboard text={message.content} />
				</div>
			)}
		</div>
	);
};

export default MessageContainer;
