export async function fetchRT<T>(path: string, params?: Record<string, string>, signal?: AbortSignal): Promise<T> {
  const url = new URL(`/api/rescuetime/${path}`, window.location.origin)
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url.toString(), { signal })
  if (!res.ok) throw new Error(`RescueTime API error: ${res.status}`)
  return res.json()
}
