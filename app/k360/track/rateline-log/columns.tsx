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
        accessorKey: "serialNumber",
        header: "S.No."
    },
    {
        accessorKey: "filename",
        header: "Filename"
    },
    {
        accessorKey: "uploadedBy",
        header: "Uploaded By"
    },
    {
        accessorKey: "station",
        header: "Station"
    },
    {
        accessorKey: "recordCount",
        header: "Record Count"
    },
    {
        accessorKey: "successCount",
        header: "Success Count"
    },
    {
        accessorKey: "failureCount",
        header: "Failure Count"
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At"
    },
    {
        accessorKey: "action",
        header: "Action"
    }

]



