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
    accessorKey: "awbFlight",
    header: "AWB/Flight",
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
    accessorKey: "messageCategory",
    header: "Message Category",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
  },
  {
    accessorKey: "communicationType",
    header: "Communication Type",
  },
  {
    accessorKey: "messageType",
    header: "Message Type",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "processed",
    header: "Processed",
  },
  {
    accessorKey: "triggerDate",
    header: "Trigger Date",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
]
