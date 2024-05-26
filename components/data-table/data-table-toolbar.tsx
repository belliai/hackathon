"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button, ButtonProps } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { LucideIcon } from "lucide-react";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  buttonVariant?: ButtonProps["variant"];
  extraButtons?: {
    label: string;
    icon?: LucideIcon;
    onClick?: VoidFunction;
    variant?: ButtonProps["variant"];
    className?: ButtonProps["className"];
  }[];
}

export function DataTableToolbar<TData>({
  table,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-row items-center gap-3">
        <Input
          placeholder="Filter"
          // value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("title")?.setFilterValue(event.target.value)
          // }
          className="w-[150px] h-8 lg:w-[250px]"
        />
        {props.extraButtons?.map((button, index) => (
          <Button
            key={index}
            size={"sm"}
            onClick={button.onClick}
            variant={button.variant ?? props.buttonVariant ?? "outline"}
          >
            {button.icon && <button.icon className="w-4 h-4 mr-2" />}
            {button.label}
          </Button>
        ))}

        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="inline-flex gap-3">
        <Button size={"sm"} variant={props.buttonVariant ?? "outline"}>
          Bulk Assign
        </Button>
        <DataTableViewOptions
          buttonVariant={props.buttonVariant}
          table={table}
        />
      </div>
    </div>
  );
}
