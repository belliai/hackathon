"use client"

import { useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"

import { useAircraftTypes } from "@/lib/hooks/aircrafts/aircraft-types"
import { useEnums } from "@/lib/hooks/enums"
import { useLocations } from "@/lib/hooks/locations"
import { useUnits } from "@/lib/hooks/units/units"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FormTextField from "@/components/form/FormTextField"

interface FlightMasterFormType {
  hookForm: UseFormReturn<any>
}

interface TailNoType {
  label: string
  value: string
}

type LocationListType = {
  ID: string
  name: string
}

const frequencyItems = [
  {
    id: "mon",
    label: "Monday",
  },
  {
    id: "tue",
    label: "Tuesday",
  },
  {
    id: "wed",
    label: "Wednesday",
  },
  {
    id: "thu",
    label: "Thursday",
  },
  {
    id: "fri",
    label: "Friday",
  },
  {
    id: "sat",
    label: "Saturday",
  },
  {
    id: "sun",
    label: "Sunday",
  },
]

const recurringOption = [
  {
    label: "Does not repeat",
    value: "no-repeat",
  },
  {
    label: "Daily",
    value: "daily",
  },
]

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th" // catches 11th - 20th
  switch (day % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

function generateRecurringOptions(date: Date) {
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" })
  const dayOfMonth = date.getDate()
  const month = date.toLocaleString("en-US", { month: "long" })
  const monthDay = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  })

  return [
    {
      label: "Does not repeat",
      value: "no-repeat",
    },
    {
      label: "Daily",
      value: "daily",
    },
    {
      label: `Weekly on ${dayOfWeek}`,
      value: `weekly-${dayOfWeek.toLowerCase()}`,
    },
    {
      label: `Monthly on the ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}`,
      value: `monthly-${dayOfMonth}`,
    },
    {
      label: `Annually on ${monthDay}`,
      value: `annually-${monthDay.replace(/ /g, "-")}`,
    },
    {
      label: "Every weekday (Monday to Friday)",
      value: "every-weekday",
    },
    {
      label: "Custom...",
      value: "custom",
    },
  ]
}

export default function FlightMasterFormRecurring({
  hookForm,
}: FlightMasterFormType) {
  const [tailNoOptions, setTailNoOptions] = useState<Array<TailNoType>>([])
  const [recurrings, setRecurrings] =
    useState<Array<TailNoType>>(recurringOption)
  const formData = hookForm.watch()

  const { data: locations } = useLocations()
  const { data: units } = useUnits({
    category: "weight",
  })
  const { data: flightSectorList } = useEnums({
    category: "flight_sector",
  })
  const { data: flightStatusList } = useEnums({
    category: "flight_status",
  })
  const { data: flightTypeList } = useEnums({
    category: "flight_type",
  })
  const { data: aircraftTypeList } = useAircraftTypes()

  const formattedLocation =
    locations?.map((locationList: LocationListType) => ({
      label: locationList.name,
      value: locationList.ID,
    })) || []

  const weightUnitsOptions = units?.map((unit) => ({
    value: String(unit.ID),
    label: `${unit.Name} - ${unit.Symbol}`,
  }))

  const flightSectorOptions = flightSectorList?.map((list) => ({
    value: String(list.ID),
    label: list.value,
  }))

  const flightStatusOptions = flightStatusList?.map((list) => ({
    value: String(list.ID),
    label: list.value,
  }))

  const flightTypeOptions = flightTypeList?.map((list) => ({
    value: String(list.ID),
    label: list.value,
  }))

  const aircraftTypeOptions = aircraftTypeList?.map((list) => ({
    value: String(list.id),
    label: list.aircraft_type,
  }))

  useEffect(() => {
    const selectedAircraftType = aircraftTypeList?.find(
      (item: any) => item.id === formData.aircraftType
    )
    const tailNo =
      selectedAircraftType &&
      selectedAircraftType.aircraft_tail_numbers?.map((list) => ({
        value: String(list.id),
        label: list.tail_number,
      }))

    setTailNoOptions(tailNo || [])
  }, [formData.aircraftType])

  useEffect(() => {
    if (formData.rangeDate?.from) {
      const recurrings = generateRecurringOptions(formData.rangeDate.from)
      setRecurrings(recurrings)
    }
  }, [formData.rangeDate])

  return (
    <div className="flex flex-col gap-4">
      <Form {...hookForm}>
        <div className="grid grid-cols-3 gap-2">
          <FormTextField
            name="flightNo"
            form={hookForm}
            type="text"
            label="Flight No"
          />
          <FormTextField
            form={hookForm}
            name="source"
            label="Source"
            type="select"
            options={formattedLocation}
          />
          <FormTextField
            form={hookForm}
            name="destination"
            label="Destination"
            type="select"
            options={formattedLocation}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormTextField
            name="rangeDate"
            form={hookForm}
            type="date-range"
            label="Range Date"
          />
          <FormTextField
            form={hookForm}
            name="recurring"
            label="Recurring"
            type="select"
            options={recurrings}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <FormTextField
            form={hookForm}
            name="aircraftType"
            label="Aircraft Type"
            type="select"
            options={aircraftTypeOptions}
          />
          <FormTextField
            form={hookForm}
            name="status"
            label="Status"
            type="select"
            options={flightStatusOptions}
          />
        </div>
      </Form>
    </div>
  )
}
