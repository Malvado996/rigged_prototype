import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
    matcher: [
        // Protect only app routes (timeline, community, etc.)
        "/timeline(.*)",
        "/community(.*)",
        "/forum(.*)",
        "/marketplace(.*)",
        "/profile(.*)",
        // Skip all API and static
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};