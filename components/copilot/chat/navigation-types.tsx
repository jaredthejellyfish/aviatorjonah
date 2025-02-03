import { Database } from "@/lib/supabase/db-types";
import { LucideIcon } from "lucide-react";

export type Conversation =
	Database["public"]["Tables"]["conversations"]["Row"] & {
		last_message?: string;
	};

export interface NavItem {
	id: string;
	label: string;
	href: string;
	icon: LucideIcon;
}
