"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "agentName",
    header: "Agent Name",
  },
  {
    accessorKey: "centralAgent",
    header: "Central Agent",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
  },
  {
    accessorKey: "invoiceDate",
    header: "Invoice Date",
  },
  {
    accessorKey: "invoiceAmount",
    header: "Invoice Amount",
    footer: (props) => {
      const total = props.table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => {
          const value = row.getValue("invoiceAmount")
          return (
            sum +
            (typeof value === "string"
              ? parseFloat(value.replace(" USD", ""))
              : 0)
          )
        }, 0)
      return `Total: ${total.toFixed(2)} USD`
    },
  },
  {
    accessorKey: "collectedAmountInvoiceCurrency",
    header: "Collected Amount (Invoice Currency)",
    footer: (props) => {
      const total = props.table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => {
          const value = row.getValue("collectedAmountInvoiceCurrency")
          return (
            sum +
            (typeof value === "string"
              ? parseFloat(value.replace(" USD", ""))
              : 0)
          )
        }, 0)
      return `Total: ${total.toFixed(2)} USD`
    },
  },
  {
    accessorKey: "collectedAmountPaymentCurrency",
    header: "Collected Amount (Payment Currency)",
    footer: (props) => {
      const total = props.table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => {
          const value = row.getValue("collectedAmountPaymentCurrency")
          return (
            sum +
            (typeof value === "string"
              ? parseFloat(value.replace(" EUR", ""))
              : 0)
          )
        }, 0)
      return `Total: ${total.toFixed(2)} EUR`
    },
  },
  {
    accessorKey: "tax",
    header: "Tax",
    footer: (props) => {
      const total = props.table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => {
          const value = row.getValue("tax")
          return (
            sum +
            (typeof value === "string"
              ? parseFloat(value.replace(" USD", ""))
              : 0)
          )
        }, 0)
      return `Total: ${total.toFixed(2)} USD`
    },
  },
  {
    accessorKey: "vat",
    header: "VAT",
    footer: (props) => {
      const total = props.table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => {
          const value = row.getValue("vat")
          return (
            sum +
            (typeof value === "string"
              ? parseFloat(value.replace(" USD", ""))
              : 0)
          )
        }, 0)
      return `Total: ${total.toFixed(2)} USD`
    },
  },
  {
    accessorKey: "paymentType",
    header: "Payment Type",
  },
  {
    accessorKey: "dcmAmount",
    header: "DCM Amount",
    footer: (props) => {
      const total = props.table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => {
          const value = row.getValue("dcmAmount")
          return (
            sum +
            (typeof value === "string"
              ? parseFloat(value.replace(" USD", ""))
              : 0)
          )
        }, 0)
      return `Total: ${total.toFixed(2)} USD`
    },
  },
  {
    accessorKey: "dcmType",
    header: "DCM Type",
  },
  {
    accessorKey: "chequeOrDDOrRTGSNo",
    header: "Cheque/DD/RTGS No.",
  },
  {
    accessorKey: "chequeDate",
    header: "Cheque Date",
  },
  {
    accessorKey: "bankName",
    header: "Bank Name",
  },
  {
    accessorKey: "entryDate",
    header: "Entry Date",
  },
  {
    accessorKey: "depositDate",
    header: "Deposit Date",
  },
]
