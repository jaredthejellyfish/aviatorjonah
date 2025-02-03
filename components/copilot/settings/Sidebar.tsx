import {
	User,
	Plane,
	MessageSquare,
	Shield,
	Bug,
	CreditCard,
} from "lucide-react";
import { BUILD_VERSION } from "components/copilot/settings/constants";

interface SidebarProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
	const navItems = [
		{ id: "profile", label: "Flight Profile", icon: Plane },
		{ id: "account", label: "Account", icon: User },
		{ id: "subscription", label: "Subscription", icon: CreditCard },
		{ id: "feedback", label: "Feedback", icon: MessageSquare },
		{ id: "policies", label: "Policies", icon: Shield },
		{ id: "bug", label: "Report Bug", icon: Bug },
	];

	return (
		<div className="w-64 bg-slate-900/50 border-r border-slate-700/50 flex flex-col">
			<div className="p-6 border-b border-slate-700/50">
				<h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
					Settings
				</h2>
			</div>

			<nav className="flex-1 p-4">
				<div className="space-y-2">
					{navItems.map(({ id, label, icon: Icon }) => (
						<button
							key={id}
							onClick={() => setActiveTab(id)}
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                ${
									activeTab === id
										? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
										: "text-slate-400 hover:text-white hover:bg-slate-700/50"
								}`}
						>
							<Icon
								className={`h-5 w-5 ${activeTab === id ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`}
							/>
							{label}
						</button>
					))}
				</div>
			</nav>

			<div className="p-4 border-t border-slate-700/50">
				<div className="text-xs text-center text-slate-500 mt-3">
					Build {BUILD_VERSION}
				</div>
			</div>
		</div>
	);
}
