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
  mb_number?: string // mb number
  piece?: string // piece per mb
  axb?: string // axb number
  origin?: string // origin
  destination?: string // destination
  weight?: string // weight
  mwb?: string // mwb number
  created_at?: string // created at
  updated_at?: string // updated at
}

export type CreateDialog = {
  truck_no?: string
  truck_date?: string
  axb?: string
  comm_code?: string
  comm_desc?: string
  rem_pcs?: string
  rem_wt?: string
  acc_pcs?: string
  acc_wt?: string
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
    accessorKey: "piece",
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

export const createDialogColumn: ColumnDef<CreateDialog>[] = [
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
    accessorKey: "axb",
    header: "AXB Number",
  },
  {
    accessorKey: "truck_no",
    header: "Truck No",
  },
  {
    accessorKey: "truck_date",
    header: "Truck Date",
  },
  {
    accessorKey: "comm_code",
    header: "Comm Code",
  },
  {
    accessorKey: "comm_desc",
    header: "Comm Desc",
  },
  {
    accessorKey: "rem_pcs",
    header: "Rem Pcs",
  },
  {
    accessorKey: "rem_wt",
    header: "Rem Wt",
  },
  {
    accessorKey: "acc_pcs",
    header: "Acc Pcs",
  },
  {
    accessorKey: "acc_wt",
    header: "Acc Wt",
  },
]
