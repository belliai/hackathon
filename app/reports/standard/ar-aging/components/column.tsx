"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ARAgingColumnType = {
  agent_code: string;
  agent_name: string;
  invoice_date: string;
  due_date: string;
  transaction_type: string;
  invoice_number: string;
  billing_currency: string;
  invoice_amount: string;
  balance_as_of: string;
  outstanding_amount_0_15: string;
  outstanding_amount_16_30: string;
  outstanding_amount_31_60: string;
  remarks: string;
};

export const columns: ColumnDef<ARAgingColumnType>[] = [
  {
    header: 'Agent Code',
    accessorKey: 'agent_code',
  },
  {
    header: 'Agent Name',
    accessorKey: 'agent_name',
  },
  {
    header: 'Invoice Date',
    accessorKey: 'invoice_date',
  },
  {
    header: 'Due Date',
    accessorKey: 'due_date',
  },
  {
    header: 'Transaction Type',
    accessorKey: 'transaction_type',
  },
  {
    header: 'Invoice Number',
    accessorKey: 'invoice_number',
  },
  {
    header: 'Billing Currency',
    accessorKey: 'billing_currency',
  },
  {
    header: 'Invoice Amount',
    accessorKey: 'invoice_amount',
  },
  {
    header: 'Balance As of (01/05/2024)',
    accessorKey: 'balance_as_of',
  },
  {
    header: 'Outstanding Amount Between 0-15',
    accessorKey: 'outstanding_amount_0_15',
  },
  {
    header: 'Outstanding Amount Between 16-30',
    accessorKey: 'outstanding_amount_16_30',
  },
  {
    header: 'Outstanding Amount Between 31-60',
    accessorKey: 'outstanding_amount_31_60',
  },
  {
    header: 'Remarks',
    accessorKey: 'remarks',
  }
];

export const DUMMY_DATA: ARAgingColumnType[] = [
  {
    "agent_code": "A001",
    "agent_name": "Agent Smith",
    "invoice_date": "2024-01-01",
    "due_date": "2024-01-15",
    "transaction_type": "Service",
    "invoice_number": "INV123456",
    "billing_currency": "USD",
    "invoice_amount": "1000.00",
    "balance_as_of": "2024-01-05",
    "outstanding_amount_0_15": "100.00",
    "outstanding_amount_16_30": "50.00",
    "outstanding_amount_31_60": "25.00",
    "remarks": "Payment pending"
  },
  {
    "agent_code": "A002",
    "agent_name": "Agent Johnson",
    "invoice_date": "2024-01-02",
    "due_date": "2024-01-16",
    "transaction_type": "Product",
    "invoice_number": "INV654321",
    "billing_currency": "EUR",
    "invoice_amount": "2000.00",
    "balance_as_of": "2024-01-06",
    "outstanding_amount_0_15": "200.00",
    "outstanding_amount_16_30": "100.00",
    "outstanding_amount_31_60": "50.00",
    "remarks": "Partial payment received"
  },
  {
    "agent_code": "A003",
    "agent_name": "Agent Brown",
    "invoice_date": "2024-01-03",
    "due_date": "2024-01-17",
    "transaction_type": "Consulting",
    "invoice_number": "INV789012",
    "billing_currency": "GBP",
    "invoice_amount": "1500.00",
    "balance_as_of": "2024-01-07",
    "outstanding_amount_0_15": "150.00",
    "outstanding_amount_16_30": "75.00",
    "outstanding_amount_31_60": "37.50",
    "remarks": "Invoice under review"
  },
  {
    "agent_code": "A004",
    "agent_name": "Agent Davis",
    "invoice_date": "2024-01-04",
    "due_date": "2024-01-18",
    "transaction_type": "Service",
    "invoice_number": "INV345678",
    "billing_currency": "USD",
    "invoice_amount": "3000.00",
    "balance_as_of": "2024-01-08",
    "outstanding_amount_0_15": "300.00",
    "outstanding_amount_16_30": "150.00",
    "outstanding_amount_31_60": "75.00",
    "remarks": "Awaiting approval"
  },
  {
    "agent_code": "A005",
    "agent_name": "Agent Wilson",
    "invoice_date": "2024-01-05",
    "due_date": "2024-01-19",
    "transaction_type": "Product",
    "invoice_number": "INV901234",
    "billing_currency": "EUR",
    "invoice_amount": "2500.00",
    "balance_as_of": "2024-01-09",
    "outstanding_amount_0_15": "250.00",
    "outstanding_amount_16_30": "125.00",
    "outstanding_amount_31_60": "62.50",
    "remarks": "Pending clearance"
  },
  {
    "agent_code": "A006",
    "agent_name": "Agent Moore",
    "invoice_date": "2024-01-06",
    "due_date": "2024-01-20",
    "transaction_type": "Consulting",
    "invoice_number": "INV567890",
    "billing_currency": "GBP",
    "invoice_amount": "3500.00",
    "balance_as_of": "2024-01-10",
    "outstanding_amount_0_15": "350.00",
    "outstanding_amount_16_30": "175.00",
    "outstanding_amount_31_60": "87.50",
    "remarks": "Awaiting confirmation"
  },
  {
    "agent_code": "A007",
    "agent_name": "Agent Taylor",
    "invoice_date": "2024-01-07",
    "due_date": "2024-01-21",
    "transaction_type": "Service",
    "invoice_number": "INV234567",
    "billing_currency": "USD",
    "invoice_amount": "4000.00",
    "balance_as_of": "2024-01-11",
    "outstanding_amount_0_15": "400.00",
    "outstanding_amount_16_30": "200.00",
    "outstanding_amount_31_60": "100.00",
    "remarks": "Invoice generated"
  }
];
