import { PropsField } from "@/components/track/types"

export const filterFields: Array<PropsField> = [
  {
    fieldId: "flightFromDate",
    label: "FLight From Date",
    type: "inputDate",
  },
  {
    fieldId: "flightToDate",
    label: "Flight To Date",
    type: "inputDate",
  },
  {
    fieldId: "processStatus",
    label: "Process",
    type: "inputText",
  },
  {
    fieldId: "flightNo",
    label: "Flight No",
    type: "inputText",
  },
  {
    fieldId: "type",
    label: "Type",
    type: "inputSelect",
    options: [
      { label: "ASM", value: "ASM" },
      { label: "SSM", value: "SSM" },
    ],
  },
  {
    fieldId: "airCraftType",
    label: "Air Craft Type",
    type: "inputText",
  },
  {
    fieldId: "hasError",
    label: "Has Error/Warning",
    type: "inputCheck",
  },
]
