"use client";

import { useOrganization } from "@clerk/nextjs";
import React from "react";

type Props = {};

function OrgDisplayClient({}: Props) {
	const { organization } = useOrganization();
	return <div>{organization?.slug}</div>;
}

export default OrgDisplayClient;
