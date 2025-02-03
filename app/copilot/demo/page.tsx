"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface UsageResponse {
	remaining: number;
	limitReached: boolean;
}

// Custom markdown renderer component
const MarkdownRenderer = ({ content }: { content: string }) => {
	return (
		<ReactMarkdown
			components={{
				p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
				ul: ({ children }) => (
					<ul className="list-disc ml-6 mb-4">{children}</ul>
				),
				ol: ({ children }) => (
					<ol className="list-decimal ml-6 mb-4">{children}</ol>
				),
				li: ({ children }) => <li className="mb-1">{children}</li>,
				h1: ({ children }) => (
					<h1 className="text-2xl font-bold mb-4">{children}</h1>
				),
				h2: ({ children }) => (
					<h2 className="text-xl font-bold mb-3">{children}</h2>
				),
				h3: ({ children }) => (
					<h3 className="text-lg font-bold mb-2">{children}</h3>
				),
				blockquote: ({ children }) => (
					<blockquote className="border-l-4 border-slate-600 pl-4 my-4 italic">
						{children}
					</blockquote>
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
};

const PublicChatInterface: React.FC = () => {
	const [chatCount, setChatCount] = useState<number>(0);
	const [isLimitReached, setIsLimitReached] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [showSubscribeModal, setShowSubscribeModal] = useState<boolean>(false);
	const chatWindowRef = useRef<HTMLDivElement>(null);
	const DAILY_LIMIT = 5;

	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat({
			api: "/api/chat",
			initialMessages: [
				{
					id: "welcome",
					role: "assistant",
					content:
						"👋 Welcome to CoPilot! I'm your AI flight assistant. You have 5 free chats per day. How can I assist you today?",
				},
			],
			onError: (error: Error) => {
				setError(
					"An error occurred while sending your message. Please try again.",
				);
				console.error("Chat error:", error);
			},
		});

	useEffect(() => {
		setIsMounted(true);
		const checkUsage = async () => {
			try {
				const response = await fetch("/api/track-usage", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					// Add cache: 'no-store' to prevent caching
					cache: "no-store",
				});

				if (!response.ok) {
					throw new Error("Failed to check usage");
				}

				const data: UsageResponse = await response.json();
				const remainingChats = DAILY_LIMIT - (DAILY_LIMIT - data.remaining);
				setChatCount(remainingChats);
				setIsLimitReached(data.limitReached);
				if (data.limitReached) {
					setShowSubscribeModal(true);
				}
			} catch (error) {
				console.error("Error checking usage:", error);
				setError("Unable to check chat usage. Please try again later.");
			}
		};

		checkUsage();
		return () => setIsMounted(false);
	}, []);

	useEffect(() => {
		if (chatWindowRef.current) {
			chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
		}
	}, [messages]);

	const handleMessageSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (isLimitReached) {
			setShowSubscribeModal(true);
			return;
		}

		if (!input.trim()) return;

		try {
			const response = await fetch("/api/track-usage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to track usage");
			}

			const data: UsageResponse = await response.json();

			if (data.limitReached) {
				setIsLimitReached(true);
				setShowSubscribeModal(true);
				return;
			}

			setChatCount(DAILY_LIMIT - data.remaining);
			await handleSubmit(e);
		} catch (error) {
			console.error("Error submitting message:", error);
			setError("Unable to send message. Please try again later.");
		}
	};

	const formatTime = (date: Date): string => {
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	if (!isMounted) {
		return (
			<div className="h-screen w-full flex items-center justify-center bg-slate-900">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	return (
		<div className="relative flex h-screen w-full bg-slate-900 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0">
				<Image
					src="/api/placeholder/1920/1080"
					alt="Aircraft cockpit"
					fill
					className="object-cover object-center opacity-10"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/90" />
				<div className="absolute inset-0 bg-blue-500/5 backdrop-blur-sm" />
			</div>

			{/* Chat Interface */}
			<div className="relative flex flex-col w-full">
				{/* Usage Counter */}
				<div className="absolute top-4 right-4 bg-slate-800/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-slate-300">
					{DAILY_LIMIT - chatCount} chats remaining today
				</div>

				{/* Error Message */}
				{error && (
					<div className="absolute top-16 right-4 z-50 bg-red-500/90 text-white px-4 py-2 rounded-lg">
						{error}
					</div>
				)}

				{/* Chat Window */}
				<div
					ref={chatWindowRef}
					className="flex-grow p-4 overflow-y-auto custom-scrollbar"
				>
					<div className="max-w-3xl mx-auto space-y-6 pt-16">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`
                  flex flex-col
                  max-w-[80%]
                  ${message.role === "user" ? "items-end" : "items-start"}
                `}
								>
									<div
										className={`
                    p-4 rounded-2xl shadow-lg backdrop-blur-sm
                    ${
											message.role === "user"
												? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
												: "bg-slate-800/90 text-slate-200 border border-slate-700/50"
										}
                  `}
									>
										<MarkdownRenderer content={message.content} />
									</div>
									<span className="text-xs text-slate-400 mt-1 px-2">
										{formatTime(new Date())}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Chat Input */}
				<div className="border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-md p-4">
					<div className="max-w-3xl mx-auto">
						<form onSubmit={handleMessageSubmit} className="relative">
							<input
								type="text"
								placeholder={
									isLimitReached
										? "Daily limit reached. Subscribe for unlimited access."
										: "Type your message..."
								}
								value={input}
								onChange={handleInputChange}
								disabled={isLimitReached || isLoading}
								className="w-full pr-12 py-2 px-4 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
							/>
							<button
								type="submit"
								disabled={isLoading || !input.trim() || isLimitReached}
								className="absolute right-1 top-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
							>
								<svg
									className="w-4 h-4 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
									/>
								</svg>
							</button>
						</form>
					</div>
				</div>
			</div>

			{/* Subscribe Modal */}
			{showSubscribeModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
					<div className="bg-slate-800 rounded-xl p-6 max-w-md w-full">
						<h2 className="text-xl font-semibold text-slate-200 mb-4">
							Daily Chat Limit Reached
						</h2>
						<p className="text-slate-300 mb-4">
							You&apos;ve reached your daily limit of 5 free chats. Subscribe to
							our premium plan for unlimited access and additional features:
						</p>
						<ul className="space-y-2 text-slate-400 mb-6">
							<li>• Unlimited chats</li>
							<li>• Advanced flight planning tools</li>
							<li>• Weather radar and forecasts</li>
							<li>• Route optimization</li>
							<li>• Custom briefings</li>
						</ul>
						<div className="flex gap-4">
							<button
								type="button"
								onClick={() => {
									window.location.href = "/subscribe";
								}}
								className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium transition-all duration-300"
							>
								Subscribe Now
							</button>
							<button
								type="button"
								onClick={() => setShowSubscribeModal(false)}
								className="py-2 px-4 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium transition-all duration-300"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PublicChatInterface;
