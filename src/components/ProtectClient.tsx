"use client";

import { useOrganization } from "@clerk/nextjs";
import React from "react";

type Props = {
	orgSlug: string | string[];
	children: React.ReactNode;
	fallback?: React.ReactNode;
};

function ProtectClient({ orgSlug, children, fallback }: Props) {
	const { organization } = useOrganization();

	if (
		!organization?.slug ||
		(Array.isArray(orgSlug)
			? !orgSlug.includes(organization.slug)
			: organization.slug !== orgSlug)
	) {
		return fallback ? <>{fallback}</> : null;
	}

	return <>{children}</>;
}

export default ProtectClient;
