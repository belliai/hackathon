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

export type Order = {
  mb_number?: string
  truck_number?: string
  via_station?: string
  assign_date?: string
  piece_per_mb?: string
  axb?: string
  origin?: string
  destination?: string
  weight?: string
  mwb?: string
  status?: string
  created_at?: string
  updated_at?: string
}

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-white"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-zinc-500"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "mb_number",
    header: "MB Number",
  },
  {
    accessorKey: "truck_number",
    header: "Truck Number",
  },
  {
    accessorKey: "via_station",
    header: "Via Station",
  },
  {
    accessorKey: "assign_date",
    header: "Assign Date",
  },
  {
    accessorKey: "piece_per_mb",
    header: "Piece Per MB",
  },
  {
    accessorKey: "axb",
    header: "AXB Number",
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
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "mwb",
    header: "MWB",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="bg-button-secondary text-white hover:bg-button-secondary/80"
          >
            <span className="h-4 w-4">
              <DotsHorizontalIcon />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>View Mother Bag</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
