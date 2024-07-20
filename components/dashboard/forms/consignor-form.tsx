"use client"

import React from "react"
import { useFormContext } from "react-hook-form"

import { useCustomers } from "@/lib/hooks/customers"
import { useLocations } from "@/lib/hooks/locations"
import { Card } from "@/components/ui/card"
import { Combobox } from "@/components/form/combobox"

const ConsignorForm = React.forwardRef<HTMLDivElement, any>(
  (_, ref) => {
    const { data: locations } = useLocations()
    const { data: customers } = useCustomers()

    const locationsOptions = locations?.map((location: any) => ({
      label: location.name,
      value: location.ID,
    }))

    const customerOptions = customers?.data.map((customer: any) => ({
      value: customer.ID,
      label: customer.name,
    }))

    return (
      <Card className="grid grid-cols-3 gap-3 p-4" ref={ref}>
        <Combobox
          name="origin_id"
          options={locationsOptions}
          label="Origin"
          info="Select the origin location"
          editLink="/data-fields/airway-bills?tab=location"
        />
        <Combobox
          name="shipper_id"
          options={customerOptions}
          label="Shipper"
        />
      </Card>
    )
  }
)

ConsignorForm.displayName = "ConsignorForm"

export default ConsignorForm
