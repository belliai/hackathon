"use client"

import React from "react"
import { Customer } from "@/schemas/customer"
import { useFormContext } from "react-hook-form"

import { useCustomers } from "@/lib/hooks/customers"
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
import { useCurrencies } from "@/lib/hooks/currencies"

const PaymentForm = React.forwardRef<HTMLDivElement, any>(
  (_, ref) => {
    const form = useFormContext()

    const formValues = form.watch()

    const { customer_id, bill_to_id } = formValues

    const { data: customers } = useCustomers()
    const { data: currencies } = useCurrencies()

    const customer =
      customer_id &&
      customers &&
      customers.data.find((item: Customer) => item.ID === customer_id)
    const bill =
      bill_to_id &&
      customers &&
      customers.data.find((item: any) => item.ID === bill_to_id)

    const customerOptions = customers?.data.map((customer: any) => ({
      value: customer.ID,
      label: customer.name,
    }))

    const customerCodeOptions = customers?.data.map((customer: any) => ({
      value: customer.ID,
      label: customer.code,
    }))

    const currencyOptions = currencies?.map((currency: any) => ({
      value: currency.ID,
      label: currency.name,
    }));

    return (
      <Card className="grid grid-cols-1 gap-x-3 gap-y-2 p-4" ref={ref}>
        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          <Combobox
            name="bill_to_id"
            options={customerOptions}
            label="Bill To"
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
                    className="border-2 border-foreground/30 h-[40px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
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
        </div>

        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          <Combobox
            name="partner_prefix_id"
            options={currencyOptions}
            label="Currency"
            info="Select the Currency"
            editLink="/settings/data-fields?tab=currency"
          />
        </div>

        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel info="hello this is info here">Rate</FormLabel>
                <FormControl>
                  <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="s_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel info="hello this is info here">S Rate</FormLabel>
                <FormControl>
                  <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="s_freight"
            render={({ field }) => (
              <FormItem>
                <FormLabel info="hello this is info here">S Freight</FormLabel>
                <FormControl>
                  <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          <FormField
            control={form.control}
            name="spot_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel info="hello this is info here">Spot ID</FormLabel>
                <FormControl>
                  <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
                </FormControl>
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
                  Gross Weight (Kg)
                </FormLabel>
                <FormControl>
                  <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ch_weight_kg"
            render={({ field }) => (
              <FormItem>
                <FormLabel info="hello this is info here">Chargeable Weight (Kg)</FormLabel>
                <FormControl>
                  <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          <FormField
            control={form.control}
            name="amount_due"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel info="hellow world!, this is info">
                  Amount Due
                </FormLabel>
                <FormControl>
                  <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel info="Mode">Mode</FormLabel>
                <FormControl>
                  <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel info="Total">Total</FormLabel>
                <FormControl>
                  <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>
    )
  }
)

PaymentForm.displayName = "PaymentForm"

export default PaymentForm
