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
        accessorKey: "status",
        header: "Status"
    },
    {
        accessorKey: "entity",
        header: "Entity"
    },
    {
        accessorKey: "action",
        header: "Action"
    },
    {
        accessorKey: "createdAt",
        header: "Created At"
    }
];