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
    accessorKey: "ccaNo",
    header: "CCA No.",
  },
  {
    accessorKey: "awbNo",
    header: "AWB No.",
  },
  {
    accessorKey: "paymode",
    header: "Paymode",
  },
  {
    accessorKey: "invoiceNo",
    header: "Invoice No.",
  },
  {
    accessorKey: "agentCode",
    header: "Agent Code",
  },
  {
    accessorKey: "ccaDate",
    header: "CCA Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "currentGrossWt",
    header: "Current Gross Wt.",
  },
  {
    accessorKey: "currentChargableWt",
    header: "Current Chargable Wt.",
  },
  {
    accessorKey: "currentFreight",
    header: "Current Freight",
  },
  {
    accessorKey: "currentOcdc",
    header: "Current OCDC",
  },
  {
    accessorKey: "currentOcda",
    header: "Current OCDA",
  },
  {
    accessorKey: "currentSt",
    header: "Current ST",
  },
  {
    accessorKey: "currentTotal",
    header: "Current Total",
  },
  {
    accessorKey: "revisedGrossWt",
    header: "Revised Gross Wt.",
  },
  {
    accessorKey: "revisedChargableWt",
    header: "Revised Chargable Wt.",
  },
  {
    accessorKey: "revisedFreight",
    header: "Revised Freight",
  },
  {
    accessorKey: "revisedOcdc",
    header: "Revised OCDC",
  },
  {
    accessorKey: "revisedOcda",
    header: "Revised OCDA",
  },
  {
    accessorKey: "revisedSt",
    header: "Revised ST",
  },
  {
    accessorKey: "revisedTotal",
    header: "Revised Total",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
]
