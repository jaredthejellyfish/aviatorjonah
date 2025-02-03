import { CopilotSettingsProvider } from "@/components/copilot/CopilotSettingsProvider";
import { Sidebar } from "@/components/copilot/chat/sidebar";

type Props = {
	children: React.ReactNode;
};

export const metadata = {
	title: "Copilot | Chat",
	description: "Chat with the copilot",
};

async function ChatLayout({ children }: Props) {
	return (
		<CopilotSettingsProvider>
			<div className="flex h-full w-full">
				<Sidebar />
				{children}
			</div>
		</CopilotSettingsProvider>
	);
}

export default ChatLayout;
