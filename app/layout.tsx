import "./global.css";
import { Inter } from "next/font/google";
import CookieBanner from "@/components/cookie-banner";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import ChatBot from "@/components/chat-bot";
import ReactQueryProvider from "@/providers/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata = {
	title: "AviatorJonah",
	description:
		"Inspiring pilots and enthusiasts with curated content, stories, and resources. Explore aviation, learn, and connect with a community passionate about flight!",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ReactQueryProvider>
			<ClerkProvider>
				<html lang="en" className="scroll-smooth">
					<body
						className={`${inter.variable} font-inter antialiased bg-slate-900 text-slate-100 tracking-tight`}
					>
						<div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
							<main>{children}</main>
							<CookieBanner />
							<SignedIn>
								<ChatBot />
							</SignedIn>
						</div>
						<ReactQueryDevtools initialIsOpen={false} />
						<Toaster richColors closeButton position="top-right" />
						<SpeedInsights />
						<Analytics />
					</body>
				</html>
			</ClerkProvider>
		</ReactQueryProvider>
	);
}
