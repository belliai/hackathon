"use client"

import React, { useEffect } from "react"
import { ListIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { useBookingTypes } from "@/lib/hooks/booking-types"
import { usePartnerCodes } from "@/lib/hooks/partner-codes"
import { usePartnerPrefixes } from "@/lib/hooks/partner-prefix"
import { useStatuses } from "@/lib/hooks/statuses"
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
import { useCommodityCodes } from "@/lib/hooks/commodity-codes"

const generateAWBNumbers = (start: number, length: number) => {
  return Array.from({ length }, (_, i) => {
    const awbNumber = start + i
    const formattedAwb = `${awbNumber.toString().slice(0, 3)}-${awbNumber
      .toString()
      .slice(3)}`
    return formattedAwb
  })
}

const BookingDetailsForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const form = useFormContext()
  const awb = generateAWBNumbers(7752000270, 20)
  const formValues = form.watch()

  const { commodity_code_id } = formValues
  const { data: partnerPrefixes } = usePartnerPrefixes()
  const { data: partnerCodes } = usePartnerCodes()
  const { data: commodityCodes } = useCommodityCodes()

  const commodity =
      commodity_code_id &&
      commodityCodes &&
      commodityCodes.find((item: any) => item.ID === commodity_code_id)

  const partnerPrefixesOptions = partnerPrefixes?.map((prefix: any) => ({
    value: prefix.ID,
    label: prefix.name,
  }))

  const partnerCodesOptions = partnerCodes?.map((code: any) => ({
    value: code.ID,
    label: code.name,
  }))

  const commodityCodeOptions = commodityCodes?.map((code: any) => ({
    value: code.ID,
    label: code.name,
  }));

  const IS_PHYSICAL_LIST = [
    {
      value: 'yes',
      label: 'Yes',
    },
    {
      value: 'no',
      label: 'No',
    }
  ]

  useEffect(() => {}, [form.formState])

  return (
    <Card className="grid grid-cols-3 gap-3 p-4" ref={ref}>
      <Combobox
          name="partner_prefix_id"
          options={partnerPrefixesOptions}
          label="Partner Prefix"
          info="Select the Partner Prefix"
          editLink="/data-fields/organizations?tab=partner-prefix"
      />
      <FormField
          control={form.control}
          name="awb"
          render={({ field }) => (
          <FormItem>
              <FormLabel tooltipId="new-orders-awb-number">AWB#</FormLabel>
              <FormControl>
              <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
              </FormControl>
              <FormMessage />
          </FormItem>
          )}
      />
      <Combobox
          name="partner_code_id"
          options={partnerCodesOptions}
          label="Partner Code"
          info="Select the Partner Code"
          editLink="/data-fields/organizations?tab=partner-code"
      />
      <Combobox
          name="is_physical"
          options={IS_PHYSICAL_LIST}
          label="Is Physical"
          info="Select is Physical"
      />
      <Combobox
          name="commodity_code_id"
          options={commodityCodeOptions}
          label="Commodity Code *"
          info="Select the Commodity Code"
          editLink="/data-fields/shipments?tab=commodity-code"
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
                  className="border-2 border-foreground/30 h-[40px]"
              />
              </FormControl>
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
                  <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
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
          name="volume_kg"
          render={({ field }) => (
          <FormItem>
              <FormLabel info="hello this is info here">Vol (KG)</FormLabel>
              <FormControl>
              <Input {...field} className="border-2 border-foreground/30 h-[40px]" />
              </FormControl>
              <FormMessage />
          </FormItem>
          )}
      />
    </Card>
  )
})

BookingDetailsForm.displayName = "BookingDetailsForm"

export default BookingDetailsForm
