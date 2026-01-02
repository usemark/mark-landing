import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',              // Landing page (public for waitlist signups)
  '/subscribe(.*)', // Subscribe page
  '/blog(.*)',      // Blog pages
  '/api/webhooks(.*)', // Webhook endpoints if needed
]);

// Protected app routes (everything under /app)
const isProtectedRoute = createRouteMatcher([
  '/app(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // Only protect the /app routes
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
