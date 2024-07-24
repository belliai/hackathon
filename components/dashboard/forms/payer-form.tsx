"use client"

import React from "react"
import { useCustomers } from "@/lib/hooks/customers"
import { useLocations } from "@/lib/hooks/locations"
import { Card } from "@/components/ui/card"
import { Combobox } from "@/components/form/combobox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
import { useCurrencies } from "@/lib/hooks/currencies"

const PayerForm = React.forwardRef<HTMLDivElement, any>(
  (_, ref) => {
    const form = useFormContext()

    const formValues = form.watch()
    const { data: customers } = useCustomers()
    const { data: currencies } = useCurrencies()

    const customerOptions = customers?.data.map((customer: any) => ({
      value: customer.ID,
      label: customer.name,
    })) || []

    const currencyOptions = currencies?.map((currency: any) => ({
      value: currency.ID,
      label: currency.name,
    }));

    const selectedConsignee = formValues.consignee_id
    const getConsignee = customerOptions.find((item: { value: string }) => item.value === selectedConsignee)

    const selectedConsignor = formValues.shipper_id
    const getConsignor = customerOptions.find((item: { value: string }) => item.value === selectedConsignor)
    const formattedCustomer = [
      ...(selectedConsignor ? [getConsignor] : []),
      ...((selectedConsignee && selectedConsignee !== selectedConsignor) ? [getConsignee] : []),
      ...customerOptions.filter((item: { value: string }) => item.value !== selectedConsignee && item.value !== selectedConsignor)
    ]

    return (
      <Card className="grid grid-cols-3 gap-x-3 gap-y-2 p-4" ref={ref}>
        <Combobox
          name="bill_to_id"
          options={formattedCustomer}
          label="Bill To"
        />
        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel info="Total">Total Amount</FormLabel>
              <FormControl>
                <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Combobox
          name="currency_id"
          options={currencyOptions}
          label="Currency"
          info="Select the Currency"
          editLink="/data-fields/payments?tab=currency"
        />
      </Card>
    )
  }
)

PayerForm.displayName = "PayerForm"

export default PayerForm
