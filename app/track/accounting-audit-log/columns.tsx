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
        
    },
    {
        accessorKey: "awbNo",
        header: "AWB No.",
        size: 80,
    },
    {
        accessorKey: "awbPrefix",
        header: "AWB Prefix",
        size: 80,
    },
    {
        accessorKey: "origin",
        header: "Origin"
    },
    {
        accessorKey: "dest",
        header: "Dest"
    },
    {
        accessorKey: "fltNo",
        header: "Flt #"
    },
    {
        accessorKey: "fltDate",
        header: "Flt Date",
        size: 110
    },
    {
        accessorKey: "agent",
        header: "Agent"
    },
    {
        accessorKey: "productType",
        header: "Product Type",
        size: 200
    },
    {
        accessorKey: "rate",
        header: "Rate"
    },
    {
        accessorKey: "status",
        header: "Status"
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
        accessorKey: "chgWt",
        header: "Chg Wt"
    },
    {
        accessorKey: "volWt",
        header: "Vol. Wt."
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
        header: "IATA FinalAmt"
    },
    {
        accessorKey: "balanceAmount",
        header: "Balance Amount"
    },
    {
        accessorKey: "date",
        header: "Date",
        size: 110,
       
    },
    {
        accessorKey: "operator",
        header: "Operator"
    },
    {
        accessorKey: "refNumber",
        header: "Ref Number"
    },
    {
        accessorKey: "remarks",
        header: "Remarks",
        size: 200
    }
];