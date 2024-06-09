"use client";

import { ColumnDef, Table } from "@tanstack/react-table";
import { ReactNode } from "react";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ArrowDownAZIcon, ArrowUpAZIcon } from "lucide-react";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  children: ReactNode;
}

export function DataTableSortOptions<TData>({
  table,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const sortableColumns = table
    .getAllColumns()
    .filter(
      (col) => Boolean(col.accessorFn) && col.getIsVisible() && col.getCanSort()
    );

  return (
    <Popover>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent align="end" className="w-[250px] p-0 ">
        <Command>
          <CommandInput placeholder="Search for a column" />

          <CommandList className="custom-scrollbar">
            <CommandEmpty>No column found.</CommandEmpty>

            <CommandGroup>
              {sortableColumns.map((column) => {
                const sortDir = column.getIsSorted();
                return (
                  <CommandItem
                    key={column.id}
                    value={String(column.columnDef.header)}
                    onSelect={() => column.toggleSorting(undefined, true)}
                    className="flex flex-row justify-between items-center"
                  >
                    {String(column.columnDef.header)}
                    {sortDir === "asc" && (
                      <ArrowUpAZIcon className="size-4 text-muted-foreground" />
                    )}
                    {sortDir === "desc" && (
                      <ArrowDownAZIcon className="size-4 text-muted-foreground" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
