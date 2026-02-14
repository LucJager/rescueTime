export interface DailySummary {
  id: number
  date: string
  productivity_pulse: number
  very_productive_percentage: number
  productive_percentage: number
  neutral_percentage: number
  distracting_percentage: number
  very_distracting_percentage: number
  all_productive_percentage: number
  all_distracting_percentage: number
  total_hours: number
  very_productive_hours: number
  productive_hours: number
  neutral_hours: number
  distracting_hours: number
  very_distracting_hours: number
  total_duration_formatted: string
  very_productive_duration_formatted: string
  productive_duration_formatted: string
  neutral_duration_formatted: string
  distracting_duration_formatted: string
  very_distracting_duration_formatted: string
}

export interface AnalyticResponse {
  notes: string
  row_headers: string[]
  rows: (string | number)[][]
}

export interface ActivityData {
  rank: number
  hours: number
  name: string
  category: string
  productivity: number
}

export type TabId = "overview" | "daily" | "activities"
