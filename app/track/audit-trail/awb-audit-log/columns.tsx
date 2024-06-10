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
        accessorKey: "awbNumber",
        header: "AWB Number"
    },
    {
        accessorKey: "awbOrigin",
        header: "AWB Origin"
    },
    {
        accessorKey: "awbDest",
        header: "AWB Destination"
    },
    {
        accessorKey: "pcs",
        header: "PCS"
    },
    {
        accessorKey: "wt",
        header: "WT"
    },
    {
        accessorKey: "vol",
        header: "Vol"
    },
    {
        accessorKey: "uom",
        header: "UOM"
    },
    {
        accessorKey: "fltDate",
        header: "Flt Date"
    },
    {
        accessorKey: "fltOrigin",
        header: "Flt Origin"
    },
    {
        accessorKey: "fltDestination",
        header: "Flt Destination"
    },
    {
        accessorKey: "action",
        header: "Action"
    },
    {
        accessorKey: "message",
        header: "Message"
    },
    {
        accessorKey: "updatedBy",
        header: "Updated By"
    },
    {
        accessorKey: "updatedOn",
        header: "Updated On"
    }
    
];