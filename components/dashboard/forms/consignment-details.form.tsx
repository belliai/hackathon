"use client"

import React, { useEffect } from "react"
import { Customer } from "@/schemas/customer"
import { ListIcon, SearchIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { useCommodityCodes } from "@/lib/hooks/commodity-codes"
import { useCustomers } from "@/lib/hooks/customers"
import { useLocations } from "@/lib/hooks/locations"
import { usePaymentModes } from "@/lib/hooks/payment-modes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Combobox } from "@/components/form/combobox"

const ConsignmentDetailsForm = React.forwardRef<HTMLDivElement, any>(
  (_, ref) => {
    const form = useFormContext()

    const formValues = form.watch()

    const { commodity_code_id, customer_id, bill_to_id } = formValues

    const { data: paymentModes } = usePaymentModes()
    const { data: locations } = useLocations()
    const { data: commodityCodes } = useCommodityCodes()
    const { data: customers } = useCustomers()

    const commodity =
      commodity_code_id &&
      commodityCodes &&
      commodityCodes.find((item: any) => item.ID === commodity_code_id)
    const customer =
      customer_id &&
      customers &&
      customers.data.find((item: Customer) => item.ID === customer_id)
    const bill =
      bill_to_id &&
      customers &&
      customers.data.find((item: any) => item.ID === bill_to_id)

    const locationsOptions = locations?.map((location: any) => ({
      label: location.name,
      value: location.ID,
    }))

    const commodityCodeOptions = commodityCodes?.map((code: any) => ({
      value: code.ID,
      label: code.name,
    }));

    const paymentOptions = paymentModes?.map((mode: any) => ({
      value: mode.ID, 
      label: mode.name, 
    }))

    const customerOptions = customers?.data.map((customer: any) => ({
      value: customer.ID,
      label: customer.name,
    }))

    const customerCodeOptions = customers?.data.map((customer: any) => ({
      value: customer.ID,
      label: customer.code,
    }))


    return (
      <Card className="grid grid-cols-3 gap-x-3 gap-y-2 p-4" ref={ref}>
        <Combobox
          name="origin_id"
          options={locationsOptions}
          label="Origin"
          info="Select the origin location"
          editLink="/settings/data-fields?tab=location"
        />
        <Combobox
          name="destination_id"
          options={locationsOptions}
          label="Destination"
          info="Select the Destination location"
          editLink="/settings/data-fields?tab=location"
        />
        <Combobox
          name="commodity_code_id"
          options={commodityCodeOptions}
          label="Commodity Code *"
          info="Select the Commodity Code"
          editLink="/settings/data-fields?tab=commodity-code"
        />
        <FormField
          control={form.control}
          name="commodity_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Commodity Description
              </FormLabel>
              <FormControl>
                <Input
                  readOnly
                  defaultValue={commodity && commodity.description}
                  {...field}
                  className="border-2 border-foreground/30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Combobox
          name="payment_mode_id"
          options={paymentOptions}
          label="Payment Mode"
          info="Select the Payment Mode"
          editLink="/settings/data-fields?tab=payment-mode"
        />
        <Combobox
          name="bill_to_id"
          options={customerOptions}
          label="Bill To"
        />
        <FormField
          name={`bill_to_old_name`}
          render={({ field }) => (
            <FormItem className="hidden">
              <Input
                type="hidden"
                {...field}
                defaultValue={bill && bill.name}
                className="border-2 border-foreground/30"
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bill_to_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Bill To Name
              </FormLabel>
              <FormControl>
                <Input
                  defaultValue={bill && bill.name}
                  {...field}
                  className="border-2 border-foreground/30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Combobox
          name="shipper_id"
          options={customerOptions}
          label="Shipper"
        />
        <Combobox
          name="consignee_id"
          options={customerOptions}
          label="Consignee"
        />
        <Combobox
          name="customer_id"
          options={customerCodeOptions}
          label="Customer"
        />
        <FormField
          control={form.control}
          name="customer_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="booking type info here">Customer Name</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  defaultValue={customer && customer.name}
                  {...field}
                  className="border-2 border-foreground/30"
                />
              </FormControl>
              <FormMessage />
              <FormMessage />
            </FormItem>
          )}
        />
        <Combobox
          name="pieces"
          options={[
            { label: "Origin Type 1", value: "origin-1" },
            { label: "Origin Type 2", value: "origin-2" },
            { label: "Origin Type 3", value: "origin-3" }
          ]}
          label="Pieces"
        />
        <FormField
          control={form.control}
          name="gs_weight_kg"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Gross Weight (Kg) *
              </FormLabel>
              <FormControl>
                <div className="relative h-fit">
                  <Input {...field} className="border-2 border-foreground/30" />
                  <div className="absolute right-0 top-0 inline-flex h-full items-center justify-center px-3">
                    <ListIcon className="h-3 w-3" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Combobox
          name="freight_forwarder_id"
          options={customerOptions}
          label="Freight Forwarder"
        />
        <Combobox
          name="organizaiton_id"
          options={customerOptions}
          label="Organization"
        />
      </Card>
    )
  }
)

ConsignmentDetailsForm.displayName = "ConsignmentDetailsForm"

export default ConsignmentDetailsForm
