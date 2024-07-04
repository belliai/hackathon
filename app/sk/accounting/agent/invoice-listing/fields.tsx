import { PropsField } from "@/components/track/types"

export const filterFields: Array<PropsField> = [
  {
    fieldId: "dates",
    label: "Dates",
    type: "inputDate",
    children: [
      {
        fieldId: "fomDate",
        label: "From Date",
        type: "inputDate",
      },
      {
        fieldId: "toDate",
        label: "To Date",
        type: "inputDate",
      },
    ],
  },

  {
    fieldId: "invoice",
    label: "Invoice #",
    type: "inputText",
  },
  {
    fieldId: "invoiceType",
    label: "Invoice Type",
    type: "inputSelect",
    options: [
      {
        label: "All",
        value: "all",
      },
    ],
  },
  {
    fieldId: "invoiceStatus",
    label: "Invoice Status",
    type: "inputSelect",
    options: [
      {
        label: "All",
        value: "all",
      },
    ],
  },
  {
    fieldId: "agent",
    label: "Agent",
    type: "inputText",
  },
  {
    fieldId: "awbNumber",
    label: "AWB Number",
    type: "inputText",
    children: [
      {
        fieldId: "awbPrefix",
        label: "AWB Prefix",
        type: "inputText",
      },
      {
        fieldId: "awbNo",
        label: "AWB Number",
        type: "inputText",
      },
    ],
  },
  {
    fieldId: "origin",
    label: "Origin",
    type: "inputText",
  },
  {
    fieldId: "billType",
    label: "Bill Type",
    type: "inputSelect",
    options: [
      {
        label: "All",
        value: "all",
      },
    ],
  },
  {
    fieldId: "CASSAgents",
    label: "CASS Agents",
    type: "inputSelect",
    options: [
      {
        label: "All",
        value: "all",
      },
    ],
  },
  {
    fieldId: "country",
    label: "Country",
    type: "inputSelect",
    options: [
      {
        label: "All",
        value: "all",
      },
    ],
  },
  {
    fieldId: "entity",
    label: "Entity",
    type: "inputText",
  },

  {
    fieldId: "adjustments",
    label: "CASS CC Adj. Amnt",
    type: "inputText",
  },
]
