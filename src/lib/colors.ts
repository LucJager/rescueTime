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

export const CATEGORY_COLORS: Record<string, string> = {
  software_development: "#06b6d4",
  communication_and_scheduling: "#818cf8",
  social_networking: "#f472b6",
  design_and_composition: "#a78bfa",
  entertainment: "#fb923c",
  news: "#fbbf24",
  reference_and_learning: "#34d399",
  shopping: "#fb7185",
  business: "#60a5fa",
  utilities: "#94a3b8",
  uncategorized: "#6b7280",
}

export const CATEGORY_LABELS: Record<string, string> = {
  software_development: "Developpement",
  communication_and_scheduling: "Communication",
  social_networking: "Reseaux sociaux",
  design_and_composition: "Design",
  entertainment: "Divertissement",
  news: "Actualites",
  reference_and_learning: "Apprentissage",
  shopping: "Shopping",
  business: "Business",
  utilities: "Utilitaires",
  uncategorized: "Non categorise",
}

export function getHeatmapColor(score: number): string {
  if (score >= 1.5) return "rgba(6, 182, 212, 0.8)"
  if (score >= 0.5) return "rgba(59, 130, 246, 0.6)"
  if (score >= -0.5) return "rgba(107, 114, 128, 0.3)"
  if (score >= -1.5) return "rgba(248, 113, 113, 0.6)"
  return "rgba(251, 146, 60, 0.8)"
}
