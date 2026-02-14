"use client"
import { useMemo } from "react"
import { useRescueTime } from "./useRescueTime"
import type { AnalyticResponse, HourlyEntry } from "@/types/rescuetime"

const params = (() => {
  const end = new Date()
  const begin = new Date()
  begin.setDate(begin.getDate() - 7)
  return {
    perspective: "interval",
    resolution_time: "hour",
    restrict_kind: "productivity",
    restrict_begin: begin.toISOString().split("T")[0],
    restrict_end: end.toISOString().split("T")[0],
  }
})()

export function useHourlyData() {
  const { data, loading, error } = useRescueTime<AnalyticResponse>("data", params)

  const hourlyData = useMemo<HourlyEntry[]>(() => {
    if (!data?.rows) return []
    return data.rows.map((row) => ({
      date: row[0] as string,
      seconds: row[1] as number,
      productivity: row[3] as number,
    }))
  }, [data])

  return { hourlyData, loading, error }
}
