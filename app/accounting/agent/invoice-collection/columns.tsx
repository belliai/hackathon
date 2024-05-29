"use client"

import { ColumnDef } from "@tanstack/react-table";
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
        header: "Agent Name"
    },
    {
        accessorKey: "centralAgent",
        header: "Central Agent"
    },
    {
        accessorKey: "localAgent",
        header: "Local Agent"
    },
    {
        accessorKey: "invoiceNo",
        header: "Invoice No."
    },
    {
        accessorKey: "invoiceDate",
        header: "Invoice Date"
    },
    {
        accessorKey: "invoiceAmount",
        header: "Invoice Amount"
    },
    {
        accessorKey: "tds",
        header: "TDS"
    },
    {
        accessorKey: "collectedAmount",
        header: "Collected Amount"
    },
    {
        accessorKey: "paymentType",
        header: "Payment Type"
    },
    {
        accessorKey: "dcmAmount",
        header: "DCM Amount"
    },
    {
        accessorKey: "dcmType",
        header: "DCM Type"
    },
    {
        accessorKey: "chequeDDRTGSNo",
        header: "Cheque/DD/RTGS No."
    },
    {
        accessorKey: "chequeDate",
        header: "Cheque Date"
    },
    {
        accessorKey: "bankName",
        header: "Bank Name"
    },
    {
        accessorKey: "paymentDate",
        header: "Payment Date"
    },
    {
        accessorKey: "pendingAmount",
        header: "Pending Amount"
    },
    {
        accessorKey: "ppRemarks",
        header: "PP Remarks"
    },
    {
        accessorKey: "currency",
        header: "Currency"
    },
    {
        accessorKey: "rePrint",
        header: "RePrint"
    },
    {
        accessorKey: "tinNo",
        header: "TIN No."
    },
    {
        accessorKey: "user",
        header: "User"
    },
    {
        accessorKey: "postedStatus",
        header: "Posted Status"
    },
    {
        accessorKey: "invoiceDetails",
        header: "Invoice Details"
    },
    {
        accessorKey: "payMode",
        header: "Pay Mode"
    }
];
