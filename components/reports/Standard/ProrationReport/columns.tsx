"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ProrationReportType = {
  awb_number: string
  from_date: string
  to_date: string
  station: string
  carrier: string
  flight_type: string
  origin: string
  destination: string
  total_weight: string
  total_pieces: string
  total_revenue: string
  total_cost: string
  net_profit: string
  proration_factor: string
  updated_on: string
}

export const columns: ColumnDef<ProrationReportType>[] = [
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
    header: "Station",
    accessorKey: "station",
  },
  {
    header: "Carrier",
    accessorKey: "carrier",
  },
  {
    header: "Flight Type",
    accessorKey: "flight_type",
  },
  {
    header: "Origin",
    accessorKey: "origin",
  },
  {
    header: "Destination",
    accessorKey: "destination",
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
    header: "Total Revenue",
    accessorKey: "total_revenue",
  },
  {
    header: "Total Cost",
    accessorKey: "total_cost",
  },
  {
    header: "Net Profit",
    accessorKey: "net_profit",
  },
  {
    header: "Proration Factor",
    accessorKey: "proration_factor",
  },
  {
    header: "Updated On",
    accessorKey: "updated_on",
  },
]
