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

    return (
      <Card className="grid grid-cols-2 gap-x-3 gap-y-2 p-4" ref={ref}>
        <Combobox
          name="origin_id"
          options={locationsOptions}
          label="Origin"
          info="Select the origin location"
          editLink="/locations"
        />
        <FormField
          control={form.control}
          name="destination_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Destination
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations &&
                    locations.map((location: any) => (
                      <SelectItem value={location.ID} key={location.ID}>
                        {location.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commodity_code_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Commodity Code *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {commodityCodes &&
                    commodityCodes.map((commodityCode: any) => (
                      <SelectItem
                        value={commodityCode.ID}
                        key={commodityCode.ID}
                      >
                        {commodityCode.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
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
        <FormField
          control={form.control}
          name="payment_mode_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Payment Mode
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentModes &&
                    paymentModes.map((paymentMode: any) => (
                      <SelectItem value={paymentMode.ID} key={paymentMode.ID}>
                        {paymentMode.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bill_to_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">Bill To</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers &&
                    customers.data.map((customer: any) => (
                      <SelectItem value={customer.ID} key={customer.ID}>
                        {customer.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
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
        <FormField
          control={form.control}
          name="shipper_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">Shipper</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers &&
                    customers.data.map((customer: any) => (
                      <SelectItem value={customer.ID} key={customer.ID}>
                        {customer.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consignee_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Consignee
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers &&
                    customers.data.map((customer: any) => (
                      <SelectItem value={customer.ID} key={customer.ID}>
                        {customer.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="Customer">Customer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers &&
                    customers.data.map((customer: any) => (
                      <SelectItem value={customer.ID} key={customer.ID}>
                        {customer.code}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
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
        <FormField
          control={form.control}
          name="pieces"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="booking type info here">Pieces</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="origin-1">Origin Type 1</SelectItem>
                  <SelectItem value="origin-2">Origin Type 2</SelectItem>
                  <SelectItem value="origin-3">Origin Type 3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
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
        <FormField
          control={form.control}
          name="freight_forwarder_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Freight Forwarder
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers &&
                    customers.data.map((customer: any) => (
                      <SelectItem value={customer.ID} key={customer.ID}>
                        {customer.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="Organization">Organization</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers &&
                    customers.data.map((customer: any) => (
                      <SelectItem value={customer.ID} key={customer.ID}>
                        {customer.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>
    )
  }
)

ConsignmentDetailsForm.displayName = "ConsignmentDetailsForm"

export default ConsignmentDetailsForm
