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
        accessorKey: "profilePic",
        header: "Profile Pic"
    },
    {
        accessorKey: "userEmail",
        header: "User Email"
    },
    {
        accessorKey: "role",
        header: "Role"
    },
    {
        accessorKey: "station",
        header: "Station"
    },
    {
        accessorKey: "browser",
        header: "Browser"
    },
    {
        accessorKey: "os",
        header: "OS"
    },
    {
        accessorKey: "device",
        header: "Device"
    },
    {
        accessorKey: "activityTime",
        header: "Activity Time"
    },
    {
        accessorKey: "ipAddress",
        header: "IP Address"
    },
    {
        accessorKey: "country",
        header: "Country"
    },
    {
        accessorKey: "city",
        header: "City"
    },
    {
        accessorKey: "region",
        header: "Region"
    }
];
    




