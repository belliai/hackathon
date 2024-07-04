"use client"

import { useRef } from "react"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  ChevronRight,
  Edit3Icon,
  FolderIcon,
  FolderOpenIcon,
  Trash2Icon,
} from "lucide-react"
import { useOnClickOutside } from "usehooks-ts"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import { SortableItem } from "./favorites-menu"
import { Folder, useFavorites } from "./favorites-provider"

export type TSidebarItem = {
  name: string
  icon?: any
  href: string
  current?: boolean
  children?: TSidebarItem[]
}

interface SidebarItemProps {
  item: Folder
  active: boolean
}

export default function FavoriteFolderItem({ item, active }: SidebarItemProps) {
  const {
    editFolderId,
    setEditFolderId,
    onLabelValueChange,
    deletePathByHref,
    deleteFolderById,
  } = useFavorites()
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = () => {
    setEditFolderId(null)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <AccordionItem value={item.id} className="border-none">
      {editFolderId === item.id ? (
        <div
          ref={ref}
          className="group relative flex h-fit w-full items-center gap-x-1 rounded-md px-[5px] py-0 text-[13px] font-medium leading-normal text-[#E2E3E5] hover:bg-zinc-800 [&_svg]:text-[#949496]"
        >
          <span className="flex items-center justify-center rounded-sm p-0.5 transition-colors duration-200">
            <FolderIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          </span>
          <Input
            value={item.label}
            onChange={(e) => onLabelValueChange(item.id, e.target.value)}
            className="h-7 border-none px-1 text-xs focus-visible:ring-0"
          />
        </div>
      ) : (
        <AccordionTrigger
          className="group flex !h-7 items-center justify-between gap-x-1 rounded-md px-[5px] py-0 text-[13px] font-medium leading-normal text-[#E2E3E5] hover:bg-zinc-800 hover:text-white hover:no-underline [&[data-state=open]>div>svg]:rotate-90 [&[data-state=open]>div]:text-white [&[data-state=open]>svg]:rotate-0 [&_svg]:text-[#949496]"
          customarrow={<></>}
        >
          <div className="flex items-center gap-x-[7px]">
            <span className="flex items-center justify-center rounded-sm p-0.5 transition-colors duration-200">
              {active ? (
                <FolderOpenIcon
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <FolderIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
            </span>
            <div className="inline-flex items-center gap-2">
              <span>{item.label}</span>
              <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-200" />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DotsHorizontalIcon className="size-3 text-muted-foreground hover:text-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  setEditFolderId(item.id)
                }}
                className="text-xs"
              >
                <Edit3Icon className="mr-2 size-3" />
                Rename folder
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  deleteFolderById(item.id)
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
            )
          })}
          {item?.children?.length < 1 && (
            <span className="pl-6 text-xs text-muted-foreground">No Items</span>
          )}
        </SortableContext>
      </AccordionContent>
    </AccordionItem>
  )
}
