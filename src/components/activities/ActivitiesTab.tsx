"use client"
import type { ActivityData } from "@/types/rescuetime"
import ActivityRow from "./ActivityRow"

export default function ActivitiesTab({ activities }: { activities: ActivityData[] }) {
  const top20 = activities.slice(0, 20)
  const maxHours = Math.max(...top20.map((a) => a.hours), 0.01)
  return (
    <div className="rounded-xl border border-white/5 bg-card p-4 animate-fade-in">
      <div className="flex flex-col">
        {top20.map((a) => <ActivityRow key={a.name} activity={a} maxHours={maxHours} />)}
      </div>
    </div>
  )
}
