"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ImportSummaryType = {
  cargo_id?: string
  shipper?: string
  consignee?: string
  origin?: string
  destination?: string
  pieces?: string
  weight?: string
  volume?: string
  commodity?: string
  chargeable_weight?: string
  freight_charges?: string
  other_charges?: string
  total_charges?: string
  currency?: string
  flight_number?: string
  flight_date?: string
  status?: string
}

export const columns: ColumnDef<ImportSummaryType>[] = [
  {
    header: "Cargo ID",
    accessorKey: "cargo_id",
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
    header: "Origin",
    accessorKey: "origin",
  },
  {
    header: "Destination",
    accessorKey: "destination",
  },
  {
    header: "Pieces",
    accessorKey: "pieces",
  },
  {
    header: "Weight",
    accessorKey: "weight",
  },
  {
    header: "Volume",
    accessorKey: "volume",
  },
  {
    header: "Commodity",
    accessorKey: "commodity",
  },
  {
    header: "Chargeable Weight",
    accessorKey: "chargeable_weight",
  },
  {
    header: "Freight Charges",
    accessorKey: "freight_charges",
  },
  {
    header: "Other Charges",
    accessorKey: "other_charges",
  },
  {
    header: "Total Charges",
    accessorKey: "total_charges",
  },
  {
    header: "Currency",
    accessorKey: "currency",
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
    header: "Status",
    accessorKey: "status",
  },
]
