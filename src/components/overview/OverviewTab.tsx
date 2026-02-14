"use client"
import type { DailySummary, ActivityData, HourlyEntry } from "@/types/rescuetime"
import PulseGauge from "./PulseGauge"
import StreakBadge from "./StreakBadge"
import StatCard from "./StatCard"
import ProductivityBar from "./ProductivityBar"
import TimeCategoryBars from "./TimeCategoryBars"
import HourlyHeatmap from "./HourlyHeatmap"
import PulseTrend from "./PulseTrend"
import { formatHours, formatPct } from "@/lib/format"

function weekAvg(days: DailySummary[], fn: (d: DailySummary) => number): number {
  if (days.length === 0) return 0
  return days.reduce((s, d) => s + fn(d), 0) / days.length
}

function calcDelta(current: number, previous: number): number | undefined {
  if (previous === 0) return undefined
  return ((current - previous) / previous) * 100
}

export default function OverviewTab({ days, productivityData, hourlyData }: {
  days: DailySummary[]
  productivityData: ActivityData[]
  hourlyData: HourlyEntry[]
}) {
  const today = days[0]
  if (!today) return null

  const currentWeek = days.slice(0, 7)
  const previousWeek = days.slice(7, 14)

  const totalDelta = calcDelta(
    weekAvg(currentWeek, (d) => d.total_hours),
    weekAvg(previousWeek, (d) => d.total_hours),
  )
  const prodDelta = calcDelta(
    weekAvg(currentWeek, (d) => d.very_productive_hours + d.productive_hours),
    weekAvg(previousWeek, (d) => d.very_productive_hours + d.productive_hours),
  )
  const distDelta = calcDelta(
    weekAvg(currentWeek, (d) => d.distracting_hours + d.very_distracting_hours),
    weekAvg(previousWeek, (d) => d.distracting_hours + d.very_distracting_hours),
  )
  const pctDelta = calcDelta(
    weekAvg(currentWeek, (d) => d.all_productive_percentage),
    weekAvg(previousWeek, (d) => d.all_productive_percentage),
  )

  const totalAll = productivityData.reduce((s, a) => s + a.hours, 0)

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-white/5 bg-card p-4">
          <PulseGauge score={today.productivity_pulse} />
          <StreakBadge days={days} />
        </div>
        <div className="flex flex-col gap-4 md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Temps total"
              value={formatHours(today.total_hours)}
              sparkValues={days.slice(0, 7).map((d) => d.total_hours).reverse()}
              delta={totalDelta}
            />
            <StatCard
              label="Productif"
              value={formatHours(today.very_productive_hours + today.productive_hours)}
              sparkValues={days.slice(0, 7).map((d) => d.very_productive_hours + d.productive_hours).reverse()}
              color="#06b6d4"
              delta={prodDelta}
            />
            <StatCard
              label="Distrayant"
              value={formatHours(today.distracting_hours + today.very_distracting_hours)}
              sparkValues={days.slice(0, 7).map((d) => d.distracting_hours + d.very_distracting_hours).reverse()}
              color="#f87171"
              delta={distDelta}
            />
            <StatCard
              label="Productivite"
              value={formatPct(today.all_productive_percentage)}
              sparkValues={days.slice(0, 7).map((d) => d.all_productive_percentage).reverse()}
              color="#3b82f6"
              delta={pctDelta}
            />
          </div>
        </div>
      </div>

      {hourlyData.length > 0 && (
        <div className="rounded-xl border border-white/5 bg-card p-4">
          <h3 className="mb-3 text-xs font-medium text-zinc-500">Productivite par heure (7j)</h3>
          <HourlyHeatmap data={hourlyData} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-card p-4">
          <h3 className="mb-3 text-xs font-medium text-zinc-500">Repartition productivite</h3>
          {totalAll > 0 ? (
            <ProductivityBar data={{
              veryProductive: productivityData.filter((a) => a.productivity === 2).reduce((s, a) => s + a.hours, 0) / totalAll * 100,
              productive: productivityData.filter((a) => a.productivity === 1).reduce((s, a) => s + a.hours, 0) / totalAll * 100,
              neutral: productivityData.filter((a) => a.productivity === 0).reduce((s, a) => s + a.hours, 0) / totalAll * 100,
              distracting: productivityData.filter((a) => a.productivity === -1).reduce((s, a) => s + a.hours, 0) / totalAll * 100,
              veryDistracting: productivityData.filter((a) => a.productivity === -2).reduce((s, a) => s + a.hours, 0) / totalAll * 100,
            }} />
          ) : (
            <ProductivityBar data={{
              veryProductive: today.very_productive_percentage,
              productive: today.productive_percentage,
              neutral: today.neutral_percentage,
              distracting: today.distracting_percentage,
              veryDistracting: today.very_distracting_percentage,
            }} />
          )}
        </div>
        <div className="rounded-xl border border-white/5 bg-card p-4">
          <h3 className="mb-3 text-xs font-medium text-zinc-500">Tendance Pulse (7j)</h3>
          <PulseTrend days={days} />
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-card p-4">
        <h3 className="mb-3 text-xs font-medium text-zinc-500">Categories aujourd&apos;hui</h3>
        <TimeCategoryBars day={today} />
      </div>
    </div>
  )
}
