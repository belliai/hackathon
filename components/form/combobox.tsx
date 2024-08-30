"use client"

import { useState } from "react"
import Link from "next/link"
import { PopoverClose } from "@radix-ui/react-popover"
import { Check, ChevronDown, Pencil, PlusCircle, X } from "lucide-react"
import { useForm, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Separator } from "../ui/separator"
import { FormTextFieldProps } from "./FormTextField"
import InputSwitch, { SelectOptions } from "./InputSwitch"

export type ComboboxOption = {
  icon?: React.ReactNode
  label: string
  value: string
  additionalColumn?: string[]
  tooltipId?: string
  component?: React.ReactNode
}

export type ComboboxProps = {
  name: string
  options?: ComboboxOption[]
  className?: string
  popoverClassName?: string
  editLink?: string
  info?: string
  searchPlaceholder?: string
  onAddOption?: (newOption: string, close: () => void) => void
  onSaveEditOption?: (newOption: string, targetValue: string) => void
  additionalColumn?: string[]
  tooltipId?: string
  onChangeValue?: (changedValue: string | null) => void
}

/**
 * TODO:
 * We might need to switch over to extend the InputSwitchProps type from the InputSwitch component
 * since it is better maintained and is more widely used in the codebase.
 */
export type ComboboxFormProps = Omit<
  FormTextFieldProps,
  "form" | "type" | "options"
> &
  ComboboxProps

/**
 * Combobox component.
 *
 * @component
 * @example
 * ```tsx
 * <Form {...hookForm}> // Should always be a decendant of <Form> component from `@components/ui/form`
 *  <Combobox
 *   name="language"
 *   label="Language"
 *   placeholder="Select a language"
 *   description="Select your preferred language"
 *   disabled={false}
 *   options={[
 *     { label: "English", value: "en" },
 *     { label: "Spanish", value: "es" },
 *     { label: "French", value: "fr" },
 *   ]}
 *  />
 * </Form>
 * ```
 */

export function Combobox({
  name,
  label,
  info,
  placeholder,
  description,
  disabled,
  options = [],
  className,
  popoverClassName,
  editLink,
  searchPlaceholder = "Search",
  onAddOption, // Show the add option button if this is provided
  onSaveEditOption,
  additionalColumn,
  onChangeValue,
  tooltipId = "",
}: ComboboxFormProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [editingOptionValue, setEditingOptionValue] = useState<string | null>(
    null
  )

  const form = useFormContext()

  const addForm = useForm({
    defaultValues: {
      newOption: "",
    },
  })

  const editForm = useForm({
    defaultValues: {
      editedOption: "",
    },
  })

  const comboboxButtonFooterClassName = cn(
    "h-fit px-2 py-1 text-button-primary hover:text-button-primary/50 hover:no-underline"
  )

  // Determine if the search input should be shown
  const showSearchInput = options.length > 10

  function handleOpenAddOption() {
    setIsAdding(true)
  }

  function handleCloseAddOptionAndReset() {
    setIsAdding(false)
    addForm.reset({ newOption: "" })
  }

  function handleSubmitAddOption(data: { newOption: string }) {
    if (onAddOption) {
      onAddOption(data.newOption, handleCloseAddOptionAndReset)
    }
  }

  function handleOpenEditOption(value: string) {
    // Find the option with the value and use the label to populate the edit form
    editForm.reset({
      editedOption: options.find((opt) => opt.value === value)?.label as string,
    })
    setEditingOptionValue(value)
  }

  function handleCloseOpenEditOption() {
    setEditingOptionValue(null)
  }

  function handleOnSaveEditOption(data: { editedOption: string }) {
    if (onSaveEditOption && editingOptionValue) {
      onSaveEditOption(data.editedOption, editingOptionValue)
    }

    setEditingOptionValue(null)
  }

  const addOptionLabel = label || "New Option"

  const renderOptionItem = (data: ComboboxOption) => {
    return (
      <div className="flex max-w-full items-center gap-3">
        <div className="flex text-left gap-3 [&>svg]:h-4 [&>svg]:w-4">
          {data?.icon}
          {data?.component ? data.component : data?.label}
        </div>
        {additionalColumn
          ? additionalColumn.map((item, index) => {
              return (
                <div
                  key={`additional-${index}`}
                  className="overflow-hidden text-ellipsis text-nowrap"
                >
                  {data[item as keyof ComboboxOption]}
                </div>
              )
            })
          : null}
      </div>
    )
  }

  const renderContentItem = (data: ComboboxOption) => {
    if (tooltipId && data[tooltipId as keyof ComboboxOption]) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{renderOptionItem(data)}</TooltipTrigger>
          <TooltipContent
            side="top"
            className="max-w-72 border bg-card text-left text-foreground"
          >
            <p>{data[tooltipId as keyof ComboboxOption]}</p>
          </TooltipContent>
        </Tooltip>
      )
    }

    return renderOptionItem(data)
  }

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel
              className="text-xs font-semibold  dark:text-muted-foreground"
              info={info}
            >
              {label}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "h-10 w-full justify-between dark:border-2 dark:border-foreground/30 px-3",
                    !field.value && "text-muted-foreground",
                    className
                  )}
                >
                  <span>
                    {field.value
                      ? options?.find((opt) => opt?.value === field.value)
                          ?.label
                      : placeholder ?? " "}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                "popover-content-width-same-as-its-trigger w-full min-w-36 rounded-lg p-0 !text-xs",
                popoverClassName
              )}
              sideOffset={-4}
              align="start"
            >
              <Command>
                {showSearchInput && (
                  <CommandInput
                    hideIcon
                    placeholder={searchPlaceholder}
                    className="h-9 py-2 text-inherit placeholder:text-xs"
                  />
                )}
                <CommandEmpty>No results</CommandEmpty>
                <CommandGroup className="py-0 pr-0">
                  <CommandList className="custom-scrollbar max-h-48 py-1 pr-1">
                    {options?.map((opt) => {
                      const isEditing = editingOptionValue === opt?.value

                      return (
                        <CommandItem
                          value={opt?.label as string}
                          key={opt?.value}
                          onSelect={() => {
                            onChangeValue && onChangeValue(opt.value)
                            form.setValue(name, opt.value)
                          }}
                          className={cn(
                            "flex min-h-8 items-center justify-between px-2.5 text-xs",
                            {
                              "bg-zinc-900 pl-0 hover:bg-zinc-900": isEditing,
                            }
                          )}
                          asChild
                        >
                          {!isEditing ? (
                            <PopoverClose className="w-full">
                              {renderContentItem(opt)}
                              <div className="flex items-center gap-2">
                                <Check
                                  className={cn(
                                    "h-4 w-4",
                                    opt?.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {!!onSaveEditOption && (
                                  <button
                                    type="button"
                                    onClick={
                                      (e) => e.stopPropagation() //Prevent the popover from closing when the button is clicked
                                    }
                                  >
                                    <Pencil
                                      onClick={() =>
                                        handleOpenEditOption(opt.value)
                                      }
                                      size={14}
                                      className="text-muted-foreground/80 transition-all duration-200 ease-in-out hover:text-white"
                                    />
                                  </button>
                                )}
                              </div>
                            </PopoverClose>
                          ) : (
                            <form
                              onSubmit={editForm.handleSubmit(
                                handleOnSaveEditOption
                              )}
                              className="flex items-center justify-between"
                            >
                              <Form {...editForm}>
                                <InputSwitch
                                  type="text"
                                  name="editedOption"
                                  autoFocus={true}
                                  onClick={(e) => e.stopPropagation()}
                                  className="h-8 w-full border-none bg-transparent pl-2.5 text-xs focus-visible:ring-0"
                                />
                              </Form>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCloseOpenEditOption()
                                  }}
                                >
                                  <X size={14} />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    editForm.handleSubmit(
                                      handleOnSaveEditOption
                                    )()
                                  }}
                                >
                                  <Check size={14} />
                                </button>
                              </div>
                            </form>
                          )}
                        </CommandItem>
                      )
                    })}
                  </CommandList>
                </CommandGroup>
              </Command>
              {(editLink || onAddOption) && (
                <>
                  <Separator />
                  <div className="px-2 py-1">
                    {!isAdding ? (
                      <div className="flex justify-between">
                        {onAddOption && (
                          <Button
                            variant="link"
                            size="sm"
                            type="button" // This is required to prevent form submission
                            onClick={handleOpenAddOption}
                            className={cn(
                              comboboxButtonFooterClassName,
                              "text-xs"
                            )}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {addOptionLabel}
                          </Button>
                        )}
                        {editLink && (
                          <Button
                            variant="link"
                            size="sm"
                            type="button"
                            asChild
                            className={comboboxButtonFooterClassName}
                          >
                            <Link href={editLink} target="_blank">
                              {onAddOption ? "Edit" : "Edit dropdown"}
                            </Link>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Form {...addForm}>
                        <form
                          className="flex flex-col gap-2 py-1"
                          onSubmit={addForm.handleSubmit(handleSubmitAddOption)}
                        >
                          <InputSwitch
                            type="text"
                            placeholder={addOptionLabel}
                            className="h-8 w-full text-xs"
                            name="newOption"
                          />
                          <div className="flex justify-end gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={handleCloseAddOptionAndReset}
                              size="sm"
                              className="h-6 px-2 py-1 text-xs"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              variant="button-primary"
                              size="sm"
                              onClick={addForm.handleSubmit(
                                handleSubmitAddOption
                              )}
                              className="h-6 px-2 py-1 text-xs"
                            >
                              Save
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}
                  </div>
                </>
              )}
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
