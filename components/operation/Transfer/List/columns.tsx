"use client"

import { ColumnDef } from "@tanstack/react-table"

export type TransferListType = {
  manifest_id?: string
  transfer_date?: string
  origin?: string
  destination?: string
  shipper?: string
  consignee?: string
  cargo_id?: string
  quantity?: string
  weight?: string
  volume?: string
  handling_info?: string
  special_instructions?: string
  status?: string
}

export const columns: ColumnDef<TransferListType>[] = [
  {
    header: "Manifest ID",
    accessorKey: "manifest_id",
  },
  {
    header: "Transfer Date",
    accessorKey: "transfer_date",
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
    header: "Cargo ID",
    accessorKey: "cargo_id",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
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
    header: "Handling Information",
    accessorKey: "handling_info",
  },
  {
    header: "Special Instructions",
    accessorKey: "special_instructions",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
]
