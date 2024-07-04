"use client"

import DataTableFilterForm, {
  FormFieldOption,
} from "@/components/data-table/data-table-filter-form"

export type FilterDataType = {
  awb_number?: string
  flight_code?: string
  flight_number?: string
  location?: string
  from_date?: string
  to_date?: string
}

export const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "flight_code",
    type: "select",
    label: "Flight Code",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "AK", label: "AK" },
      { value: "I5", label: "I5" },
      { value: "8K", label: "8K" },
      { value: "DJ", label: "DJ" },
      { value: "6P", label: "6P" },
    ],
    placeholder: "Select Flight Code",
  },
  {
    key: "flight_number",
    type: "select",
    label: "Flight Number",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "101", label: "101" },
      { value: "1092", label: "1092" },
      { value: "310", label: "310" },
      { value: "900", label: "900" },
      { value: "910", label: "910" },
    ],
    placeholder: "Select Flight Number",
  },
  {
    key: "awb_number",
    type: "text",
    label: "AWB Number",
    placeholder: "",
  },
  {
    key: "location",
    type: "select",
    label: "Location",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "AAB", label: "AAB" },
      { value: "AAC", label: "AAC" },
      { value: "AAD", label: "AAD" },
      { value: "AAE", label: "AAE" },
      { value: "AAF", label: "AAF" },
    ],
    placeholder: "Select Location",
  },
  {
    key: "from_date",
    type: "date",
    label: "From Date",
    placeholder: "Select From Date",
  },
  {
    key: "to_date",
    type: "date",
    label: "To Date",
    placeholder: "Select To Date",
  },
]
