"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export type CtmInType = {
  ctm?: string
  awb?: string
  carrier_code?: string
  to_carrier_code?: string
  flt_origin?: string
  flt_destination?: string
  origin?: string
  destination?: string
  ship_details?: string
}

export const columns: ColumnDef<CtmInType>[] = [
  {
    accessorKey: "ctn",
    header: "CTM#",
  },
  {
    accessorKey: "awb",
    header: "AWB#",
  },
  {
    accessorKey: "carrier_code",
    header: "Carrier Code",
  },
  {
    accessorKey: "to_carrier_code",
    header: "To Carrier Code",
  },
  {
    accessorKey: "flt_origin",
    header: "Flt Origin",
  },
  {
    accessorKey: "flt_destination",
    header: "Flt Destination",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "ship_details",
    header: "Ship Details",
  },
]
