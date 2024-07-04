"use client"

import { ColumnDef } from "@tanstack/react-table"

export type DiscrepancyListType = {
  awb_number?: string
  origin?: string
  destination?: string
  shipper?: string
  consignee?: string
  declared_weight?: string
  actual_weight?: string
  weight_discrepancy?: string
  declared_pieces?: string
  actual_pieces?: string
  pieces_discrepancy?: string
  flight_number?: string
  flight_date?: string
  remarks?: string
}

export const columns: ColumnDef<DiscrepancyListType>[] = [
  {
    header: "AWB Number",
    accessorKey: "awb_number",
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
    header: "Shipper",
    accessorKey: "shipper",
  },
  {
    header: "Consignee",
    accessorKey: "consignee",
  },
  {
    header: "Declared Weight",
    accessorKey: "declared_weight",
  },
  {
    header: "Actual Weight",
    accessorKey: "actual_weight",
  },
  {
    header: "Weight Discrepancy",
    accessorKey: "weight_discrepancy",
  },
  {
    header: "Declared Pieces",
    accessorKey: "declared_pieces",
  },
  {
    header: "Actual Pieces",
    accessorKey: "actual_pieces",
  },
  {
    header: "Pieces Discrepancy",
    accessorKey: "pieces_discrepancy",
  },
  {
    header: "Flight Number",
    accessorKey: "flight_number",
  },
  {
    header: "Flight Date",
    accessorKey: "flight_date",
  },
  {
    header: "Remarks",
    accessorKey: "remarks",
  },
]
