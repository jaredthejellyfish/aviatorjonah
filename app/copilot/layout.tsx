import React from "react";

type Props = {
	children: React.ReactNode;
};

export const metadata = {
	title: "AviatorJonah | Copilot",
	description: "Your digital flight companion",
};

function CopilotLayout({ children }: Props) {
	return children;
}

export default CopilotLayout;
