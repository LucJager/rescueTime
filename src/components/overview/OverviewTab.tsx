"use client"
import type { DailySummary, ActivityData } from "@/types/rescuetime"
import PulseGauge from "./PulseGauge"
import StatCard from "./StatCard"
import ProductivityBar from "./ProductivityBar"
import CategoryBars from "./CategoryBars"
import PulseTrend from "./PulseTrend"
import { formatHours, formatPct } from "@/lib/format"

export default function OverviewTab({ days, productivityData }: {
  days: DailySummary[]
  productivityData: ActivityData[]
}) {
  const today = days[0]
  if (!today) return null

  const totalProd = productivityData.reduce((s, a) => s + (a.productivity >= 1 ? a.hours : 0), 0)
  const totalDist = productivityData.reduce((s, a) => s + (a.productivity <= -1 ? a.hours : 0), 0)
  const totalAll = productivityData.reduce((s, a) => s + a.hours, 0)

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex items-center justify-center rounded-xl border border-white/5 bg-card p-4">
          <PulseGauge score={today.productivity_pulse} />
        </div>
        <div className="flex flex-col gap-4 md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Temps total"
              value={formatHours(today.total_hours)}
              sparkValues={days.slice(0, 7).map((d) => d.total_hours).reverse()}
            />
            <StatCard
              label="Productif"
              value={formatHours(today.very_productive_hours + today.productive_hours)}
              sparkValues={days.slice(0, 7).map((d) => d.very_productive_hours + d.productive_hours).reverse()}
              color="#06b6d4"
            />
            <StatCard
              label="Distrayant"
              value={formatHours(today.distracting_hours + today.very_distracting_hours)}
              sparkValues={days.slice(0, 7).map((d) => d.distracting_hours + d.very_distracting_hours).reverse()}
              color="#f87171"
            />
            <StatCard
              label="Productivite"
              value={formatPct(today.all_productive_percentage)}
              sparkValues={days.slice(0, 7).map((d) => d.all_productive_percentage).reverse()}
              color="#3b82f6"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-card p-4">
          <h3 className="mb-3 text-xs font-medium text-zinc-500">Repartition productivite</h3>
          {totalAll > 0 ? (
            <ProductivityBar data={{
              veryProductive: (totalProd > 0 ? productivityData.filter((a) => a.productivity === 2).reduce((s, a) => s + a.hours, 0) / totalAll * 100 : 0),
              productive: (totalProd > 0 ? productivityData.filter((a) => a.productivity === 1).reduce((s, a) => s + a.hours, 0) / totalAll * 100 : 0),
              neutral: (productivityData.filter((a) => a.productivity === 0).reduce((s, a) => s + a.hours, 0) / totalAll * 100),
              distracting: (totalDist > 0 ? productivityData.filter((a) => a.productivity === -1).reduce((s, a) => s + a.hours, 0) / totalAll * 100 : 0),
              veryDistracting: (totalDist > 0 ? productivityData.filter((a) => a.productivity === -2).reduce((s, a) => s + a.hours, 0) / totalAll * 100 : 0),
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
        <CategoryBars day={today} />
      </div>
    </div>
  )
}
