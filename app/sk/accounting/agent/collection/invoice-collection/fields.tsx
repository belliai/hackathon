import { PropsField } from "@/components/track/types"

export const filterFields: Array<PropsField> = [
  {
    fieldId: "invoiceDates",
    children: [
      {
        fieldId: "invoiceFomDate",
        label: "Invoice From Date",
        type: "inputDate",
      },
      {
        fieldId: "invoiceToDate",
        label: "Invoice To Date",
        type: "inputDate",
      },
    ],
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
    fieldId: "invoice",
    label: "Invoice #",
    type: "inputText",
  },
  {
    fieldId: "emptyField1",
  },
  {
    fieldId: "agent",
    label: "Agent",
    type: "inputText",
  },
  {
    fieldId: "origin",
    label: "Origin",
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
    fieldId: "collection",
    label: "Collection",
    type: "inputSelect",
    options: [
      {
        label: "All",
        value: "all",
      },
    ],
  },
  {
    fieldId: "userId",
    label: "User ID",
    type: "inputSelect",
    options: [
      {
        label: "All",
        value: "all",
      },
    ],
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
    fieldId: "emptyField2",
  },
  {
    fieldId: "emptyField3",
  },
  {
    fieldId: "paymentDates",
    children: [
      {
        fieldId: "paymentFomDate",
        label: "Payment From Date",
        type: "inputDate",
      },
      {
        fieldId: "paymentToDate",
        label: "Payment To Date",
        type: "inputDate",
      },
    ],
  },

  {
    fieldId: "number",
    label: "OR Number",
    type: "inputText",
  },
  {
    fieldId: "entity",
    label: "Entity",
    type: "inputText",
  },
  {
    fieldId: "emptyField4",
  },
]
