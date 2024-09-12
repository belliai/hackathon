"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"

import { Location } from "@/types/flight-master/flight-master"
import { useBookingTypes } from "@/lib/hooks/booking-types"
import { useCommodityCodes } from "@/lib/hooks/commodity-codes"
import { useLocations, useLocationSearch } from "@/lib/hooks/locations"
import { useOrders } from "@/lib/hooks/orders"
import { usePartnerCodes } from "@/lib/hooks/partner-codes"
import { usePartnerPrefixes } from "@/lib/hooks/partner-prefix"
import { ObjectSet } from "@/lib/utils/array-utils"
import { Card } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox, ComboboxOption } from "@/components/form/combobox"
import AsyncSearchComboBox from "@/components/form/combobox-async"

const generateAWBNumbers = (start: number, length: number) => {
  return Array.from({ length }, (_, i) => {
    const awbNumber = start + i
    const formattedAwb = `${awbNumber.toString().slice(0, 3)}-${awbNumber
      .toString()
      .slice(3)}`
    return formattedAwb
  })
}

interface BookingDetailsFormProps extends React.HTMLAttributes<HTMLDivElement> {
  initialLocations?: Location[]
}

const BookingDetailsForm = React.forwardRef<
  HTMLDivElement,
  BookingDetailsFormProps
>(({ initialLocations }, ref) => {
  const form = useFormContext()
  const awb = generateAWBNumbers(7752000270, 20)
  const formValues = form.watch()

  const { data: partnerPrefixes } = usePartnerPrefixes()
  const { data: partnerCodes } = usePartnerCodes()
  const { data: bookingTypes } = useBookingTypes()
  const { data: commodityCodes } = useCommodityCodes()
  const { data: locations } = useLocations()
  const { data: ordersData } = useOrders({
    page: 1,
    page_size: 99,
  })

  const [searchTerm, setSearchTerm] = useState("")

  const [allLocations, setAllLocations] = useState<Location[]>(
    initialLocations ?? []
  )

  const { data: locationsSearch } = useLocationSearch({ searchTerm })

  useEffect(() => {
    if (!locationsSearch?.data) return

    const objectSet = new ObjectSet<Location>("ID")
    setAllLocations((prev) => {
      objectSet.addAll([...prev, ...locationsSearch.data])
      return objectSet.getItems()
    })
  }, [locationsSearch])

  const formattedLocation: ComboboxOption[] = useMemo(() => {
    return (
      allLocations.map((location) => {
        const timezone = location.timezone
        const cityName = timezone ? timezone.name.split(" - ").pop() : ""

        const label = timezone ? (
          <p>
            {location.airport_code}{" "}
            <span className="text-xs text-zinc-500">
              (GMT {timezone.offset}, {cityName})
            </span>
          </p>
        ) : (
          location.airport_code
        )

        return {
          component: label,
          label: location.name,
          value: location.ID,
        }
      }) || []
    )
  }, [allLocations])

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
  }))

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
          .flatMap((item) => item.object)
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
    <Card className="flex animate-fade-left flex-col gap-3 p-4" ref={ref}>
      <div className="grid grid-cols-3 gap-3">
        {!(
          bookingTypeOptions.length === 2 &&
          (bookingTypeOptions.some(
            (option) => option.label.toLowerCase() === "hawb"
          ) ||
            bookingTypeOptions.some(
              (option) => option.label.toLowerCase() === "mawb"
            ))
        ) && (
          <Combobox
            name="booking_type_id"
            options={bookingTypeOptions}
            label="Booking Type"
            info="Select the booking type"
            editLink="/data-fields/airway-bills?tab=booking-type"
            additionalColumn={["name"]}
            tooltipId="description"
          />
        )}
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
        <AsyncSearchComboBox
          name="origin_id"
          options={formattedLocation}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search origin by airport code"
          label="Origin"
          info="Select the origin location"
        />
        <AsyncSearchComboBox
          name="destination_id"
          options={formattedLocation}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search origin by airport code"
          label="Destination"
          info="Select the origin location"
        />
      </div>
    </Card>
  )
})

BookingDetailsForm.displayName = "BookingDetailsForm"

export default BookingDetailsForm
