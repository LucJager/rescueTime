"use client"
import type { DailySummary, HourlyEntry, Highlight } from "@/types/rescuetime"
import DayRow from "./DayRow"

export default function DailyTab({ days, hourlyData, highlights }: {
  days: DailySummary[]
  hourlyData?: HourlyEntry[]
  highlights?: Highlight[]
}) {
  return (
    <div className="flex flex-col gap-2 animate-fade-in">
      {days.map((d) => (
        <DayRow
          key={d.date}
          day={d}
          hourlyData={hourlyData}
          highlights={highlights?.filter((h) => h.date === d.date)}
        />
      ))}
    </div>
  )
}
