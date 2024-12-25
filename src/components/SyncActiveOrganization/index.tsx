import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";

const SyncActiveOrganizationClient = dynamic(
	() => import("@/components/SyncActiveOrganization/SyncActiveOrganizationClient"),
);

export async function SyncActiveOrganization({}) {
	const { sessionClaims } = await auth();

	return (
		<SyncActiveOrganizationClient
			membership={sessionClaims?.membership as Record<string, string>}
		/>
	);
}