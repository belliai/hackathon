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
        accessorKey: "cnRnDnNo",
        header: "CN/RN/DN No."
    },
    {
        accessorKey: "cnRnDnInvoiceDate",
        header: "CN/RN/DN Invoice Date"
    },
    {
        accessorKey: "cnRnDnFreight",
        header: "CN/RN/DN Freight"
    },
    {
        accessorKey: "cnRnDnOcdc",
        header: "CN/RN/DN OCDC"
    },
    {
        accessorKey: "cnRnDnTax",
        header: "CN/RN/DN Tax"
    },
    {
        accessorKey: "cnRnDnAmount",
        header: "CN/RN/DN Amount"
    },
    {
        accessorKey: "gstinNo",
        header: "GSTIN No."
    },
    {
        accessorKey: "originalInvoice",
        header: "Original Invoice"
    },
    {
        accessorKey: "originalInvoiceDate",
        header: "Original Invoice Date"
    },
    {
        accessorKey: "originalFreight",
        header: "Original Freight"
    },
    {
        accessorKey: "originalOcdc",
        header: "Original OCDC"
    },
    {
        accessorKey: "originalTax",
        header: "Original Tax"
    },
    {
        accessorKey: "originalFinalAmount",
        header: "Original Final Amount"
    },
    {
        accessorKey: "actualGstinNo",
        header: "Actual GSTIN No."
    }
];
    




