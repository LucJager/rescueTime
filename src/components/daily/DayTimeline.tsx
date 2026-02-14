"use client"
import { useMemo } from "react"
import { getHeatmapColor } from "@/lib/colors"
import type { HourlyEntry } from "@/types/rescuetime"

function parseEntry(date: string) {
  const parts = date.split(/[T ]/)
  return { day: parts[0], hour: parseInt(parts[1]?.split(":")[0] || "0") }
}

export default function DayTimeline({ date, hourlyData }: { date: string; hourlyData: HourlyEntry[] }) {
  const hours = useMemo(() => {
    const cellMap: Record<number, { totalSec: number; weightedProd: number }> = {}
    for (const entry of hourlyData) {
      const parsed = parseEntry(entry.date)
      if (parsed.day !== date) continue
      if (!cellMap[parsed.hour]) cellMap[parsed.hour] = { totalSec: 0, weightedProd: 0 }
      cellMap[parsed.hour].totalSec += entry.seconds
      cellMap[parsed.hour].weightedProd += entry.seconds * entry.productivity
    }
    return Array.from({ length: 24 }, (_, h) => {
      const cell = cellMap[h]
      return cell && cell.totalSec > 0 ? cell.weightedProd / cell.totalSec : null
    })
  }, [date, hourlyData])

  const hasData = hours.some((h) => h !== null)
  if (!hasData) return null

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-zinc-500">Timeline horaire</span>
      <div className="flex h-4 gap-px overflow-hidden rounded">
        {hours.map((score, i) => (
          <div
            key={i}
            className="flex-1 transition-all duration-300"
            style={{ backgroundColor: score !== null ? getHeatmapColor(score) : "rgba(255,255,255,0.03)" }}
            title={`${i}h${score !== null ? ` — ${score.toFixed(1)}` : ""}`}
          />
        ))}
      </div>
      <div className="flex justify-between text-[8px] text-zinc-600">
        <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span>
      </div>
    </div>
  )
}
