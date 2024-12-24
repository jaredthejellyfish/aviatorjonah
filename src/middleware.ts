import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/forum(.*)",
  "/dashboard(.*)",
  "/course(.*)",
]);

const isCourseRoute = createRouteMatcher([
  "/courses(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isCourseRoute(req)) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/" && userId) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
