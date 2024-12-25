"use client";

import { useOrganization } from "@clerk/nextjs";
import React from "react";

function OrgDisplayClient() {
	const { organization } = useOrganization();
	if (!organization) return null;
	return <div>{organization?.slug}</div>;
}

export default OrgDisplayClient;
