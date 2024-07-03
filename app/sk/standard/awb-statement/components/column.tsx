"use client"

import { ColumnDef } from "@tanstack/react-table"

export type AWBStatementColumnType = {
  month: string
  awb_booked: string
  executed: string
  pending: string
  void: string
  cancelled: string
  accepted: string
  billed: string
  invoiced: string
}

export const columns: ColumnDef<AWBStatementColumnType>[] = [
  {
    header: "Month",
    accessorKey: "month",
  },
  {
    header: "AWB Booked",
    accessorKey: "awb_booked",
  },
  {
    header: "Executed",
    accessorKey: "executed",
  },
  {
    header: "Pending",
    accessorKey: "pending",
  },
  {
    header: "Void",
    accessorKey: "void",
  },
  {
    header: "Cancelled",
    accessorKey: "cancelled",
  },
  {
    header: "Accepted",
    accessorKey: "accepted",
  },
  {
    header: "Billed",
    accessorKey: "billed",
  },
  {
    header: "Invoiced",
    accessorKey: "invoiced",
  },
]

export const DUMMY_DATA: AWBStatementColumnType[] = [
  {
    month: "April-2024",
    awb_booked: "91",
    executed: "14",
    pending: "14",
    void: "0",
    cancelled: "17",
    accepted: "23",
    billed: "69",
    invoiced: "106",
  },
  {
    month: "June-2024",
    awb_booked: "72",
    executed: "42",
    pending: "3",
    void: "1",
    cancelled: "2",
    accepted: "3",
    billed: "45",
    invoiced: "65",
  },
]
