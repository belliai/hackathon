"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type CargoScreeningType = {
  awb?: string;
  pcs?: string;
  weight?: string;
  agent?: string;
  shipper?: string;
  commodity?: string;
  shc?: string;
  token?: string;
  known_shipper?: string;
  dimension?: string;
  is_accepted?: string;
  acceptance_method?: string;
};

export type CargoUnscreeningType = {
  awb?: string;
  pcs?: string;
  weight?: string;
  dimension?: string;
};

export const columns: ColumnDef<CargoScreeningType>[] = [
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
    accessorKey: "pcs",
    header: "Pcs",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "agent",
    header: "Agent",
  },
  {
    accessorKey: "shipper",
    header: "Shipper",
  },
  {
    accessorKey: "commodity",
    header: "Commodity",
  },
  {
    accessorKey: "shc",
    header: "SHC",
  },
  {
    accessorKey: "token",
    header: "Token",
  },
  {
    accessorKey: "known_shipper",
    header: "Known Shipper",
  },
  {
    accessorKey: "dimension",
    header: "Dimension",
  },
  {
    accessorKey: "is_accepted",
    header: "Accepted",
  },
  {
    accessorKey: "acceptance_method",
    header: "Acceptance Method",
  },
];

export const unscreenedColumns: ColumnDef<CargoUnscreeningType>[] = [
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
    accessorKey: "pcs",
    header: "Pcs",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
];
