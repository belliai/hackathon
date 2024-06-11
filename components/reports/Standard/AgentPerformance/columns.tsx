"use client";

import { ColumnDef } from "@tanstack/react-table";

export type AgentPerformanceType = {
  agent_name?: string;
  agent_no?: string;
  date_from?: string;
  date_to?: string;
  billing_currency?: string;
  freight_revenue?: string;
  commission?: string;
  invoice_tax?: string;
  total_no_of_awb?: string;
  total_awb_fee?: string;
  total_cca_fee?: string;
};

export const columns: ColumnDef<AgentPerformanceType>[] = [
  {
    header: "Agent Name",
    accessorKey: "agent_name",
  },
  {
    header: "Agent No",
    accessorKey: "agent_no",
  },
  {
    header: "Date From",
    accessorKey: "date_from",
  },
  {
    header: "Date To",
    accessorKey: "date_to",
  },
  {
    header: "Billing Currency",
    accessorKey: "billing_currency",
  },
  {
    header: "Freight Revenue",
    accessorKey: "freight_revenue",
  },
  {
    header: "Commission",
    accessorKey: "commission",
  },
  {
    header: "Invoice Tax",
    accessorKey: "invoice_tax",
  },
  {
    header: "Total No Of AWB",
    accessorKey: "total_no_of_awb",
  },
  {
    header: "Total AWB Fee",
    accessorKey: "total_awb_fee",
  },
  {
    header: "Total CCA Fee",
    accessorKey: "total_cca_fee",
  },
];
