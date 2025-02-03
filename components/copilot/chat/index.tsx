"use client";

import { Message, useChat } from "ai/react";
import React, { useEffect, useState } from "react";
import { OctagonX, Send } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { usePathname, useRouter } from "next/navigation";
import { useCopilotSettings } from "@/components/copilot/CopilotSettingsProvider";
import dynamic from "next/dynamic";

const ExampleQuestions = dynamic(() => import("./example-questions"), {
	ssr: false,
});

const ThinkingBadge = dynamic(
	() => import("./message-components").then((mod) => mod.ThinkingBadge),
	{ ssr: false },
);

const MessageContainer = dynamic(() => import("./message-container"), {
	ssr: false,
});

type Props = {
	conversationId?: string;
	initialMessages?: Message[];
};

const ChatInput = ({
	input,
	isLoading,
	setInput,
	handleSubmit,
	stop,
}: {
	input: string;
	isLoading: boolean;
	setInput: (value: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	stop: () => void;
}) => {
	return (
		<div className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm p-4">
			<form onSubmit={handleSubmit} className="flex gap-2">
				<div className="relative flex-1">
					<input
						value={input}
						disabled={isLoading}
						onChange={(e) => setInput(e.target.value)}
						className="w-full px-4 py-3 bg-gray-800/90 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
						placeholder="Type your message..."
					/>
				</div>
				<button
					type={isLoading ? "button" : "submit"}
					onClick={isLoading ? stop : undefined}
					className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200 font-medium"
				>
					{isLoading ? (
						<OctagonX className="w-4 h-4" />
					) : (
						<Send className="w-4 h-4" />
					)}
				</button>
			</form>
			<div className="flex justify-center items-center mt-4 text-xs opacity-65">
				Copilot can make mistakes. Always verify information from a trusted
				source.
			</div>
		</div>
	);
};

function ChatComponent({
	conversationId: serverConversationId,
	initialMessages,
}: Props) {
	const [conversationId, setConversationId] = useState(serverConversationId);
	const pathname = usePathname();
	const { settings } = useCopilotSettings();
	const router = useRouter();

	useEffect(() => {
		if (conversationId && pathname !== `/copilot/chat/${conversationId}`) {
			const url = `/copilot/chat/${conversationId}`;
			window.history.replaceState(window.history.state, "", url);
		}
	}, [conversationId, pathname]);

	const queryClient = useQueryClient();
	const { messages, handleSubmit, input, setInput, isLoading, stop } = useChat({
		initialMessages: initialMessages,
		experimental_throttle: 0,
		body: {
			conversationId: conversationId,
		},
		onResponse: (response) => {
			if (response.status === 401) {
				setConversationId(undefined);
			}
			const conversationId = response.headers.get("X-Conversation-Id");

			if (conversationId) {
				setConversationId(conversationId);
			}
		},
		onFinish: async () => {
			queryClient.invalidateQueries({
				queryKey: ["conversations"],
			});
		},
	});

	useEffect(() => {
		if (conversationId) {
			router.push(`/copilot/chat/${conversationId}`);
		}
	}, [conversationId, router]);

	const [containerRef, endRef] = useScrollToBottom<HTMLDivElement>();

	const submitExampleQuestion = async (question: string) => {
		setInput(question);
		const fakeEvent = {
			preventDefault: () => {},
		} as React.FormEvent<HTMLFormElement>;
		handleSubmit(fakeEvent);
	};

	return (
		<div className="flex flex-col h-[100vh] lg:pl-[19rem] lg:pr-6 mx-auto w-full">
			<div
				ref={containerRef}
				className="flex-1 overflow-y-auto px-4 py-6 space-y-4 h-full"
			>
				{messages.map((message) => (
					<MessageContainer
						key={message.id}
						message={message}
						settings={settings}
					/>
				))}
				{isLoading && !settings?.show_intermediate_steps && (
					<div className="flex justify-start mt-4">
						<ThinkingBadge />
					</div>
				)}
				<div ref={endRef} />
			</div>

			{messages.length === 0 && (
				<ExampleQuestions submitExampleQuestion={submitExampleQuestion} />
			)}

			<ChatInput
				input={input}
				isLoading={isLoading}
				setInput={setInput}
				handleSubmit={handleSubmit}
				stop={stop}
			/>
		</div>
	);
}

export default ChatComponent;
