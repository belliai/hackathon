"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronRight,
  Edit3Icon,
  FolderIcon,
  FolderOpenIcon,
  Trash2Icon,
} from "lucide-react";
import { Folder, useFavorites } from "./favorites-provider";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./favorites-menu";

export type TSidebarItem = {
  name: string;
  icon?: any;
  href: string;
  current?: boolean;
  children?: TSidebarItem[];
};

interface SidebarItemProps {
  item: Folder;
  active: boolean;
}

export default function FavoriteFolderItem({ item, active }: SidebarItemProps) {
  const {
    editFolderId,
    setEditFolderId,
    onLabelValueChange,
    deletePathByHref,
    deleteFolderById,
  } = useFavorites();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    setEditFolderId(null);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <AccordionItem value={item.id} className="border-none">
      {editFolderId === item.id ? (
        <div
          ref={ref}
          className="relative w-full group flex [&_svg]:text-[#949496]   text-[#E2E3E5] text-[13px] hover:bg-zinc-800 items-center gap-x-1 h-fit rounded-md px-[5px] py-0 font-medium leading-normal "
        >
          <span className="flex items-center justify-center p-0.5 rounded-sm transition-colors duration-200">
            <FolderIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          </span>
          <Input
            value={item.label}
            onChange={(e) => onLabelValueChange(item.id, e.target.value)}
            className="h-7 border-none focus-visible:ring-0 px-1 text-xs"
          />
        </div>
      ) : (
        <AccordionTrigger
          className="group flex [&_svg]:text-[#949496]  [&[data-state=open]>div]:text-white text-[#E2E3E5] justify-between text-[13px] hover:bg-zinc-800 hover:text-white items-center gap-x-1 !h-7 rounded-md px-[5px] py-0 font-medium leading-normal hover:no-underline  [&[data-state=open]>div>svg]:rotate-90 [&[data-state=open]>svg]:rotate-0"
          customarrow={<></>}
        >
          <div className="flex items-center gap-x-[7px]">
            <span className="flex items-center justify-center p-0.5 rounded-sm transition-colors duration-200">
              {active ? (
                <FolderOpenIcon
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <FolderIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
            </span>
            <div className="inline-flex gap-2 items-center">
              <span>{item.label}</span>
              <ChevronRight className="h-3 w-3 shrink-0 transition-transform duration-200 text-muted-foreground" />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DotsHorizontalIcon className="text-muted-foreground size-3  hover:text-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setEditFolderId(item.id);
                }}
                className="text-xs"
              >
                <Edit3Icon className="mr-2 size-3" />
                Rename folder
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFolderById(item.id);
                }}
                className="text-xs"
              >
                <Trash2Icon className="mr-2 size-3" />
                Delete folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </AccordionTrigger>
      )}
      <AccordionContent className="relative pb-0 pl-4">
        <SortableContext
          id={item.id}
          items={item.children}
          disabled={!active}
          strategy={verticalListSortingStrategy}
        >
          {item?.children?.map((childMenu) => {
            return (
              <SortableItem
                key={childMenu.id}
                item={childMenu}
                deletePathByHref={deletePathByHref}
                openFolders={[]}
              />
            );
          })}
          {item?.children?.length < 1 && (
            <span className="text-xs text-muted-foreground pl-6">No Items</span>
          )}
        </SortableContext>
      </AccordionContent>
    </AccordionItem>
  );
}
