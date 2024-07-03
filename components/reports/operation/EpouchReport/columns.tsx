"use client"

import { ColumnDef } from "@tanstack/react-table"

export type EpouchReportType = {
  awb_number?: string
  agent_code?: string
  agent_name?: string
  airport_type?: string
  origin?: string
  destination?: string
  doc?: string
}

export const columns: ColumnDef<EpouchReportType>[] = [
  {
    accessorKey: "awb_number",
    header: "AXB/AWB No",
  },
  {
    accessorKey: "agent_code",
    header: "Agent Code",
  },
  {
    accessorKey: "agent_name",
    header: "Agent Name",
  },
  {
    accessorKey: "airport_type",
    header: "Airport Type",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "doc",
    header: "DOC# in E-Pouch",
  },
]
