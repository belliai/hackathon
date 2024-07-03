"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

export type PlannedManifestType = {
  uld?: string
  cart_no?: string
  awb?: string
  pol?: string
  pou?: string
  next_flight?: string
  acc_pcs?: string
  acc_wt?: string
  mft_pcs?: string
  mft_wt?: string
  uom?: string
  scc?: string
  comm_desc?: string
  origin?: string
  dest?: string
  bonded?: string
  remarks?: string
  loading_priority?: string
}

export const plannedColumn: ColumnDef<PlannedManifestType>[] = [
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
    accessorKey: "uld",
    header: "ULD No",
  },
  {
    accessorKey: "cart_no",
    header: "Cart No",
  },
  {
    accessorKey: "awb",
    header: "AWB/AXB",
  },
  {
    accessorKey: "pol",
    header: "POL",
  },
  {
    accessorKey: "pou",
    header: "POU",
  },
  {
    accessorKey: "next_flight",
    header: "Next Flight",
  },
  {
    accessorKey: "acc_wt",
    header: "Acc Wt",
  },
  {
    accessorKey: "acc_pcs",
    header: "Acc Pcs",
  },
  {
    accessorKey: "mft_pcs",
    header: "Mft Pcs",
  },
  {
    accessorKey: "mft_wt",
    header: "Mft Wt",
  },
  {
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "scc",
    header: "SCC",
  },
  {
    accessorKey: "comm_desc",
    header: "Comm Desc",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "dest",
    header: "Dest",
  },
  {
    accessorKey: "bonded",
    header: "Bonded",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "loading_priority",
    header: "Loading Priority",
  },
]
