import React from "react";
import Header from "./header";
import { currentUser } from "@clerk/nextjs/server";

async function HeaderProvider() {
	const userData = await currentUser();

	return <Header firstName={userData?.firstName} />;
}

export default HeaderProvider;
