"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "axbNo",
    header: "AXB No.",
  },
  {
    accessorKey: "motherbagNo",
    header: "Motherbag No.",
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
    accessorKey: "motherBagWeight",
    header: "Mother Bag Weight",
  },
  {
    accessorKey: "flightCode",
    header: "Flight Code",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
]
