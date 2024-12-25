import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";

const SyncActiveOrganizationClient = dynamic(
	() => import("@/components/SyncActiveOrganizationClient"),
);

export async function SyncActiveOrganization({}) {
	const { sessionClaims } = await auth();

	return (
		<ErrorBoundary fallback={null}>
			<SyncActiveOrganizationClient
				membership={sessionClaims?.membership as Record<string, string>}
			/>
		</ErrorBoundary>
	);
}
