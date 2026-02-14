"use client"
import { PRODUCTIVITY_COLORS, PRODUCTIVITY_LABELS } from "@/lib/colors"
import { formatPct } from "@/lib/format"

interface Segment {
  key: string
  pct: number
  color: string
}

export default function ProductivityBar({ data }: {
  data: { veryProductive: number; productive: number; neutral: number; distracting: number; veryDistracting: number }
}) {
  const segments: Segment[] = [
    { key: "veryProductive", pct: data.veryProductive, color: PRODUCTIVITY_COLORS.veryProductive },
    { key: "productive", pct: data.productive, color: PRODUCTIVITY_COLORS.productive },
    { key: "neutral", pct: data.neutral, color: PRODUCTIVITY_COLORS.neutral },
    { key: "distracting", pct: data.distracting, color: PRODUCTIVITY_COLORS.distracting },
    { key: "veryDistracting", pct: data.veryDistracting, color: PRODUCTIVITY_COLORS.veryDistracting },
  ]

  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-4 overflow-hidden rounded-full">
        {segments.map((s) =>
          s.pct > 0 ? (
            <div key={s.key} style={{ width: `${s.pct}%`, backgroundColor: s.color }} className="transition-all duration-500" />
          ) : null
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
        {segments.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span>{PRODUCTIVITY_LABELS[s.key]}</span>
            <span className="text-zinc-500">{formatPct(s.pct)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
