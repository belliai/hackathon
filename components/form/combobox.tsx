"use client"

import Link from "next/link"
import { PopoverClose } from "@radix-ui/react-popover"
import { Check, ChevronDown, ChevronsUpDown, List } from "lucide-react"
import { useFormContext } from "react-hook-form"

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

import { Separator } from "../ui/separator"
import { FormTextFieldProps } from "./FormTextField"

interface ComboboxFormProps extends Omit<FormTextFieldProps, "form" | "type"> {
  options?: { label: string; value: string }[]
  className?: string
  popoverClassName?: string
  editLink?: string
  info?: string
  searchPlaceholder?: string
}

/**
 * Combobox component.
 *
 * @component
 * @example
 * ```tsx
 * <Form {...hookForm}> // Should always be a children of <Form> component from `@components/ui/form`
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
  options=[],
  className,
  popoverClassName,
  editLink,
  searchPlaceholder = "Search",
}: ComboboxFormProps) {
  const form = useFormContext()

  // Determine if the search input should be shown
  const showSearchInput = options.length > 10;

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel info={info}>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "h-10 w-full justify-between border-2 border-foreground/30 px-3",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <span>
                    {field.value
                      ? options?.find((opt) => opt.value === field.value)?.label
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
                    {options?.map((opt) => (
                      <CommandItem
                        value={opt.label}
                        key={opt.value}
                        onSelect={() => {
                          form.setValue(name, opt.value)
                        }}
                        className="flex h-8 items-center justify-between px-2.5 text-xs"
                        asChild
                      >
                        <PopoverClose className="w-full">
                          {opt.label}
                          <Check
                            className={cn(
                              "h-4 w-4",
                              opt.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </PopoverClose>
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
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
