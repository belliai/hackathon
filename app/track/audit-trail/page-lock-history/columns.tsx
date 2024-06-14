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
        accessorKey: "userId",
        header: "User ID"
    },
    {
        accessorKey: "location",
        header: "Location"
    },
    {
        accessorKey: "loginTime",
        header: "Login Time"
    },
    {
        accessorKey: "ipAddress",
        header: "IP Address"
    },
    {
        accessorKey: "status",
        header: "Status"
    }
];
    




