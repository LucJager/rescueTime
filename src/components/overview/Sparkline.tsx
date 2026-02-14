"use client"

export default function Sparkline({ values, color = "#06b6d4", width = 80, height = 24 }: {
  values: number[]
  color?: string
  width?: number
  height?: number
}) {
  if (values.length < 2) return null
  const max = Math.max(...values, 0.01)
  const step = width / (values.length - 1)
  const points = values.map((v, i) => `${i * step},${height - (v / max) * height * 0.9}`).join(" ")
  return (
    <svg width={width} height={height} className="opacity-60">
      <polyline fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  )
}
