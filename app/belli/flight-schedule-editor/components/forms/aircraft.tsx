"use client"

import React from "react"
import { useFormContext } from "react-hook-form"

import { Aircraft } from "@/types/aircraft/aircraft"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { Card } from "@/components/ui/card"
import { Combobox } from "@/components/form/combobox"

const AircraftForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const form = useFormContext()
  const formData = form.watch()

  const { data: aircraftsList } = useAircrafts({ page: 1, page_size: 999 })

  const aircraftTypeOptions = aircraftsList?.data.map((list) => ({
    value: String(list.id),
    label: list.aircraft_type.name,
  }))

  const defaultValuesDropdown = { label: "Unassigned", value: "" }

  const selectedAircraftType = aircraftsList?.data.find(
    (item) => item.id === formData.aircraft_type
  )

  const generateTailName = (selectedAircraftType: Aircraft, tail: string) => {
    return `${selectedAircraftType?.aircraft_type.name}-${tail} ( ${selectedAircraftType?.mtow} MTOW - ${selectedAircraftType?.landing_weight} Landing Weight - ${selectedAircraftType?.cargo_capacity} Cargo Capacity )`
  }

  const tailNumberOptions = selectedAircraftType?.aircraft_tail_numbers.map(
    (list) => ({
      value: String(list.id),
      label: generateTailName(selectedAircraftType, list.tail_number),
    })
  )

  aircraftTypeOptions?.unshift(defaultValuesDropdown)
  tailNumberOptions?.unshift(defaultValuesDropdown)

  return (
    <Card className="space-y-4 p-4" ref={ref}>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <Combobox
            name="aircraft_type"
            label="Aircraft Type"
            info="Select Aircraft type"
            options={aircraftTypeOptions}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <Combobox
            name="tail_no"
            label="Tail Number"
            info="Select Tail number"
            options={tailNumberOptions}
          />
        </div>
      </div>
    </Card>
  )
})

AircraftForm.displayName = "AircraftForm"

export default AircraftForm
