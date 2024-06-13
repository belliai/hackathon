"use client";

import { ColumnDef } from "@tanstack/react-table";

export type DailyCollctionType = {
  awb_number: string;
  from_date: string;
  from_time: string;
  to_date: string;
  to_time: string;
  station: string;
  flights: string;
  carrier: string;
};

export const columns: ColumnDef<DailyCollctionType>[] = [
  {
    header: "AWB Number",
    accessorKey: "awb_number",
  },
  {
    header: "From Date",
    accessorKey: "from_date",
  },
  {
    header: "From Time",
    accessorKey: "from_time",
  },
  {
    header: "To Date",
    accessorKey: "to_date",
  },
  {
    header: "To Time",
    accessorKey: "to_time",
  },
  {
    header: "Station",
    accessorKey: "station",
  },
  {
    header: "Flights",
    accessorKey: "flights",
  },
  {
    header: "Carrier",
    accessorKey: "carrier",
  },
];
