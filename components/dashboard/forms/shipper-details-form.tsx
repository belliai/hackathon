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

export default function ShipperDetailsForm() {
  const form = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control: form.control, name: "shipperDetails" }
  );

  const [tabValue, setTabValue] = useState(fields[0].id);

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
                control={form.control}
                name={`shipperDetails.${index}.select`}
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
                        <SelectItem value="truck">Truck</SelectItem>
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
                name={`shipperDetails.${index}.origin`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin *</FormLabel>
                    <FormControl>
                      <div className="relative h-fit">
                        <Input
                          {...field}
                          className="border-2 border-foreground/30"
                        />
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
                name={`shipperDetails.${index}.destination`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination *</FormLabel>
                    <FormControl>
                      <div className="relative h-fit">
                        <Input
                          {...field}
                          className="border-2 border-foreground/30"
                        />
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
                name={`shipperDetails.${index}.partnerType`}
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
                        <SelectItem value="air">AIR</SelectItem>
                        <SelectItem value="origin-2">Parner Type 2</SelectItem>
                        <SelectItem value="origin-3">Parner Type 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`shipperDetails.${index}.partnerType`}
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
                        <SelectItem value="sg">SG</SelectItem>
                        <SelectItem value="origin-2">Parner Type 2</SelectItem>
                        <SelectItem value="origin-3">Parner Type 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`shipperDetails.${index}.date`}
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
                name={`shipperDetails.${index}.flightCode`}
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
                name={"`shipperDetails.${index}.allotmentCode`"}
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
                name={`shipperDetails.${index}.awbStatus`}
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
                        <SelectItem value="status-1">Status Type 1</SelectItem>
                        <SelectItem value="status-2">Status Type 2</SelectItem>
                        <SelectItem value="status-3">Status Type 3</SelectItem>
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
}
