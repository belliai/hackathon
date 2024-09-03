"use client"

import React, { useEffect, useMemo, useState } from "react"
import { FlightSchema } from "@/schemas/flight-master/flight"
import { getTimezoneOffset } from "date-fns-tz"
import { useFormContext } from "react-hook-form"

import { Aircraft } from "@/types/aircraft/aircraft"
import { Location } from "@/types/flight-master/flight-master"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { useLocationSearch } from "@/lib/hooks/locations"
import { ObjectSet } from "@/lib/utils/array-utils"
import { getDateByType, getPeriod } from "@/lib/utils/time-picker-utils"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ComboboxOption } from "@/components/form/combobox"
import InputSwitch from "@/components/form/InputSwitch"

interface FlightDetailsFormProps extends React.HTMLAttributes<HTMLDivElement> {
  initialLocations?: Location[]
}

const FlightDetailsForm = React.forwardRef<
  HTMLDivElement,
  FlightDetailsFormProps
>(({ initialLocations }, ref) => {
  const form = useFormContext<FlightSchema>()
  const formData = form.watch()

  const [searchTerm, setSearchTerm] = useState("")

  const [allLocations, setAllLocations] = useState<Location[]>(
    initialLocations ?? []
  )

  const { data: locationsSearch } = useLocationSearch({ searchTerm })

  useEffect(() => {
    if (!locationsSearch?.data) return

    const objectSet = new ObjectSet<Location>("id")
    setAllLocations((prev) => {
      objectSet.addAll([...prev, ...locationsSearch.data])
      return objectSet.getItems()
    })
  }, [locationsSearch])

  const formattedLocation: ComboboxOption[] = useMemo(() => {
    return (
      allLocations.map((location) => {
        const timezone = location.timezone
        const cityName = timezone ? timezone.name.split(" - ").pop() : ""

        const label = timezone ? (
          <p>
            {location.airport_code}{" "}
            <span className="text-xs text-zinc-500">
              (GMT {timezone.offset}, {cityName})
            </span>
          </p>
        ) : (
          location.airport_code
        )

        return {
          component: label,
          label: location.name,
          value: location.id,
        }
      }) || []
    )
  }, [allLocations])

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

  const calculateFlightDuration = (
    departureDate?: Date | null,
    originOffset?: string, // e.g., "+02:00"
    arrivalDate?: Date | null,
    destinationOffset?: string // e.g., "+04:00"
  ) => {
    if (!departureDate || !originOffset || !arrivalDate || !destinationOffset) {
      return null
    }

    // Parse offset strings to get the offset in minutes
    const parseOffset = (offset: string) => {
      const sign = offset[0] === "+" ? 1 : -1
      const [hours, minutes] = offset.slice(1).split(":").map(Number)
      return sign * (hours * 60 + minutes) * 60 * 1000
    }

    const originOffsetMs = parseOffset(originOffset)
    const destinationOffsetMs = parseOffset(destinationOffset)

    // Convert times to UTC by subtracting the respective offsets
    const departureUTC = new Date(departureDate.getTime() - originOffsetMs)
    const arrivalUTC = new Date(arrivalDate.getTime() - destinationOffsetMs)

    // Calculate duration in milliseconds
    const durationMs = arrivalUTC.getTime() - departureUTC.getTime()

    // Convert duration to hours and minutes
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60))
    const durationMinutes = Math.floor(
      (durationMs % (1000 * 60 * 60)) / (1000 * 60)
    )

    return { hours: durationHours, minutes: durationMinutes }
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

  const originTimezoneOffset =
    allLocations &&
    formData.origin_id &&
    allLocations.find((loc) => loc.id === formData.origin_id)?.timezone?.offset
  const destinationTimezoneOffset =
    allLocations &&
    formData.destination_id &&
    allLocations.find((loc) => loc.id === formData.destination_id)?.timezone
      ?.offset

  console.log({ originTimezoneOffset, destinationTimezoneOffset })

  // console.log("departure", form.watch("departure_date"))
  // console.log("arrival", form.watch("arrival_date"))

  // console.log(formData.origin_id)

  useEffect(() => {
    if (!formData.departure_date || !formData.arrival_date) return
    const flightDuration = calculateFlightDuration(
      new Date(formData.departure_date),
      originTimezoneOffset,
      new Date(formData.arrival_date),
      destinationTimezoneOffset
    )
    if (flightDuration) {
      form.setValue("flight_duration_hour", flightDuration.hours)
      form.setValue("flight_duration_minute", flightDuration.minutes)
    }
  }, [
    formData.arrival_date,
    formData.departure_date,
    originTimezoneOffset,
    destinationTimezoneOffset,
  ])

  // console.log(form.formState.errors)

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
            options={formattedLocation}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search origin by airport code"
            type="combobox-async"
            label="Origin"
            info="Select the origin location"
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
            options={formattedLocation}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search destination by airport code"
            type="combobox-async"
            label="Destination"
            info="Select the destination location"
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
