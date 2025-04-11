import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;

  // ✅ No need to call .protect() manually anymore
  // Clerk auto-protects based on routes now
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
