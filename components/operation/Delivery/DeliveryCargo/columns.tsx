"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

export type AwbType = {
  do_number: string
  collect: string
  consignee: string
  awb_number: string
  hawb_number: string
  custom_check: string
  custom_code: string
  origin: string
  destination: string
  arr_pcs: string
  arr_wt: string
  uom: string
  dlr_pcs: string
  dlr_wt: string
  dlrd_pcs: string
  dlrd_wt: string
  rem_pcs: string
  flt_number: string
  flt_date: string
  comm_desc?: string
  agent?: string
  accepted_pcs?: string
  payment_type?: string
  invoice?: string
  charges?: string
  tax?: string
  total?: string
  amt_due?: string
  updated_on?: string
}

export type UldType = {
  do_number: string
  collect: string
  consignee: string
  uld: string
  awb: string
  awb_ct: string
  custom_check: string
  custom_code: string
  origin: string
  destination: string
  arr_pcs: string
  arr_wt: string
  uom: string
  dlr_pcs: string
  dlr_wt: string
  dlrd_pcs: string
  rem_pcs: string
  rem_wt: string
  dlrd_wt: string
  flt_number: string
  flt_date: string
  comm_desc?: string
  agent?: string
  accepted_pcs?: string
  payment_type?: string
  invoice?: string
  charges?: string
  tax?: string
  total?: string
  amt_due?: string
  updated_on?: string
}

export const awbColumn: ColumnDef<AwbType>[] = [
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
    header: "DO#",
    accessorKey: "do_number",
  },
  {
    header: "Collect",
    accessorKey: "collect",
  },
  {
    header: "Consignee",
    accessorKey: "consignee",
  },
  {
    header: "AWB#",
    accessorKey: "awb_number",
  },
  {
    header: "HAWB No",
    accessorKey: "hawb_number",
  },
  {
    header: "Custom Check",
    accessorKey: "custom_check",
  },
  {
    header: "Custom Code",
    accessorKey: "custom_code",
  },
  {
    header: "Origin",
    accessorKey: "origin",
  },
  {
    header: "Dest",
    accessorKey: "destination",
  },
  {
    header: "Arr Pcs",
    accessorKey: "arr_pcs",
  },
  {
    header: "Arr Wt",
    accessorKey: "arr_wt",
  },
  {
    header: "UOM",
    accessorKey: "uom",
  },
  {
    header: "Dlr Pcs",
    accessorKey: "dlr_pcs",
  },
  {
    header: "Dlr Wt",
    accessorKey: "dlr_wt",
  },
  {
    header: "Dlrd Pcs",
    accessorKey: "dlrd_pcs",
  },
  {
    header: "Dlrd Wt",
    accessorKey: "dlrd_wt",
  },
  {
    header: "Rem Pcs",
    accessorKey: "rem_pcs",
  },
  {
    header: "Flt#",
    accessorKey: "flt_number",
  },
  {
    header: "Flt Dt",
    accessorKey: "flt_date",
  },
  {
    accessorKey: "comm_desc",
    header: "Comm Desc",
  },
  {
    accessorKey: "agent",
    header: "Agent",
  },
  {
    accessorKey: "accepted_pcs",
    header: "Accepted Pcs",
  },
  {
    accessorKey: "payment_type",
    header: "Payment Type",
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
  },
  {
    accessorKey: "charges",
    header: "Charges",
  },
  {
    accessorKey: "tax",
    header: "Tax",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "amt_due",
    header: "Amt Due",
  },
  {
    accessorKey: "updated_on",
    header: "Updated On",
  },
]

export const uldColumn: ColumnDef<UldType>[] = [
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
    header: "DO#",
    accessorKey: "do_number",
  },
  {
    header: "Collect",
    accessorKey: "collect",
  },
  {
    header: "Consignee",
    accessorKey: "consignee",
  },
  {
    header: "ULD",
    accessorKey: "uld",
  },
  {
    header: "AWB",
    accessorKey: "awb",
  },
  {
    header: "AWB Ct",
    accessorKey: "awb_ct",
  },
  {
    header: "Custom Check",
    accessorKey: "custom_check",
  },
  {
    header: "Custom Code",
    accessorKey: "custom_code",
  },
  {
    header: "Origin",
    accessorKey: "origin",
  },
  {
    header: "Dest",
    accessorKey: "destination",
  },
  {
    header: "Arr Pcs",
    accessorKey: "arr_pcs",
  },
  {
    header: "Arr Wt",
    accessorKey: "arr_wt",
  },
  {
    header: "UOM",
    accessorKey: "uom",
  },
  {
    header: "Dlr Pcs",
    accessorKey: "dlr_pcs",
  },
  {
    header: "Dlr Wt",
    accessorKey: "dlr_wt",
  },
  {
    header: "Dlrd Pcs",
    accessorKey: "dlrd_pcs",
  },
  {
    header: "Rem Pcs",
    accessorKey: "rem_pcs",
  },
  {
    header: "Rem Wt",
    accessorKey: "rem_wt",
  },
  {
    header: "Dlrd Wt",
    accessorKey: "dlrd_wt",
  },
  {
    header: "Flt#",
    accessorKey: "flt_number",
  },
  {
    header: "Flt Dt",
    accessorKey: "flt_date",
  },
  {
    accessorKey: "comm_desc",
    header: "Comm Desc",
  },
  {
    accessorKey: "agent",
    header: "Agent",
  },
  {
    accessorKey: "accepted_pcs",
    header: "Accepted Pcs",
  },
  {
    accessorKey: "payment_type",
    header: "Payment Type",
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
  },
  {
    accessorKey: "charges",
    header: "Charges",
  },
  {
    accessorKey: "tax",
    header: "Tax",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "amt_due",
    header: "Amt Due",
  },
  {
    accessorKey: "updated_on",
    header: "Updated On",
  },
]
