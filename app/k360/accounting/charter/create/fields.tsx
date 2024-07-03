import React from "react"

import { PropsField } from "@/components/track/types"

export const charterFields: Array<PropsField> = [
  {
    fieldId: "agentCode",
    label: "Agent Code",
    type: "inputText",
  },
  {
    fieldId: "agentName",
    label: "Agent Name",
    type: "inputText",
  },
  {
    fieldId: "supplyTypeCode",
    label: "Supply Type Code",
    type: "inputText",
  },
  {
    fieldId: "supplierOrigin",
    label: "Supplier Origin",
    type: "inputText",
  },
  {
    fieldId: "dateOfAWBIssue",
    label: "Date of AWB Issue",
    type: "inputText",
  },
  {
    fieldId: "flightDate",
    label: "Flight Date",
    type: "inputDate",
  },
  {
    fieldId: "flightNo",
    label: "Flight No",
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

  {
    fieldId: "SPLCode",
    label: "SPLCode",
    type: "inputText",
  },
  {
    fieldId: "isProformma",
    label: "Is Proforma",
    type: "inputCheck",
  },
]

export const routesFields: Array<PropsField> = [
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
  {
    fieldId: "date",
    label: "Date",
    type: "inputDate",
  },
  {
    fieldId: "flightCode",
    label: "Flight Code",
    type: "inputDate",
  },
  {
    fieldId: "weight",
    label: "Weight",
    type: "inputText",
  },
]

export const freightDetailFields: Array<PropsField> = [
  {
    fieldId: "totalWeight",
    label: "Total Weigh",
    type: "inputText",
  },
  {
    fieldId: "freightAmount",
    label: "Freight Amount",
    type: "inputText",
  },
  {
    fieldId: "allIn",
    label: "All In",
    type: "inputSelect",
    options: [
      { label: "all", value: "All" },
      { label: "yes", value: "Yes" },
      { label: "no", value: "No" },
    ],
  },
  {
    fieldId: "OCDC",
    label: "OCDC",
    type: "inputText",
  },
  {
    fieldId: "tax",
    label: "Tax",
    type: "inputText",
  },
  {
    fieldId: "finalAmount",
    label: "Final Amount",
    type: "inputText",
  },
  {
    fieldId: "currencyCode",
    label: "Currency Code",
    type: "inputSelect",
    options: [
      { value: "aed", label: "AED" },
      { value: "afn", label: "AFN" },
      { value: "omr", label: "OMR" },
    ],
  },
  {
    fieldId: "SAC",
    label: "SAC",
    type: "inputSelect",
    options: [{ label: "SAC", value: "SAC" }],
  },
  {
    fieldId: "descService",
    label: "Desc Service",
    type: "inputText",
  },
  {
    fieldId: "remark",
    label: "Remark",
    type: "inputText",
  },
  {
    fieldId: "awb",
    label: "AWB",
    type: "inputText",
  },
]
