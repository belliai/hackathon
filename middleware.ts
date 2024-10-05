import { NextResponse } from "next/server"

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin")
}

export function middleware(req: Request) {
  const { pathname } = new URL(req.url)

  if (isAdminRoute(pathname)) {
    return NextResponse.next()
  }

  return NextResponse.next()
}
