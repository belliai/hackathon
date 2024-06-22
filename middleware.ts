import { type NextRequest, NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { updateSession } from "./lib/utils/supabase/middleware";

clerkMiddleware();

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  await updateSession(req)

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
