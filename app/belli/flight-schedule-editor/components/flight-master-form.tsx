"use client"

import { useCallback, useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"

import { useAircraftManufacturers } from "@/lib/hooks/aircrafts/aircraft-type/manufacturers"
import { useAircraftTypes as useAircraftManufacturerType } from "@/lib/hooks/aircrafts/aircraft-type/types"
import { useAircraftVersions } from "@/lib/hooks/aircrafts/aircraft-type/versions"
import { useAircraftTypes } from "@/lib/hooks/aircrafts/aircraft-types"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
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
import { Combobox } from "@/components/form/combobox"
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

export default function FlightMasterForm({ hookForm }: FlightMasterFormType) {
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
  const { data: aircraftsList } = useAircrafts({ page: 1, page_size: 999 })

  const { data: manufacturers } = useAircraftManufacturers()
  const { data: types } = useAircraftManufacturerType()
  const { data: versions } = useAircraftVersions()

  const getAircraftTypeLabel = useCallback(
    (data: Aircraft) => {
      const manufacturer = manufacturers?.find(
        (item) => item.ID === data.manufacturer
      )?.name
      const type = types?.find((item) => item.ID === data.aircraft_type)?.name
      const version = versions?.find((item) => item.ID === data.version)?.name
      if (!manufacturer || !type || !version) return "Deleted"
      return [manufacturer, type, version].join(" ")
    },
    [manufacturers, types, versions]
  )

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

  const aircraftTypeOptions = aircraftsList?.data.map((list) => ({
    value: list.ID,
    label: getAircraftTypeLabel(list),
  }))

  const selectedAircraftType = aircraftsList?.data.find(
    (item) => item.ID === formData.aircraftType
  )

  const tailNumberOptions = selectedAircraftType?.aircraft_tail_numbers.map(
    (list) => ({
      value: String(list.ID),
      label: list.tail_number,
    })
  )

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
          <Combobox
            name="source"
            options={formattedLocation}
            label="Source"
            info="Select the source location"
            editLink="/settings/data-fields?tab=location"
          />
          <Combobox
            name="destination"
            options={formattedLocation}
            label="Destination"
            info="Select the destination location"
            editLink="/settings/data-fields?tab=location"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormTextField
            name="fromDate"
            form={hookForm}
            type="date"
            label="From Date"
          />
          <FormTextField
            name="toDate"
            form={hookForm}
            type="date"
            label="To Date"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <FormLabel className="text-sm">Dept Time (D H M)</FormLabel>
            <div className="grid grid-cols-3 gap-1">
              <FormTextField
                name="deptTime.deptDay"
                form={hookForm}
                type="number"
                label=""
              />
              <FormTextField
                name="deptTime.deptHour"
                form={hookForm}
                type="number"
                label=""
                hideErrorMessage
              />
              <FormTextField
                name="deptTime.deptMinute"
                form={hookForm}
                type="number"
                label=""
                hideErrorMessage
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel className="text-sm">Arrival Time (D H M)</FormLabel>
            <div className="grid grid-cols-3 gap-1">
              <FormTextField
                name="arrivalTime.arrivalDay"
                form={hookForm}
                type="number"
                label=""
              />
              <FormTextField
                name="arrivalTime.arrivalHour"
                form={hookForm}
                type="number"
                label=""
                hideErrorMessage
              />
              <FormTextField
                name="arrivalTime.arrivalMinute"
                form={hookForm}
                type="number"
                label=""
                hideErrorMessage
              />
            </div>
          </div>
        </div>
        <div className="my-2 flex flex-col gap-2">
          <FormField
            control={hookForm.control}
            name="frequencyItems"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm">Frequency</FormLabel>
                <div className="flex w-full gap-3 space-y-0">
                  {frequencyItems.map((item) => (
                    <FormField
                      key={item.id}
                      control={hookForm.control}
                      name="frequencyItems"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start gap-1 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage className="top-10 text-[10px]" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <FormTextField
            form={hookForm}
            name="aircraftType"
            label="Aircraft Type"
            type="select"
            options={aircraftTypeOptions ?? []}
          />
          <FormTextField
            form={hookForm}
            name="tailNo"
            label="Tail No"
            type="select"
            options={tailNumberOptions}
          />
          <FormTextField
            name="capacity"
            form={hookForm}
            type="number"
            label="Capacity"
          />
          <FormTextField
            form={hookForm}
            name="uom"
            label="UOM"
            type="select"
            options={weightUnitsOptions}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <FormTextField
            form={hookForm}
            name="sector"
            label="Sector"
            type="select"
            options={flightSectorOptions}
          />
          <FormTextField
            form={hookForm}
            name="status"
            label="Status"
            type="select"
            options={flightStatusOptions}
          />
          <FormTextField
            form={hookForm}
            name="flightType"
            label="Flight Type"
            type="select"
            options={flightTypeOptions}
          />
        </div>
      </Form>
    </div>
  )
}
