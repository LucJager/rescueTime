import { NextRequest, NextResponse } from "next/server"
import { verifyToken, COOKIE_NAME } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value
    if (token && await verifyToken(token)) return NextResponse.next()
  } catch { /* invalid token or missing secret */ }
  return NextResponse.redirect(new URL("/login", req.url))
}

export const config = {
  matcher: ["/((?!login|api/auth|_next|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
}
