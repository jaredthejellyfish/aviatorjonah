// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected route patterns
const isProtectedRoute = createRouteMatcher([
	"/dashboard(.*)",
	"/account(.*)",
	"/copilot/(.*)",
]);

type Redirect = {
	path: string;
	destination: string;
	authStatus: "authenticated" | "unauthenticated";
};

const redirects: Redirect[] = [
	{
		path: "/copilot",
		destination: "/copilot/dashboard",
		authStatus: "authenticated",
	},
];

export default clerkMiddleware(async (auth, req) => {
	if (isProtectedRoute(req)) {
		await auth.protect();
	}
	const { userId } = await auth();

	const redirect = redirects.find((r) => r.path === req.nextUrl.pathname);
	if (redirect) {
		if (userId && redirect.authStatus === "authenticated") {
			return NextResponse.rewrite(new URL(redirect.destination, req.url));
		}
	} else {
		return NextResponse.next();
	}
});

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
