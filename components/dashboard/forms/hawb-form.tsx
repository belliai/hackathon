"use client"

import React, { useEffect } from "react"
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
import { useBookingTypes } from "@/lib/hooks/booking-types"
import { usePartnerCodes } from "@/lib/hooks/partner-codes"
import { usePartnerPrefixes } from "@/lib/hooks/partner-prefix"
import { useLocations } from "@/lib/hooks/locations"
import { useCustomers } from "@/lib/hooks/customers"
import { EqualIcon } from "lucide-react"

const HAWBForm = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const { weightUnitOptions, volumeUnitOptions, handleAction, formType, setFormType } = props
    const { data: bookingTypes } = useBookingTypes()
    const { data: partnerPrefixes } = usePartnerPrefixes()
    const { data: partnerCodes } = usePartnerCodes()
    const { data: locations } = useLocations()
    const { data: customers } = useCustomers()

    const form = useFormContext()
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

    useEffect(() => {
      const qty = parseFloat(formValues.hawb_form?.qty || 0);
      const width = parseFloat(formValues.hawb_form?.width || 0);
      const height = parseFloat(formValues.hawb_form?.height || 0);
      const length = parseFloat(formValues.hawb_form?.length || 0);
      
      const totalVolume = (qty * width * height * length) / 6000;

      form.setValue('hawb_form.volume', Math.round(totalVolume).toString())

      const volume = parseFloat(formValues.hawb_form?.volume || 0);
      const subtotal = volume / 166.6;

      form.setValue('hawb_form.subtotal', subtotal.toFixed(2));

      const total = width + height + length;
      let skid = 0;
      if (total > 300) {
        const subtotal = parseFloat(formValues.hawb_form?.subtotal || 0)
        skid = (subtotal * 1.3) - subtotal
      }

      form.setValue('hawb_form.skid', Math.ceil(skid))
    }, [formValues.hawb_form.qty, formValues.hawb_form.weight, formValues.hawb_form.width, formValues.hawb_form.length, formValues.hawb_form.height, formValues.hawb_form.volume, formValues.hawb_form.subtotal])


    return (
      <div className="grid grid-cols-1 gap-3">
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

        <div className="grid grid-cols-1 gap-3">
          <div className="flex gap-3">
            <div className="grow grid grid-cols-5 gap-3">
              <FormField
                control={form.control}
                name="hawb_form.qty"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel info="hellow world!, this is info">
                        Qty
                      </FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={formValues.hawb_form.qty}
                          {...field}
                          className="border-2 border-foreground/30 h-[40px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
              />

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
                        defaultValue={formValues.hawb_form.weight}
                        {...field}
                        className="border-2 border-foreground/30 h-[40px]"
                        type="number"
                      />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hawb_form.width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel info="hellow world!, this is info">
                      Width
                    </FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={formValues.hawb_form.width}
                        {...field}
                        className="border-2 border-foreground/30 h-[40px]"
                        type="number"
                      />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hawb_form.length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel info="hellow world!, this is info">
                      Length
                    </FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={formValues.hawb_form.length}
                        {...field}
                        className="border-2 border-foreground/30 h-[40px]"
                        type="number"
                      />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hawb_form.height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel info="hellow world!, this is info">
                      Height
                    </FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={formValues.hawb_form.height}
                        {...field}
                        className="border-2 border-foreground/30 h-[40px]"
                        type="number"
                      />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-10 grow-0">
                <EqualIcon className="size-4" />
            </div>

            <div className="grid grid-cols-3 gap-3">
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
                          defaultValue={formValues.hawb_form.volume}
                          {...field}
                          className="border-2 border-foreground/30 h-[40px]"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hawb_form.subtotal"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel info="hellow world!, this is info">
                        Subtotal
                      </FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={formValues.hawb_form.subtotal}
                          {...field}
                          className="border-2 border-foreground/30 h-[40px]"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hawb_form.skid"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel info="hellow world!, this is info">
                        Skid
                      </FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={formValues.hawb_form.skid}
                          {...field}
                          className="border-2 border-foreground/30 h-[40px]"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
              />
            </div>
            
          </div>
        </div>
      </div>
    )
  }
)

HAWBForm.displayName = "HAWBForm"

export default HAWBForm
