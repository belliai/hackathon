"use client"

import { ColumnDef } from "@tanstack/react-table"

export type DoInvoiceType = {
  origin?: string
  destination?: string
  awb_number?: string
  agent_name?: string
  agent_code?: string
  invoice_no?: string
  chargeable_weight?: string
  payment_collected_mode?: string
  created_on?: string
}

export const columns: ColumnDef<DoInvoiceType>[] = [
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "awb_number",
    header: "AWB Number",
  },
  {
    accessorKey: "agent_name",
    header: "Agent Name",
  },
  {
    accessorKey: "agent_code",
    header: "Agent Code",
  },
  {
    accessorKey: "invoice_no",
    header: "Invoice Number",
  },
  {
    accessorKey: "chargeable_weight",
    header: "Chargeable Weight",
  },
  {
    accessorKey: "payment_collected_mode",
    header: "Payment Collected Mode",
  },
  {
    accessorKey: "created_on",
    header: "Created On",
  },
]
