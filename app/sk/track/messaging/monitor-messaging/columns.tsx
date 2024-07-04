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
    accessorKey: "messageType",
    header: "Message Type",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "mailID",
    header: "Mail ID",
  },
  {
    accessorKey: "processed",
    header: "Processed",
    cell: ({ row }) => (
      <Checkbox
        checked={row.original.processed}
        disabled
        aria-label="Processed"
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
  },
  {
    accessorKey: "updatedDate",
    header: "Updated Date",
  },
  {
    accessorKey: "error",
    header: "Error",
  },
]
