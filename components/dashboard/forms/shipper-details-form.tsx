"use client"

import React, { useEffect, useState } from "react"
import { Order } from "@/schemas/order/order"
import { PlusIcon, PlusSquareIcon, SearchIcon, TrashIcon } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { useLocations } from "@/lib/hooks/locations"
import { usePartnerCodes } from "@/lib/hooks/partner-codes"
import { usePartnerTypes } from "@/lib/hooks/partner-types"
import { useStatuses } from "@/lib/hooks/statuses"
import { useTransportMethods } from "@/lib/hooks/transport-method"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import DateInput from "@/components/ui/date-input"
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
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { TabsList } from "@/components/ui/vertical-tabs"
import { Combobox } from "@/components/form/combobox"

const ShipperDetailsForm = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
  const form = useFormContext()
  const { data: partnerCodes } = usePartnerCodes()
  const { data: statuses } = useStatuses()
  const { data: partnerTypes } = usePartnerTypes()
  const { data: locations } = useLocations()
  const { data: transportMethods } = useTransportMethods()

  const transportMethodOptions = transportMethods?.map((method: any) => ({
    value: method.ID,
    label: method.name,
  }))

  const locationOptions = locations?.map((loc: any) => ({
    value: loc.ID,
    label: loc.name,
  }))

  const partnerTypeOptions = partnerTypes?.map((type: any) => ({
    value: type.ID,
    label: type.name,
  }))

  const partnerCodeOptions = partnerCodes?.map((code: any) => ({
    value: code.ID,
    label: code.name,
  }))

  const statusOptions = statuses?.map((status: any) => ({
    value: status.ID,
    label: status.name,
  }))

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control: form.control, name: "shipper_details" }
  )

  const [tabValue, setTabValue] = useState(
    (fields.length && fields[0].id) || "0"
  )

  const appendField = () => {
    append({})
  }

  useEffect(() => {
    setTabValue(fields[fields.length - 1]?.id ?? "")
  }, [fields])

  return (
    <Tabs
      value={tabValue}
      onValueChange={setTabValue}
      className="flex flex-col"
      ref={ref}
    >
      <TabsList className="flex flex-row items-center justify-start bg-transparent p-0 transition-all">
        {fields.map((field, index) => {
          const isFirst = index === 0
          const isLast = index === fields.length - 1
          return (
            <TabsTrigger
              className={cn(
                "rounded-none border-y border-r px-4 py-2 text-xs font-normal",
                isFirst && "rounded-tl-md border-l",
                isLast && "rounded-tr-md"
              )}
              key={field.id}
              value={field.id}
            >
              Route {index + 1}
            </TabsTrigger>
          )
        })}
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={appendField}
          className="mx-2 h-6 w-6"
          type="button"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </TabsList>
      <Card className="flex-grow rounded-tl-none p-4">
        {fields.map((field, index) => {
          return (
            <TabsContent
              key={field.id}
              value={field.id}
              className="mt-0 grid grid-cols-1 gap-x-3 gap-y-2"
            >
              <div className="grid grid-cols-3 gap-x-3 gap-y-2">
                <FormField
                  name={`shipper_details[${index}].ID`}
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <Input
                        type="hidden"
                        {...field}
                        defaultValue={field.value ?? undefined}
                        className="border-2 border-foreground/30"
                      />
                    </FormItem>
                  )}
                />
                <Combobox
                  name="transport_method_id"
                  options={transportMethodOptions}
                  label="Transport Method"
                  info="Select the Transport Method"
                  editLink="/data-fields/airway-bills?tab=transport-method"
                />
                <Combobox
                  name="origin_id"
                  options={locationOptions}
                  label="Origin *"
                  info="Select the Location"
                  editLink="/data-fields/airway-bills?tab=location"
                />
                <Combobox
                  name="destination_id"
                  options={locationOptions}
                  label="Destination *"
                  info="Select the Location"
                  editLink="/data-fields/airway-bills?tab=location"
                />
                <Combobox
                  name="destination_id"
                  options={locationOptions}
                  label="Destination *"
                  info="Select the Location"
                  editLink="/data-fields/airway-bills?tab=location"
                />
                <Combobox
                  name="partner_type_id"
                  options={partnerTypeOptions}
                  label="Partner Type"
                  info="Select the Partner Type"
                  editLink="/data-fields/organizations?tab=partner-type"
                />
                <Combobox
                  name="partner_code_id"
                  options={partnerCodeOptions}
                  label="Partner Code"
                  info="Select the Partner Code"
                  editLink="/data-fields/organizations?tab=partner-code"
                />
                <FormField
                  control={form.control}
                  name={`shipper_details[${index}].date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <DateInput
                        {...field}
                        className="border-2 border-foreground/30"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`shipper_details[${index}].flight_code`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flight Code *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-2 border-foreground/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`shipper_details[${index}].allotment_code`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allotment Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-2 border-foreground/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Combobox
                  name="status_id"
                  options={statusOptions}
                  label="AWB Status"
                  info="Select the AWB Status"
                  editLink="/data-fields/airway-bills?tab=status"
                />
              </div>

              <div className="col-span-2 mt-3 inline-flex items-center gap-3">
                <Button
                  onClick={appendField}
                  variant={"button-secondary"}
                  className="flex-1"
                  type="button"
                >
                  <PlusSquareIcon className="mr-2 h-4 w-4" />
                  New Route
                </Button>
                <Button
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  variant={"destructive"}
                  type="button"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          )
        })}
      </Card>
    </Tabs>
  )
})

ShipperDetailsForm.displayName = "ShipperDetailsForm"

export default ShipperDetailsForm
