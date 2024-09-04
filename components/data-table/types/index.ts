import { DateRange } from "react-day-picker"

export type FilterValue =
  | string
  | string[]
  | number
  | Date
  | Date[]
  | DateRange
  | undefined
  | OptionWithUrl[]
export type FilterType = "text" | "date" | "profile" | "rule"
export type FilterCondition = string

export type Direction = "this" | "past" | "next"
export type Period = "day" | "week" | "month" | "year"

export interface FilterData {
  id: number
  label?: string
  column?: string
  value: FilterValue
  type: FilterType
  condition?: FilterCondition
  direction?: Direction
  preset?: string
  period?: Period
  count?: number
  isLocked?: boolean
  calendarMode?: "single" | "range"
  operator?: "OR" | "AND"
}

export type FilterKey = keyof FilterData

export type Option = {
  label: string
  value: string
}

export type OptionWithUrl = Option & { url?: string }
export type OptionWithType = Option & { type?: FilterType }
