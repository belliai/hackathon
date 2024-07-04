"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "srNo",
    header: "Sr No",
  },
  {
    accessorKey: "flightNo",
    header: "Flight No",
  },
  {
    accessorKey: "flightDate",
    header: "Flight Date",
  },
  {
    accessorKey: "flightOrigin",
    header: "Flight Origin",
  },
  {
    accessorKey: "flightDestination",
    header: "Flight Destination",
  },
  {
    accessorKey: "tailNo",
    header: "Tail No",
  },
  {
    accessorKey: "aircraftType",
    header: "Aircraft Type",
  },
  {
    accessorKey: "capacityWeight",
    header: "Capacity Weight",
  },
  {
    accessorKey: "capacityVolume",
    header: "Capacity Volume",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "awbCount",
    header: "AWB Count",
  },
  {
    accessorKey: "pieces",
    header: "Pieces",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "cartNo",
    header: "Cart No",
  },
  {
    accessorKey: "uldNo",
    header: "ULD No",
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
  },
  {
    accessorKey: "updatedOn",
    header: "Updated On",
  },
]
