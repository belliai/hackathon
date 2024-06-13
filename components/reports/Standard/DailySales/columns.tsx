"use client";

import { ColumnDef } from "@tanstack/react-table";

export type DailySalesType = {
  awb_no: string;
  from_date: string;
  to_date: string;
  origin: string;
  destination: string;
  carrier: string;
  dsr_type: string;
  flights: string;
  shipper: string;
  shc: string;
  commodity: string;
  agent: string;
  total_sales: string;
  total_weight: string;
  total_pieces: string;
  total_revenue: string;
  total_cost: string;
  net_profit: string;
  updated_on: string;
};

export const columns: ColumnDef<DailySalesType>[] = [
  {
    header: "AWB Number",
    accessorKey: "awb_no",
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
    header: "DSR Type",
    accessorKey: "dsr_type",
  },
  {
    header: "Flights",
    accessorKey: "flights",
  },
  {
    header: "Shipper",
    accessorKey: "shipper",
  },
  {
    header: "SHC",
    accessorKey: "shc",
  },
  {
    header: "Commodity",
    accessorKey: "commodity",
  },
  {
    header: "Agent",
    accessorKey: "agent",
  },
  {
    header: "Total Sales",
    accessorKey: "total_sales",
  },
  {
    header: "Total Weight",
    accessorKey: "total_weight",
  },
  {
    header: "Total Pieces",
    accessorKey: "total_pieces",
  },
  {
    header: "Total Revenue",
    accessorKey: "total_revenue",
  },
  {
    header: "Total Cost",
    accessorKey: "total_cost",
  },
  {
    header: "Net Profit",
    accessorKey: "net_profit",
  },
  {
    header: "Updated On",
    accessorKey: "updated_on",
  },
];
