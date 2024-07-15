"use client"

import React from "react"
import { useCustomers } from "@/lib/hooks/customers"
import { useLocations } from "@/lib/hooks/locations"
import { Card } from "@/components/ui/card"
import { Combobox } from "@/components/form/combobox"

const ConsigneeForm = React.forwardRef<HTMLDivElement, any>(
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
      <Card className="grid grid-cols-3 gap-x-3 gap-y-2 p-4" ref={ref}>
        <Combobox
          name="destination_id"
          options={locationsOptions}
          label="Destination"
          info="Select the Destination location"
          editLink="/settings/data-fields?tab=location"
        />
        <Combobox
          name="consignee_id"
          options={customerOptions}
          label="Consignee"
        />
      </Card>
    )
  }
)

ConsigneeForm.displayName = "ConsigneeForm"

export default ConsigneeForm
