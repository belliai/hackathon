"use client"

import { ColumnDef } from "@tanstack/react-table"

export type GHATonnageType = {
  awb_number: string
  from_date: string
  to_date: string
  from_station: string
  to_station: string
  gha_code: string
  transit: string
  from_airline: string
  to_airline: string
  total_weight: string
  total_pieces: string
  gross_tonnage: string
  net_tonnage: string
  chargeable_weight: string
  revenue: string
  cost: string
  net_profit: string
  updated_on: string
}

export const columns: ColumnDef<GHATonnageType>[] = [
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
    header: "From Station",
    accessorKey: "from_station",
  },
  {
    header: "To Station",
    accessorKey: "to_station",
  },
  {
    header: "GHA Code",
    accessorKey: "gha_code",
  },
  {
    header: "Transit",
    accessorKey: "transit",
  },
  {
    header: "From Airline",
    accessorKey: "from_airline",
  },
  {
    header: "To Airline",
    accessorKey: "to_airline",
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
    header: "Gross Tonnage",
    accessorKey: "gross_tonnage",
  },
  {
    header: "Net Tonnage",
    accessorKey: "net_tonnage",
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
