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
        accessorKey: "ccaNo",
        header: "CCA No"
    },
    {
        accessorKey: "awbNo",
        header: "AWB No"
    },
    {
        accessorKey: "payMode",
        header: "Pay Mode"
    },
    {
        accessorKey: "invoiceNo",
        header: "Invoice No"
    },
    {
        accessorKey: "flightNo",
        header: "Flight No"
    },
    {
        accessorKey: "flightDate",
        header: "Flight Date"
    },
    {
        accessorKey: "agentCode",
        header: "Agent Code"
    },
    {
        accessorKey: "ccaDate",
        header: "CCA Date"
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        accessorKey: "currentGrossWt",
        header: "Current Gross Wt",
        footer: info => {
            const total = info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.currentGrossWt, 0);
            return `Total: ${total}`;
        }
    },
    {
        accessorKey: "currentChWt",
        header: "Current Ch Wt",
        footer: info => {
            const total = info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.currentChWt, 0);
            return `Total: ${total}`;
        }
    },
    {
        accessorKey: "currentFreight",
        header: "Current Freight",
        footer: info => {
            const total = info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.currentFreight, 0);
            return `Total: ${total}`;
        }
    },
    {
        accessorKey: "currentOCDC",
        header: "Current OCDC",
        footer: info => {
            const total = info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.currentOCDC, 0);
            return `Total: ${total}`;
        }
    },
    {
        accessorKey: "currentOCDA",
        header: "Current OCDA",
        footer: info => {
            const total = info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.currentOCDA, 0);
            return `Total: ${total}`;
        }
    },
    {
        accessorKey: "currentST",
        header: "Current ST",
        footer: info => {
            const total = info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.currentST, 0);
            return `Total: ${total}`;
        }
    },
    {
        accessorKey: "currentTotal",
        header: "Current Total",
        footer: info => {
            const total = info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.currentTotal, 0);
            return `Total: ${total}`;
        }
    },
    {
        accessorKey: "revisedGrossWt",
        header: "Revised Gross Wt",
        footer: info => {
            const total = info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.revisedGrossWt, 0);
            return `Total: ${total}`;
        }
    }
];
    




