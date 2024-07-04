"use client"

import DataTableFilterForm, {
  FormFieldOption,
} from "@/components/data-table/data-table-filter-form"

export type FilterDataType = {
  flights?: string
  station?: string
  carrier?: string
  revenue_type?: string
  from_date?: string
  to_date?: string
}

export const formFilters: FormFieldOption<FilterDataType>[] = [
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
  {
    key: "flights",
    type: "select",
    label: "Flights",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "Domestic", label: "Domestic" },
      { value: "International", label: "International" },
    ],
    placeholder: "Select Flights",
  },
  {
    key: "station",
    type: "select",
    label: "Station",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "AAB", label: "AAB" },
      { value: "AAC", label: "AAC" },
      { value: "AAD", label: "AAD" },
      { value: "AAE", label: "AAE" },
      { value: "AAF", label: "AAF" },
    ],
    placeholder: "Select Station",
  },
  {
    key: "carrier",
    type: "select",
    label: "Carrier",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "3G", label: "3G" },
      { value: "6P", label: "6P" },
      { value: "8K", label: "8K" },
      { value: "AK", label: "AK" },
      { value: "AL", label: "AL" },
    ],
    placeholder: "Select Carrier",
  },
  {
    key: "revenue_type",
    type: "select",
    label: "Revenue Type",
    selectOptions: [
      { value: "Station Wise", label: "Station Wise" },
      { value: "Sector Wise", label: "Sector Wise" },
      { value: "Flight Wise", label: "Flight Wise" },
      { value: "Tail WIse", label: "Tail WIse" },
    ],
    placeholder: "Select Revenue Type",
  },
]
