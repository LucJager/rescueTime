"use client"
import { useState } from "react"
import type { DailySummary } from "@/types/rescuetime"
import { formatHours, formatDate, formatPct } from "@/lib/format"
import { getPulseColor, PRODUCTIVITY_COLORS } from "@/lib/colors"

export default function DayRow({ day }: { day: DailySummary }) {
  const [open, setOpen] = useState(false)
  const color = getPulseColor(day.productivity_pulse)

  return (
    <div className="rounded-xl border border-white/5 bg-card transition-colors hover:bg-card-hover">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-4 p-4 text-left">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: color + "20" }}>
          <span className="text-sm font-bold" style={{ color }}>{day.productivity_pulse}</span>
        </div>
        <div className="flex-1">
          <div className="text-sm text-white">{formatDate(day.date)}</div>
          <div className="text-xs text-zinc-500">{formatHours(day.total_hours)} total</div>
        </div>
        <div className="flex h-2 w-32 overflow-hidden rounded-full">
          {[
            { pct: day.very_productive_percentage, color: PRODUCTIVITY_COLORS.veryProductive },
            { pct: day.productive_percentage, color: PRODUCTIVITY_COLORS.productive },
            { pct: day.neutral_percentage, color: PRODUCTIVITY_COLORS.neutral },
            { pct: day.distracting_percentage, color: PRODUCTIVITY_COLORS.distracting },
            { pct: day.very_distracting_percentage, color: PRODUCTIVITY_COLORS.veryDistracting },
          ].map((s) => s.pct > 0 ? <div key={s.color} style={{ width: `${s.pct}%`, backgroundColor: s.color }} /> : null)}
        </div>
        <svg className={`h-4 w-4 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`expand-grid ${open ? "open" : ""}`}>
        <div>
          <div className="grid grid-cols-2 gap-3 px-4 pb-4 sm:grid-cols-5">
            {[
              { label: "Tres productif", hours: day.very_productive_hours, pct: day.very_productive_percentage, color: PRODUCTIVITY_COLORS.veryProductive },
              { label: "Productif", hours: day.productive_hours, pct: day.productive_percentage, color: PRODUCTIVITY_COLORS.productive },
              { label: "Neutre", hours: day.neutral_hours, pct: day.neutral_percentage, color: PRODUCTIVITY_COLORS.neutral },
              { label: "Distrayant", hours: day.distracting_hours, pct: day.distracting_percentage, color: PRODUCTIVITY_COLORS.distracting },
              { label: "Tres distrayant", hours: day.very_distracting_hours, pct: day.very_distracting_percentage, color: PRODUCTIVITY_COLORS.veryDistracting },
            ].map((cat) => (
              <div key={cat.label} className="rounded-lg bg-white/5 p-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-[10px] text-zinc-500">{cat.label}</span>
                </div>
                <div className="mt-1 text-sm text-white">{formatHours(cat.hours)}</div>
                <div className="text-[10px] text-zinc-600">{formatPct(cat.pct)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
