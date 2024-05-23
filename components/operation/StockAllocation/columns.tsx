"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type List = {
  level?: string;
  awb_prefix?: string;
  from?: string;
  to?: string;
  status?: string;
  allocation_time?: string;
  allocated_by?: string;
  available_awb?: string;
  last_allocated?: string;
  cnote_type?: string;
  stock_type?: string;
  awb_type?: string;
  allocated?: string;
  job_status?: string;
  duration?: string;
};

export type History = {
  level?: string;
  from?: string;
  to?: string;
  status?: string;
  allocation_time?: string;
  allocated_by?: string;
  available_awb?: string;
};

export const stockListColumn: ColumnDef<List>[] = [
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "awb_prefix",
    header: "AWB Prefix",
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "allocation_time",
    header: "Allocation Time",
  },
  {
    accessorKey: "allocated_by",
    header: "Allocated By",
  },
  {
    accessorKey: "available_awb",
    header: "Available AWB",
  },
  {
    accessorKey: "last_allocated",
    header: "Last Allocated",
  },
  {
    accessorKey: "cnote_type",
    header: "Cnote Type",
  },
  {
    accessorKey: "stock_type",
    header: "Stock Type",
  },
  {
    accessorKey: "awb_type",
    header: "AWB Type",
  },
  {
    accessorKey: "allocated",
    header: "Allocated",
  },
  {
    accessorKey: "job_status",
    header: "Job Status",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="bg-button-secondary hover:bg-button-secondary/80 text-white">
            <span className="h-4 w-4">
              <DotsHorizontalIcon />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export const stockAllocationColumn: ColumnDef<List>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-white"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-zinc-500"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "awb_prefix",
    header: "AWB Prefix",
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "allocation_time",
    header: "Allocation Time",
  },
  {
    accessorKey: "allocated_by",
    header: "Allocated By",
  },
  {
    accessorKey: "available_awb",
    header: "Available AWB",
  },
  {
    accessorKey: "last_allocated",
    header: "Last Allocated",
  },
  {
    accessorKey: "cnote_type",
    header: "Cnote Type",
  },
  {
    accessorKey: "stock_type",
    header: "Stock Type",
  },
  {
    accessorKey: "awb_type",
    header: "AWB Type",
  },
  {
    accessorKey: "allocated",
    header: "Allocated",
  },
  {
    accessorKey: "job_status",
    header: "Job Status",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="bg-button-secondary hover:bg-button-secondary/80 text-white">
            <span className="h-4 w-4">
              <DotsHorizontalIcon />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Allocate
          </DropdownMenuItem>
          <DropdownMenuItem>
            Blacklist
          </DropdownMenuItem>
          <DropdownMenuItem>
            Return
          </DropdownMenuItem>
          <DropdownMenuItem>
            Revoke
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export const historyColumn: ColumnDef<List>[] = [
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "awb_prefix",
    header: "AWB Prefix",
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "allocation_time",
    header: "Allocation Time",
  },
  {
    accessorKey: "allocated_by",
    header: "Allocated By",
  },
  {
    accessorKey: "available_awb",
    header: "Available AWB",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="bg-button-secondary hover:bg-button-secondary/80 text-white">
            <span className="h-4 w-4">
              <DotsHorizontalIcon />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
