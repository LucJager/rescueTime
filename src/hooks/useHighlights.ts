"use client"
import { useRescueTime } from "./useRescueTime"
import type { Highlight } from "@/types/rescuetime"

export function useHighlights() {
  return useRescueTime<Highlight[]>("highlights_feed")
}
