"use client"

import React from "react"
import { useCustomers } from "@/lib/hooks/customers"
import { Card } from "@/components/ui/card"
import { Combobox } from "@/components/form/combobox"

const FreightForwarderForm = React.forwardRef<HTMLDivElement, any>(
  (_, ref) => {
    const { data: customers } = useCustomers()

    const customerOptions = customers?.data.map((customer: any) => ({
      value: customer.ID,
      label: customer.name,
    }))

    return (
      <Card className="grid grid-cols-3 gap-x-3 gap-y-2 p-4" ref={ref}>
        <Combobox
          name="freight_forwarder_id"
          options={customerOptions}
          label="Freight Forwarder"
        />
        <Combobox
          name="organization_id"
          options={customerOptions}
          label="Organization"
        />
      </Card>
    )
  }
)

FreightForwarderForm.displayName = "FreightForwarderForm"

export default FreightForwarderForm
