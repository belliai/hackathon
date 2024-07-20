"use client"

import React, { useEffect } from "react"
import momentTimezone from "moment-timezone"
import { useFormContext } from "react-hook-form"
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

  const { data: locations } = useLocations()

  const timeZoneOptions = momentTimezone.tz.names().map((tz) => ({
    value: tz,
    label: tz,
  }))

  const formattedLocation =
    locations?.map((locationList: any) => ({
      label: locationList.name,
      value: locationList.ID,
    })) || []

  useEffect(() => {}, [form.formState])

  return (
    <Card className="p-4 space-y-4" ref={ref}>
      <div className="grid grid-cols-4 gap-4">
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
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Combobox
          name="source_id"
          options={formattedLocation}
          label="Origin"
          info="Select the source location"
          editLink="/data-fields/airway-bills?tab=location"
        />

        <FormTextField
          name="from_date"
          form={form}
          type="date"
          label="Departure Date"
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
        <Combobox
          name="origin_timezone"
          options={timeZoneOptions}
          label="Origin Timezone"
          info="Select the timezone"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Combobox
          name="destination_id"
          options={formattedLocation}
          label="Destination"
          info="Select the source location"
          editLink="/data-fields/airway-bills?tab=location"
        />

        <FormTextField
          name="to_date"
          form={form}
          type="date"
          label="Arrival Date"
        />
        <div className="flex items-end space-x-2 p-1">
          <FormTextField
            name="arrival_h"
            form={form}
            type="stepper-number"
            min={0}
            max={12}
            label="Hours"
            
          />
          <FormTextField
            name="arrival_m"
            form={form}
            type="stepper-number"
            min={0}
            max={60}
            label="Minutes"
            
          />
          <FormTextField
            name="arrival_am_pm"
            form={form}
            type="select"
            options={[
              { label: "AM", value: "am" },
              { label: "PM", value: "pm" },
            ]}
            label="AM/PM"
            
          />
        </div>
        <Combobox
          name="destination_timezone"
          options={timeZoneOptions}
          label="Destination Timezone"
          info="Select the timezone"
        />
      </div>
    </Card>
  )
})

FlightDetailsForm.displayName = "FlightDetailsForm"

export default FlightDetailsForm
