import React from "react";
import OrgDisplayClient from "./client";
import { auth } from "@clerk/nextjs/server";

async function OrgDisplay() {
	const authData = await auth();
	return (
		<div>
			<span>{authData.orgSlug}</span>
			<OrgDisplayClient />
		</div>
	);
}

export default OrgDisplay;
