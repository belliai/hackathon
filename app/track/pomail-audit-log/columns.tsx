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
        accessorKey: "mailistUUID",
        header: "Maillist UUID"
    },
    {
        accessorKey: "mailistId",
        header: "Mailist Is"
    },
    {
        accessorKey: "mailistDatetime",
        header: "Mailist Datetime"
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
        accessorKey: "flightNumber",
        header: "Flight Number"
    },
    {
        accessorKey: "awbNumber",
        header: "AWB Number"
    },
    {
        accessorKey: "eventId",
        header: "Event ID"
    },
    {
        accessorKey: "bags",
        header: "Bags"
    },
    {
        accessorKey: "totalBagsWeight",
        header: "Total Bag Weight"
    },
    {
        accessorKey: "awbMapped",
        header: "AWB Mapped"
    },
    {
        accessorKey: "acknowledged",
        header: "Acknowledged"
    },
    {
        accessorKey: "commCode",
        header: "Comm Code"
    },
    {
        accessorKey: "action",
        header: "Action"
    },
    {
        accessorKey: "filename",
        header: "File Name"
    },
    {
        accessorKey: "acknowledgeFilename",
        header: "Acknowledge File Name"
    },
    {
        accessorKey: "createdAt",
        header: "Created At"
    }

]



