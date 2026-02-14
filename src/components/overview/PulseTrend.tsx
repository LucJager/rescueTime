"use client"
import { getPulseColor } from "@/lib/colors"
import type { DailySummary } from "@/types/rescuetime"

export default function PulseTrend({ days }: { days: DailySummary[] }) {
  const last7 = days.slice(0, 7).reverse()
  return (
    <div className="flex items-end gap-1.5" style={{ height: 80 }}>
      {last7.map((d) => {
        const h = Math.max((d.productivity_pulse / 100) * 72, 4)
        const dayLabel = new Date(d.date + "T00:00:00").toLocaleDateString("fr-FR", { weekday: "narrow" })
        return (
          <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t transition-all duration-500"
              style={{ height: h, backgroundColor: getPulseColor(d.productivity_pulse), minWidth: 8 }}
              title={`${d.productivity_pulse}`}
            />
            <span className="text-[10px] text-zinc-600">{dayLabel}</span>
          </div>
        )
      })}
    </div>
  )
}
