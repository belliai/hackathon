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
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "agentName",
    header: "Agent Name",
  },
  {
    accessorKey: "invoiceNo",
    header: "Invoice No.",
  },
  {
    accessorKey: "invoiceCreateDate",
    header: "Invoice Create Date",
  },
  {
    accessorKey: "closedDate",
    header: "Closed Date",
  },
  {
    accessorKey: "invoiceAmount",
    header: "Invoice Amount",
  },
  {
    accessorKey: "collectedAmount",
    header: "Collected Amount",
  },
  {
    accessorKey: "credit",
    header: "Credit",
  },
  {
    accessorKey: "debit",
    header: "Debit",
  },
  {
    accessorKey: "invoiceBalance",
    header: "Invoice Balance",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "countryCode",
    header: "Country Code",
  },
  {
    accessorKey: "cassAgent",
    header: "CASS Agent",
  },
  {
    accessorKey: "exportSwanErp",
    header: "Export SWAN ERP",
  },
  {
    accessorKey: "salesMonth",
    header: "Sales Month",
  },
  {
    accessorKey: "actualInvoiceNo",
    header: "Actual Invoice No.",
  },
  {
    accessorKey: "irnNo",
    header: "IRN No.",
  },
]
