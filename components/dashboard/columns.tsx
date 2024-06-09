"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { actionColumn } from "@/app/organize/masters/components/columnItem";
import { DataTableRowActions } from "../data-table/data-table-row-actions";
import DataTableSelectHead from "../data-table/DataTableSelectHead";
import DataTableSelectRow from "../data-table/DataTableSelectRow";

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
    header: ({ table }) => <DataTableSelectHead table={table} />,
    cell: ({ row }) => <DataTableSelectRow row={row} />,
    enableSorting: false,
    enableHiding: false,
    enablePinning: true,
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
      <span className=" font-semibold"> {row.original.status}</span>
    ),
    meta: {
      filterSelectOptions: [
        { value: "AXB Booked & Confirmed", label: "AXB Booked & Confirmed" },
        { value: "Shipped", label: "Shipped" },
        { value: "Delivered", label: "Delivered" },
      ],
    },
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
    enablePinning: true,
  },
];
