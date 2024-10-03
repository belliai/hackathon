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
export type FilterType =
  | "string"
  | "date"
  | "int"
  | "datetime"
  | "time"
  | "boolean"
  | "uuid"
export type FilterCondition = string

export type Direction = "this" | "past" | "next"
export type Period = "day" | "week" | "month" | "year"

export interface FilterData {
  id: number
  columnConfigId?: string
  label?: string
  column?: string
  value: FilterValue
  type?: FilterType
  condition?: FilterCondition
  direction?: Direction
  preset?: string
  period?: Period
  count?: number
  isLocked?: boolean
  searchTerm?: string
  calendarMode?: "single" | "range"
  operator?: "OR" | "AND"
  searchPath?: string
}

export type FilterKey = keyof FilterData

export type Option = {
  label: string
  value: string
}

export type Filter = {
  column_config_id?: string
  operator?: string
  value?: FilterValue
}

export type BaseFilter = {
  filters: Filter[]
  logical_operator: string
  table_name: string
}

export type FiltersRequest = BaseFilter

export type FiltersResponse = BaseFilter & {
  id: string // Unique to FiltersResponse
}

export type LogicalOperator = "AND" | "OR"

export type OperatorTypes = {
  boolean: ["Is True", "Is False"]
  date: ["Is", "Is Not", "Before", "After", "Is Empty", "Is Not Empty"]
  datetime: ["Is", "Is Not", "Before", "After", "Is Empty", "Is Not Empty"]
  time: ["Is", "Is Not", "Before", "After", "Is Empty", "Is Not Empty"]
  int: [
    "Is Equal To",
    "Is Not Equal To",
    "Greater Than",
    "Less Than",
    "Greater or Equal",
    "Less or Equal",
    "Is Empty",
    "Is Not Empty",
  ]
  string: [
    "Is",
    "Is Not",
    "Contains",
    "Does Not Contain",
    "Starts With",
    "Ends With",
    "Is Empty",
    "Is Not Empty",
  ]
  uuid: ["Is", "Is Not", "Is Empty", "Is Not Empty"]
}

export type OptionWithUrl = Option & { url?: string }
export type OptionWithType = Option & { type?: FilterType }
