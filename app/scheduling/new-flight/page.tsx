"use client";

import { DataTable } from "@/components/data-table/data-table";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DateInput from "@/components/ui/date-input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectInput from "@/components/ui/select-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { PlusIcon, SaveIcon, SearchIcon, TrashIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

type FormFields = {
  flights: Partial<{
    flight_no: string;
    source: string;
    destination: string;
    date_from: string;
    date_to: string;
    dept_time: {
      day: number;
      hour: number;
      minute: number;
    };
    arrival_time: {
      day: number;
      hour: number;
      minute: number;
    };
    frequency: {
      mon: boolean;
      tue: boolean;
      wed: boolean;
      thu: boolean;
      fri: boolean;
      sat: boolean;
      sun: boolean;
    };
    aircraft_type: string;
    tail_no: string;
    capacity: number;
    uom: string;
    sector: string;
    status: string;
    flight_type: string;
  }>[];
};

export default function Page() {
  const form = useForm<FormFields>({
    defaultValues: { flights: [{}] },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "flights",
  });
  return (
    <PageContainer className="gap-6">
      <PageHeader
        title="New Flight"
        actions={
          <div className="flex flex-row items-center gap-3">
            <Button variant={"button-primary"}>
              <SaveIcon className="size-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={() => {
                append({});
              }}
              variant={"button-secondary"}
            >
              <PlusIcon className="size-4 mr-2" />
              Add New
            </Button>
          </div>
        }
      />
      <Form {...form}>
        <div className="rounded-md border ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Flight No</TableHead>
                <TableHead className="whitespace-nowrap">Source</TableHead>
                <TableHead className="whitespace-nowrap">Destination</TableHead>
                <TableHead className="whitespace-nowrap">Date From</TableHead>
                <TableHead className="whitespace-nowrap">Date To</TableHead>
                <TableHead className="whitespace-nowrap">
                  Dept Time (D:H:M)
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Arrival Time (D:H:M)
                </TableHead>
                <TableHead className="whitespace-nowrap">Frequency</TableHead>
                <TableHead className="whitespace-nowrap">
                  Aircraft Type
                </TableHead>
                <TableHead className="whitespace-nowrap">Tail No.</TableHead>
                <TableHead className="whitespace-nowrap">Capacity</TableHead>
                <TableHead className="whitespace-nowrap">UOM</TableHead>
                <TableHead className="whitespace-nowrap">Sector</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Flight Type</TableHead>
                <TableHead className="whitespace-nowrap">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow className="hover:bg-background" key={field.id}>
                  <TableCell className="whitespace-nowrap ">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.flight_no`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-36">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.source`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-20">
                          <SelectInput
                            {...field}
                            selectOptions={[
                              { label: "LAX", value: "LAX" },
                              { label: "JFK", value: "JFK" },
                              { label: "CKG", value: "CKG" },
                            ]}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.destination`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-20">
                          <SelectInput
                            {...field}
                            selectOptions={[
                              { label: "LAX", value: "LAX" },
                              { label: "JFK", value: "JFK" },
                              { label: "CKG", value: "CKG" },
                            ]}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.date_from`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-36">
                          <DateInput {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.date_to`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-36">
                          <DateInput {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-2">
                      <FormField
                        control={form.control}
                        name={`flights.${index}.dept_time.day`}
                        render={({ field }) => (
                          <FormItem className="space-y-1 w-12">
                            <FormControl>
                              <Input type="number" maxLength={2} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`flights.${index}.dept_time.hour`}
                        render={({ field }) => (
                          <FormItem className="space-y-1 w-12">
                            <FormControl>
                              <Input type="number" maxLength={2} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`flights.${index}.dept_time.minute`}
                        render={({ field }) => (
                          <FormItem className="space-y-1 w-12">
                            <FormControl>
                              <Input type="number" maxLength={2} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="flex flex-row gap-2">
                    <div className="flex flex-row gap-2">
                      <FormField
                        control={form.control}
                        name={`flights.${index}.arrival_time.day`}
                        render={({ field }) => (
                          <FormItem className="space-y-1 w-12">
                            <FormControl>
                              <Input type="number" maxLength={2} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`flights.${index}.arrival_time.hour`}
                        render={({ field }) => (
                          <FormItem className="space-y-1 w-12">
                            <FormControl>
                              <Input type="number" maxLength={2} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`flights.${index}.arrival_time.minute`}
                        render={({ field }) => (
                          <FormItem className="space-y-1 w-12">
                            <FormControl>
                              <Input type="number" maxLength={2} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap !pr-2 text-muted-foreground">
                    <div className="flex flex-row gap-2 items-center">
                      <FormField
                        control={form.control}
                        name={`flights.${index}.frequency.mon`}
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex flex-row items-center gap-1.5">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium">
                                Mon
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`flights.${index}.frequency.tue`}
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex flex-row items-center gap-1.5">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium">
                                Tue
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`flights.${index}.frequency.wed`}
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex flex-row items-center gap-1.5">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium">
                                Wed
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`flights.${index}.frequency.thu`}
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex flex-row items-center gap-1.5">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium">
                                Thu
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`flights.${index}.frequency.fri`}
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex flex-row items-center gap-1.5">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium">
                                Fri
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`flights.${index}.frequency.sat`}
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex flex-row items-center gap-1.5">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium">
                                Sat
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`flights.${index}.frequency.sun`}
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="flex flex-row items-center gap-1.5">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium">
                                Sun
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.aircraft_type`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-32">
                          <SelectInput
                            {...field}
                            selectOptions={[
                              { label: "Boeing 737", value: "b737" },
                              { label: "Boeing 747", value: "b747" },
                            ]}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.tail_no`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-32">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.capacity`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-16">
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.uom`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-16">
                          <SelectInput
                            {...field}
                            selectOptions={[
                              { label: "Kg", value: "kg" },
                              { label: "lbs", value: "lbs" },
                            ]}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.sector`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-32">
                          <SelectInput
                            {...field}
                            selectOptions={[
                              { label: "Sector 1", value: "1" },
                              { label: "Sector 2", value: "2" },
                            ]}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.status`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-32">
                          <SelectInput
                            {...field}
                            selectOptions={[
                              { label: "Operational", value: "operational" },
                            ]}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <FormField
                      control={form.control}
                      name={`flights.${index}.flight_type`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 min-w-32">
                          <SelectInput
                            {...field}
                            selectOptions={[
                              { label: "Freighter", value: "freighter" },
                              { label: "General", value: "general" },
                              { label: "Lean", value: "lean" },
                              { label: "Prime", value: "prime" },
                            ]}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Button
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                      size={"icon"}
                      variant={"destructive"}
                      className="size-9"
                    >
                      <TrashIcon className="size-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Form>
    </PageContainer>
  );
}
