"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import FormTextField from "@/components/form/FormTextField";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocations } from "@/lib/hooks/locations";

interface FlightMasterFormType {
  hookForm: UseFormReturn<any>;
}

type LocationListType = {
  ID: string;
  name: string;
}

const frequencyItems = [
  {
    id: "mon",
    label: "Monday",
  },
  {
    id: "tue",
    label: "Tuesday",
  },
  {
    id: "wed",
    label: "Wednesday",
  },
  {
    id: "thu",
    label: "Thursday",
  },
  {
    id: "fri",
    label: "Friday",
  },
  {
    id: "sat",
    label: "Saturday",
  },
  {
    id: "sun",
    label: "Sunday",
  },
];

export default function FlightMasterForm({
  hookForm,
}: FlightMasterFormType) {
  const { data: locations } = useLocations();
  const formattedLocation = locations?.map((locationList: LocationListType) => ({ label: locationList.name, value: locationList.ID })) || [];

  return (
    <div className="flex flex-col gap-4">
      <Form {...hookForm}>
        <div className="grid grid-cols-3 gap-2">
          <FormTextField
            name="flightNo"
            form={hookForm}
            type="text"
            label="Flight No"
          />
          <FormTextField
            form={hookForm}
            name="source"
            label="Source"
            type="select"
            options={formattedLocation}
          />
          <FormTextField
            form={hookForm}
            name="destination"
            label="Destination"
            type="select"
            options={formattedLocation}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormTextField
            name="fromDate"
            form={hookForm}
            type="date"
            label="From Date"
          />
          <FormTextField
            name="toDate"
            form={hookForm}
            type="date"
            label="To Date"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Dept. Time (D H M)</label>
            <div className="grid grid-cols-3 gap-1">
              <FormTextField
                name="deptDay"
                form={hookForm}
                type="text"
                label=""
              />
              <FormTextField
                name="deptHour"
                form={hookForm}
                type="text"
                label=""
              />
              <FormTextField
                name="deptMinute"
                form={hookForm}
                type="text"
                label=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Arrival Time (D H M)</label>
            <div className="grid grid-cols-3 gap-1">
              <FormTextField
                name="arrivalDay"
                form={hookForm}
                type="text"
                label=""
              />
              <FormTextField
                name="arrivalHour"
                form={hookForm}
                type="text"
                label=""
              />
              <FormTextField
                name="arrivalMinute"
                form={hookForm}
                type="text"
                label=""
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 my-2">
          <label className="text-sm">Frequency</label>
          <FormItem className="flex gap-3 w-full space-y-0">
            {frequencyItems.map((item) => (
              <FormField
                key={item.id}
                control={hookForm.control}
                name="frequencyItems"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start gap-1 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== item.id
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </FormItem>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <FormTextField
            form={hookForm}
            name="aircraftType"
            label="Aircraft Type"
            type="select"
            options={[]}
          />
          <FormTextField
            form={hookForm}
            name="tailNo"
            label="Tail No"
            type="select"
            options={[]}
          />
          <FormTextField
            name="capacity"
            form={hookForm}
            type="text"
            label="Capacity"
          />
          <FormTextField
            form={hookForm}
            name="uom"
            label="UOM"
            type="select"
            options={[]}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <FormTextField
            form={hookForm}
            name="sector"
            label="Sector"
            type="select"
            options={[
              {
                label: 'Domestic',
                value: 'domestic',
              },
              {
                label: 'International',
                value: 'international',
              }
            ]}
          />
          <FormTextField
            form={hookForm}
            name="status"
            label="Status"
            type="select"
            options={[
              {
                label: 'Operational',
                value: 'operational',
              },
              {
                label: 'Cancelled',
                value: 'cancelled',
              }
            ]}
          />
          <FormTextField
            form={hookForm}
            name="flightType"
            label="Flight Type"
            type="select"
            options={[
              {
                label: 'FREIGHTER',
                value: 'freighter',
              },
              {
                label: 'GENERAL',
                value: 'general',
              },
              {
                label: 'LEAN',
                value: 'lean',
              },
              {
                label: 'PRIME',
                value: 'prime',
              },
              {
                label: 'STANDBY',
                value: 'standby',
              },
              {
                label: 'PAX',
                value: 'pax',
              }
            ]}
          />
        </div>
      </Form>
    </div>
  );
}
