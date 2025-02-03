"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

type Application = {
	id: string;
	name: string;
	email: string;
	country: string;
	aviation_experience: string;
	current_roles: string;
	discord: string | null;
	created_at: string;
	granted: boolean;
};

function truncateText(text: string, length: number = 30) {
	if (text.length <= length) return text;
	return text.slice(0, length) + "...";
}

export const columns: ColumnDef<Application>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "country",
		header: "Country",
	},
	{
		accessorKey: "aviation_experience",
		header: "Aviation Experience",
		cell: ({ row }) => {
			const experience = row.original.aviation_experience;
			return (
				<HoverCard>
					<HoverCardTrigger className="cursor-help">
						{truncateText(experience)}
					</HoverCardTrigger>
					<HoverCardContent>
						<div className="space-y-2">
							<p className="text-sm">{experience}</p>
						</div>
					</HoverCardContent>
				</HoverCard>
			);
		},
	},
	{
		accessorKey: "current_roles",
		header: "Current Roles",
		cell: ({ row }) => {
			const roles = row.original.current_roles;
			return (
				<HoverCard>
					<HoverCardTrigger className="cursor-help">
						{truncateText(roles)}
					</HoverCardTrigger>
					<HoverCardContent>
						<div className="space-y-2">
							<p className="text-sm">{roles}</p>
						</div>
					</HoverCardContent>
				</HoverCard>
			);
		},
	},
	{
		accessorKey: "discord",
		header: "Discord",
		cell: ({ row }) => row.original.discord || "Not provided",
	},
	{
		accessorKey: "created_at",
		header: "Applied On",
		cell: ({ row }) => format(new Date(row.original.created_at), "MMM d, yyyy"),
	},
	{
		accessorKey: "granted",
		header: "Status",
		cell: ({ row }) => (
			<Badge variant={row.original.granted ? "default" : "secondary"}>
				{row.original.granted ? "Approved" : "Pending"}
			</Badge>
		),
	},
];
