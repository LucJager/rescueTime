"use client"
import { formatHours } from "@/lib/format"
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/colors"
import type { DailySummary } from "@/types/rescuetime"

const CATEGORY_KEYS = [
  "software_development", "communication_and_scheduling", "social_networking",
  "design_and_composition", "entertainment", "news", "reference_and_learning",
  "shopping", "business", "utilities", "uncategorized",
] as const

export default function TimeCategoryBars({ day }: { day: DailySummary }) {
  const cats = CATEGORY_KEYS
    .map((key) => ({
      key,
      label: CATEGORY_LABELS[key],
      hours: (day[`${key}_hours` as keyof DailySummary] as number) || 0,
      color: CATEGORY_COLORS[key],
    }))
    .filter((c) => c.hours > 0.01)
    .sort((a, b) => b.hours - a.hours)

  if (cats.length === 0) return null
  const max = Math.max(...cats.map((c) => c.hours), 0.01)

  return (
    <div className="flex flex-col gap-2">
      {cats.map((c) => (
        <div key={c.key} className="flex items-center gap-3">
          <span className="w-28 shrink-0 truncate text-xs text-zinc-500">{c.label}</span>
          <div className="relative h-5 flex-1 overflow-hidden rounded bg-white/5">
            <div
              className="h-full rounded transition-all duration-500"
              style={{ width: `${(c.hours / max) * 100}%`, backgroundColor: c.color }}
            />
          </div>
          <span className="w-14 text-right text-xs text-zinc-400">{formatHours(c.hours)}</span>
        </div>
      ))}
    </div>
  )
}
