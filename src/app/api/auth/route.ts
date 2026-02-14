import { NextRequest, NextResponse } from "next/server"
import { createToken, COOKIE_NAME, MAX_AGE } from "@/lib/auth"

export async function POST(req: NextRequest) {
  let password: string
  try { ({ password } = await req.json()) } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }) }
  const expected = process.env.AUTH_PASSWORD ?? ""
  const p = password ?? ""
  let diff = p.length ^ expected.length
  for (let i = 0; i < Math.max(p.length, expected.length); i++) diff |= (p.charCodeAt(i) || 0) ^ (expected.charCodeAt(i) || 0)
  if (diff !== 0) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 })
  }
  const token = await createToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  })
  return res
}
