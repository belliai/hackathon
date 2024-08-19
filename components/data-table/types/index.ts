import { DateRange } from "react-day-picker"

export type FilterValue =
  | string
  | number
  | Date
  | Date[]
  | DateRange
  | undefined
export type FilterType = "text" | "date" | "profile" | "rule"
export type FilterCondition = string

export type Direction = "this" | "past" | "next"
export type Period = "day" | "week" | "month" | "year"

export interface FilterData {
  id: number
  column?: string
  value: FilterValue
  type: FilterType
  condition?: FilterCondition
  direction?: Direction
  preset?: string
  period?: Period
  count?: number
  isLocked?: boolean
}

export type FilterKey = keyof FilterData

export type Option = {
  label: string
  value: string
}

export type OptionWithUrl = Option & { url?: string }
export type OptionWithType = Option & { type?: FilterType }
