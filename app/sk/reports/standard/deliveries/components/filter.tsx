"use client"

import DataTableFilterForm, {
  FormFieldOption,
} from "@/components/data-table/data-table-filter-form"

export type FilterDataType = {
  awb_number?: string
  awb_from_date?: string
  awb_to_date?: string
  origin?: string
  destination?: string
  flight_number?: string
  flight_from_date?: string
  flight_to_date?: string
  delivery_status?: string
}

export const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "awb_number",
    type: "text",
    label: "AWB Number",
    placeholder: "",
  },
  {
    key: "awb_from_date",
    type: "date",
    label: "From Date",
    placeholder: "Select From Date",
  },
  {
    key: "awb_to_date",
    type: "date",
    label: "To Date",
    placeholder: "Select To Date",
  },
  {
    key: "origin",
    type: "select",
    label: "Origin",
    selectOptions: [
      { value: "all", label: "All" },
      { value: "AAB", label: "AAB" },
      { value: "AAC", label: "AAC" },
      { value: "AAD", label: "AAD" },
      { value: "AAE", label: "AAE" },
      { value: "AAF", label: "AAF" },
    ],
    placeholder: "Select Origin",
  },
  {
    key: "destination",
    type: "select",
    label: "Destination",
    selectOptions: [
      { value: "all", label: "All" },
      { value: "AAB", label: "AAB" },
      { value: "AAC", label: "AAC" },
      { value: "AAD", label: "AAD" },
      { value: "AAE", label: "AAE" },
      { value: "AAF", label: "AAF" },
    ],
    placeholder: "Select Destination",
  },
  {
    key: "flight_number",
    type: "text",
    label: "Flight Number",
    placeholder: "",
  },
  {
    key: "flight_from_date",
    type: "date",
    label: "From Date",
    placeholder: "Select From Date",
  },
  {
    key: "flight_to_date",
    type: "date",
    label: "To Date",
    placeholder: "Select To Date",
  },
  {
    key: "delivery_status",
    type: "select",
    label: "Delivery Status",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "Partial", label: "Partial" },
      { value: "Complete", label: "Complete" },
    ],
    placeholder: "Select Delivery Status",
  },
]
