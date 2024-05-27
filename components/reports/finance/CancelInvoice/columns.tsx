"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CancelInvoiceType = {
  awb_number?: string;
  agent_code?: string;
  awb_date?: string;
  invoice_number?: string;
  invoice_date?: string;
  invoice_amount?: string;
  cancel_by?: string;
  cancel_date?: string;
};

export const columns: ColumnDef<CancelInvoiceType>[] = [
  {
    accessorKey: "awb_number",
    header: "AWB No",
  },
  {
    accessorKey: "agent_code",
    header: "Agent Code",
  },
  {
    accessorKey: "awb_date",
    header: "AWB Date",
  },
  {
    accessorKey: "invoice_number",
    header: "Invoice Number",
  },
  {
    accessorKey: "invoice_date",
    header: "Invoice Date",
  },
  {
    accessorKey: "invoice_amount",
    header: "Invoice Amount",
  },
  {
    accessorKey: "cancel_by",
    header: "Cancel By",
  },
  {
    accessorKey: "cancel_date",
    header: "Cancel Date",
  },
];
