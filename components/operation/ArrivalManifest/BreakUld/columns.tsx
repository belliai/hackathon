"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type BreakAwbType = {
  awb?: string;
  priority?: string;
  pol?: string;
  pou?: string;
  build_pcs?: string;
  build_wgt?: string;
  acc_pcs?: string;
  acc_wt?: string;
  arr_pcs?: string;
  arr_wt?: string;
  flight_no?: string;
  flight_date?: string;
};

export type BreakUldType = {
  uld?: string;
  awb_count?: string;
  pieces?: string;
  weight?: string;
  uom?: string;
  location?: string;
};

export const awbColumn: ColumnDef<BreakAwbType>[] = [
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
    accessorKey: "awb",
    header: "AWB#",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "pol",
    header: "POL",
  },
  {
    accessorKey: "pou",
    header: "POU",
  },
  {
    accessorKey: "build_pcs",
    header: "Build Pcs",
  },
  {
    accessorKey: "build_wgt",
    header: "Build Wgt",
  },
  {
    accessorKey: "acc_pcs",
    header: "Acc Pcs",
  },
  {
    accessorKey: "acc_wt",
    header: "Acc Wt",
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
    accessorKey: "flight_no",
    header: "Flight No",
  },
  {
    accessorKey: "flight_date",
    header: "Flight Date",
  },
];

export const uldColumn: ColumnDef<BreakUldType>[] = [
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
    accessorKey: "uld",
    header: "ULD No",
  },
  {
    accessorKey: "awb_count",
    header: "AWB Count",
  },
  {
    accessorKey: "pieces",
    header: "Pieces",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
];
