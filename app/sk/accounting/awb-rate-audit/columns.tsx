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
    accessorKey: "awbNo",
    header: "AWB No",
  },
  {
    accessorKey: "awbDate",
    header: "AWB Date",
  },
  {
    accessorKey: "billTo",
    header: "Bill To",
  },
  {
    accessorKey: "shippingAgent",
    header: "Shipping Agent",
  },
  {
    accessorKey: "shipperCode",
    header: "Shipper Code",
  },
  {
    accessorKey: "commCode",
    header: "Comm Code",
  },
  {
    accessorKey: "org",
    header: "ORG",
  },
  {
    accessorKey: "dest",
    header: "DEST",
  },
  {
    accessorKey: "chargeWt",
    header: "Charge WT",
  },
  {
    accessorKey: "iataFreight",
    header: "IATA Freight",
  },
  {
    accessorKey: "mktFreight",
    header: "MKT Freight",
  },
  {
    accessorKey: "spotFreight",
    header: "Spot Freight",
  },
  {
    accessorKey: "ocdc",
    header: "OCDC",
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
  },
  {
    accessorKey: "tax",
    header: "Tax",
  },
  {
    accessorKey: "comm",
    header: "Comm",
  },
  {
    accessorKey: "incentive",
    header: "Incentive",
  },
  {
    accessorKey: "iataTotal",
    header: "IATA Total",
  },
  {
    accessorKey: "mktTotal",
    header: "MKT Total",
  },
  {
    accessorKey: "final",
    header: "Final",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "spotRate",
    header: "Spot Rate",
  },
  {
    accessorKey: "invoiceNo",
    header: "Invoice No",
  },
  {
    accessorKey: "mode",
    header: "Mode",
  },
  {
    accessorKey: "interlineStatus",
    header: "Interline Status",
  },
]
