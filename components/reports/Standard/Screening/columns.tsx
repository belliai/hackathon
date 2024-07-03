"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ScreeningReportType = {
  awb?: string
  pcs?: string
  weight?: string
  agent?: string
  shipper?: string
  commodity?: string
  shc?: string
  token?: string
  known_shipper?: string
  dimension?: string
  is_accepted?: string
  acceptance_method?: string
}

export const columns: ColumnDef<ScreeningReportType>[] = [
  {
    accessorKey: "awb",
    header: "AWB#",
  },
  {
    accessorKey: "pcs",
    header: "Pcs",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "agent",
    header: "Agent",
  },
  {
    accessorKey: "shipper",
    header: "Shipper",
  },
  {
    accessorKey: "commodity",
    header: "Commodity",
  },
  {
    accessorKey: "shc",
    header: "SHC",
  },
  {
    accessorKey: "token",
    header: "Token",
  },
  {
    accessorKey: "known_shipper",
    header: "Known Shipper",
  },
  {
    accessorKey: "dimension",
    header: "Dimension",
  },
  {
    accessorKey: "is_accepted",
    header: "Accepted",
  },
  {
    accessorKey: "acceptance_method",
    header: "Acceptance Method",
  },
]
