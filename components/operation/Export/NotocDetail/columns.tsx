"use client"

import { ColumnDef } from "@tanstack/react-table"

export type NotocDetailType = {
  item_no: string
  description: string
  quantity: string
  weight: string
  volume: string
  location: string
  handling_info: string
  special_instructions: string
  hazard_class: string
  un_number: string
}

export const columns: ColumnDef<NotocDetailType>[] = [
  {
    header: "Item No",
    accessorKey: "item_no",
  },
  {
    header: "Description",
    accessorKey: "description",
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
    header: "Location",
    accessorKey: "location",
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
    header: "Hazard Class",
    accessorKey: "hazard_class",
  },
  {
    header: "UN Number",
    accessorKey: "un_number",
  },
]
