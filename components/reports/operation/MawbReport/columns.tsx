"use client"

import { ColumnDef } from "@tanstack/react-table"

export type MawbReportType = {
  mawb_number?: string
  date_shipped?: string
  shipper_name?: string
  consignee_name?: string
  origin?: string
  destination?: string
  total_weight_kg?: number
  total_pieces?: number
  service_type?: string
  estimated_charge?: number
}

export const columns: ColumnDef<MawbReportType>[] = [
  {
    header: "MAWB Number",
    accessorKey: "mawb_number",
  },
  {
    header: "Date Shipped",
    accessorKey: "date_shipped",
  },
  {
    header: "Shipper Name",
    accessorKey: "shipper_name",
  },
  {
    header: "Consignee Name",
    accessorKey: "consignee_name",
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
    header: "Total Weight (kg)",
    accessorKey: "total_weight_kg",
  },
  {
    header: "Total Pieces",
    accessorKey: "total_pieces",
  },
  {
    header: "Service Type",
    accessorKey: "service_type",
  },
  {
    header: "Estimated Charge",
    accessorKey: "estimated_charge",
  },
]
