"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
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
        size: 50,
        enableResizing: false, 
        
    },
    {
        accessorKey: "awbNo",
        header: "AWB No"
    },
    {
        accessorKey: "origin",
        header: "Origin"
    },
    {
        accessorKey: "dest",
        header: "Destination"
    },
    {
        accessorKey: "flightDate",
        header: "Flight Date"
    },
    {
        accessorKey: "agent",
        header: "Agent"
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        accessorKey: "productType",
        header: "Product Type"
    },
    {
        accessorKey: "rate",
        header: "Rate"
    },
    {
        accessorKey: "spotRate",
        header: "Spot Rate"
    },
    {
        accessorKey: "grossWt",
        header: "Gross Wt"
    },
    {
        accessorKey: "volWt",
        header: "Vol Wt"
    },
    {
        accessorKey: "chgWt",
        header: "Chg Wt"
    },
    {
        accessorKey: "freight",
        header: "Freight"
    },
    {
        accessorKey: "ocdc",
        header: "OCDC"
    },
    {
        accessorKey: "ocda",
        header: "OCDA"
    },
    {
        accessorKey: "serviceTax",
        header: "Service Tax"
    },
    {
        accessorKey: "total",
        header: "Total"
    },
    {
        accessorKey: "iataFinalAmt",
        header: "IATA Final Amount"
    },
    {
        accessorKey: "balanceAmount",
        header: "Balance Amount"
    },
    {
        accessorKey: "date",
        header: "Date"
    },
    {
        accessorKey: "operator",
        header: "Operator"
    },
    {
        accessorKey: "refNumber",
        header: "Ref Number"
    }
];