import {
	Cloud,
	MessageSquare,
	Book,
	Navigation2,
	Gauge,
	FileText,
} from "lucide-react";

export interface NavItem {
	id: string;
	label: string;
	icon: React.ElementType;
	href: string;
}

export const navItems: NavItem[] = [
	{
		id: "home",
		label: "Home",
		icon: Cloud,
		href: "/copilot/dashboard",
	},
	{
		id: "chat",
		label: "Chat",
		icon: MessageSquare,
		href: "/copilot/chat",
	},
	{
		id: "weather",
		label: "Weather",
		icon: Cloud,
		href: "/copilot/weather",
	},
	{
		id: "route",
		label: "Route Planning",
		icon: Navigation2,
		href: "/copilot/route-planning",
	},
	{
		id: "performance",
		label: "Aircraft Performance",
		icon: Gauge,
		href: "/copilot/aircraft-performance",
	},
	{
		id: "logbook",
		label: "Logbook",
		icon: Book,
		href: "/copilot/logbook",
	},
	{
		id: "documents",
		label: "Documents",
		icon: FileText,
		href: "/copilot/docs",
	},
];
