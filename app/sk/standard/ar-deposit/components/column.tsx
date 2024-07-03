"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ARDepositColumnType = {
  agent_code: string
  agent_name: string
  execution_date: string
  payment_type: string
  transaction_details: string
  awb_no: string
  debit: string
  credit: string
  balance: string
  awb_status: string
  transaction_date: string
  remarks: string
}

export const columns: ColumnDef<ARDepositColumnType>[] = [
  {
    header: "Agent Code",
    accessorKey: "agent_code",
  },
  {
    header: "Agent Name",
    accessorKey: "agent_name",
  },
  {
    header: "Execution Date",
    accessorKey: "execution_date",
  },
  {
    header: "Payment Type",
    accessorKey: "payment_type",
  },
  {
    header: "Transaction Details",
    accessorKey: "transaction_details",
  },
  {
    header: "AWB No",
    accessorKey: "awb_no",
  },
  {
    header: "Debit",
    accessorKey: "debit",
  },
  {
    header: "Credit",
    accessorKey: "credit",
  },
  {
    header: "Balance",
    accessorKey: "balance",
  },
  {
    header: "AWB Status",
    accessorKey: "awb_status",
  },
  {
    header: "Transaction Date",
    accessorKey: "transaction_date",
  },
  {
    header: "Remarks",
    accessorKey: "remarks",
  },
]

export const DUMMY_DATA: ARDepositColumnType[] = [
  {
    agent_code: "A001",
    agent_name: "Agent Smith",
    execution_date: "2024-01-01",
    payment_type: "Credit Card",
    transaction_details: "Service Charge",
    awb_no: "AWB12345678",
    debit: "100.00",
    credit: "0.00",
    balance: "100.00",
    awb_status: "Pending",
    transaction_date: "2024-01-01",
    remarks: "No remarks",
  },
  {
    agent_code: "A002",
    agent_name: "Agent Johnson",
    execution_date: "2024-01-02",
    payment_type: "Bank Transfer",
    transaction_details: "Freight Charge",
    awb_no: "AWB87654321",
    debit: "0.00",
    credit: "200.00",
    balance: "-200.00",
    awb_status: "Completed",
    transaction_date: "2024-01-02",
    remarks: "No remarks",
  },
  {
    agent_code: "A003",
    agent_name: "Agent Brown",
    execution_date: "2024-01-03",
    payment_type: "Cash",
    transaction_details: "Handling Fee",
    awb_no: "AWB12349876",
    debit: "50.00",
    credit: "0.00",
    balance: "50.00",
    awb_status: "Pending",
    transaction_date: "2024-01-03",
    remarks: "No remarks",
  },
  {
    agent_code: "A004",
    agent_name: "Agent Davis",
    execution_date: "2024-01-04",
    payment_type: "Credit Card",
    transaction_details: "Service Charge",
    awb_no: "AWB87651234",
    debit: "150.00",
    credit: "0.00",
    balance: "150.00",
    awb_status: "Pending",
    transaction_date: "2024-01-04",
    remarks: "No remarks",
  },
  {
    agent_code: "A005",
    agent_name: "Agent Wilson",
    execution_date: "2024-01-05",
    payment_type: "Bank Transfer",
    transaction_details: "Freight Charge",
    awb_no: "AWB12348765",
    debit: "0.00",
    credit: "250.00",
    balance: "-250.00",
    awb_status: "Completed",
    transaction_date: "2024-01-05",
    remarks: "No remarks",
  },
  {
    agent_code: "A006",
    agent_name: "Agent Moore",
    execution_date: "2024-01-06",
    payment_type: "Cash",
    transaction_details: "Handling Fee",
    awb_no: "AWB87652341",
    debit: "75.00",
    credit: "0.00",
    balance: "75.00",
    awb_status: "Pending",
    transaction_date: "2024-01-06",
    remarks: "No remarks",
  },
  {
    agent_code: "A007",
    agent_name: "Agent Taylor",
    execution_date: "2024-01-07",
    payment_type: "Credit Card",
    transaction_details: "Service Charge",
    awb_no: "AWB12347658",
    debit: "125.00",
    credit: "0.00",
    balance: "125.00",
    awb_status: "Pending",
    transaction_date: "2024-01-07",
    remarks: "No remarks",
  },
]
