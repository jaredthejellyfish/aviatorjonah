import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SyncActiveOrganizationClient = dynamic(
  () => import("@/components/SyncActiveOrganizationClient"),
);

export async function SyncActiveOrganization({}) {
  const { sessionClaims } = await auth();

  return (
    <Suspense fallback={null}>
      <SyncActiveOrganizationClient
        membership={sessionClaims?.membership as Record<string, string>}
      />
    </Suspense>
  );
}
