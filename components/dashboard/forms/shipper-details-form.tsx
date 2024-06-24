"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DateInput from "@/components/ui/date-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/vertical-tabs";
import { cn } from "@/lib/utils";
import { PlusIcon, PlusSquareIcon, SearchIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import React from "react";
import { usePartnerCodes } from "@/lib/hooks/partner-codes";
import { useStatuses } from "@/lib/hooks/statuses";
import { usePartnerTypes } from "@/lib/hooks/partner-types";
import { useLocations } from "@/lib/hooks/locations";
import { useTransportMethods } from "@/lib/hooks/transport-method";
import { Order } from "@/schemas/order/order";

const ShipperDetailsForm = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
  const form = useFormContext();
  const { data: partnerCodes } = usePartnerCodes()
  const { data: statuses } = useStatuses()
  const { data: partnerTypes } = usePartnerTypes()
  const { data: locations } = useLocations()
  const { data: transportMethods } = useTransportMethods()

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control: form.control, name: "shipper_details" }
  );

  const [tabValue, setTabValue] = useState(fields.length && fields[0].id || "0");

  const appendField = () => {
    append({});
  };

  useEffect(() => {
    setTabValue(fields[fields.length - 1]?.id ?? "");

  }, [fields]);

  return (
    <Tabs
      value={tabValue}
      onValueChange={setTabValue}
      className="flex flex-col"
      ref={ref}
    >
      <TabsList className="flex flex-row justify-start items-center p-0 bg-transparent transition-all">
        {fields.map((field, index) => {
          const isFirst = index === 0;
          const isLast = index === fields.length - 1;
          return (
            <TabsTrigger
              className={cn(
                "border-y border-r rounded-none text-xs py-2 px-4 font-normal",
                isFirst && "rounded-tl-md border-l",
                isLast && "rounded-tr-md"
              )}
              key={field.id}
              value={field.id}
            >
              Route {index + 1}
            </TabsTrigger>
          );
        })}
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={appendField}
          className="w-6 h-6 mx-2"
          type="button"
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </TabsList>
      <Card className="p-4 rounded-tl-none flex-grow ">
        {fields.map((field, index) => {
          return (
            <TabsContent
              key={field.id}
              value={field.id}
              className="mt-0 grid grid-cols-2 gap-y-2 gap-x-3"
            >
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
              <FormField
                control={form.control}
                name={`shipper_details[${index}].transport_method_id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? "truck"}
                    >
                      <FormControl>
                        <SelectTrigger className="border-2 border-foreground/30">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transportMethods && transportMethods.map((transportMethod: any) =>
                          <SelectItem value={transportMethod.ID} key={transportMethod.ID} >{transportMethod.name}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`shipper_details[${index}].origin_id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin *</FormLabel>
                    <Select
                      onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-2 border-foreground/30">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations && locations.map((location: any) =>
                          <SelectItem value={location.ID} key={location.ID} >{location.name}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`shipper_details[${index}].destination_id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination *</FormLabel>
                    <Select
                       onValueChange={field.onChange} defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-2 border-foreground/30">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations && locations.map((location: any) =>
                          <SelectItem value={location.ID} key={location.ID} >{location.name}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`shipper_details[${index}].partner_type_id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? "air"}
                    >
                      <FormControl>
                        <SelectTrigger className="border-2 border-foreground/30">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {partnerTypes && partnerTypes.map((partnerType: any) =>
                          <SelectItem value={partnerType.ID} key={partnerType.ID} >{partnerType.name}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`shipper_details[${index}].partner_code_id`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner Code</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? "sg"}
                    >
                      <FormControl>
                        <SelectTrigger className="border-2 border-foreground/30">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {partnerCodes && partnerCodes.map((partnerCode: any) =>
                          <SelectItem value={partnerCode.ID} key={partnerCode.ID} >{partnerCode.name}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
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
              <FormField
                control={form.control}
                name={`shipper_details[${index}].status_id`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>AWB Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-2 border-foreground/30">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses && statuses.map((status: any) =>
                          <SelectItem value={status.ID} key={status.ID} >{status.name}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2 inline-flex items-center mt-3 gap-3">
                <Button
                  onClick={appendField}
                  variant={"button-secondary"}
                  className="flex-1"
                  type="button"
                >
                  <PlusSquareIcon className="w-4 h-4 mr-2" />
                  New Route
                </Button>
                <Button
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  variant={"destructive"}
                  type="button"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>
          );
        })}
      </Card>
    </Tabs>
  );
});

ShipperDetailsForm.displayName = "ShipperDetailsForm";

export default ShipperDetailsForm;
