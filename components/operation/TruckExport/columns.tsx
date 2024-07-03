"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

export type Planned = {
  uld?: string
  cart_no?: string
  awb_no?: string
  pol?: string
  pou?: string
  dest?: string
  next_flight?: string
  acc_pcs?: string
  acc_wt?: string
  mft_pcs?: string
  mft_wt?: string
  uom?: string
  scc?: string
  comm_desc?: string
  origin?: string
  bonded?: string
  remarks?: string
  loading_priority?: string
}

export type Uld = {
  uld_no?: string
  awb_ct?: string
  awb_pcs?: string
  wt?: string
  uom?: string
  fltflag?: string
}

export type Awb = {
  cart_no?: string
  awb?: string
  rem_pcs?: string
  rem_wt?: string
  acc_pcs?: string
  acc_wt?: string
  uom?: string
  unid?: string
  next_flight?: string
}

export const plannedColumn: ColumnDef<Planned>[] = [
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
    header: "ULD",
  },
  {
    accessorKey: "cart_no",
    header: "Cart No",
  },
  {
    accessorKey: "awb_no",
    header: "AWB No/AXB No",
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
    accessorKey: "dest",
    header: "Dest",
  },
  {
    accessorKey: "next_flight",
    header: "Next Flight",
  },
  {
    accessorKey: "acc_pcs",
    header: "Acc Pcs",
  },
  {
    accessorKey: "acc_wt",
    header: "Acc Wt",
  },
  {
    accessorKey: "mft_pcs",
    header: "MFT Pcs",
  },
  {
    accessorKey: "mft_wt",
    header: "MFT Wt",
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

export const uldColumn: ColumnDef<Uld>[] = [
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
    accessorKey: "uld_no",
    header: "ULD No",
  },
  {
    accessorKey: "awb_ct",
    header: "AWB Ct",
  },
  {
    accessorKey: "awb_pcs",
    header: "AWB Pcs",
  },
  {
    accessorKey: "wt",
    header: "Wt",
  },
  {
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "fltflag",
    header: "FLTFLAG",
  },
]

export const awbColumn: ColumnDef<Awb>[] = [
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
    accessorKey: "cart_no",
    header: "Cart No",
  },
  {
    accessorKey: "awb",
    header: "AWB/AXB",
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
  {
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "unid",
    header: "UNID",
  },
  {
    accessorKey: "next_flight",
    header: "Next Flight",
  },
]
