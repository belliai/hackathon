"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import {
  ChevronsUpDown,
  LoaderIcon,
  PencilIcon,
  PlusCircleIcon,
  SaveIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react"
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  useForm,
} from "react-hook-form"

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
import { Form } from "./form"
import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Separator } from "./separator"

type Option = { label: string; value: string }

export type ComboAdminBoxInputProps<
  T extends FieldValues,
  P extends Path<T>,
> = {
  field: ControllerRenderProps<T, P>
  selectOptions: Option[]
  className?: string
  containerClassName?: string
  placeholder?: string
  emptyMessage?: string
  isLoading?: boolean
  disabled?: boolean
  editLink?: string
  itemName?: string
  onDelete: (option: Option) => void
  onEdit: (option: Option) => void
  onCreate: (value: string) => void
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
  onCreate,
  onDelete,
  onEdit,
}: ComboAdminBoxInputProps<T, P>) {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState<string | number | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    setEdit(null)
  }, [open])

  const form = useForm<{
    id?: string
    name: string
  }>()

  useEffect(() => {
    if (edit) {
      const option = selectOptions.find((opt) => opt.value === edit)
      if (!option) return
      form.reset({
        id: option.value,
        name: option.label,
      })
    }
  }, [edit, form, selectOptions])

  useEffect(() => {
    if (showCreateForm) {
      form.reset({
        id: undefined,
        name: "",
      })
      setEdit(null)
    }
  }, [showCreateForm, form])

  const { orgRole } = useAuth()
  const isAdmin = orgRole?.toLowerCase().includes("admin")

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            isLoading={isLoading}
            variant="outline"
            role="combobox"
            className={cn(
              "disabled:bg-input/2 relative w-full justify-start rounded-sm px-3",
              !field.value && "text-muted-foreground",
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
          {isLoading ? (
            <div className="flex h-10 w-full items-center justify-center">
              <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Command>
              <CommandInput
                hideIcon
                placeholder={placeholder ?? "Search..."}
                className="h-9 py-2 text-inherit placeholder:text-xs"
              />
              {edit === null && (
                <CommandEmpty className="py-3 pb-1 text-center text-xs text-muted-foreground">
                  {emptyMessage ?? "No Items"}
                </CommandEmpty>
              )}
              <CommandGroup className="custom-scrollbar max-h-48 overflow-y-auto py-1 pr-1">
                <CommandList>
                  {selectOptions?.map((option, index) => {
                    const isFirst = index === 0
                    const isLast = index === selectOptions.length - 1
                    if (edit === option.value)
                      return (
                        <Controller
                          key={option.value}
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <div
                              className={cn(
                                "relative my-1 h-fit w-full",
                                isFirst && "mt-0",
                                isLast && "mb-0"
                              )}
                            >
                              <Input
                                className="h-7 px-2.5 text-xs focus-visible:ring-0"
                                {...field}
                              />
                              <div className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-1">
                                <Button
                                  onClick={form.handleSubmit((data) => {
                                    onEdit({
                                      value: option.value,
                                      label: data.name,
                                    })
                                    setEdit(null)
                                  })}
                                  type="button"
                                  variant="icon"
                                  size="fit"
                                >
                                  <SaveIcon className="size-3" />
                                </Button>
                                <Button
                                  onClick={() => {
                                    setEdit(null)
                                  }}
                                  type="button"
                                  variant="icon"
                                  size="fit"
                                >
                                  <XIcon className="size-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                        />
                      )
                    return (
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
                                setEdit(option.value)
                              }}
                              type="button"
                              variant="icon"
                              size="fit"
                            >
                              <PencilIcon className="size-3" />
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                onDelete(option)
                              }}
                              type="button"
                              variant="icon"
                              size="fit"
                            >
                              <Trash2Icon className="size-3" />
                            </Button>
                          </div>
                        )}
                      </CommandItem>
                    )
                  })}
                </CommandList>
              </CommandGroup>
            </Command>
          )}
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
                    Edit dropdown
                  </Link>
                </Button>
              </div>
            </>
          )}
          {isAdmin && onCreate && (
            <>
              <Separator />
              <Button
                type="button"
                variant="link"
                size="sm"
                className="h-fit w-full justify-start px-3 py-2 leading-none text-button-primary hover:text-button-primary/80 hover:no-underline"
                onClick={() => setShowCreateForm((prev) => !prev)}
              >
                Add New {itemName}
              </Button>
              {showCreateForm && (
                <Form {...form}>
                  <form action="" className="flex flex-row gap-1 p-1 pt-0">
                    <Controller
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <Input
                          className="h-7 px-2.5 text-xs focus-visible:ring-0"
                          placeholder={`Input ${itemName} name...`}
                          {...field}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault(); // Prevent form submission on Enter key
                              form.handleSubmit((data) => {
                                onCreate(data.name)
                                setShowCreateForm(false)
                              })
                              }
                          }}
                        />
                      )}
                    />
                    <Button
                      type="button"
                      onClick={form.handleSubmit((data) => {
                        onCreate(data.name)
                        setShowCreateForm(false)
                      })}
                      variant={"button-primary"}
                      className="h-7 rounded-sm"
                      size={"sm"}
                    >
                      <PlusCircleIcon className="size-4" />
                    </Button>
                  </form>
                </Form>
              )}
            </>
          )}
        </PopoverContent>
      </Popover>
    </>
  )
}
