"use client"
import Sparkline from "./Sparkline"

export default function StatCard({ label, value, sparkValues, color, delta }: {
  label: string
  value: string
  sparkValues?: number[]
  color?: string
  delta?: number
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/5 bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">{label}</span>
        {delta !== undefined && delta !== 0 && (
          <span className={`flex items-center gap-0.5 text-xs ${delta > 0 ? "text-emerald-400" : "text-red-400"}`}>
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
              {delta > 0 ? <path d="M6 2l5 8H1z" /> : <path d="M6 10L1 2h10z" />}
            </svg>
            {Math.abs(Math.round(delta))}%
          </span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold text-white">{value}</span>
        {sparkValues && sparkValues.length > 1 && <Sparkline values={sparkValues} color={color} />}
      </div>
    </div>
  )
}
