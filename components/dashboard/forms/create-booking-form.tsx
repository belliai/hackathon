"use client";

import React, { ForwardedRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcwIcon, SearchIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";



const generateAWBNumbers = (start: number, length: number) => {
  return Array.from({ length }, (_, i) => {
    const awbNumber = start + i;
    const formattedAwb = `${awbNumber.toString().slice(0, 3)}-${awbNumber
      .toString()
      .slice(3)}`;
    return formattedAwb;
  });
};
import { useBookingTypes } from "@/lib/hooks/booking-types"
import { usePartnerPrefixes } from "@/lib/hooks/partner-prefix"
import { usePartnerCodes } from "@/lib/hooks/partner-codes"
import { useStatuses } from "@/lib/hooks/statuses";
import { Order } from "@/schemas/order/order";

const CreateBookingForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {

  // const { 
  //   bookingTypes,
  //   partnerPrefixes,
  //   partnerCodes,
  //   statuses
  // } = props

  const form = useFormContext();
  const awb = generateAWBNumbers(7752000270, 20);
  const { data: bookingTypes } = useBookingTypes()
  const { data: partnerPrefixes } = usePartnerPrefixes()
  const { data: partnerCodes } = usePartnerCodes()
  const { data: statuses } = useStatuses()


  
  useEffect(()=>{},[form.formState])

  return (
    <Card className="p-4 space-y-2" ref={ref}>
      <div className="grid grid-cols-4 gap-2">
        <FormField
          control={form.control}
          name="booking_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="booking type info here">Booking Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bookingTypes && bookingTypes.map((bookingType: any) =>
                    <SelectItem value={bookingType.ID} key={bookingType.ID} >{bookingType.name}</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="partner_prefix_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Partner Prefix *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {partnerPrefixes && partnerPrefixes.map((partnerPrefix: any) =>
                    <SelectItem value={partnerPrefix.ID} key={partnerPrefix.ID} >{partnerPrefix.name}</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="awb"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">AWB#</FormLabel>
              <FormControl>
                <Input {...field} className="border-2 border-foreground/30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="partner_code_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Partner Code *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/40">
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
      </div>
      <div className="w-full flex flex-row items-center justify-between">
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
      <FormField
        control={form.control}
        name="status_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel info="info here">Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
    </Card>
  );
});

CreateBookingForm.displayName = "CreateBookingForm";

export default CreateBookingForm;
