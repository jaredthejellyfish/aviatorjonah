"use client";

import { useMemo, useState } from "react";
import { Settings, MoreVertical, Trash, Pencil, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useConversations } from "@/hooks/useConversations";
import { Conversation } from "./navigation-types";
import BrandLogo from "./CoPilotLogo";
import { EditTitleDialog } from "./EditTitleDialog";
import { Button } from "@/components/ui/button";
import { SidebarLoading } from "./loading";
import dynamic from "next/dynamic";

const SettingsDialog = dynamic(
	() => import("./settings-dialog").then((mod) => mod.SettingsDialog),
	{ ssr: false },
);

const ConversationLink = ({
	conversation,
	pathname,
	deletingId,
	showOptionsFor,
	setShowOptionsFor,
	setEditingConversation,
	handleDeleteConversation,
}: {
	conversation: Conversation;
	pathname: string;
	deletingId: string | null;
	showOptionsFor: string | null;
	setShowOptionsFor: (id: string | null) => void;
	setEditingConversation: (conversation: Conversation | null) => void;
	handleDeleteConversation: (id: string) => void;
}) => {
	const isActive = pathname === `/copilot/chat/${conversation.id}`;
	const isDeleting = deletingId === conversation.id;
	const showOptions = showOptionsFor === conversation.id;

	return (
		<div className="group relative">
			<Link
				href={`/copilot/chat/${conversation.id}`}
				className={`
            w-full relative flex items-center px-4 py-1.5
            ${isActive ? "bg-blue-500/10" : "hover:bg-slate-700/30"}
            transition-colors duration-200
          `}
			>
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between gap-2">
						<span
							className={`text-sm truncate ${isActive ? "text-blue-400" : "text-slate-300 group-hover:text-white"}`}
						>
							{conversation.title}
						</span>
						<button
							onClick={(e) => {
								e.preventDefault();
								setShowOptionsFor(showOptions ? null : conversation.id);
							}}
							className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-slate-700/50 text-slate-400 hover:text-slate-300"
						>
							<MoreVertical className="w-4 h-4" />
						</button>
					</div>
					{conversation.last_message && (
						<p className="text-[11px] text-slate-500 truncate mt-0.5">
							{conversation.last_message}
						</p>
					)}
				</div>

				{isActive && (
					<div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500" />
				)}
			</Link>

			{/* Options Menu */}
			{showOptions && (
				<div className="absolute right-2 top-8 z-50 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-1">
					<button
						onClick={() => {
							setEditingConversation(conversation);
							setShowOptionsFor(null);
						}}
						className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700/50"
					>
						<Pencil className="w-4 h-4" />
						Edit title
					</button>
					<button
						onClick={() => handleDeleteConversation(conversation.id)}
						disabled={isDeleting}
						className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-red-400 hover:bg-slate-700/50 disabled:opacity-50"
					>
						{isDeleting ? (
							<div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
						) : (
							<Trash className="w-4 h-4" />
						)}
						Delete conversation
					</button>
				</div>
			)}
		</div>
	);
};

const DateSection = ({
	title,
	conversations,
	pathname,
	deletingId,
	showOptionsFor,
	setShowOptionsFor,
	setEditingConversation,
	handleDeleteConversation,
}: {
	title: string;
	conversations: Conversation[];
	pathname: string;
	deletingId: string | null;
	showOptionsFor: string | null;
	setShowOptionsFor: (id: string | null) => void;
	setEditingConversation: (conversation: Conversation | null) => void;
	handleDeleteConversation: (id: string) => void;
}) => {
	if (!conversations?.length) return null;

	return (
		<div>
			<div className="px-4 py-2">
				<h3 className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
					{title}
				</h3>
			</div>
			<div className="space-y-px">
				{conversations.map((conversation) => (
					<ConversationLink
						key={conversation.id}
						conversation={conversation}
						pathname={pathname}
						deletingId={deletingId}
						showOptionsFor={showOptionsFor}
						setShowOptionsFor={setShowOptionsFor}
						setEditingConversation={setEditingConversation}
						handleDeleteConversation={handleDeleteConversation}
					/>
				))}
			</div>
		</div>
	);
};

export const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { conversations, mutate, isLoading } = useConversations({});
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [showOptionsFor, setShowOptionsFor] = useState<string | null>(null);
	const [editingConversation, setEditingConversation] =
		useState<Conversation | null>(null);
	const [showSettings, setShowSettings] = useState(false);

	// Group conversations by date
	const groupedConversations = useMemo(() => {
		if (!conversations || !Array.isArray(conversations)) return {};

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		const lastWeek = new Date(today);
		lastWeek.setDate(lastWeek.getDate() - 7);

		return conversations.reduce(
			(
				groups: { [key: string]: Conversation[] },
				conversation: Conversation,
			) => {
				const date = conversation.created_at
					? new Date(conversation.created_at)
					: new Date();
				date.setHours(0, 0, 0, 0);

				if (date.getTime() === today.getTime()) {
					groups.today = groups.today || [];
					groups.today.push(conversation);
				} else if (date.getTime() === yesterday.getTime()) {
					groups.yesterday = groups.yesterday || [];
					groups.yesterday.push(conversation);
				} else if (date > lastWeek) {
					groups.lastWeek = groups.lastWeek || [];
					groups.lastWeek.push(conversation);
				} else {
					groups.older = groups.older || [];
					groups.older.push(conversation);
				}

				return groups;
			},
			{},
		);
	}, [conversations]);

	const handleDeleteConversation = async (id: string) => {
		try {
			setDeletingId(id);
			const response = await fetch(`/api/chat/conversations/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete conversation");
			}

			// If we're on the deleted conversation's page, redirect to /copilot/chat
			if (pathname === `/copilot/chat/${id}`) {
				router.push("/copilot/chat");
			}

			// Refresh the conversations list
			mutate();
		} catch (error) {
			console.error("Error deleting conversation:", error);
		} finally {
			setDeletingId(null);
			setShowOptionsFor(null);
			router.refresh();
		}
	};

	const handleUpdateTitle = async (title: string) => {
		if (!editingConversation) return;

		try {
			const response = await fetch(
				`/api/chat/conversations/${editingConversation.id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ title }),
				},
			);

			if (!response.ok) {
				throw new Error("Failed to update conversation title");
			}

			// Refresh the conversations list
			mutate();
		} catch (error) {
			console.error("Error updating conversation title:", error);
			throw error;
		}
	};

	if (isLoading || !conversations) return <SidebarLoading />;

	return (
		<>
			<nav className="hidden lg:flex flex-col w-[280px] bg-slate-800/90 backdrop-blur-xl border-r border-slate-700 h-screen fixed top-0 left-0 z-30">
				{/* Logo Section */}
				<div className="border-b border-slate-800">
					<div className="h-14 flex items-center px-4">
						<BrandLogo />
					</div>
				</div>

				{/* Action Buttons */}
				<div className="p-2 space-y-1.5">
					<Button
						onClick={() => {
							router.push("/copilot/chat");
						}}
						className="flex items-center gap-2 w-full px-4 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
					>
						<PlusIcon className="w-4 h-4" />
						<span className="text-sm font-medium">New Chat</span>
					</Button>

					<Link
						href="/copilot"
						className={`flex items-center gap-2 w-full px-4 h-10 rounded-lg transition-colors duration-200
              ${
								pathname === "/copilot"
									? "bg-slate-700/50 text-slate-200"
									: "text-slate-300 hover:bg-slate-700/30 hover:text-white"
							}`}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								x="2"
								y="2"
								width="5"
								height="5"
								rx="1"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<rect
								x="2"
								y="9"
								width="5"
								height="5"
								rx="1"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<rect
								x="9"
								y="2"
								width="5"
								height="5"
								rx="1"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<rect
								x="9"
								y="9"
								width="5"
								height="5"
								rx="1"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
						<span className="text-sm font-medium">Dashboard</span>
					</Link>
				</div>

				{/* Conversations List */}
				<div className="flex-1 py-2 overflow-y-auto scrollbar-hide space-y-4">
					<DateSection
						title="Today"
						conversations={groupedConversations.today}
						pathname={pathname}
						deletingId={deletingId}
						showOptionsFor={showOptionsFor}
						setShowOptionsFor={setShowOptionsFor}
						setEditingConversation={setEditingConversation}
						handleDeleteConversation={handleDeleteConversation}
					/>
					<DateSection
						pathname={pathname}
						deletingId={deletingId}
						showOptionsFor={showOptionsFor}
						setShowOptionsFor={setShowOptionsFor}
						setEditingConversation={setEditingConversation}
						handleDeleteConversation={handleDeleteConversation}
						title="Yesterday"
						conversations={groupedConversations.yesterday}
					/>
					<DateSection
						title="Last 7 Days"
						conversations={groupedConversations.lastWeek}
						pathname={pathname}
						deletingId={deletingId}
						showOptionsFor={showOptionsFor}
						setShowOptionsFor={setShowOptionsFor}
						setEditingConversation={setEditingConversation}
						handleDeleteConversation={handleDeleteConversation}
					/>
					<DateSection
						title="Older"
						conversations={groupedConversations.older}
						pathname={pathname}
						deletingId={deletingId}
						showOptionsFor={showOptionsFor}
						setShowOptionsFor={setShowOptionsFor}
						setEditingConversation={setEditingConversation}
						handleDeleteConversation={handleDeleteConversation}
					/>
				</div>

				{/* Settings Button */}
				<div className="border-t border-slate-800">
					<Button
						onClick={() => setShowSettings(true)}
						className="h-14 w-full flex items-center justify-start px-4 group"
					>
						<div className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-800/50 group-hover:bg-slate-700/50 group-hover:border-slate-700 transition-colors duration-200">
							<Settings className="w-4 h-4 text-slate-400 group-hover:text-slate-300" />
						</div>
						<span className="ml-3 text-sm text-slate-400 group-hover:text-slate-300">
							Settings
						</span>
					</Button>
				</div>
			</nav>

			<EditTitleDialog
				isOpen={!!editingConversation}
				onClose={() => setEditingConversation(null)}
				onSubmit={handleUpdateTitle}
				initialTitle={editingConversation?.title || ""}
			/>

			{showSettings && (
				<SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
			)}
		</>
	);
};
