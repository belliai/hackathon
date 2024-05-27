"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ConsigneeReconciliationType = {
  agent_code?: string;
  agent_name?: string;
  execution_date?: string;
  payment_type?: string;
  transaction_details?: string;
  awb_number?: string;
  debit?: string;
  credit?: string;
  balance?: string;
  awb_status?: string;
  transaction_date?: string;
  remarks?: string;
};

export const columns: ColumnDef<ConsigneeReconciliationType>[] = [
  {
    accessorKey: "agent_code",
    header: "Agent Code",
  },
  {
    accessorKey: "agent_name",
    header: "Agent Name",
  },
  {
    accessorKey: "execution_date",
    header: "Execution Date",
  },
  {
    accessorKey: "payment_type",
    header: "Payment Type",
  },
  {
    accessorKey: "transaction_details",
    header: "Transaction Details",
  },
  {
    accessorKey: "awb_number",
    header: "AWB No",
  },
  {
    accessorKey: "debit",
    header: "Debit",
  },
  {
    accessorKey: "credit",
    header: "Credit",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "awb_status",
    header: "AWB Status",
  },
  {
    accessorKey: "transaction_date",
    header: "Transaction Date",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
];
