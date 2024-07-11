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
import DateRangeTimePicker from "@/components/form/DateRangeTimePicker"
import FormTextField from "@/components/form/FormTextField"

import { CustomRecurringForm } from "./CustomRecurringForm"

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

type EndOption =
  | "never"
  | { type: "date"; endDate: Date }
  | { type: "occurrences"; occurrences: number }

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th"
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
type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

function getDayName(day: DayOfWeek): string {
  switch (day) {
    case "mon":
      return "Monday"
    case "tue":
      return "Tuesday"
    case "wed":
      return "Wednesday"
    case "thu":
      return "Thursday"
    case "fri":
      return "Friday"
    case "sat":
      return "Saturday"
    case "sun":
      return "Sunday"
  }
}

function generateRecurringOptions(
  date: Date,
  everyNumber?: number,
  everyPeriod?: "day" | "week" | "month" | "year",
  days?: DayOfWeek[], // Added days parameter
  end?: EndOption
) {
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" })
  const dayOfMonth = date.getDate()
  const monthDay = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  })

  const options = [
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

  let periodLabel: string
  let periodValue: string
  let generatedOption

  if (everyNumber && everyPeriod) {
    switch (everyPeriod) {
      case "day":
        periodLabel = `Every ${everyNumber} day${everyNumber > 1 ? "s" : ""}`
        periodValue = `every-${everyNumber}-day`
        break
      case "week":
        periodLabel = `Every ${everyNumber} week${everyNumber > 1 ? "s" : ""}`
        if (days && days.length > 0) {
          const daysOfWeek = days.map((day) => getDayName(day)).join(", ")
          periodLabel = `Every ${everyNumber} week${everyNumber > 1 ? "s" : ""} on ${daysOfWeek}`
          periodValue = `every-${everyNumber}-week-${days.join("-")}`
        } else {
          periodValue = `every-${everyNumber}-week`
        }
        break
      case "month":
        periodLabel = `Every ${everyNumber} month${everyNumber > 1 ? "s" : ""}`
        periodValue = `every-${everyNumber}-month`
        break
      case "year":
        periodLabel = `Every ${everyNumber} year${everyNumber > 1 ? "s" : ""}`
        periodValue = `every-${everyNumber}-year`
        break
      default:
        periodLabel = `Every ${everyNumber} ${everyPeriod}`
        periodValue = `every-${everyNumber}-${everyPeriod}`
    }

    // Add the period option
    generatedOption = { label: periodLabel, value: periodValue }

    if (end) {
      if (end === "never") {
        generatedOption.label += " (Never)"
        generatedOption.value += "-never"
      } else if ("type" in end) {
        switch (end.type) {
          case "date":
            const endDate = end.endDate.toLocaleDateString("en-US")
            generatedOption.label += ` (End on ${endDate})`
            generatedOption.value += `-end-on-${endDate.replace(/ /g, "-")}`
            break
          case "occurrences":
            generatedOption.label += ` (After ${end.occurrences} occurrence${end.occurrences > 1 ? "s" : ""})`
            generatedOption.value += `-after-${end.occurrences}-occurrences`
            break
        }
      }
    }

    options.push(generatedOption)
  }

  return {
    options,
    generatedOption,
  }
}

export default function FlightMasterFormRecurring({
  hookForm,
}: FlightMasterFormType) {
  const [tailNoOptions, setTailNoOptions] = useState<Array<TailNoType>>([])
  const [recurrings, setRecurrings] =
    useState<Array<TailNoType>>(recurringOption)
  const [selectedRecurring, setSelectedRecurring] = useState<
    string | undefined
  >("no-repeat")

  const [openCustomRecurring, setOpenCustomRecurring] = useState<boolean>(false)
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

  const onSaveCustomRecurring = (data: any) => {
    const { everyNumber, everyPeriod, endsOn, afterOccurence, days } = data

    const end =
      (endsOn && { type: "date", endDate: endsOn }) ||
      (afterOccurence && {
        type: "occurrences",
        occurrences: afterOccurence,
      }) ||
      "never"

    const { options, generatedOption } = generateRecurringOptions(
      formData.rangeDate.from,
      everyNumber,
      everyPeriod,
      days,
      end
    )

    setRecurrings(options)
    hookForm.setValue("recurring", generatedOption?.value, {
      shouldValidate: true,
      shouldDirty: true,
    })
    // hookForm.trigger("recurring");
    //setSelectedRecurring(generatedOption?.value)
    // console.log(options, generatedOption)
  }

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
      if (formData.rangeDate?.from instanceof Date) {
        const { options } = generateRecurringOptions(formData.rangeDate.from)
        setRecurrings(options)
      }
    }
  }, [formData.rangeDate])

  useEffect(() => {
    if (formData.recurring === "custom") {
      setOpenCustomRecurring(true)
    } else {
      setOpenCustomRecurring(false)
    }
  
  }, [formData.recurring])

  useEffect(() => {
  }, [recurrings])

  return (
    <div className="flex flex-col gap-4">
      <Form {...hookForm}>
        <div className="grid grid-cols-3 gap-2">
          <CustomRecurringForm
            open={openCustomRecurring}
            setOpen={setOpenCustomRecurring}
            onSave={onSaveCustomRecurring}
          />
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
            type="date-range-time"
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
