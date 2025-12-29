import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicApiRoute = createRouteMatcher([
    "/api/posts",
    "/api/uploadthing(.*)",  // if you still have it
]);

const isProtectedRoute = createRouteMatcher([
    "/timeline(.*)",
    "/community(.*)",
    "/forum(.*)",
    "/marketplace(.*)",
    "/profile(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    // Completely skip Clerk for public API routes
    if (isPublicApiRoute(req)) {
        return;
    }

    // Protect app routes
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};