"use client"

import React, { useEffect } from "react"
import { format } from "date-fns"
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

const FlightDetailsForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const form = useFormContext()
  const formData = form.watch()

  const { data: locations } = useLocations()

  const formattedLocation =
    locations?.map((locationList: any) => {
      const timezone = locationList.timezone
      const cityName = timezone ? timezone.name.split("/").pop() : ""

      const label = timezone
        ? <p>{locationList.name} <span className="text-xs text-zinc-500">(GMT {timezone.offset}, {cityName})</span></p>
        : locationList.name

      return {
        label: label,
        value: locationList.ID,
      }
    }) || []

  const generateTailName = (selectedAircraftType: Aircraft, tail: string) => {
    return (
      <div className="grid grid-cols-7 gap-4 text-left items-center">
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
        <div className="col-span-2  ml-10 text-xs text-zinc-500">
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
    if (!fromDate || !hour || !min) return null

    // Convert hour to 24-hour format
    if (amPm === "pm" && hour !== 12) {
      hour += 12
    } else if (amPm === "am" && hour === 12) {
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

  const generateArrivalTime = (date: Date, hour: number, min: number) => {
    if (!date || !hour || !min) return null
    const minutes = hour * 60 + min
    const arrivalDate = new Date(date.getTime() + minutes * 60000)
    return arrivalDate
  }

  const { data: aircraftsList } = useAircrafts({ page: 1, page_size: 999 })

  const aircraftTailNumbers = aircraftsList?.data.flatMap((list) =>
    list.aircraft_tail_numbers
      .filter((tail) => !tail.is_deleted)
      .map((tail) => ({
        value: String(tail.tail_number),
        label: tail.tail_number,
        component: generateTailName(list, tail.tail_number),
      }))
  )

  useEffect(() => {}, [form.formState])

  const departureDate = formData.from_date ? new Date(formData.from_date) : null
  const departureHour = formData.departure_h
  const departureMinute = formData.departure_m
  const departureAmPm = formData.departure_am_pm as "am" | "pm"
  const flightDurationHours = formData.flight_duration_h
  const flightDurationMinutes = formData.flight_duration_m

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
          parseInt(flightDurationMinutes)
        )
      : null

  const isDateDifferent =
    departureTime?.toDateString() !== arrivalTime?.toDateString()

  return (
    <Card className="space-y-4 p-4" ref={ref}>
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="flight_no"
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
          <FormTextField
            name="flight_duration_h"
            form={form}
            type="stepper-number"
            min={0}
            max={100}
            step={1}
            label="Flight Time"
            suffix="hrs"
          />
          <FormTextField
            name="flight_duration_m"
            form={form}
            type="stepper-number"
            min={0}
            max={60}
            step={5}
            suffix="min"
            label="&nbsp;&nbsp;&nbsp;&nbsp;"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Combobox
          name="source_id"
          options={formattedLocation}
          label="Origin"
          info="Select the source location"
          editLink="/data-fields/airway-bills?tab=location"
        />
        <div className="flex items-end space-x-2 p-1">
          <FormTextField
            name="departure_h"
            form={form}
            type="stepper-number"
            min={0}
            max={12}
            label="Hours"
          />
          <FormTextField
            name="departure_m"
            form={form}
            type="stepper-number"
            min={0}
            max={60}
            label="Minutes"
          />
          <FormTextField
            name="departure_am_pm"
            form={form}
            type="select"
            options={[
              { label: "AM", value: "am" },
              { label: "PM", value: "pm" },
            ]}
            label="AM/PM"
          />
        </div>
        <FormTextField
          name="from_date"
          form={form}
          type="date"
          label="Departure Date"
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
          <p>{arrivalTime ? format(arrivalTime, "HH:mm") : "N/A"}</p>
        </div>
        <div>
          {isDateDifferent && <label className="text-xs">Arrival Date</label>}
          {isDateDifferent && (
            <p className="text-sm text-red-800">
              {arrivalTime?.toDateString()}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Combobox
          name="tail_no"
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
