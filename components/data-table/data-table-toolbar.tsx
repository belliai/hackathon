"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button, ButtonProps } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import {
  ArrowUpDownIcon,
  EyeIcon,
  ListFilterIcon,
  LucideIcon,
  SearchIcon,
  ViewIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { info } from "console";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useDebounceValue } from "usehooks-ts";
import { DataTableSortOptions } from "./data-table-sort-options";
import { DataTableFilterOptions } from "./data-table-filter-options";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useDebounceValue(search, 500);

  const toggleSearchOpen = () => {
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    table.setGlobalFilter(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-row items-center gap-3">
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
      </div>
      <div className="inline-flex gap-2 text-muted-foreground">
        <Tooltip delayDuration={100}>
          <DataTableFilterOptions table={table}>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"outline"} className={" h-8 w-8"}>
                <ListFilterIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </DataTableFilterOptions>
          <TooltipContent
            side="top"
            className="bg-background border text-foreground"
          >
            <p>Filter</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={100}>
          <DataTableSortOptions table={table}>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"outline"} className={" h-8 w-8"}>
                <ArrowUpDownIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </DataTableSortOptions>
          <TooltipContent
            side="top"
            className="bg-background border text-foreground"
          >
            <p>Sort</p>
          </TooltipContent>
        </Tooltip>
        <div className="inline-flex items-center">
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleSearchOpen}
                size={"icon"}
                variant={"outline"}
                className={" h-8 w-8"}
              >
                <SearchIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="bg-background border text-foreground"
            >
              <p>Search</p>
            </TooltipContent>
            <div
              className={cn(
                "w-0 transition-all opacity-0  ",
                searchOpen && "w-[150px] opacity-100 ml-1"
              )}
            >
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={"h-8 min-w-0 text-xs"}
                placeholder="Type to search..."
              />
            </div>
          </Tooltip>
        </div>
        <Tooltip delayDuration={100}>
          <DataTableViewOptions table={table}>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"outline"} className={" h-8 w-8"}>
                <EyeIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
          </DataTableViewOptions>
          <TooltipContent
            side="top"
            className="bg-background border text-foreground"
          >
            <p>Columns</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
