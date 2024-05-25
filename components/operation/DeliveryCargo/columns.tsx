"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type DeliveryType = {
  exp_row?: string;
  do?: string;
  collect?: string;
  consignee?: string;
  awb?: string;
  hawb_no?: string;
  origin?: string;
  dest?: string;
  arr_pcs?: string;
  arr_wt?: string;
  uom?: string;
  rem_pcs?: string;
  rem_wt?: string;
  dlrd_pcs?: string;
  dlrd_wt?: string;
  flt?: string;
  flt_dt?: string;
  comm_desc?: string;
  agent?: string;
  accepted_pcs?: string;
  payment_type?: string;
  invoice?: string;
  charges?: string;
  tax?: string;
  total?: string;
  amt_due?: string;
  updated_on?: string;
};

export const columns: ColumnDef<DeliveryType>[] = [
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
    accessorKey: "exp_row",
    header: "Exp Row",
  },
  {
    accessorKey: "do",
    header: "DO#",
  },
  {
    accessorKey: "collect",
    header: "Collect",
  },
  {
    accessorKey: "consignee",
    header: "Consignee",
  },
  {
    accessorKey: "awb",
    header: "AWB#",
  },
  {
    accessorKey: "hawb_no",
    header: "HAWB No",
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
    accessorKey: "arr_pcs",
    header: "Arr Pcs",
  },
  {
    accessorKey: "arr_wt",
    header: "Arr Wt",
  },
  {
    accessorKey: "uom",
    header: "UOM",
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
    accessorKey: "dlrd_pcs",
    header: "Dlrd Pcs",
  },
  {
    accessorKey: "dlrd_wt",
    header: "Dlrd Wt",
  },
  {
    accessorKey: "flt",
    header: "Flt#",
  },
  {
    accessorKey: "flt_dt",
    header: "Flt Dt",
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
];
