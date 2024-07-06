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