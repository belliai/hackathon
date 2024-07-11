"use client"

import React, { ForwardedRef, useEffect } from "react"
import { Order } from "@/schemas/order/order"
import { RotateCcwIcon, SearchIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { fetchTooltips } from "@/lib/contentful"
import { useBookingTypes } from "@/lib/hooks/booking-types"
import { usePartnerCodes } from "@/lib/hooks/partner-codes"
import { usePartnerPrefixes } from "@/lib/hooks/partner-prefix"
import { useStatuses } from "@/lib/hooks/statuses"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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

const generateAWBNumbers = (start: number, length: number) => {
  return Array.from({ length }, (_, i) => {
    const awbNumber = start + i
    const formattedAwb = `${awbNumber.toString().slice(0, 3)}-${awbNumber
      .toString()
      .slice(3)}`
    return formattedAwb
  })
}

const CreateBookingForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const form = useFormContext()
  const awb = generateAWBNumbers(7752000270, 20)
  const { data: bookingTypes } = useBookingTypes()
  const { data: partnerPrefixes } = usePartnerPrefixes()
  const { data: partnerCodes } = usePartnerCodes()
  const { data: statuses } = useStatuses()

  const bookingTypeOptions = bookingTypes?.map((type: any) => ({
    value: type.ID,
    label: type.name,
  }))

  const partnerPrefixesOptions = partnerPrefixes?.map((prefix: any) => ({
    value: prefix.ID,
    label: prefix.name,
  }))

  const partnerCodesOptions = partnerCodes?.map((code: any) => ({
    value: code.ID,
    label: code.name,
  }))

  const statusOptions = statuses?.map((status: any) => ({
    value: status.ID,
    label: status.name,
  }))

  useEffect(() => {}, [form.formState])

  return (
    <Card className="space-y-2 p-4" ref={ref}>
      <div className="grid grid-cols-4 gap-2">
        <Combobox
          name="booking_type_id"
          options={bookingTypeOptions}
          label="Booking Type"
          info="Select the Booking Type"
          editLink="/settings/data-fields?tab=booking-type"
        />
        <Combobox
          name="partner_prefix_id"
          options={partnerPrefixesOptions}
          label="Partner Prefix"
          info="Select the Partner Prefix"
          editLink="/settings/data-fields?tab=partner-prefix"
        />
        <FormField
          control={form.control}
          name="awb"
          render={({ field }) => (
            <FormItem>
              <FormLabel tooltipId="new-orders-awb-number">AWB#</FormLabel>
              <FormControl>
                <Input {...field} className="border-2 border-foreground/30" />
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
          editLink="/settings/data-fields?tab=partner-code"
        />
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <FormField
          control={form.control}
          name="is_physical"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Is Physical</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="inline-flex gap-2">
          <Button type="button" size={"icon"} variant={"button-secondary"}>
            <SearchIcon className="size-4" />
          </Button>
          <Button type="button" size={"icon"} variant={"button-secondary"}>
            <RotateCcwIcon className="size-4" />
          </Button>
        </div>
      </div>
      <Combobox
        name="status_id"
        options={statusOptions}
        label="Status"
        info="Select the Status"
        editLink="/settings/data-fields?tab=status"
      />
    </Card>
  )
})

CreateBookingForm.displayName = "CreateBookingForm"

export default CreateBookingForm
