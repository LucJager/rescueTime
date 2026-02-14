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
  // Category hours
  software_development_hours: number
  communication_and_scheduling_hours: number
  social_networking_hours: number
  design_and_composition_hours: number
  entertainment_hours: number
  news_hours: number
  reference_and_learning_hours: number
  shopping_hours: number
  business_hours: number
  utilities_hours: number
  uncategorized_hours: number
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

export interface HourlyEntry {
  date: string
  seconds: number
  productivity: number
}

export interface Highlight {
  id: number
  date: string
  description: string
  created_at: string
  updated_at: string
}

export type TabId = "overview" | "daily" | "activities"
