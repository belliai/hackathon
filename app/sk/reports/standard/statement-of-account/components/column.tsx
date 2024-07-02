"use client";

import { ColumnDef } from "@tanstack/react-table";

export type StatementAccountType = {
  invoice_number: string;
  invoice_date: string;
  agent_code: string;
  agent_name: string;
  outstanding_amount: string;
  invoice_currency: string;
  invoice_due_date: string;
};

export const columns: ColumnDef<StatementAccountType>[] = [
  {
    header: 'Invoice Number',
    accessorKey: 'invoice_number',
  },
  {
    header: 'Invoice Date',
    accessorKey: 'invoice_date',
  },
  {
    header: 'Agent Code',
    accessorKey: 'agent_code',
  },
  {
    header: 'Agent Name',
    accessorKey: 'agent_name',
  },
  {
    header: 'Outstanding Amount (Invoice Amount)',
    accessorKey: 'outstanding_amount',
  },
  {
    header: 'Invoice Currency',
    accessorKey: 'invoice_currency',
  },
  {
    header: 'Invoice Due Date',
    accessorKey: 'invoice_due_date',
  }
];

export const DUMMY_DATA: StatementAccountType[] = [
  {
    "invoice_number": "INV001",
    "invoice_date": "2024-01-01",
    "agent_code": "AG001",
    "agent_name": "Agent One",
    "outstanding_amount": "1000.00",
    "invoice_currency": "USD",
    "invoice_due_date": "2024-01-31"
  },
  {
    "invoice_number": "INV002",
    "invoice_date": "2024-01-02",
    "agent_code": "AG002",
    "agent_name": "Agent Two",
    "outstanding_amount": "1500.00",
    "invoice_currency": "USD",
    "invoice_due_date": "2024-02-01"
  },
  {
    "invoice_number": "INV003",
    "invoice_date": "2024-01-03",
    "agent_code": "AG003",
    "agent_name": "Agent Three",
    "outstanding_amount": "2000.00",
    "invoice_currency": "USD",
    "invoice_due_date": "2024-02-02"
  },
  {
    "invoice_number": "INV004",
    "invoice_date": "2024-01-04",
    "agent_code": "AG004",
    "agent_name": "Agent Four",
    "outstanding_amount": "2500.00",
    "invoice_currency": "USD",
    "invoice_due_date": "2024-02-03"
  },
  {
    "invoice_number": "INV005",
    "invoice_date": "2024-01-05",
    "agent_code": "AG005",
    "agent_name": "Agent Five",
    "outstanding_amount": "3000.00",
    "invoice_currency": "USD",
    "invoice_due_date": "2024-02-04"
  },
  {
    "invoice_number": "INV006",
    "invoice_date": "2024-01-06",
    "agent_code": "AG006",
    "agent_name": "Agent Six",
    "outstanding_amount": "3500.00",
    "invoice_currency": "USD",
    "invoice_due_date": "2024-02-05"
  },
  {
    "invoice_number": "INV007",
    "invoice_date": "2024-01-07",
    "agent_code": "AG007",
    "agent_name": "Agent Seven",
    "outstanding_amount": "4000.00",
    "invoice_currency": "USD",
    "invoice_due_date": "2024-02-06"
  }
];
