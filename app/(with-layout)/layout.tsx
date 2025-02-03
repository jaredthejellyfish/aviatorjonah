import React from "react";
import HeaderProvider from "@/components/header-provider";
import Footer from "@/components/footer";

export default function FooterHeaderLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<HeaderProvider />
			{children}
			<Footer />
		</div>
	);
}
