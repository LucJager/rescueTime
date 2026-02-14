import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const apiKey = process.env.RESCUETIME_API_KEY
  if (!apiKey) return NextResponse.json({ error: "API key not configured" }, { status: 500 })

  const url = new URL(`https://www.rescuetime.com/anapi/${path.join("/")}`)
  const { searchParams } = new URL(request.url)
  searchParams.forEach((v, k) => url.searchParams.set(k, v))
  url.searchParams.set("key", apiKey)
  url.searchParams.set("format", "json")

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 300 } })
    if (!res.ok) return NextResponse.json({ error: "RescueTime API error" }, { status: res.status })
    const data = await res.json()
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
      },
    })
  } catch {
    return NextResponse.json({ error: "Failed to fetch from RescueTime" }, { status: 502 })
  }
}
