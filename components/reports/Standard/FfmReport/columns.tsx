"use client";

import { ColumnDef } from "@tanstack/react-table";

export type FfmReportType = {
  awb_number: string;
  from_date: string;
  to_date: string;
  origin: string;
  destination: string;
  carrier: string;
  flight_number: string;
  departure_time: string;
  arrival_time: string;
  pieces: number;
  weight: number;
  volume: number;
  status: string;
  updated_on: string;
};

export const columns: ColumnDef<FfmReportType>[] = [
  {
    header: "AWB Number",
    accessorKey: "awb_number",
  },
  {
    header: "From Date",
    accessorKey: "from_date",
  },
  {
    header: "To Date",
    accessorKey: "to_date",
  },
  {
    header: "Origin",
    accessorKey: "origin",
  },
  {
    header: "Destination",
    accessorKey: "destination",
  },
  {
    header: "Carrier",
    accessorKey: "carrier",
  },
  {
    header: "Flight Number",
    accessorKey: "flight_number",
  },
  {
    header: "Departure Time",
    accessorKey: "departure_time",
  },
  {
    header: "Arrival Time",
    accessorKey: "arrival_time",
  },
  {
    header: "Pieces",
    accessorKey: "pieces",
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
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Updated On",
    accessorKey: "updated_on",
  }
];
