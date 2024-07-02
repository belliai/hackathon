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
        accessorKey: "axbNo",
        header: "AXB No."
    },
    {
        accessorKey: "motherbagNo",
        header: "Motherbag No."
    },
    {
        accessorKey: "origin",
        header: "Origin"
    },
    {
        accessorKey: "destination",
        header: "Destination"
    },
    {
        accessorKey: "motherBagWeight",
        header: "Mother Bag Weight"
    },
    {
        accessorKey: "flightCode",
        header: "Flight Code"
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        accessorKey: "createdAt",
        header: "Created At"
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At"
    }
];