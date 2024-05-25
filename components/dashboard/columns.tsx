"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { actionColumn } from "@/app/organize/masters/components/columnItem";
import { DataTableRowActions } from "../data-table/data-table-row-actions";

export type Order = {
  axb: string; // airway bill
  org: string; // origin
  des: string; // destination
  cusc: string; // customer code
  status: string;
  mode: string;
  // NUMBERS
  grosswt: number;
  total: number; // total number of pieces
  // DATETIME
  // todo: change to date object
  bookdate: string; // booking date and time
  execdate: string; // execution date and time
  fflightassign: string; // first-flight-assign date and time
  delivery: string; // delivery date and time
};

export const columns: ColumnDef<Order>[] = [
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
    accessorKey: "axb",
    header: "AXB",
  },
  {
    accessorKey: "org",
    header: "Organization",
  },
  {
    accessorKey: "des",
    header: "Des",
  },
  {
    accessorKey: "cusc",
    header: "Cust. Code",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="text-white font-semibold"> {row.original.status}</span>
    ),
  },
  {
    accessorKey: "mode",
    header: "Mode",
  },
  {
    accessorKey: "grosswt",
    header: "Gross Wt",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "bookdate",
    header: "Book Date",
  },
  {
    accessorKey: "execdate",
    header: "Exec Date",
  },
  {
    accessorKey: "fflightassign",
    header: "First Flight Assign",
  },
  {
    accessorKey: "delivery",
    header: "Delivery",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions />,
  },
];
