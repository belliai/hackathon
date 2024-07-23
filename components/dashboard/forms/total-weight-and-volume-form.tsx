"use client"

import React, { useEffect } from "react"
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
import { EqualIcon } from "lucide-react"
import { useCommodityCodes } from "@/lib/hooks/commodity-codes"
import { Button } from "@/components/ui/button"

const TotalWeightAndVolumeForm = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const { weightUnitOptions, volumeUnitOptions } = props
    const { data: commodityCodes } = useCommodityCodes()

    const form = useFormContext()
    const formValues = form.watch()

    const commodityCodeOptions = commodityCodes?.map((code: any) => ({
      value: code.ID,
      label: `${code.name}: ${code.description}`,
    }));

    useEffect(() => {
      form.setValue('total_weight', formValues.total_weight_volume_form.weight)
      form.setValue('total_volume', formValues.total_weight_volume_form.volume)
    }, [formValues.total_weight_volume_form.weight, formValues.total_weight_volume_form.volume])

    return (
      <>
        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="total_weight_volume_form.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel info="hellow world!, this is info">
                    Description
                </FormLabel>
                <FormControl>
                  <Input
                    defaultValue={formValues.description}
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
            name="total_weight_volume_form.internal_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel info="hellow world!, this is info">
                  Internal ID
                </FormLabel>
                <FormControl>
                  <Input
                    defaultValue={formValues.internal_id}
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
            name="total_weight_volume_form.external_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel info="hellow world!, this is info">
                  External ID
                </FormLabel>
                <FormControl>
                  <Input
                    defaultValue={formValues.external_id}
                    {...field}
                    className="border-2 border-foreground/30 h-[40px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="total_weight_volume_form.weight"
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
              name="total_weight_volume_form.weight_unit"
              options={weightUnitOptions}
              label="Unit"
            />
          </div>

          <div className="flex gap-3">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="total_weight_volume_form.volume"
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
                name="total_weight_volume_form.volume_unit"
                options={volumeUnitOptions}
                label="Unit"
              />
            </div>
            <div className="pt-10">
              <EqualIcon className="size-4" />
            </div>
          </div>
            
          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="total_weight_volume_form.summary_weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel info="hellow world!, this is info">
                    Weight
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

            <FormField
              control={form.control}
              name="total_weight_volume_form.summary_length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel info="hellow world!, this is info">
                    Length
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

            <FormField
              control={form.control}
              name="total_weight_volume_form.summary_height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel info="hellow world!, this is info">
                    Height
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
          </div>
        </div>

        <div className="grid grid-cols-3">
          <Combobox
            name="total_weight_volume_form.commodity_code_id"
            options={commodityCodeOptions}
            label="HS Code"
            info="Select the Commodity Code"
            editLink="/data-fields/airway-bills?tab=commodity-code"
          />
        </div>
      </>
    )
  }
)

TotalWeightAndVolumeForm.displayName = "TotalWeightAndVolumeForm"

export default TotalWeightAndVolumeForm
