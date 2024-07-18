"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"

import { useAircraftTypes } from "@/lib/hooks/aircrafts/aircraft-type/types"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import { Card } from "@/components/ui/card"
import { Combobox } from "@/components/form/combobox"
import FormTextField from "@/components/form/FormTextField"

const AircraftForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const form = useFormContext()
  const formData = form.watch()

  const { data: aircraftTypeList } = useAircraftTypes()
  const { data: aircraftsList } = useAircrafts({ page: 1, page_size: 999 })

  const aircraftTypeOptions = aircraftTypeList?.map((list) => ({
    value: String(list.id),
    label: list.name,
  }))

  const selectedAircraftType = aircraftsList?.data.find(
    (item) => item.id === formData.aircraftType
  )

  const tailNumberOptions = selectedAircraftType?.aircraft_tail_numbers.map(
    (list) => ({
      value: String(list.id),
      label: list.tail_number,
    })
  )

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
        <div className="col-span-2">
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
