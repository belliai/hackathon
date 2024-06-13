"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ExportInventoryType = {
  warehouse_id: string;
  cargo_id: string;
  description: string;
  quantity: string;
  weight: string;
  volume: string;
  location: string;
  arrival_date: string;
  status: string;
  owner: string;
};

export const columns: ColumnDef<ExportInventoryType>[] = [
  {
    header: "Warehouse ID",
    accessorKey: "warehouse_id",
  },
  {
    header: "Cargo ID",
    accessorKey: "cargo_id",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Weight",
    accessorKey: "weight",
  },
  {
    header: "Volume",
    accessorKey: "volume",
  },
  {
    header: "Location",
    accessorKey: "location",
  },
  {
    header: "Arrival Date",
    accessorKey: "arrival_date",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Owner",
    accessorKey: "owner",
  },
];
