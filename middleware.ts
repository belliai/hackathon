import { NextResponse, type NextRequest } from "next/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher([
  "/(.*)", // Match all routes
])

const isPublicRoute = createRouteMatcher(["/login"])

const isAdminRoute = createRouteMatcher([
  "/admin/(.*)", // Match all admin routes
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname

  /**
   *  We retrieve the @searchParams from the middleware because we can't do it in the layout.tsx
   *  and we need a way to do this globally across all pages
   *  */
  const searchParams = req.nextUrl.searchParams

  const tab = searchParams.get("tab")

  if (isProtectedRoute(req) && !isPublicRoute(req)) auth().protect()

  const { orgSlug } = auth()

  // Protect admin pages
  if (orgSlug !== "admin" && isAdminRoute(req)) {
    const origin = req.nextUrl.origin

    return NextResponse.redirect(origin)
  }

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-pathname", pathname)

  if (tab) {
    requestHeaders.set("x-tab", tab)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
})

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
}
