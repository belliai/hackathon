"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListIcon, SearchIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

const ConsignmentDetailsForm = React.forwardRef<HTMLDivElement, {}>(
  (_, ref) => {
    const form = useFormContext();

    return (
      <Card className="p-4 grid grid-cols-2 gap-y-2 gap-x-3">
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="booking type info here">Origin</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? "ah1"}
              >
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ah1">AH1</SelectItem>
                  <SelectItem value="origin-2">Origin Type 2</SelectItem>
                  <SelectItem value="origin-3">Origin Type 3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Destination
              </FormLabel>
              <FormControl>
                <div className="relative h-fit">
                  <Input {...field} className="border-2 border-foreground/30" />
                  <div className="absolute h-full top-0 right-0 inline-flex items-center justify-center px-3 ">
                    <SearchIcon className="w-3 h-3" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commodityCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Commodity Code *
              </FormLabel>
              <FormControl>
                <div className="relative h-fit">
                  <Input {...field} className="border-2 border-foreground/30" />
                  <div className="absolute h-full top-0 right-0 inline-flex items-center justify-center px-3 ">
                    <SearchIcon className="w-3 h-3" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commodityDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Commodity Description
              </FormLabel>
              <FormControl>
                <Input {...field} className="border-2 border-foreground/30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Payment Mode
              </FormLabel>
              <FormControl>
                <Input {...field} className="border-2 border-foreground/30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">Bill To</FormLabel>
              <FormControl>
                <Input {...field} className="border-2 border-foreground/30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billToName"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Bill To Name
              </FormLabel>
              <FormControl>
                <Input {...field} className="border-2 border-foreground/30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shipper"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">Shipper</FormLabel>
              <FormControl>
                <div className="inline-flex items-center gap-1">
                  <div className="relative h-fit">
                    <Input
                      {...field}
                      className="border-2 border-foreground/30"
                    />
                    <div className="absolute h-full top-0 right-0 inline-flex items-center justify-center px-3 ">
                      <SearchIcon className="w-3 h-3" />
                    </div>
                  </div>
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"ghost"}
                    className="aspect-square"
                  >
                    <ListIcon className="size-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consignee"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Consignee
              </FormLabel>
              <FormControl>
                <div className="inline-flex items-center gap-1">
                  <div className="relative h-fit">
                    <Input
                      {...field}
                      className="border-2 border-foreground/30"
                    />
                    <div className="absolute h-full top-0 right-0 inline-flex items-center justify-center px-3 ">
                      <SearchIcon className="w-3 h-3" />
                    </div>
                  </div>
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"ghost"}
                    className="aspect-square"
                  >
                    <ListIcon className="size-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cusc"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="Customer">Customer</FormLabel>
              <FormControl>
                <div className="relative h-fit">
                  <Input {...field} className="border-2 border-foreground/30" />
                  <div className="absolute h-full top-0 right-0 inline-flex items-center justify-center px-3 ">
                    <SearchIcon className="w-3 h-3" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="booking type info here">Customer Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="origin-1">Origin Type 1</SelectItem>
                  <SelectItem value="origin-2">Origin Type 2</SelectItem>
                  <SelectItem value="origin-3">Origin Type 3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pieces"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="booking type info here">Pieces</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-foreground/30">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="origin-1">Origin Type 1</SelectItem>
                  <SelectItem value="origin-2">Origin Type 2</SelectItem>
                  <SelectItem value="origin-3">Origin Type 3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grossWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Gross Weight (Kg) *
              </FormLabel>
              <FormControl>
                <div className="relative h-fit">
                  <Input {...field} className="border-2 border-foreground/30" />
                  <div className="absolute h-full top-0 right-0 inline-flex items-center justify-center px-3 ">
                    <ListIcon className="w-3 h-3" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="freightForwarder"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="hellow world!, this is info">
                Freight Forwarder
              </FormLabel>
              <FormControl>
                <div className="relative h-fit">
                  <Input {...field} className="border-2 border-foreground/30" />
                  <div className="absolute h-full top-0 right-0 inline-flex items-center justify-center px-3 ">
                    <SearchIcon className="w-3 h-3" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="org"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="Organization">Organization</FormLabel>
              <FormControl>
                <div className="relative h-fit">
                  <Input {...field} className="border-2 border-foreground/30" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>
    );
  }
);

ConsignmentDetailsForm.displayName = "ConsignmentDetailsForm";

export default ConsignmentDetailsForm;
