import {
  add,
  addDays,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  sub,
  subDays,
} from "date-fns"
import { DateRange } from "react-day-picker"

import { Direction, Option, OptionWithUrl, Period } from "@/types/table/filters"

export const dummyUserOptions: OptionWithUrl[] = [
  { label: "User1", value: "user1", url: "#" },
  { label: "User2", value: "user2", url: "#" },
  { label: "User3", value: "user3", url: "#" },
  { label: "User4", value: "user4", url: "#" },
  { label: "User5", value: "user5", url: "#" },
  { label: "User6", value: "user6", url: "#" },
  { label: "User7", value: "user7", url: "#" },
  { label: "User8", value: "user8", url: "#" },
]

export const datefiltersOptions: Option[] = [
  { value: "is", label: "Is" },
  { value: "is-before", label: "Is before" },
  { value: "is-after", label: "Is after" },
  { value: "is-on-or-before", label: "Is on or before" },
  { value: "is-on-or-after", label: "Is on or after" },
  { value: "is-between", label: "Is between" },
  { value: "is-relative-to-today", label: "Is relative to today" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
]

export const textFilterOptions: Option[] = [
  { value: "is", label: "Is" },
  { value: "is-not", label: "Is not" },
  { value: "contains", label: "Contains" },
  { value: "does-not-contains", label: "Does not contains" },
  { value: "starts-with", label: "Starts With" },
  { value: "ends-with", label: "Ends With" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
]

export const dateFiltersPresetOptions: Option[] = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "yesterday", label: "Yesterday" },
  { value: "one-week-ago", label: "One week ago" },
  { value: "one-week-from-now", label: "One week from now" },
  { value: "one-month-ago", label: "One month ago" },
  { value: "one-month-from-now", label: "One month from now" },
  { value: "custom-date", label: "Custom date" },
]

export const datePeriodOptions = (additional?: string): Option[] => {
  const s = additional || ""
  return [
    { value: "day", label: "Day" + s },
    { value: "week", label: "Week" + s },
    { value: "month", label: "Month" + s },
    { value: "year", label: "Year" + s },
  ]
}

export const profileFilterOptions: Option[] = [
  { value: "contains", label: "Contains" },
  { value: "does-not-contains", label: "Does not contains" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
]

export function mapValueToDate(
  value: string,
  customDate?: Date
): Date | undefined {
  const today = new Date()

  switch (value) {
    case "today":
      return today
    case "tomorrow":
      return addDays(today, 1)
    case "yesterday":
      return subDays(today, 1)
    case "one-week-ago":
      return subDays(today, 7)
    case "one-week-from-now":
      return addDays(today, 7)
    case "one-month-ago":
      return subDays(today, 30) // Adjust for accurate month handling
    case "one-month-from-now":
      return addDays(today, 30) // Adjust for accurate month handling
    case "custom-date":
      return customDate
    default:
      return undefined
  }
}

export function mapRelativeValueToDate(
  direction: Direction,
  period: Period,
  count: number = 1
): Date | DateRange {
  const today = new Date()

  switch (direction) {
    case "this":
      switch (period) {
        case "day":
          return startOfDay(today)
        case "week":
          return {
            from: startOfWeek(today),
            to: endOfWeek(today),
          }
        case "month":
          return {
            from: startOfMonth(today),
            to: endOfMonth(today),
          }
        case "year":
          return {
            from: startOfYear(today),
            to: endOfYear(today),
          }
      }
      break

    case "past":
      switch (period) {
        case "day":
          return sub(today, { days: count })
        case "week":
          return {
            from: sub(startOfWeek(today), { weeks: count }),
            to: sub(endOfWeek(today), { weeks: count }),
          }
        case "month":
          return {
            from: sub(startOfMonth(today), { months: count }),
            to: sub(endOfMonth(today), { months: count }),
          }
        case "year":
          return {
            from: sub(startOfYear(today), { years: count }),
            to: sub(endOfYear(today), { years: count }),
          }
      }
      break

    case "next":
      switch (period) {
        case "day":
          return add(today, { days: count })
        case "week":
          return {
            from: add(startOfWeek(today), { weeks: count }),
            to: add(endOfWeek(today), { weeks: count }),
          }
        case "month":
          return {
            from: add(startOfMonth(today), { months: count }),
            to: add(endOfMonth(today), { months: count }),
          }
        case "year":
          return {
            from: add(startOfYear(today), { years: count }),
            to: add(endOfYear(today), { years: count }),
          }
      }
      break
  }

  return today // Fallback to today if no case matches
}
