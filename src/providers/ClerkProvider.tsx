"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function ClerkProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const { theme } = useTheme();
	return (
		<ClerkProvider
			dynamic
			appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
		>
			{children}
		</ClerkProvider>
	);
}
