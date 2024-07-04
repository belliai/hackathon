import React from "react"

import { PropsField } from "@/components/track/types"

export const currentFields: Array<PropsField> = [
  {
    fieldId: "freight",
    label: "Freight",
    type: "inputText",
  },
  {
    fieldId: "OCDC",
    label: "OCDC",
    type: "inputText",
  },
  {
    fieldId: "OCDA",
    label: "OCDA",
    type: "inputText",
  },
  {
    fieldId: "GSTINNo",
    label: "GSTIN No.",
    type: "inputText",
  },
  {
    fieldId: "serviceTax",
    label: "Service Tax",
    type: "inputText",
  },
  {
    fieldId: "total",
    label: "Total",
    type: "inputText",
  },
]

export const generalFields: Array<PropsField> = [
  {
    fieldId: "invoiceNo",
    type: "inputText",
    label: "Invoice No",
  },
  {
    fieldId: "invoiceDate",
    type: "inputDate",
    label: "Invoice Date",
  },
  {
    fieldId: "CCANumber",
    label: "CCA Number",
    type: "inputText",
  },
  {
    fieldId: "invoiceStatus",
    label: "Status",
    type: "inputText",
  },
  {
    fieldId: "dateOfAWBIssue",
    label: "Date of AWB Issue",
    type: "inputText",
  },
  {
    fieldId: "agentCode",
    label: "Agent Code",
    type: "inputText",
  },
  {
    fieldId: "airlineCode",
    label: "Airline Code",
    type: "inputText",
  },

  {
    fieldId: "origin",
    label: "Origin",
    type: "inputText",
  },

  {
    fieldId: "destination",
    label: "Destination",
    type: "inputText",
  },
]

export const airwaybillFields: Array<PropsField> = [
  {
    fieldId: "weightUnit",
    label: "Weight Unit",
    type: "inputText",
  },
  {
    fieldId: "revisedWeight",
    label: "Revised / Corrected Weight",
    type: "inputText",
  },
  {
    fieldId: "originalWeight",
    label: "Original / Incorrect Weight",
    type: "inputText",
  },
]

export const chargesFields: Array<PropsField> = [
  {
    fieldId: "currency",
    label: "Currency",
    type: "inputText",
  },
  {
    fieldId: "commodityCode",
    label: "Commodity Code",
    type: "inputText",
  },
  {
    fieldId: "weightCharges",
    label: "Weight Charges",
    type: "inputText",
  },
  {
    fieldId: "collect1",
    label: "Collect",
    type: "inputText",
  },
  {
    fieldId: "commission",
    label: "Commission",
    type: "inputText",
  },
  {
    fieldId: "incentive",
    label: "Incentive",
    type: "inputText",
  },
  {
    fieldId: "netAmount",
    label: "Net / Net Amount",
    type: "inputText",
  },
  {
    fieldId: "TDSCommission",
    label: "TDS Commission",
    type: "inputText",
  },
  {
    fieldId: "STCommission",
    label: "ST Commission",
    type: "inputText",
  },
  {
    fieldId: "totalPayable",
    label: "Total Payable To Airline (Ex:VAT)",
    type: "inputText",
  },
  {
    fieldId: "totalOtherChargeAgent",
    label: "Total Other Charges Due Agent",
    type: "inputText",
  },
  {
    fieldId: "collect2",
    label: "Collect",
    type: "inputText",
  },
  {
    fieldId: "totalOtherChargeAirline",
    label: "Total Other Charges Due Airline",
    type: "inputText",
  },
  {
    fieldId: "collect3",
    label: "Collect",
    type: "inputText",
  },
  {
    fieldId: "tax",
    label: "Tax",
    type: "inputText",
  },
  {
    fieldId: "total",
    label: "Total",
    type: "inputText",
  },
]

export const remarksFields: Array<PropsField> = [
  {
    fieldId: "reason",
    label: "Reason for correction",
    type: "inputSelect",
    options: [
      { value: "missing", label: "Missing Agreement" },
      { value: "weight", label: "Weight Amendment" },
      { value: "destination_change", label: "Destination Change" },
    ],
  },
  {
    fieldId: "remark",
    label: "Remark",
    type: "inputText",
  },
]
