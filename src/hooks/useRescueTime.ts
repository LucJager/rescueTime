"use client"
import { useState, useEffect } from "react"
import { fetchRT } from "@/lib/api"

export function useRescueTime<T>(path: string, params?: Record<string, string>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetchRT<T>(path, params, controller.signal)
      .then(setData)
      .catch((e) => { if (e.name !== "AbortError") setError(e.message) })
      .finally(() => setLoading(false))
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, JSON.stringify(params)])

  return { data, loading, error }
}
