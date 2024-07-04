"use client"

import { ColumnDef } from "@tanstack/react-table"

export type SquareRootProrationType = {
  awb_number: string
  from_date: string
  to_date: string
  carrier: string
  agent_code: string
  report_type: string
  total_weight: string
  total_pieces: string
  gross_weight: string
  chargeable_weight: string
  revenue: string
  cost: string
  net_profit: string
  updated_on: string
}

export const columns: ColumnDef<SquareRootProrationType>[] = [
  {
    header: "AWB Number",
    accessorKey: "awb_number",
  },
  {
    header: "From Date",
    accessorKey: "from_date",
  },
  {
    header: "To Date",
    accessorKey: "to_date",
  },
  {
    header: "Carrier",
    accessorKey: "carrier",
  },
  {
    header: "Agent Code",
    accessorKey: "agent_code",
  },
  {
    header: "Report Type",
    accessorKey: "report_type",
  },
  {
    header: "Total Weight",
    accessorKey: "total_weight",
  },
  {
    header: "Total Pieces",
    accessorKey: "total_pieces",
  },
  {
    header: "Gross Weight",
    accessorKey: "gross_weight",
  },
  {
    header: "Chargeable Weight",
    accessorKey: "chargeable_weight",
  },
  {
    header: "Revenue",
    accessorKey: "revenue",
  },
  {
    header: "Cost",
    accessorKey: "cost",
  },
  {
    header: "Net Profit",
    accessorKey: "net_profit",
  },
  {
    header: "Updated On",
    accessorKey: "updated_on",
  },
]
