import { auth } from "@clerk/nextjs/server";
import React from "react";

type Props = {
  orgSlug: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

async function ProtectServer({ orgSlug, children, fallback }: Props) {
  const { orgSlug: authOrgSlug } = await auth();

  if (authOrgSlug !== orgSlug) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

export default ProtectServer;
