"use client"
import Sparkline from "./Sparkline"

export default function StatCard({ label, value, sparkValues, color }: {
  label: string
  value: string
  sparkValues?: number[]
  color?: string
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/5 bg-card p-4">
      <span className="text-xs text-zinc-500">{label}</span>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold text-white">{value}</span>
        {sparkValues && sparkValues.length > 1 && <Sparkline values={sparkValues} color={color} />}
      </div>
    </div>
  )
}
