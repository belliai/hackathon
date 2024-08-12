"use client"

import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"

import { useBookingTypes } from "@/lib/hooks/booking-types"
import { useOrders } from "@/lib/hooks/orders"
import { usePartnerCodes } from "@/lib/hooks/partner-codes"
import { usePartnerPrefixes } from "@/lib/hooks/partner-prefix"
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
import { useLocations } from "@/lib/hooks/locations"

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

  const { data: partnerPrefixes } = usePartnerPrefixes()
  const { data: partnerCodes } = usePartnerCodes()
  const { data: bookingTypes } = useBookingTypes()
  const { data: commodityCodes } = useCommodityCodes()
  const { data: locations } = useLocations()
  const { data: ordersData } = useOrders({
    pagination: { pageIndex: 0, pageSize: 20 },
  })

  const partnerPrefixesOptions = partnerPrefixes?.map((prefix: any) => ({
    value: prefix.ID,
    label: prefix.name,
  }))

  const partnerCodesOptions = partnerCodes?.map((code: any) => ({
    value: code.ID,
    label: code.name,
    description: code.description,
  }))

  const bookingTypeOptions = bookingTypes?.map((code: any) => ({
    value: code.ID,
    label: `${code.name}`,
    name: code.booking_type,
    description: code.description,
  }))

  const commodityCodeOptions = commodityCodes?.map((code: any) => ({
    value: code.ID,
    label: `${code.name}: ${code.description}`,
  }));

  const selectedBookingType = bookingTypeOptions.find(
    (bookingType) => bookingType.value === formValues.booking_type_id
  )

  const locationsOptions = locations?.map((location: any) => ({
    label: location.name,
    value: location.ID,
  }))

  const awbList =
    selectedBookingType?.label.toLowerCase() === "hawb"
      ? ordersData?.data
          .filter(
            (order: any) => order.booking_type?.name.toLowerCase() === "mawb"
          )
          .map((orderData: any) => ({
            value: orderData.ID,
            label: orderData.awb,
          }))
      : []

  const IS_PHYSICAL_LIST = [
    {
      value: "yes",
      label: "Yes",
    },
    {
      value: "no",
      label: "No",
    },
  ]

  useEffect(() => {}, [form.formState])

  return (
    <Card className="flex flex-col gap-3 p-4" ref={ref}>
      <div className="grid grid-cols-3 gap-3">
        <Combobox
          name="booking_type_id"
          options={bookingTypeOptions}
          label="Booking Type"
          info="Select the booking type"
          editLink="/data-fields/airway-bills?tab=booking-type"
          additionalColumn={["name"]}
          tooltipId="description"
        />
        {selectedBookingType?.label.toLowerCase() === "hawb" && (
          <Combobox
            name="mawb"
            options={awbList}
            label="Master Airway Bill"
            info="Select the MAWB"
          />
        )}
        <Combobox
          name="commodity_code_id"
          options={commodityCodeOptions}
          label="Commodity Code"
          info="Select the Commodity Code"
          editLink="/data-fields/airway-bills?tab=commodity-code"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Combobox
          name="partner_prefix_id"
          options={partnerPrefixesOptions}
          label="Airline AWB Prefix"
          info="Select the Airline AWB Prefix"
          editLink="/data-fields/organizations?tab=airline-awb-prefix"
        />
        <FormField
          control={form.control}
          name="awb"
          render={({ field }) => (
            <FormItem>
              <FormLabel tooltipId="new-orders-awb-number">AWB#</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-[40px] border-2 border-foreground/30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Combobox
          name="partner_code_id"
          options={partnerCodesOptions}
          label="IATA Airline Code"
          info="Select the IATA Airline Code"
          editLink="/data-fields/organizations?tab=iata-airline-code"
          additionalColumn={["description"]}
          tooltipId="description"
        />
        <Combobox
          name="origin_id"
          options={locationsOptions}
          label="Origin"
          info="Select the origin location"
          editLink="/data-fields/airway-bills?tab=location"
        />
        <Combobox
          name="destination_id"
          options={locationsOptions}
          label="Destination"
          info="Select the Destination location"
          editLink="/data-fields/airway-bills?tab=location"
        />
      </div>
    </Card>
  )
})

BookingDetailsForm.displayName = "BookingDetailsForm"

export default BookingDetailsForm
