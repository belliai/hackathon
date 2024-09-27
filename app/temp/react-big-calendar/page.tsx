"use client"

import React, {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useMemo,
  useState,
} from "react"
import format from "date-fns/format"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  View,
  Views,
} from "react-big-calendar"

import { Flight } from "@/types/flight-master/flight-master"
import { useFlightList } from "@/lib/hooks/flight-master/flight-master"

import "react-big-calendar/lib/css/react-big-calendar.css"
import "./custom-style.css"

// import { events } from "./events"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function MyCalendar(props: {}) {
  const { data: flightsData } = useFlightList({ page: 1, page_size: 9999 })
  const flights = flightsData?.data.flatMap((item) => item.object)

  const [view, setView] = useState<View>(Views.WEEK)
  const [date, setDate] = useState(new Date())

  const events = useMemo(
    () =>
      flights?.map<Event>((item) => {
        const { departureDateTime, arrivalDateTime } =
          calculateFlightDates(item)
        console.log({ departureDateTime, arrivalDateTime })

        return {
          id: item.id,
          title: item.flight_number,
          start: departureDateTime,
          end: arrivalDateTime,
        }
      }),
    [flights]
  )

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        // events={[]}
        startAccessor="start"
        titleAccessor="title"
        endAccessor="end"
        showMultiDayTimes
        step={60}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={view}
        view={view} // Include the view prop
        date={date} // Include the date prop
        onView={(view) => setView(view)}
        onNavigate={(date) => {
          setDate(new Date(date))
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
