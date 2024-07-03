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
    accessorKey: "referenceNo",
    header: "Reference No.",
  },
  {
    accessorKey: "invoiceNo",
    header: "Invoice No.",
  },
  {
    accessorKey: "invoiceDate",
    header: "Invoice Date",
  },
  {
    accessorKey: "supplierOrigin",
    header: "Supplier Origin",
  },
  {
    accessorKey: "freight",
    header: "Freight",
  },
  {
    accessorKey: "ocdc",
    header: "OCDC",
  },
  {
    accessorKey: "agentName",
    header: "Agent Name",
  },
  {
    accessorKey: "flightNo",
    header: "Flight No.",
  },
  {
    accessorKey: "flightDate",
    header: "Flight Date",
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
    accessorKey: "currency",
    header: "Currency",
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
  {
    accessorKey: "action",
    header: "Action",
  },
]
