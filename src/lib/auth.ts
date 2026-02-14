export const COOKIE_NAME = "auth_token"
export const MAX_AGE = 30 * 24 * 60 * 60 // 30 days

const encoder = new TextEncoder()

async function hmacSign(message: string): Promise<string> {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error("AUTH_SECRET is not set")
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("")
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function createToken(): Promise<string> {
  const ts = Date.now().toString()
  const sig = await hmacSign(ts)
  return `${ts}.${sig}`
}

export async function verifyToken(token: string): Promise<boolean> {
  const dot = token.indexOf(".")
  if (dot === -1) return false
  const ts = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expected = await hmacSign(ts)
  if (!timingSafeEqual(sig, expected)) return false
  return Date.now() - Number(ts) < MAX_AGE * 1000
}
