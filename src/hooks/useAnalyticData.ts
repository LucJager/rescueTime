"use client"
import { useMemo } from "react"
import { useRescueTime } from "./useRescueTime"
import type { AnalyticResponse, ActivityData } from "@/types/rescuetime"

interface AnalyticParams {
  perspective?: string
  restrictKind?: string
  restrictBegin?: string
  restrictEnd?: string
  interval?: string
}

function toSnakeParams(p: AnalyticParams): Record<string, string> {
  const map: Record<string, string> = {}
  if (p.perspective) map.perspective = p.perspective
  if (p.restrictKind) map.restrict_kind = p.restrictKind
  if (p.restrictBegin) map.restrict_begin = p.restrictBegin
  if (p.restrictEnd) map.restrict_end = p.restrictEnd
  if (p.interval) map.interval = p.interval
  return map
}

export function useAnalyticData(params: AnalyticParams) {
  const snakeParams = toSnakeParams(params)
  const { data, loading, error } = useRescueTime<AnalyticResponse>("data", snakeParams)

  const activities = useMemo<ActivityData[]>(() => {
    if (!data?.rows) return []
    return data.rows.map((row) => ({
      rank: row[0] as number,
      hours: (row[1] as number) / 3600,
      name: row[3] as string,
      category: row[4] as string,
      productivity: row[5] as number,
    }))
  }, [data])

  return { data, activities, loading, error }
}
