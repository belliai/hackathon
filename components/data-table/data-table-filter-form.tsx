"use client"

import { useState } from "react"
import { Download, Search, SearchIcon, SlidersHorizontal } from "lucide-react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"

import { Button } from "../ui/button"
import { Card } from "../ui/card"
import DateInput from "../ui/date-input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export type FormFieldOption<T> = {
  key: Path<T>
  type: "text" | "select" | "date"
  selectOptions?: { value: string; label: string }[]
  label: string
  placeholder?: string
}

type DataTableFilterFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  formFilters: FormFieldOption<T>[]
}

export default function DataTableFilterForm<T extends FieldValues>(
  props: DataTableFilterFormProps<T>
) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded((prev) => !prev)

  const filters = !isExpanded
    ? [...props.formFilters].slice(0, 4)
    : [...props.formFilters]

  return (
    <Card className="rounded-md p-4 transition-all">
      <Form {...props.form}>
        <form className="flex flex-row gap-3">
          <div className="grid flex-grow grid-cols-4 gap-3">
            {filters.map((filterField) => {
              switch (filterField.type) {
                case "select":
                  return (
                    <FormField
                      key={filterField.key}
                      control={props.form.control}
                      name={filterField.key}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-muted-foreground">
                            {filterField.label}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {filterField.selectOptions?.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                case "date":
                  return (
                    <FormField
                      key={filterField.key}
                      control={props.form.control}
                      name={filterField.key}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-muted-foreground">
                            {filterField.label}
                          </FormLabel>
                          <DateInput {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                default:
                  return (
                    <FormField
                      key={filterField.key}
                      control={props.form.control}
                      name={filterField.key}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-semibold text-muted-foreground">
                            {filterField.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              rightIcon={
                                <SearchIcon className="size-4 text-muted-foreground" />
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
              }
            })}
          </div>
          <div className="mt-7 inline-flex gap-3">
            {props.formFilters.length > 4 && (
              <Button
                size="icon"
                type="button"
                className="size-9 bg-button-primary text-white hover:bg-button-primary/80"
                onClick={toggleExpand}
              >
                <SlidersHorizontal size={16} />
              </Button>
            )}
            <Button
              size="icon"
              type="button"
              className="size-9 bg-button-primary text-white hover:bg-button-primary/80"
            >
              <Search size={16} />
            </Button>
            <Button
              size="icon"
              type="button"
              className="size-9 bg-button-secondary text-white hover:bg-button-secondary/80"
            >
              <Download size={16} />
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
