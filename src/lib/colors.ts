export const PRODUCTIVITY_COLORS = {
  veryProductive: "#06b6d4",
  productive: "#3b82f6",
  neutral: "#6b7280",
  distracting: "#f87171",
  veryDistracting: "#fb923c",
} as const

export const PRODUCTIVITY_LABELS: Record<string, string> = {
  veryProductive: "Tres productif",
  productive: "Productif",
  neutral: "Neutre",
  distracting: "Distrayant",
  veryDistracting: "Tres distrayant",
}

export function getPulseColor(score: number): string {
  if (score >= 81) return PRODUCTIVITY_COLORS.veryProductive
  if (score >= 66) return PRODUCTIVITY_COLORS.productive
  if (score >= 51) return PRODUCTIVITY_COLORS.neutral
  if (score >= 31) return PRODUCTIVITY_COLORS.distracting
  return PRODUCTIVITY_COLORS.veryDistracting
}

export function getProductivityColor(score: number): string {
  if (score === 2) return PRODUCTIVITY_COLORS.veryProductive
  if (score === 1) return PRODUCTIVITY_COLORS.productive
  if (score === 0) return PRODUCTIVITY_COLORS.neutral
  if (score === -1) return PRODUCTIVITY_COLORS.distracting
  return PRODUCTIVITY_COLORS.veryDistracting
}
