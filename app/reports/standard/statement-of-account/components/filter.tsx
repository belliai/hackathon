"use client";

import DataTableFilterForm, { FormFieldOption } from "@/components/data-table/data-table-filter-form";

export type FilterDataType = {
  agent?: string;
  as_of?: string;
  entity?: string;
  invoice_number?: string;
};

export const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "agent",
    type: "select",
    label: "Agent",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "1000015", label: "1000015 - Pace Express Travels & Cargo" },
      { value: "1000043", label: "1000043 - Quick Freight Pte Ltd" },
      { value: "5003597", label: "5003597 - Schenker Korea Ltd" },
    ],
    placeholder: "Select Agent",
  },
  {
    key: "as_of",
    type: "date",
    label: "As Of",
    placeholder: "As Of",
  },
  {
    key: "entity",
    type: "select",
    label: "Entity",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "Xtest666", label: "Xtest666" },
      { value: "TLPXJ", label: "TLPXJ" },
      { value: "TLPID", label: "TLPID" },
      { value: "TLPTH", label: "TLPTH" },
      { value: "TLPCN", label: "TLPCN" },
    ],
    placeholder: "Select Entity",
  },
  {
    key: "invoice_number",
    type: "text",
    label: "Invoice Number",
    placeholder: "",
  },
];
