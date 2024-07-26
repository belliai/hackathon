"use client"

import React, { useEffect } from "react"
import { format } from "date-fns"
import { fromZonedTime, getTimezoneOffset, toZonedTime } from "date-fns-tz"
import { useFormContext } from "react-hook-form"

import { Aircraft } from "@/types/aircraft/aircraft"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { useLocations } from "@/lib/hooks/locations"
import { Card } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/form/combobox"
import FormTextField from "@/components/form/FormTextField"
import InputSwitch from "@/components/form/InputSwitch"

const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && !isNaN(date.getTime())
}

const FlightDetailsForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const form = useFormContext()
  const formData = form.watch()

  const { data: locations } = useLocations()

  const formattedLocation =
    locations?.map((locationList: any) => {
      const timezone = locationList.timezone
      const cityName = timezone ? timezone.name.split("/").pop() : ""

      const label = timezone ? (
        <p>
          {locationList.name}{" "}
          <span className="text-xs text-zinc-500">
            (GMT {timezone.offset}, {cityName})
          </span>
        </p>
      ) : (
        locationList.name
      )

      return {
        label: label,
        value: locationList.ID,
      }
    }) || []

  const generateTailName = (selectedAircraftType: Aircraft, tail: string) => {
    return (
      <div className="grid grid-cols-7 items-center gap-4 text-left">
        <div className="col-span-1 min-w-24">
          <p>
            {selectedAircraftType?.aircraft_type.name}-{tail}
          </p>
        </div>
        <div className="col-span-1 min-w-24 text-xs text-zinc-500">
          <p>{selectedAircraftType?.mtow} MTOW</p>
        </div>
        <div className="col-span-1 min-w-44 text-xs text-zinc-500">
          <p>{selectedAircraftType?.landing_weight} Landing Weight</p>
        </div>
        <div className="col-span-2 ml-10 text-xs text-zinc-500">
          <p>{selectedAircraftType?.cargo_capacity} Cargo Capacity</p>
        </div>
      </div>
    )
  }

  const generateDepartureTime = (
    fromDate: Date,
    hour: number,
    min: number,
    amPm: string
  ) => {
    if (!fromDate || isNaN(hour) || isNaN(min)) return null

    // Convert hour to 24-hour format
    if (amPm === "PM" && hour !== 12) {
      hour += 12
    } else if (amPm === "AM" && hour === 12) {
      hour = 0
    }
    const date = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate(),
      hour,
      min
    )

    return date
  }

  const generateArrivalTime = (
    date: Date,
    hour: number,
    min: number,
    originTimezone: string,
    destinationTimezone: string
  ) => {
    if (
      !date ||
      hour === undefined ||
      min === undefined ||
      !originTimezone ||
      !destinationTimezone
    ) {
      return null
    }

    // get offset for every timezone
    const originOffset = getTimezoneOffset(originTimezone, date)
    // get offset for every timezone
    const destinationOffset = getTimezoneOffset(destinationTimezone, date)

    // const originDate = toZonedTime(date, originTimezone)
    const originDate = new Date(date)
    originDate.setHours(date.getHours())
    originDate.setMinutes(date.getMinutes())

    // Calculate the time to add in milliseconds
    const minutesToAdd = hour * 60 + min
    const arrivalDate = new Date(originDate.getTime() + minutesToAdd * 60000)

    const convertedArrivalDate = new Date(
      arrivalDate.getTime() - (originOffset - destinationOffset)
    )
    return convertedArrivalDate
  }

  const { data: aircraftsList } = useAircrafts({ page: 1, page_size: 999 })

  const aircraftTailNumbers = aircraftsList?.data.flatMap((list) =>
    list.aircraft_tail_numbers
      .filter((tail) => !tail.is_deleted)
      .map((tail) => ({
        value: String(tail.id),
        label: tail.tail_number,
        component: generateTailName(list, tail.tail_number),
      }))
  )

  useEffect(() => {}, [form.formState])

  const departureDate = formData.departure_date
    ? new Date(formData.departure_date)
    : null
  const departureHour = formData.departure_hour
  const departureMinute = formData.departure_minute
  const departureAmPm = formData.departure_period as "AM" | "PM"
  const flightDurationHours = formData.flight_duration_hour
  const flightDurationMinutes = formData.flight_duration_minute
  const originTimezone =
    locations &&
    formData.origin_id &&
    locations?.find((loc: any) => loc.ID === formData.origin_id).timezone?.name
  const destinationTimezone =
    locations &&
    formData.destination_id &&
    locations?.find((loc: any) => loc.ID === formData.destination_id).timezone
      ?.name

  // Generate departure time if all required data is present
  const departureTime =
    departureDate &&
    departureHour !== undefined &&
    departureMinute !== undefined &&
    departureAmPm
      ? generateDepartureTime(
          departureDate,
          parseInt(departureHour),
          parseInt(departureMinute),
          departureAmPm
        )
      : null

  // Generate arrival time if departure time and flight duration are available
  const arrivalTime =
    departureTime &&
    flightDurationHours !== undefined &&
    flightDurationMinutes !== undefined
      ? generateArrivalTime(
          departureTime,
          parseInt(flightDurationHours),
          parseInt(flightDurationMinutes),
          originTimezone,
          destinationTimezone
        )
      : null

  const isDateDifferent =
    departureTime?.toDateString() !== arrivalTime?.toDateString()

  return (
    <Card className="space-y-4 p-4" ref={ref}>
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="flight_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel tooltipId="flight-number">Flight Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-[40px] border-2 border-foreground/30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          <InputSwitch
            label="Flight Time"
            name="flight_duration_hour"
            type="stepper-number"
            suffix="hrs"
            max={100}
            min={1}
            step={1}
          />
          <InputSwitch
            label="&nbsp;&nbsp;&nbsp;&nbsp;"
            name="flight_duration_minute"
            type="stepper-number"
             suffix="min"
            max={59}
            min={0}
            step={1}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Combobox
          name="origin_id"
          options={formattedLocation}
          label="Origin"
          info="Select the origin location"
          editLink="/data-fields/airway-bills?tab=location"
        />
        <div className="flex items-end space-x-2">
          <InputSwitch
            label="Hours"
            name="departure_hour"
            type="stepper-number"
            max={12}
            min={1}
            step={1}
          />
          <InputSwitch
            label="Minutes"
            name="departure_minute"
            type="stepper-number"
            max={59}
            min={0}
            step={1}
          />
          <InputSwitch
            name="departure_period"
            type="select"
            selectOptions={[
              { label: "AM", value: "AM" },
              { label: "PM", value: "PM" },
            ]}
            label="AM/PM"
          />
        </div>
        <InputSwitch
          type="date"
          name="departure_date"
          label="Departure Date"
          disabledMatcher={() => false}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Combobox
          name="destination_id"
          options={formattedLocation}
          label="Destination"
          info="Select the source location"
          editLink="/data-fields/airway-bills?tab=location"
        />
        <div className="flex-col">
          <label className="text-xs">Arrival Time</label>
          <p>
            {isValidDate(arrivalTime) ? format(arrivalTime, "hh:mm a") : "N/A"}
          </p>
        </div>
        <div>
          {isDateDifferent && <label className="text-xs">Arrival Date</label>}
          {isDateDifferent && (
            <p className="text-sm text-red-800">
              {arrivalTime && format(arrivalTime, "MM/dd/yyyy")}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Combobox
          name="tail_id"
          label="Tail Number"
          info="Select Tail number"
          options={aircraftTailNumbers}
        />
      </div>
    </Card>
  )
})

FlightDetailsForm.displayName = "FlightDetailsForm"

export default FlightDetailsForm
