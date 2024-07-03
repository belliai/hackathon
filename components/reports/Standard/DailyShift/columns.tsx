"use client"

import { ColumnDef } from "@tanstack/react-table"

export type DailyShiftType = {
  awb_number: string
  user_id: string
  from_date: string
  from_time: string
  to_date: string
  to_time: string
  station: string
  flights: string
}

export const columns: ColumnDef<DailyShiftType>[] = [
  {
    header: "AWB Number",
    accessorKey: "awb_number",
  },
  {
    header: "User",
    accessorKey: "user_id",
  },
  {
    header: "From Date",
    accessorKey: "from_date",
  },
  {
    header: "From Time",
    accessorKey: "from_time",
  },
  {
    header: "To Date",
    accessorKey: "to_date",
  },
  {
    header: "To Time",
    accessorKey: "to_time",
  },
  {
    header: "Station",
    accessorKey: "station",
  },
  {
    header: "Flights",
    accessorKey: "flights",
  },
]
