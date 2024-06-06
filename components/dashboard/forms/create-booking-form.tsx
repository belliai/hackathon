"use client";

import React, { ForwardedRef } from "react";
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

type FormValues = {
  bookingType: string;
  partnerPrefix: string;
  axb: string;
  partnerCode: string;
  isPhysical: boolean;
  status: string;
};

const generateAWBNumbers = (start: number, length: number) => {
  return Array.from({ length }, (_, i) => {
    const awbNumber = start + i;
    const formattedAwb = `${awbNumber.toString().slice(0, 3)}-${awbNumber
      .toString()
      .slice(3)}`;
    return formattedAwb;
  });
};

const CreateBookingForm = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
  const form = useFormContext<FormValues>();
  const awb = generateAWBNumbers(7752000270, 20);

  return (
    <Card className="p-4 space-y-2" ref={ref}>
      <div className="grid grid-cols-4 gap-2">
        <FormField
          control={form.control}
          name="bookingType"
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
                  <SelectItem value="booking-1">Booking Type 1</SelectItem>
                  <SelectItem value="booking-2">Booking Type 2</SelectItem>
                  <SelectItem value="booking-3">Booking Type 3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="partnerPrefix"
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
                  <SelectItem value="value-1">Value Type 1</SelectItem>
                  <SelectItem value="value-2">Value Type 2</SelectItem>
                  <SelectItem value="value-3">Value Type 3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="axb"
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
          name="partnerCode"
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
                  <SelectItem value="value-1">Value Type 1</SelectItem>
                  <SelectItem value="value-2">Value Type 2</SelectItem>
                  <SelectItem value="value-3">Value Type 3</SelectItem>
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
          name="isPhysical"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
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
        name="status"
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
                <SelectItem value="status-1">Delayed</SelectItem>
                <SelectItem value="status-2">Complete</SelectItem>
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
