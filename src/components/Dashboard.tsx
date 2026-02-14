"use client"
import { useState } from "react"
import type { TabId } from "@/types/rescuetime"
import { useDailySummary } from "@/hooks/useDailySummary"
import { useAnalyticData } from "@/hooks/useAnalyticData"
import { useHourlyData } from "@/hooks/useHourlyData"
import { useHighlights } from "@/hooks/useHighlights"
import TabBar from "./TabBar"
import OverviewTab from "./overview/OverviewTab"
import DailyTab from "./daily/DailyTab"
import ActivitiesTab from "./activities/ActivitiesTab"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview")
  const { data: days, loading: daysLoading, error: daysError } = useDailySummary()
  const { activities: prodData, loading: prodLoading } = useAnalyticData({
    perspective: "rank", restrictKind: "productivity",
  })
  const { activities: actData, loading: actLoading } = useAnalyticData({
    perspective: "rank", restrictKind: "activity", restrictBegin: (() => {
      const d = new Date(); d.setDate(d.getDate() - 7)
      return d.toISOString().split("T")[0]
    })(),
  })
  const { hourlyData, loading: hourlyLoading } = useHourlyData()
  const { data: highlights, loading: highlightsLoading } = useHighlights()

  const loading = daysLoading || prodLoading || actLoading || hourlyLoading || highlightsLoading

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-white">RescueTime</h1>
        <TabBar active={activeTab} onChange={setActiveTab} />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
        </div>
      )}

      {daysError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          Erreur: {daysError}
        </div>
      )}

      {!loading && !daysError && days && (
        <>
          {activeTab === "overview" && <OverviewTab days={days} productivityData={prodData} hourlyData={hourlyData} />}
          {activeTab === "daily" && <DailyTab days={days} hourlyData={hourlyData} highlights={highlights ?? undefined} />}
          {activeTab === "activities" && <ActivitiesTab activities={actData} />}
        </>
      )}
    </div>
  )
}
