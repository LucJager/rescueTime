"use client"
import type { DailySummary } from "@/types/rescuetime"

export default function StreakBadge({ days }: { days: DailySummary[] }) {
  let streak = 0
  for (const day of days) {
    if (day.productivity_pulse >= 65) streak++
    else break
  }
  if (streak === 0) return null

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg bg-orange-500/10 px-3 py-1.5">
      <svg className="h-4 w-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c1 4 4 6 4 10a4 4 0 1 1-8 0c0-4 3-6 4-10zm-1.5 10a1.5 1.5 0 1 0 3 0c0-1.5-1.5-3-1.5-4-.5 1-1.5 2.5-1.5 4z" />
      </svg>
      <span className="text-sm font-medium text-orange-400">{streak} jour{streak > 1 ? "s" : ""}</span>
    </div>
  )
}
