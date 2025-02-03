export interface TeamMember {
	name: string;
	role: string;
	bio: string;
	image: string;
	email: string;
	isJobOpening?: boolean;
}

export interface RoadmapItem {
	phase: string;
	title: string;
	description: string;
	icon: string;
	status: "In Progress" | "Coming Soon" | "Future Plan";
}
