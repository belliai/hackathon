import { format } from "date-fns"
import { ByWeekday, datetime, Frequency, Options, RRule, Weekday } from "rrule"

export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}

export const generateRecurringDates = (
  startDate: Date,
  endDate: Date,
  fromTime: string,
  toTime: string,
  recurring: string
) => {
  let dates = []
  let currentDate = new Date(startDate)

  const [fromHour, fromMinutes] = fromTime.split(":").map(Number)
  const [toHour, toMinutes] = toTime.split(":").map(Number)

  while (currentDate <= endDate) {
    // Create `fromDate` and `toDate` based on the current date
    const fromDate = new Date(currentDate)
    fromDate.setHours(fromHour, fromMinutes, 0, 0) // Set the start time

    const toDate = new Date(currentDate)
    toDate.setHours(toHour, toMinutes, 0, 0) // Set the end time

    // If `toDate` is earlier than `fromDate`, add one day to `toDate`
    if (toDate <= fromDate) {
      toDate.setDate(toDate.getDate() + 1)
    }

    dates.push({
      fromDate: fromDate,
      toDate: toDate,
      fromHour,
      fromMinutes,
      toHour,
      toMinutes,
    })

    switch (recurring) {
      case "daily":
        currentDate.setDate(currentDate.getDate() + 1)
        break
      case "weekly-monday":
      case "weekly-tuesday":
      case "weekly-wednesday":
      case "weekly-thursday":
      case "weekly-friday":
      case "weekly-saturday":
      case "weekly-sunday":
        currentDate.setDate(currentDate.getDate() + 7)
        break
      case `monthly-${currentDate.getDate()}`:
        currentDate.setMonth(currentDate.getMonth() + 1)
        break
      case `annually-${currentDate.toLocaleString("en-US", { month: "long", day: "numeric" }).replace(/ /g, "-")}`:
        currentDate.setFullYear(currentDate.getFullYear() + 1)
        break
      case "every-weekday":
        do {
          currentDate.setDate(currentDate.getDate() + 1)
        } while (currentDate.getDay() === 0 || currentDate.getDay() === 6)
        break
      default:
        // No recurrence
        currentDate = new Date(endDate)
        currentDate.setDate(currentDate.getDate() + 1) // Break the loop
    }
  }

  return dates
}

export function getCurrentTimestamp(): string {
  const date = new Date()

  // Convert to ISO string (e.g., "2024-07-13T10:15:30.000Z")
  const isoString = date.toISOString()

  // Remove the milliseconds and trailing 'Z'
  const isoWithoutMillis = isoString.split(".")[0]

  // Get the time zone offset in hours and minutes
  const offset = -date.getTimezoneOffset()
  const sign = offset >= 0 ? "+" : "-"
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0")
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0")
  const timezone = `${sign}${hours}:${minutes}`

  return `${isoWithoutMillis}${timezone}`
}

export function getDefaultTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

// Define EndOption type
type EndOption =
  | "never"
  | { type: "date"; endDate: Date }
  | { type: "occurrences"; occurrences: number }

// Define DayOfWeek type
type DayOfWeek = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU"

// Define the parameters for the function
interface RecurringOptionsParams {
  startAt: Date
  everyNumber?: number
  everyPeriod?: "day" | "week" | "month" | "year"
  days?: DayOfWeek[]
  end?: EndOption
}

// Map DayOfWeek to RRule Weekdays
const dayMapping: { [key in DayOfWeek]: Weekday } = {
  MO: RRule.MO,
  TU: RRule.TU,
  WE: RRule.WE,
  TH: RRule.TH,
  FR: RRule.FR,
  SA: RRule.SA,
  SU: RRule.SU,
}

const dayNameMap: { [key: string]: Weekday } = {
  Sunday: RRule.SU,
  Monday: RRule.MO,
  Tuesday: RRule.TU,
  Wednesday: RRule.WE,
  Thursday: RRule.TH,
  Friday: RRule.FR,
  Saturday: RRule.SA,
}

export function generateRecurringOptions({
  startAt,
  everyNumber,
  everyPeriod,
  days,
  end,
}: RecurringOptionsParams) {
  const dayOfMonth = startAt.getDate()
  const dtstart = datetime(
    startAt.getFullYear(),
    startAt.getMonth() + 1,
    startAt.getDate()
  )

  // Get the full day name from startAt
  const dayName = format(startAt, "EEEE")
  const rruleDay = dayNameMap[dayName] || null
  // Define the recurring options
  const options = [
    {
      label: `Does not repeat`,
      value: `no-repeat`,
    },
    {
      label: `Daily`,
      value: "daily",
      // value: new RRule({ freq: RRule.DAILY, dtstart }).toString(),
    },
    {
      label: `Weekly on ${dayName}`,
      value: new RRule({
        freq: RRule.WEEKLY,
        byweekday: rruleDay,
        // dtstart: dtstart,
      }).toString(),
    },
    {
      label: "Custom...",
      value: "custom",
    },
  ]

  // Initialize the variable for the generated option
  let generatedOption: { label: string; value: string } | null = null

  // If everyNumber and everyPeriod are provided, generate a custom recurring option
  if (everyNumber && everyPeriod) {
    let rruleOptions: Partial<Options> = {
      interval: everyNumber,
      dtstart: dtstart,
      until: undefined,
      count: undefined,
      freq: RRule[everyPeriod.toUpperCase() as keyof typeof RRule] as Frequency,
    }

    // Define the RRule options
    if (everyPeriod === "week" && days && days.length > 0) {
      const daysOfWeek = days.map((day) => dayMapping[day])
      rruleOptions.byweekday = daysOfWeek
    }

    // Set the end option
    if (end) {
      if (end === "never") {
        rruleOptions.until = undefined
        rruleOptions.count = undefined
      } else if (end.type === "date") {
        rruleOptions.until = end.endDate
        rruleOptions.count = undefined
      } else if (end.type === "occurrences") {
        rruleOptions.until = undefined
        rruleOptions.count = end.occurrences
      }
    }

    // Create the RRule instance
    const rrule = new RRule(rruleOptions)

    // Generate the custom option with duration
    generatedOption = {
      label: `${rrule.toText()}`,
      value: rrule.toString(),
    }

    // Add the generated option to the options list
    options.push(generatedOption)
  }

  return {
    options,
    generatedOption,
  }
}
