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
import { EqualIcon } from "lucide-react"
import { useCommodityCodes } from "@/lib/hooks/commodity-codes"
import { useLocations } from "@/lib/hooks/locations"

const IndividualParcelForm = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const { weightUnitOptions, volumeUnitOptions, handleAction, formType, setFormType } = props
    const { data: commodityCodes } = useCommodityCodes()
    const { data: locations } = useLocations()

    const form = useFormContext()
    const formValues = form.watch()

    const commodityCodeOptions = commodityCodes?.map((code: any) => ({
      value: code.ID,
      label: `${code.name}: ${code.description}`,
    }));

    const locationsOptions = locations?.map((location: any) => ({
      label: location.name,
      value: location.ID,
    }))

    useEffect(() => {
      const qty = parseFloat(formValues.individual_parcel_form?.qty || 0);
      const width = parseFloat(formValues.individual_parcel_form?.width || 0);
      const height = parseFloat(formValues.individual_parcel_form?.height || 0);
      const length = parseFloat(formValues.individual_parcel_form?.length || 0);
      
      const totalVolume = (qty * width * height * length) / 6000;

      form.setValue('individual_parcel_form.volume', Math.round(totalVolume).toString())

      const volume = parseFloat(formValues.individual_parcel_form?.volume || 0);
      const subtotal = volume / 166.6;

      form.setValue('individual_parcel_form.subtotal', subtotal.toFixed(2));

      const total = width + height + length;
      let skid = 0;
      if (total > 300) {
        const subtotal = parseFloat(formValues.individual_parcel_form?.subtotal || 0)
        skid = (subtotal * 1.3) - subtotal
      }

      form.setValue('individual_parcel_form.skid', Math.ceil(skid))
    }, [formValues.individual_parcel_form.qty, formValues.individual_parcel_form.weight, formValues.individual_parcel_form.width, formValues.individual_parcel_form.length, formValues.individual_parcel_form.height, formValues.individual_parcel_form.volume, formValues.individual_parcel_form.subtotal])

    return (
      <div className="grid grid-cols-1 gap-3">
        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="individual_parcel_form.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold" info="hellow world!, this is info">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    defaultValue={formValues.description}
                    {...field}
                    className="dark:border-2 dark:border-foreground/30 h-[40px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="individual_parcel_form.internal_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold" info="hellow world!, this is info">
                  Internal ID
                </FormLabel>
                <FormControl>
                  <Input
                    defaultValue={formValues.internal_id}
                    {...field}
                    className="dark:border-2 dark:border-foreground/30 h-[40px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="individual_parcel_form.external_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold" info="hellow world!, this is info">
                  External ID
                </FormLabel>
                <FormControl>
                  <Input
                    defaultValue={formValues.external_id}
                    {...field}
                    className="dark:border-2 dark:border-foreground/30 h-[40px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Combobox
            name="individual_parcel_form.origin_id"
            options={locationsOptions}
            label="Origin"
            info="Select the origin location"
            editLink="/data-fields/airway-bills?tab=location"
          />
          <Combobox
            name="individual_parcel_form.destination_id"
            options={locationsOptions}
            label="Destination"
            info="Select the Destination location"
            editLink="/data-fields/airway-bills?tab=location"
          />
          <Combobox
            name="individual_parcel_form.commodity_code_id"
            options={commodityCodeOptions}
            label="Commodity Code"
            info="Select the Commodity Code"
            editLink="/data-fields/airway-bills?tab=commodity-code"
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex gap-3">
            <div className="grow grid grid-cols-5 gap-3">
              <FormField
                control={form.control}
                name="individual_parcel_form.qty"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold" info="hellow world!, this is info">
                        Qty
                      </FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={formValues.individual_parcel_form.qty}
                          {...field}
                          className="dark:border-2 dark:border-foreground/30 h-[40px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="individual_parcel_form.weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold" info="hellow world!, this is info">
                      Weight
                    </FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={formValues.individual_parcel_form.weight}
                        {...field}
                        className="dark:border-2 dark:border-foreground/30 h-[40px]"
                        type="number"
                      />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="individual_parcel_form.width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold" info="hellow world!, this is info">
                      Width
                    </FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={formValues.individual_parcel_form.width}
                        {...field}
                        className="dark:border-2 dark:border-foreground/30 h-[40px]"
                        type="number"
                      />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="individual_parcel_form.length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold" info="hellow world!, this is info">
                      Length
                    </FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={formValues.individual_parcel_form.length}
                        {...field}
                        className="dark:border-2 dark:border-foreground/30 h-[40px]"
                        type="number"
                      />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="individual_parcel_form.height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold" info="hellow world!, this is info">
                      Height
                    </FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={formValues.individual_parcel_form.height}
                        {...field}
                        className="dark:border-2 dark:border-foreground/30 h-[40px]"
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
                name="individual_parcel_form.volume"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold" info="hellow world!, this is info">
                        Volume
                      </FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={formValues.individual_parcel_form.volume}
                          {...field}
                          className="dark:border-2 dark:border-foreground/30 h-[40px]"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="individual_parcel_form.subtotal"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold" info="hellow world!, this is info">
                        Subtotal
                      </FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={formValues.individual_parcel_form.subtotal}
                          {...field}
                          className="dark:border-2 dark:border-foreground/30 h-[40px]"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="individual_parcel_form.skid"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold" info="hellow world!, this is info">
                        Skid
                      </FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={formValues.individual_parcel_form.skid}
                          {...field}
                          className="dark:border-2 dark:border-foreground/30 h-[40px]"
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

IndividualParcelForm.displayName = "IndividualParcelForm"

export default IndividualParcelForm
