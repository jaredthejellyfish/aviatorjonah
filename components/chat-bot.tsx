"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, OctagonX } from "lucide-react";
import type { Message } from "ai";
import { useChat } from "ai/react";
import { usePathname } from "next/navigation";
import { Markdown } from "./copilot/chat/markdown";

const predefinedQuestions = [
	"What is AviatorJonah?",
	"Learn about a FAF",
	"What is Prop Heat?",
];

interface WeatherInfo {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface WeatherMainData {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}

interface ToolCallResult {
	title?: string;
	content?: string;
	weather?: WeatherInfo[];
	main?: WeatherMainData;
}

interface ToolCallArguments {
	city?: string;
	state?: string;
	countryCode?: string;
	title?: string;
	content?: string;
	nextStep?: string;
	[key: string]: string | undefined;
}

interface ToolCall {
	state: string;
	toolCallId: string;
	toolName: string;
	args: ToolCallArguments;
	result?: ToolCallResult;
}

function ReasoningStep({ title, content }: { title: string; content: string }) {
	return (
		<div className="border border-blue-500/20 rounded-lg p-2 my-1 bg-blue-500/5">
			<div className="flex items-center gap-1 mb-1">
				<div className="w-2 h-2 rounded-full bg-blue-500/20 animate-pulse" />
				<div className="font-medium text-blue-400 text-xs">{title}</div>
			</div>
			<div className="text-gray-300 text-xs pl-3">
				<Markdown>{content}</Markdown>
			</div>
		</div>
	);
}

function WeatherData({ result }: { result: ToolCallResult }) {
	if (!result.weather?.[0] || !result.main) return null;

	return (
		<div className="border border-emerald-500/20 rounded-lg p-2 my-1 bg-emerald-500/5">
			<div className="flex items-center gap-1 mb-1">
				<div className="w-2 h-2 rounded-full bg-emerald-500/20" />
				<div className="font-medium text-emerald-400 text-xs">Weather Data</div>
			</div>
			<div className="text-gray-300 text-xs pl-3 space-y-0.5">
				<div>Condition: {result.weather[0].description}</div>
				<div>Temperature: {result.main.temp}°C</div>
				<div>Humidity: {result.main.humidity}%</div>
			</div>
		</div>
	);
}

function ToolCallDisplay({ toolCall }: { toolCall: ToolCall }) {
	if (toolCall.state !== "result") {
		return (
			<div className="border border-gray-700 rounded-lg p-2 my-1 bg-gray-800/50">
				<div className="flex items-center gap-1">
					<div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse" />
					<div className="text-gray-400 text-xs">
						Processing {toolCall.toolName}...
					</div>
				</div>
			</div>
		);
	}

	const toolDisplayMap: Record<string, React.FC<{ result: ToolCallResult }>> = {
		addAReasoningStep: ({ result }) =>
			result?.title && result?.content ? (
				<ReasoningStep title={result.title} content={result.content} />
			) : null,
		getCurrentWeather: ({ result }) =>
			result ? <WeatherData result={result} /> : null,
	};

	const DisplayComponent = toolDisplayMap[toolCall.toolName];
	return DisplayComponent ? (
		<DisplayComponent result={toolCall.result || {}} />
	) : null;
}

function ToolCalls({ toolCalls }: { toolCalls: ToolCall[] }) {
	return (
		<div className="space-y-1">
			{toolCalls.map((call) => (
				<ToolCallDisplay key={call.toolCallId} toolCall={call} />
			))}
		</div>
	);
}

function ThinkingBadge() {
	return (
		<div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-800/50 border border-gray-700">
			<div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
			<span className="text-xs text-gray-300">Thinking...</span>
		</div>
	);
}

export default function ChatBot() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [conversationId, setConversationId] = useState<string | undefined>(
		undefined,
	);
	const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
		useChat({
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
		});

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [scrollToBottom, messages]);

	const handlePredefinedQuestion = (question: string) => {
		const fakeEvent = {
			preventDefault: () => {},
			target: {
				elements: {
					message: { value: question },
				},
			},
		} as unknown as React.FormEvent<HTMLFormElement>;
		handleSubmit(fakeEvent);
	};

	if (pathname.startsWith("/copilot/chat")) {
		return null;
	}

	return (
		<>
			{!isOpen && (
				<button
					type="button"
					className="fixed bottom-4 right-4 bg-[#1b264f] hover:bg-[#1b264f]/80 text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out"
					onClick={() => setIsOpen(true)}
				>
					<MessageSquare className="h-6 w-6" />
				</button>
			)}
			{isOpen && (
				<div className="fixed bottom-4 right-4 w-96 h-[32rem] bg-slate-900/90 backdrop-blur-sm rounded-lg shadow-xl flex flex-col overflow-hidden z-50">
					<div className="flex items-center justify-between p-4 border-b border-slate-700">
						<h3 className="text-lg font-semibold text-white">
							CoPilot | Your Flying Assistant
						</h3>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="text-slate-400 hover:text-white transition-colors duration-300"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
					<div className="flex-grow overflow-auto p-4 space-y-4">
						{messages.map((message: Message) => (
							<div
								key={message.id}
								className={`flex ${message.role === "user" ? "justify-end" : "w-full"}`}
							>
								<div
									className={`${
										message.role === "user"
											? "max-w-[80%] bg-blue-600 text-white rounded-2xl rounded-tr-sm"
											: "w-full text-gray-100 rounded-lg"
									} ${message.role === "assistant" && message.content ? "bg-gray-800/50" : ""} shadow-sm`}
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
											className={`p-3 ${
												message.role === "assistant"
													? "prose prose-invert prose-sm max-w-none [&_pre]:max-w-[280px] [&_pre]:overflow-x-auto"
													: ""
											}`}
										>
											<Markdown>{message.content}</Markdown>
										</div>
									)}
								</div>
							</div>
						))}
						{isLoading && (
							<div className="flex justify-start mt-2">
								<ThinkingBadge />
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>
					{messages.length === 0 && !isLoading && (
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6">
							<div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
								<p className="text-center text-slate-300 mb-4">
									Choose a question or ask your own:
								</p>
								{predefinedQuestions.map((question) => (
									<button
										type="button"
										key={question}
										onClick={() => handlePredefinedQuestion(question)}
										className="block w-full text-left p-2 mb-2 bg-[#1b264f] hover:bg-[#1b264f]/80 text-white rounded transition-colors duration-300"
									>
										{question}
									</button>
								))}
							</div>
						</div>
					)}
					<form
						onSubmit={handleSubmit}
						className="p-4 border-t border-slate-700 bg-slate-900/90 backdrop-blur-sm"
					>
						<div className="flex gap-2">
							<input
								value={input}
								onChange={handleInputChange}
								disabled={isLoading}
								placeholder="Type your message..."
								className="flex-grow bg-slate-800 text-white placeholder-slate-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1b264f] border border-slate-700"
							/>
							<button
								type={isLoading ? "button" : "submit"}
								onClick={isLoading ? stop : undefined}
								className="bg-[#1b264f] hover:bg-[#1b264f]/80 text-white rounded-lg px-4 py-2 transition-colors duration-300"
							>
								{isLoading ? (
									<OctagonX className="h-4 w-4" />
								) : (
									<Send className="h-4 w-4" />
								)}
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
}
