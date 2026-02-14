"use client"
import { useRescueTime } from "./useRescueTime"
import type { DailySummary } from "@/types/rescuetime"

export function useDailySummary() {
  return useRescueTime<DailySummary[]>("daily_summary_feed")
}
