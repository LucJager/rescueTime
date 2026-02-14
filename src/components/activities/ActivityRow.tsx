"use client"
import type { ActivityData } from "@/types/rescuetime"
import { formatHours } from "@/lib/format"
import { getProductivityColor } from "@/lib/colors"

export default function ActivityRow({ activity, maxHours }: { activity: ActivityData; maxHours: number }) {
  const color = getProductivityColor(activity.productivity)
  const pct = (activity.hours / maxHours) * 100
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <span className="w-40 shrink-0 truncate text-sm text-white" title={activity.name}>{activity.name}</span>
      <span className="w-24 shrink-0 text-xs text-zinc-600 truncate">{activity.category}</span>
      <div className="relative h-4 flex-1 overflow-hidden rounded bg-white/5">
        <div className="h-full rounded transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color + "80" }} />
      </div>
      <span className="w-14 text-right text-xs text-zinc-400">{formatHours(activity.hours)}</span>
    </div>
  )
}
