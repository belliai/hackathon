"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

export type DataTableRowActionItem = {
  label: string;
  value: string;
  fn?: (data: any) => void
  shortcut?: string
};

interface DataTableRowActionsProps<TData> {
  row?: Row<TData>;
  items?: DataTableRowActionItem[];

}

export function DataTableRowActions<TData>({
  row,
  items = [
    {
      label: "Edit",
      value: "edit",
    },
    {
      label: "View",
      value: "view",
    },
  ],
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {items?.map((item) => {
          return (
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation()
              item.fn && item.fn(row)
            }} key={item.value}>{item.label}
            {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
