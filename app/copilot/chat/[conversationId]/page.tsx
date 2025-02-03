import ChatComponent from "@/components/copilot/chat";
import { sortMessagesIntoThread } from "@/lib/sortMessagesIntoThread";
import { createClerkSupabaseClientSsr } from "@/lib/supabase/server";
import { transformSupabaseMessages } from "@/lib/supabase/helpers/transformSupabaseMessages";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MessageCircleIcon } from "lucide-react";
// Function to sort messages into a thread based on parent_message_id

type Props = {
	params: Promise<{ conversationId: string }>;
};

async function ConversationPage({ params }: Props) {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const { conversationId } = await params;
	const supabase = await createClerkSupabaseClientSsr();

	const { data: conversation } = await supabase
		.from("conversations")
		.select("id, user_id, created_at")
		.eq("id", conversationId)
		.single();

	if (!conversation) {
		return (
			<div className="flex flex-col h-[100vh] lg:pl-[19rem] lg:pr-6 mx-auto w-full">
				<div className="flex flex-col h-full justify-center items-center">
					<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 max-w-md w-full mx-4">
						<div className="flex flex-col items-center text-center">
							<div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
								<MessageCircleIcon className="w-8 h-8 text-slate-300" />
							</div>
							<h2 className="text-xl font-medium text-slate-200 mb-2">
								Conversation Not Found
							</h2>
							<p className="text-slate-400">
								This chat seems to have vanished into the digital ether.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (conversation.user_id !== userId) {
		return (
			<div className="flex flex-col h-[100vh] lg:pl-[19rem] lg:pr-6 mx-auto w-full">
				<div className="flex flex-col h-full justify-center items-center">
					<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 max-w-md w-full mx-4">
						<div className="flex flex-col items-center text-center">
							<div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
								<MessageCircleIcon className="w-8 h-8 text-red-300" />
							</div>
							<h2 className="text-xl font-medium text-slate-200 mb-2">
								Access Denied
							</h2>
							<p className="text-slate-400">
								You don&apos;t have permission to view this conversation.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
	// Fetch all messages for this conversation, ordered by created_at as a fallback
	const { data: messages } = await supabase
		.from("messages")
		.select("*")
		.eq("conversation_id", conversationId)
		.order("created_at", { ascending: true });

	// Sort messages into a thread based on parent_message_id
	const sortedMessages = sortMessagesIntoThread(messages);
	const transformedMessages = transformSupabaseMessages(sortedMessages);
	return (
		<ChatComponent
			conversationId={conversationId}
			initialMessages={transformedMessages}
		/>
	);
}

export default ConversationPage;
