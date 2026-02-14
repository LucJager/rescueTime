"use client"
import type { DailySummary } from "@/types/rescuetime"
import DayRow from "./DayRow"

export default function DailyTab({ days }: { days: DailySummary[] }) {
  return (
    <div className="flex flex-col gap-2 animate-fade-in">
      {days.map((d) => <DayRow key={d.date} day={d} />)}
    </div>
  )
}
