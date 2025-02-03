import React from "react";

type Props = {
	children: React.ReactNode;
};

export const metadata = {
	title: "AviatorJonah | Legal",
	description: "Legal information for AviatorJonah",
};

function LegalLayout({ children }: Props) {
	return children;
}

export default LegalLayout;
