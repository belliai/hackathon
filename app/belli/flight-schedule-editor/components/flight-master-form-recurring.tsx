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

import { CustomRecurringForm } from "./custom-recurring-form"

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

import { RRule, Weekday, Frequency, Options } from 'rrule';

// Define EndOption type
type EndOption =
  | "never"
  | { type: "date"; endDate: Date }
  | { type: "occurrences"; occurrences: number };

// Define DayOfWeek type
type DayOfWeek = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";

// Define the parameters for the function
interface RecurringOptionsParams {
  startAt: Date;
  everyNumber?: number;
  everyPeriod?: "day" | "week" | "month" | "year";
  days?: DayOfWeek[];
  end?: EndOption;
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
};

// Calculate the duration between two dates
function getDuration(startAt: Date, endAt: Date): string {
  const durationMs = endAt.getTime() - startAt.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  return `PT${hours}H${minutes}M`;
}

// Generate recurring options based on the provided parameters
function generateRecurringOptions({
  startAt,
  everyNumber,
  everyPeriod,
  days,
  end
}: RecurringOptionsParams) {
  const dayOfMonth = startAt.getDate();

  // Define the recurring options
  const options = [
    {
      label: `Does not repeat`,
      value: `no-repeat`,
    },
    {
      label: `${new RRule({ freq: RRule.DAILY, dtstart: startAt }).toText()}`,
      value: new RRule({ freq: RRule.DAILY, dtstart: startAt }).toString(),
    },
    {
      label: `${new RRule({ freq: RRule.WEEKLY, byweekday: [RRule.MO], dtstart: startAt }).toText()}`,
      value: new RRule({ freq: RRule.WEEKLY, byweekday: [RRule.MO], dtstart: startAt }).toString(),
    },
    {
      label: `${new RRule({ freq: RRule.MONTHLY, bymonthday: [dayOfMonth], dtstart: startAt }).toText()}`,
      value: new RRule({ freq: RRule.MONTHLY, bymonthday: [dayOfMonth], dtstart: startAt }).toString(),
    },
    {
      label: `${new RRule({ freq: RRule.YEARLY, bymonthday: [dayOfMonth], bymonth: [startAt.getMonth() + 1], dtstart: startAt }).toText()} `,
      value: new RRule({ freq: RRule.YEARLY, bymonthday: [dayOfMonth], bymonth: [startAt.getMonth() + 1], dtstart: startAt }).toString(),
    },
    {
      label: `${new RRule({ freq: RRule.WEEKLY, byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR], dtstart: startAt }).toText()}`,
      value: new RRule({ freq: RRule.WEEKLY, byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR], dtstart: startAt }).toString(),
    },
    {
      label: "Custom...",
      value: "custom",
    },
  ];

  // Initialize the variable for the generated option
  let generatedOption: { label: string, value: string } | null = null;

  // If everyNumber and everyPeriod are provided, generate a custom recurring option
  if (everyNumber && everyPeriod) {
    let rruleOptions: Partial<Options> = {
      interval: everyNumber,
      dtstart: startAt,
      until: undefined,
      count: undefined,
      freq: RRule[everyPeriod.toUpperCase() as keyof typeof RRule] as Frequency,
    };

    // Define the RRule options
    if (everyPeriod === "week" && days && days.length > 0) {
      const daysOfWeek = days.map(day => dayMapping[day]);
      rruleOptions.byweekday = daysOfWeek;
    }

    // Set the end option
    if (end) {
      if (end === "never") {
        rruleOptions.until = undefined;
        rruleOptions.count = undefined;
      } else if (end.type === "date") {
        rruleOptions.until = end.endDate;
        rruleOptions.count = undefined;
      } else if (end.type === "occurrences") {
        rruleOptions.until = undefined;
        rruleOptions.count = end.occurrences;
      }
    }

    // Create the RRule instance
    const rrule = new RRule(rruleOptions);

    // Generate the custom option with duration
    generatedOption = {
      label: `${rrule.toText()}`,
      value: rrule.toString(),
    };

    // Add the generated option to the options list
    options.push(generatedOption);
  }

  return {
    options,
    generatedOption,
  };
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


      const date = new Date(formData.rangeDate.from)
      const [hour,minute] = formData.rangeDate.fromTime.split(":")
      date.setHours(parseInt(hour))
      date.setSeconds(0)
      date.setMinutes(parseInt(minute))

    const { options, generatedOption } = generateRecurringOptions({
      startAt : date,
      everyNumber,
      everyPeriod,
      days,
      end
    })

    setRecurrings(options)
    setSelectedRecurring(generatedOption?.value)
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
        const date = new Date(formData.rangeDate.from)
        const [hour,minute] = formData.rangeDate.fromTime.split(":")
        date.setHours(parseInt(hour))
        date.setSeconds(0)
        date.setMinutes(parseInt(minute))

        const { options } = generateRecurringOptions({
           startAt: date
          })
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
    hookForm.setValue("recurring", selectedRecurring, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [recurrings, selectedRecurring])

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
            label="Start From"
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
