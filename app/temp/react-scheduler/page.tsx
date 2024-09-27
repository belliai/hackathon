"use client"

import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler"
import { isAfter, isBefore, isWithinInterval } from "date-fns"

import "@bitnoi.se/react-scheduler/dist/style.css"

import { useCallback, useMemo, useState } from "react"
import { useTheme } from "next-themes"

import { Flight } from "@/types/flight-master/flight-master"
import { useFlightList } from "@/lib/hooks/flight-master/flight-master"

export default function Component() {
  const [filterButtonState, setFilterButtonState] = useState(0)

  const { theme } = useTheme()

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  const { data: flightsData } = useFlightList({ page: 1, page_size: 999 })
  const flights = flightsData?.data.flatMap((item) => item.object)

  const groupedFLights: SchedulerData = useMemo(() => {
    const group: Record<string, Flight[]> = {}
    flights?.forEach((flight) => {
      if (group[flight.tail.id]) {
        group[flight.tail.id].push(flight)
      } else {
        group[flight.tail.id] = [flight]
      }
    })
    return Object.entries(group).map<ArrayElement<SchedulerData>>(
      ([tail, data]) => ({
        id: tail,
        label: {
          title: data[0].tail.tail_number,
          icon: "",
          subtitle: `${data[0].tail.manufacturer.name} ${data[0].tail.aircraft_type.name} ${data[0].tail.version.version}`,
        },
        data: data.map((item) => {
          const { arrivalDateTime, departureDateTime } =
            calculateFlightDates(item)
          return {
            startDate: departureDateTime,
            endDate: arrivalDateTime,
            id: item.id,
            occupancy: 1,
            title: item.flight_number,
            description: `${item.origin.airport_code} ${item.destination.airport_code}`,
          }
        }),
      })
    )
  }, [flights])

  console.log(flights)

  const handleRangeChange = useCallback((range: any) => {
    setRange(range)
  }, [])

  // Filtering events that are included in current date range
  // Example can be also found on video https://youtu.be/9oy4rTVEfBQ?t=118&si=52BGKSIYz6bTZ7fx
  // and in the react-scheduler repo App.tsx file https://github.com/Bitnoise/react-scheduler/blob/master/src/App.tsx
  const filteredFlights = useMemo(
    () =>
      groupedFLights.map((person) => ({
        ...person,
        data: person.data.filter((flight) => {
          const projectStartDate = new Date(flight.startDate)
          const projectEndDate = new Date(flight.endDate)
          const rangeStartDate = new Date(range.startDate)
          const rangeEndDate = new Date(range.endDate)

          return (
            isWithinInterval(projectStartDate, {
              start: rangeStartDate,
              end: rangeEndDate,
            }) ||
            isWithinInterval(projectEndDate, {
              start: rangeStartDate,
              end: rangeEndDate,
            }) ||
            (isBefore(projectStartDate, rangeStartDate) &&
              isAfter(projectEndDate, rangeEndDate))
          )
        }),
      })),
    [groupedFLights]
  )

  return (
    <div className="relative -m-4 h-[calc(100vh-48px)]">
      <Scheduler
        data={filteredFlights}
        // isLoading={isLoading}
        onRangeChange={handleRangeChange}
        onTileClick={(clickedResource) => console.log(clickedResource)}
        onItemClick={(item) => console.log(item)}
        onFilterData={() => {
          // Some filtering logic...
          setFilterButtonState(1)
        }}
        onClearFilterData={() => {
          // Some clearing filters logic...
          setFilterButtonState(0)
        }}
        config={{
          zoom: 0,
          filterButtonState,
          defaultTheme: theme === "dark" ? "dark" : "light",
        }}
      />
    </div>
  )
}

function calculateFlightDates(flightData: Flight): {
  departureDateTime: Date
  arrivalDateTime: Date
} {
  const {
    departure_date,
    departure_hour,
    departure_minute,
    departure_period,
    origin,
    arrival_date,
    destination,
  } = flightData

  // Helper function to convert 12-hour time to 24-hour time
  function convertTo24HourFormat(hour: number, period: string): number {
    if (period === "PM" && hour < 12) return hour + 12
    if (period === "AM" && hour === 12) return 0
    return hour
  }

  // Get timezone offsets
  const originOffset = parseInt(origin.timezone.offset.replace(":", ""))
  const destinationOffset = parseInt(
    destination.timezone.offset.replace(":", "")
  )

  // Create departure Date object
  const departureHour24 = convertTo24HourFormat(
    departure_hour,
    departure_period
  )
  const departureDateTime = new Date(
    `${departure_date}T${departureHour24.toString().padStart(2, "0")}:${departure_minute.toString().padStart(2, "0")}:00${origin.timezone.offset}`
  )

  // Create arrival Date object
  const arrivalHour24 = convertTo24HourFormat(
    flightData.arrival_time.split(":")[0] as unknown as number,
    flightData.arrival_time.slice(-2)
  )
  const arrivalDateTime = new Date(
    `${arrival_date}T${arrivalHour24.toString().padStart(2, "0")}:00:00${destination.timezone.offset}`
  )

  return { departureDateTime, arrivalDateTime }
}
