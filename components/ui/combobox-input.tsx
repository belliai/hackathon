"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import {
  Check,
  ChevronsUpDown,
  EditIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Separator } from "./separator"

type Option = { label: string; value: string | number }

export type ComboBoxInputProps<T extends FieldValues, P extends Path<T>> = {
  field: ControllerRenderProps<T, P>
  selectOptions: Option[]
  className?: HTMLDivElement["className"]
  containerClassName?: HTMLDivElement["className"]
  placeholder?: string
  emptyMessage?: string
  isLoading?: boolean
  disabled?: boolean
  editLink?: string
  itemName?: string
  enableAdminControl?: boolean
  onDelete?: (option: Option) => void
  onEdit?: (option: Option) => void
  onCreate?: (value: string) => void
}

export default function ComboBoxInput<
  T extends FieldValues,
  P extends Path<T>,
>({
  field,
  selectOptions,
  className,
  containerClassName,
  placeholder,
  emptyMessage,
  isLoading,
  disabled,
  editLink,
  itemName,
  enableAdminControl,
  onCreate,
  onDelete,
  onEdit,
}: ComboBoxInputProps<T, P>) {
  const [open, setOpen] = useState(false)

  const { orgRole } = useAuth()

  // don't know if this is the best way to determine whether admin or not, maybe ask Rafiul
  const isAdmin = enableAdminControl && orgRole?.toLowerCase().includes("admin")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          isLoading={isLoading}
          variant="outline"
          role="combobox"
          className={cn(
            "disabled:bg-input/2 relative w-full justify-start rounded-sm px-3",
            !field.value && "rel text-muted-foreground",
            className
          )}
        >
          {field.value
            ? selectOptions?.find((option) => option.value === field.value)
                ?.label
            : placeholder}
          <ChevronsUpDown className="absolute right-3 top-1/2 size-4 shrink-0 -translate-y-1/2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "popover-content-width-same-as-its-trigger rounded-sm p-0",
          containerClassName
        )}
      >
        <Command>
          <CommandInput
            hideIcon
            placeholder={placeholder ?? "Search..."}
            className="h-9 py-2 text-inherit placeholder:text-xs"
          />
          <CommandEmpty>{emptyMessage ?? "No Items"}</CommandEmpty>
          <CommandGroup className="custom-scrollbar max-h-48 overflow-y-auto py-1 pr-1">
            <CommandList>
              {selectOptions?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  className="flex h-7 items-center justify-between px-2.5 text-xs"
                  onSelect={() => {
                    field.onChange(option.value)
                    setOpen(false)
                  }}
                >
                  {option.label}

                  {isAdmin && (
                    <div className="flex flex-row items-center gap-1">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          // need to figure this out, should we use modal? maybe
                        }}
                        type="button"
                        variant={"icon"}
                        size={"fit"}
                      >
                        <PencilIcon className="size-3" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit && onEdit(option)
                        }}
                        type="button"
                        variant={"icon"}
                        size={"fit"}
                      >
                        <Trash2Icon className="size-3" />
                      </Button>
                    </div>
                  )}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
        {editLink && (
          <>
            <Separator />
            <div className="px-2 py-1">
              <Button
                type="button"
                variant="link"
                size="sm"
                asChild
                className="h-fit px-2 py-1 text-button-primary hover:text-button-primary/50 hover:no-underline"
              >
                <Link href={editLink} target="_blank">
                  {/* <List className="mr-2 h-4 w-4" /> */}
                  Edit dropdown
                </Link>
              </Button>
            </div>
          </>
        )}
        {isAdmin && (
          <>
            <Separator />
            <Button
              type="button"
              variant="link"
              size="sm"
              className="h-fit w-full justify-start px-3 py-2 leading-none text-button-primary hover:text-button-primary/80 hover:no-underline"
            >
              Add New {itemName}
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
