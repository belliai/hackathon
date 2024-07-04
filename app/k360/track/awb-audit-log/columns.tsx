"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// awbNumber: "AWB-843497",
//         origin: "City-4273",
//         destination: "City-7386",
//         pcs: 15,
//         wtKg: 46.22,
//         flightDate: "2024-04-22",
//         flightNumber: "Flight-83687",
//         flightOrigin: "City-4273",
//         flightDestination: "City-7386",
//         action: "Deleted",
//         entity: "Company B",
//         mode: "Air",
//         updatedBy: "Dummy User",
//         updatedOn: "2024-05-19"

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
    accessorKey: "awbNumber",
    header: "AWB Number",
    size: 150,
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
    accessorKey: "pcs",
    header: "PCS",
  },
  {
    accessorKey: "wtKg",
    header: "WT (kg)",
  },
  {
    accessorKey: "flightDate",
    header: "Flight Date",
  },
  {
    accessorKey: "flightNumber",
    header: "Flight Number",
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
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "entity",
    header: "Entity",
  },
  {
    accessorKey: "mode",
    header: "Mode",
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
