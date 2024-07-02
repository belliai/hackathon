"use client";

import DataTableFilterForm, { FormFieldOption } from "@/components/data-table/data-table-filter-form";
import { FlightMasterDataType } from "./column";

export type FilterDataType = Partial<FlightMasterDataType> & {
  date_from?: string;
  date_to?: string;
};

export const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "source",
    type: "select",
    label: "Origin",
    selectOptions: [
      { value: "JFK", label: "JFK" },
      { value: "SFO", label: "SFO" },
      { value: "MIA", label: "MIA" },
      // Add more options as needed
    ],
    placeholder: "Select Origin",
  },
  {
    key: "destination",
    type: "select",
    label: "Destination",
    selectOptions: [
      { value: "LAX", label: "LAX" },
      { value: "ORD", label: "ORD" },
      { value: "DFW", label: "DFW" },
      // Add more options as needed
    ],
    placeholder: "Select Destination",
  },
  {
    key: "flight_no",
    type: "text",
    label: "Flight No",
    placeholder: "Enter Flight No",
  },
  {
    key: "date_from",
    type: "date",
    label: "Choose From Date",
  },
  {
    key: "date_to",
    type: "date",
    label: "Choose To Date",
  },
  {
    key: "aircraft_type",
    type: "select",
    label: "Aircraft Type",
    selectOptions: [
      { value: "Boeing 737", label: "Boeing 737" },
      { value: "Airbus A320", label: "Airbus A320" },
      { value: "Boeing 747", label: "Boeing 747" },
      // Add more options as needed
    ],
    placeholder: "Select Aircraft Type",
  },
  {
    key: "sector",
    type: "text",
    label: "Sector",
    placeholder: "Enter Sector",
  },
  {
    key: "flight_type",
    type: "select",
    label: "Flight Type",
    selectOptions: [
      { value: "Domestic", label: "Domestic" },
      { value: "International", label: "International" },
      { value: "Cargo", label: "Cargo" },
      // Add more options as needed
    ],
    placeholder: "Select Flight Type",
  },
  {
    key: "status",
    type: "select",
    label: "Status",
    selectOptions: [
      { value: "On Time", label: "On Time" },
      { value: "Delayed", label: "Delayed" },
      { value: "Cancelled", label: "Cancelled" },
      // Add more options as needed
    ],
    placeholder: "Select Status",
  },
];
