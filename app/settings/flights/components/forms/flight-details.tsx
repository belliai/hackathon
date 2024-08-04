"use client"

import React, { useEffect } from "react"
import { FlightSchema } from "@/schemas/flight-master/flight"
import { format } from "date-fns"
import { fromZonedTime, getTimezoneOffset, toZonedTime } from "date-fns-tz"
import { PlaneTakeoffIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { Aircraft } from "@/types/aircraft/aircraft"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { useLocations } from "@/lib/hooks/locations"
import { getDateByType, getPeriod } from "@/lib/utils/time-picker-utils"
import { Card } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import TimeInput from "@/components/ui/time-input"
import { Combobox } from "@/components/form/combobox"
import FormTextField from "@/components/form/FormTextField"
import InputSwitch from "@/components/form/InputSwitch"

const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && !isNaN(date.getTime())
}

const FlightDetailsForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const form = useFormContext<FlightSchema>()
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
      // <div className="space-y-2">
      <div className="flex w-full flex-grow flex-row items-center justify-between gap-1">
        <span className="min-w-16 text-start">{tail}</span>
        <span className="text-muted-foreground">
          {[
            selectedAircraftType.manufacturer.name,
            selectedAircraftType.aircraft_type.name,
            selectedAircraftType.version.version,
          ].join(" ")}
        </span>
        {/* </div> */}
        {/* <div className="grid grid-cols-3 gap-3 text-start text-xs text-zinc-500">
          <p>{selectedAircraftType?.mtow} MTOW</p>
          <p>{selectedAircraftType?.landing_weight} Landing Weight</p>
          <p>{selectedAircraftType?.cargo_capacity} Cargo Capacity</p>
        </div> */}
      </div>
      // <div className="grid grid-cols-7 items-center gap-4 text-left">
      //   <div className="col-span-1 min-w-24">
      //     <p>
      //       {selectedAircraftType?.aircraft_type.name}-{tail}
      //     </p>
      //   </div>
      //   <div className="col-span-1 min-w-24 text-xs text-zinc-500">
      //     <p>{selectedAircraftType?.mtow} MTOW</p>
      //   </div>
      //   <div className="col-span-1 min-w-44 text-xs text-zinc-500">
      //     <p>{selectedAircraftType?.landing_weight} Landing Weight</p>
      //   </div>
      //   <div className="col-span-2 ml-10 text-xs text-zinc-500">
      //     <p>{selectedAircraftType?.cargo_capacity} Cargo Capacity</p>
      //   </div>
      // </div>
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

  const calculateFlightDuration = (
    departureDate?: Date | null,
    originTimezone?: string,
    arrivalDate?: Date | null,
    destinationTimezone?: string
  ) => {
    if (
      !departureDate ||
      !originTimezone ||
      !arrivalDate ||
      !destinationTimezone
    ) {
      return null
    }

    // Get offsets for each timezone
    const originOffset = getTimezoneOffset(originTimezone, departureDate)
    const destinationOffset = getTimezoneOffset(
      destinationTimezone,
      arrivalDate
    )

    // Create departure and arrival dates with times
    const departure = new Date(departureDate)

    const arrival = new Date(arrivalDate)

    // Convert times to UTC
    const departureUTC = new Date(departure.getTime() - originOffset)
    const arrivalUTC = new Date(arrival.getTime() - destinationOffset)

    // Calculate duration in milliseconds
    const durationMs = arrivalUTC.getTime() - departureUTC.getTime()

    // Convert duration to hours and minutes
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60))
    const durationMinutes = Math.floor(
      (durationMs % (1000 * 60 * 60)) / (1000 * 60)
    )

    return { hours: durationHours, minutes: durationMinutes }
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
        label: `${tail.tail_number} - ${[list.manufacturer.name, list.aircraft_type.name, list.version.version].join(" ")}`,
        component: generateTailName(list, tail.tail_number),
      }))
  )

  useEffect(() => {}, [form.formState])

  const originTimezone =
    locations &&
    formData.origin_id &&
    locations?.find((loc: any) => loc.ID === formData.origin_id).timezone?.name
  const destinationTimezone =
    locations &&
    formData.destination_id &&
    locations?.find((loc: any) => loc.ID === formData.destination_id).timezone
      ?.name

  console.log("departure", form.watch("departure_date"))
  console.log("arrival", form.watch("arrival_date"))

  console.log(formData.origin_id)

  useEffect(() => {
    if (!formData.departure_date || !formData.arrival_date) return
    const flightDuration = calculateFlightDuration(
      new Date(formData.departure_date),
      originTimezone,
      new Date(formData.arrival_date),
      destinationTimezone
    )
    if (flightDuration) {
      form.setValue("flight_duration_hour", flightDuration.hours)
      form.setValue("flight_duration_minute", flightDuration.minutes)
    }
  }, [
    formData.arrival_date,
    formData.departure_date,
    originTimezone,
    destinationTimezone,
  ])

  console.log(form.formState.errors)

  useEffect(() => {
    if (!formData.departure_date) return
    const departureDate = new Date(formData.departure_date)
    form.setValue(
      "departure_hour",
      Number(getDateByType(departureDate, "12hours"))
    )
    form.setValue("departure_minute", departureDate.getMinutes())
    form.setValue("departure_period", getPeriod(departureDate))
  }, [formData.departure_date])

  return (
    <Card className="p-4" ref={ref}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <InputSwitch<FlightSchema>
            label="Flight Number"
            name="flight_number"
            type="text"
          />
          <InputSwitch<FlightSchema>
            type="combobox"
            name="tail_id"
            label="Tail Number"
            info="Select Tail number"
            selectOptions={aircraftTailNumbers}
          />
        </div>
      </div>
      <Separator className="mb-2 mt-4 opacity-30" />
      <div className="grid grid-cols-2 gap-3">
        <div className="grid flex-1 grid-cols-1 gap-2">
          <InputSwitch<FlightSchema>
            name="origin_id"
            selectOptions={formattedLocation}
            type="combobox"
            label="Origin"
            info="Select the origin location"
            editLink="/data-fields/airway-bills?tab=location"
          />
          <InputSwitch<FlightSchema>
            type="date"
            name="departure_date"
            label="Departure Date"
            disabled={!formData.origin_id}
            disabledMatcher={{ before: new Date() }}
          />
          <InputSwitch<FlightSchema>
            type="time"
            name="departure_date"
            disabled={!formData.origin_id}
            label="Departure Time"
          />
        </div>

        <div className="grid flex-1 grid-cols-1 gap-2">
          <InputSwitch<FlightSchema>
            name="destination_id"
            selectOptions={formattedLocation}
            type="combobox"
            label="Destination"
            info="Select the destination location"
            editLink="/data-fields/airway-bills?tab=location"
          />
          <InputSwitch<FlightSchema>
            type="date"
            name="arrival_date"
            label="Arrival Date"
            disabled={!formData.destination_id || !formData.departure_date}
            disabledMatcher={{ before: new Date(formData.departure_date) }}
          />
          <InputSwitch<FlightSchema>
            type="time"
            name="arrival_date"
            disabled={!formData.destination_id || !formData.departure_date}
            label="Arrival Time"
          />
        </div>
      </div>

      {/* <div className="grid grid-cols-3 gap-4">
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
      </div> */}
    </Card>
  )
})

FlightDetailsForm.displayName = "FlightDetailsForm"

export default FlightDetailsForm
