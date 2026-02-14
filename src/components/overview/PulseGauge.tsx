"use client"
import { getPulseColor } from "@/lib/colors"

const RADIUS = 80
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const ARC = CIRCUMFERENCE * 0.75 // 270 degrees

export default function PulseGauge({ score }: { score: number }) {
  const offset = ARC * (1 - score / 100)
  const color = getPulseColor(score)
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 200 200" className="h-48 w-48">
        <circle
          cx={100} cy={100} r={RADIUS}
          fill="none" stroke="white" strokeOpacity={0.05} strokeWidth={12}
          strokeDasharray={ARC} strokeDashoffset={0}
          strokeLinecap="round"
          transform="rotate(135 100 100)"
        />
        <circle
          cx={100} cy={100} r={RADIUS}
          fill="none" stroke={color} strokeWidth={12}
          strokeDasharray={ARC} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(135 100 100)"
          className="animate-gauge"
          style={{ "--gauge-offset": offset } as React.CSSProperties}
        />
        <text x={100} y={95} textAnchor="middle" fill="white" fontSize={36} fontWeight={700} fontFamily="inherit">
          {score}
        </text>
        <text x={100} y={118} textAnchor="middle" fill="#71717a" fontSize={12} fontFamily="inherit">
          Pulse
        </text>
      </svg>
    </div>
  )
}
