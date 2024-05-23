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
        header: "AWB No.",
        size: 50,
        enableResizing: false, 
    },
    {
        accessorKey: "awbPrefix",
        header: "AWB Prefix",
        size: 80,
    },
    {
        accessorKey: "origin",
        header: "Origin",
        size:50
    },
    {
        accessorKey: "dest",
        header: "Dest",
        size:50
    },
    {
        accessorKey: "fltNo",
        header: "Flt #",
        size:50
    },
    {
        accessorKey: "fltDate",
        header: "Flt Date",
        size: 150,
        enableResizing: false, 
    },
    {
        accessorKey: "agent",
        header: "Agent",
        size:80
    },
    {
        accessorKey: "productType",
        header: "Product Type",
        size: 200
    },
    {
        accessorKey: "rate",
        header: "Rate",
        size:50
    },
    {
        accessorKey: "status",
        header: "Status",
        size:80
    },
    {
        accessorKey: "spotRate",
        header: "Spot Rate",
        size:50
    },
    {
        accessorKey: "grossWt",
        header: "Gross Wt",
        size:50
    },
    {
        accessorKey: "chgWt",
        header: "Chg Wt",
        size:50
    },
    {
        accessorKey: "volWt",
        header: "Vol. Wt.",
        size:50
    },
    {
        accessorKey: "freight",
        header: "Freight",
        size:50
    },
    {
        accessorKey: "ocdc",
        header: "OCDC",
        size:50
    },
    {
        accessorKey: "ocda",
        header: "OCDA",
        size:50
    },
    {
        accessorKey: "serviceTax",
        header: "Service Tax",
        size:50
    },
    {
        accessorKey: "total",
        header: "Total",
        size:80
    },
    {
        accessorKey: "iataFinalAmt",
        header: "IATA FinalAmt", 
        size:50
    },
    {
        accessorKey: "balanceAmount",
        header: "Balance Amount",
     
    },
    {
        accessorKey: "date",
        header: "Date",
        size: 150
       
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