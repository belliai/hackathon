"use client"

import { ColumnDef } from "@tanstack/react-table"

export type PoMailSummaryType = {
  agent_code?: string
  invoice_no?: string
  invoice_date?: string
  type_of_mail?: string
  total_weight_in_kg?: string
}

export const columns: ColumnDef<PoMailSummaryType>[] = [
  {
    accessorKey: "agent_code",
    header: "Agent Code",
  },
  {
    accessorKey: "invoice_no",
    header: "Invoice Number",
  },
  {
    accessorKey: "invoice_date",
    header: "Invoice Date",
  },
  {
    accessorKey: "type_of_mail",
    header: "Type of Mail",
  },
  {
    accessorKey: "total_weight_in_kg",
    header: "Total Weight (Kg)",
  },
]
