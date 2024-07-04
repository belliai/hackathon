"use client"

import Link from "next/link"
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

import { ScrollArea } from "../ui/scroll-area"
import { SelectScrollDownButton, SelectScrollUpButton } from "../ui/select"
import { Separator } from "../ui/separator"
import { FormTextFieldProps } from "./FormTextField"

interface ComboboxFormProps extends Omit<FormTextFieldProps, "form" | "type"> {
  options: { label: string; value: string }[]
  className?: string
  popoverClassName?: string
  editLink?: string
  info?: string
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
  options,
  className,
  popoverClassName,
  editLink,
}: ComboboxFormProps) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
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
            <PopoverContent className={cn("p-0", popoverClassName)}>
              <Command>
                <CommandInput placeholder="Search" />
                <ScrollArea className="max-h-48 overflow-auto">
                  <CommandEmpty>No results</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {options?.map((opt) => (
                        <CommandItem
                          value={opt.label}
                          key={opt.value}
                          onSelect={() => {
                            form.setValue(name, opt.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              opt.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {opt.label}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </ScrollArea>
              </Command>
              <Separator />
              <div className="px-2 py-2">
                {editLink && (
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="px-2 text-zinc-400"
                  >
                    <Link href={editLink} className="text-xs" target="_blank">
                      <List className="mr-2 h-4 w-4" />
                      Edit dropdown
                    </Link>
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
