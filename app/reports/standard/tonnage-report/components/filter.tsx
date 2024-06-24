"use client";

import DataTableFilterForm, { FormFieldOption } from "@/components/data-table/data-table-filter-form";

export type FilterDataType = {
  from_station?: string;
  to_station?: string;
  from_date?: string;
  to_date?: string;
};

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
    key: "from_station",
    type: "select",
    label: "From Station",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "AAB", label: "AAB" },
      { value: "AAC", label: "AAC" },
      { value: "AAD", label: "AAD" },
      { value: "AAE", label: "AAE" },
      { value: "AAF", label: "AAF" },
    ],
    placeholder: "Select From Station",
  },
  {
    key: "to_station",
    type: "select",
    label: "To Station",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "AAB", label: "AAB" },
      { value: "AAC", label: "AAC" },
      { value: "AAD", label: "AAD" },
      { value: "AAE", label: "AAE" },
      { value: "AAF", label: "AAF" },
    ],
    placeholder: "Select To Station",
  },
];
