"use client";

import { useEffect } from "react";
import { useAuth, useOrganizationList } from "@clerk/nextjs";

export default function SyncActiveOrganizationClient({
	membership,
}: {
	membership: Record<string, string>;
}) {
	const { setActive, isLoaded } = useOrganizationList();

	const { orgId } = useAuth();

	const firstOrgId = Object.keys(membership ?? {})?.[0];

	useEffect(() => {
		if (!isLoaded) return;

		// If the org ID in the URL is not the same as the org ID in the session (the active organization), set the active organization to be the org ID from the URL
		if (!orgId && firstOrgId) {
			void setActive({ organization: firstOrgId });
		}
	}, [isLoaded, setActive, firstOrgId, orgId]);

	return null;
}
