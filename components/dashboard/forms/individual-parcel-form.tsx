"use client"

import React from "react"
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
import { orderSchema } from "@/schemas/order/order"
import { getDefaults } from "@/schemas/utils"

const IndividualParcelForm = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const { weightUnitOptions, volumeUnitOptions, handleAction, formType, setFormType } = props
    const { data: commodityCodes } = useCommodityCodes()

    const form = useFormContext()
    const initialData = getDefaults(orderSchema)
    const formValues = form.watch()

    const commodityCodeOptions = commodityCodes?.map((code: any) => ({
      value: code.ID,
      label: `${code.name}: ${code.description}`,
    }));

    const createPayload = () => {
      const generateID = `individual-${Math.floor(1000 + Math.random() * 9000)}-${Date.now()}`
      const searchCommodity = commodityCodeOptions?.find((item: any) => item.value === formValues.individual_parcel_form.commodity_code_id)
      const payload = {
        ...formValues.individual_parcel_form,
        ...searchCommodity && { commodity_code: searchCommodity.label },
        ...formType === 'create' && { id: generateID }
      }
      
      handleAction('individual', payload)
      form.setValue('individual_parcel_form', initialData.individual_parcel_form)
    }

    return (
      <>
        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="individual_parcel_form.description"
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
            name="individual_parcel_form.internal_id"
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
            name="individual_parcel_form.external_id"
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
              name="individual_parcel_form.weight"
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
              name="individual_parcel_form.weight_unit"
              options={weightUnitOptions}
              label="Unit"
            />
          </div>

          <div className="flex gap-3">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="individual_parcel_form.volume"
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
                name="individual_parcel_form.volume_unit"
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
              name="individual_parcel_form.summary_weight"
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
              name="individual_parcel_form.summary_length"
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
              name="individual_parcel_form.summary_height"
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
            name="individual_parcel_form.commodity_code_id"
            options={commodityCodeOptions}
            label="Commodity Code"
            info="Select the Commodity Code"
            editLink="/data-fields/airway-bills?tab=commodity-code"
          />

          <div />

          <div className="flex gap-2 justify-end items-end">
            {formType === 'edit' && (
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => {
                  form.setValue('individual_parcel_form', initialData.individual_parcel_form)
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

IndividualParcelForm.displayName = "IndividualParcelForm"

export default IndividualParcelForm
