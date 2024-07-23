"use client"

import React from "react"
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
import { Button } from "@/components/ui/button"
import { useBookingTypes } from "@/lib/hooks/booking-types"
import { usePartnerCodes } from "@/lib/hooks/partner-codes"
import { usePartnerPrefixes } from "@/lib/hooks/partner-prefix"
import { useLocations } from "@/lib/hooks/locations"
import { useCustomers } from "@/lib/hooks/customers"
import { orderSchema } from "@/schemas/order/order"
import { getDefaults } from "@/schemas/utils"

const HAWBForm = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const { weightUnitOptions, volumeUnitOptions, handleAction, formType, setFormType } = props
    const { data: bookingTypes } = useBookingTypes()
    const { data: partnerPrefixes } = usePartnerPrefixes()
    const { data: partnerCodes } = usePartnerCodes()
    const { data: locations } = useLocations()
    const { data: customers } = useCustomers()

    const form = useFormContext()
    const initialData = getDefaults(orderSchema)
    const formValues = form.watch()

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
    }));

    const locationsOptions = locations?.map((location: any) => ({
      label: location.name,
      value: location.ID,
    }))

    const customerOptions = customers?.data.map((customer: any) => ({
      value: customer.ID,
      label: customer.name,
    }))

    const createPayload = () => {
      const generateID = `hawb-${Math.floor(1000 + Math.random() * 9000)}-${Date.now()}`
      const searchBookingType = bookingTypeOptions?.find((item: { value: string }) => item.value === formValues.hawb_form.booking_type_id)
      const searchOrigin = locationsOptions?.find((item: { value: string }) => item.value === formValues.hawb_form.origin_id)
      const searchDestination = locationsOptions?.find((item: { value: string }) => item.value === formValues.hawb_form.destination_id)
      const searchConsignor = customerOptions?.find((item: { value: string }) => item.value === formValues.hawb_form.consignor_id)
      const searchConsignee = customerOptions?.find((item: { value: string }) => item.value === formValues.hawb_form.consignee_id)
      const payload = {
        ...formValues.hawb_form,
        ...searchBookingType && { booking_type: searchBookingType.label },
        ...searchOrigin && { origin: searchOrigin.label },
        ...searchDestination && { destination: searchDestination.label },
        ...searchConsignor && { consignor: searchConsignor.label },
        ...searchConsignee && { consignee: searchConsignee.label },
        ...formType === 'create' && { id: generateID }
      }
      
      handleAction('hawb', payload)
      form.setValue('hawb_form', initialData.hawb_form)
    }

    return (
      <>
        <div className="grid grid-cols-4 gap-3">
          <Combobox
            name="hawb_form.booking_type_id"
            options={bookingTypeOptions}
            label="Booking Type"
            info="Select the booking type"
            editLink="/data-fields/airway-bills?tab=booking-type"
            additionalColumn={['name']}
            tooltipId="description"
          />
          <Combobox
            name="hawb_form.partner_prefix_id"
            options={partnerPrefixesOptions}
            label="Airline AWB Prefix"
            info="Select the Airline AWB Prefix"
            editLink="/data-fields/organizations?tab=airline-awb-prefix"
          />
          <FormField
            control={form.control}
            name="hawb_form.awb"
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
            name="hawb_form.partner_code_id"
            options={partnerCodesOptions}
            label="IATA Airline Code"
            info="Select the IATA Airline Code"
            editLink="/data-fields/organizations?tab=iata-airline-code"
            additionalColumn={['description']}
            tooltipId="description"
          />
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Combobox
            name="hawb_form.origin_id"
            options={locationsOptions}
            label="Origin"
            info="Select the origin location"
            editLink="/data-fields/airway-bills?tab=location"
          />
          <Combobox
            name="hawb_form.destination_id"
            options={locationsOptions}
            label="Destination"
            info="Select the Destination location"
            editLink="/data-fields/airway-bills?tab=location"
          />
          <Combobox
            name="hawb_form.consignor_id"
            options={customerOptions}
            label="Consignor (Sender)"
          />
          
          <Combobox
            name="hawb_form.consignee_id"
            options={customerOptions}
            label="Consignee (Receiver)"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="hawb_form.weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel info="hellow world!, this is info">
                  Weight
                  </FormLabel>
                  <FormControl>
                  <Input
                      defaultValue={formValues.weight}
                      {...field}
                      className="border-2 border-foreground/30 h-[40px]"
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Combobox
              name="hawb_form.weight_unit"
              options={weightUnitOptions}
              label="Unit"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="hawb_form.volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel info="hellow world!, this is info">
                    Volume
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={formValues.volume}
                      {...field}
                      className="border-2 border-foreground/30 h-[40px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Combobox
              name="hawb_form.volume_unit"
              options={volumeUnitOptions}
              label="Unit"
            />
          </div>

          <div className="flex gap-2 justify-end items-end">
            {formType === 'edit' && (
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => {
                  form.setValue('hawb_form', initialData.hawb_form)
                  setFormType('create')
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              type="button"
              variant={"button-primary"}
              onClick={() => { createPayload() }}
            >
              {formType === 'create' ? 'Add New' : 'Save'}
            </Button>
          </div>
        </div>
      </>
    )
  }
)

HAWBForm.displayName = "HAWBForm"

export default HAWBForm
