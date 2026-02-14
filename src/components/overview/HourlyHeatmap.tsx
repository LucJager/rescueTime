"use client"
import { useMemo } from "react"
import { getHeatmapColor } from "@/lib/colors"
import type { HourlyEntry } from "@/types/rescuetime"

const CELL_W = 18
const CELL_H = 16
const GAP = 2
const LABEL_W = 32
const LABEL_H = 18
const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

function parseEntry(date: string) {
  const parts = date.split(/[T ]/)
  const day = parts[0]
  const hour = parseInt(parts[1]?.split(":")[0] || "0")
  return { day, hour }
}

export default function HourlyHeatmap({ data }: { data: HourlyEntry[] }) {
  const { days, grid } = useMemo(() => {
    const cellMap: Record<string, { totalSec: number; weightedProd: number }> = {}
    const daySet = new Set<string>()

    for (const entry of data) {
      const { day, hour } = parseEntry(entry.date)
      daySet.add(day)
      const key = `${day}-${hour}`
      if (!cellMap[key]) cellMap[key] = { totalSec: 0, weightedProd: 0 }
      cellMap[key].totalSec += entry.seconds
      cellMap[key].weightedProd += entry.seconds * entry.productivity
    }

    const days = [...daySet].sort()
    const grid = days.map((day) => {
      const dayDate = new Date(day + "T00:00:00")
      const dayIdx = (dayDate.getDay() + 6) % 7 // Mon=0
      return {
        day,
        label: DAYS_FR[dayIdx],
        hours: Array.from({ length: 24 }, (_, h) => {
          const cell = cellMap[`${day}-${h}`]
          return cell && cell.totalSec > 0 ? cell.weightedProd / cell.totalSec : null
        }),
      }
    })
    return { days, grid }
  }, [data])

  if (days.length === 0) return null

  const width = LABEL_W + 24 * (CELL_W + GAP)
  const height = grid.length * (CELL_H + GAP) + LABEL_H

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {grid.map((row, ri) => (
        <g key={row.day}>
          <text
            x={LABEL_W - 4} y={ri * (CELL_H + GAP) + CELL_H / 2 + 4}
            textAnchor="end" fill="#71717a" fontSize={9} fontFamily="inherit"
          >
            {row.label}
          </text>
          {row.hours.map((score, hi) => (
            <rect
              key={hi}
              x={LABEL_W + hi * (CELL_W + GAP)} y={ri * (CELL_H + GAP)}
              width={CELL_W} height={CELL_H} rx={3}
              fill={score !== null ? getHeatmapColor(score) : "rgba(255,255,255,0.03)"}
            >
              <title>{row.label} {hi}h{score !== null ? ` — ${score.toFixed(1)}` : ""}</title>
            </rect>
          ))}
        </g>
      ))}
      {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
        <text
          key={h}
          x={LABEL_W + h * (CELL_W + GAP) + CELL_W / 2}
          y={grid.length * (CELL_H + GAP) + LABEL_H - 4}
          textAnchor="middle" fill="#52525b" fontSize={8} fontFamily="inherit"
        >
          {h}h
        </text>
      ))}
    </svg>
  )
}
