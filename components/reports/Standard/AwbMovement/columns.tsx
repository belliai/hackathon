"use client";

import { ColumnDef } from "@tanstack/react-table";

export type AwbMovementType = {
  awb_prefix: string;
  awb_number: string;
  from_date: string;
  to_date: string;
  flight_prefix: string;
  flight_id: string;
  origin: string;
  destination: string;
  country: string;
  region: string;
  agent_code: string;
  status: string;
};

export const columns: ColumnDef<AwbMovementType>[] = [
  {
    header: "AWB Prefix",
    accessorKey: "awb_prefix",
  },
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
    header: "Flight Prefix",
    accessorKey: "flight_prefix",
  },
  {
    header: "Flight ID",
    accessorKey: "flight_id",
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
    header: "Country",
    accessorKey: "country",
  },
  {
    header: "Region",
    accessorKey: "region",
  },
  {
    header: "Agent Code",
    accessorKey: "agent_code",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];
