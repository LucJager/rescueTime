"use client"
import { formatHours } from "@/lib/format"
import type { DailySummary } from "@/types/rescuetime"

interface Category {
  label: string
  hours: number
  color: string
}

function extractCategories(day: DailySummary): Category[] {
  return [
    { label: "Tres productif", hours: day.very_productive_hours, color: "#06b6d4" },
    { label: "Productif", hours: day.productive_hours, color: "#3b82f6" },
    { label: "Neutre", hours: day.neutral_hours, color: "#6b7280" },
    { label: "Distrayant", hours: day.distracting_hours, color: "#f87171" },
    { label: "Tres distrayant", hours: day.very_distracting_hours, color: "#fb923c" },
  ].sort((a, b) => b.hours - a.hours)
}

export default function CategoryBars({ day }: { day: DailySummary }) {
  const cats = extractCategories(day)
  const max = Math.max(...cats.map((c) => c.hours), 0.01)
  return (
    <div className="flex flex-col gap-2">
      {cats.map((c) => (
        <div key={c.label} className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-xs text-zinc-500">{c.label}</span>
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
