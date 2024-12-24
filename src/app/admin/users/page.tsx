import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { needsAdminAccess } from "@/utils/helpers/needsAdminAccess";
import { Suspense } from "react";
import { OrganizationDashboardSkeleton } from "./OrganizationDashboardSkeleton";

const OrganizationDashboard = dynamic(() => import("./OrganizationDashboard"));

export default async function UsersPage() {
	const hasAdminAccess = await needsAdminAccess();

	if (!hasAdminAccess) {
		redirect("/admin/not-authorized");
	}

	return (
		<Suspense fallback={<OrganizationDashboardSkeleton />}>
			<OrganizationDashboard />
		</Suspense>
	);
}
