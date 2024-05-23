"use client";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Download, Search, SearchIcon, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DateInput from "../ui/date-input";
import { Input } from "../ui/input";
import { useState } from "react";

export type FormFieldOption<T> = {
  key: Path<T>;
  type: "text" | "select" | "date";
  selectOptions?: { value: string; label: string }[];
  label: string;
  placeholder?: string;
};

type DataTableFilterFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  formFilters: FormFieldOption<T>[];
};

export default function DataTableFilterForm<T extends FieldValues>(
  props: DataTableFilterFormProps<T>
) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const filters = !isExpanded
    ? [...props.formFilters].slice(0, 4)
    : [...props.formFilters];

  return (
    <Card className="p-4 rounded-md transition-all">
      <Form {...props.form}>
        <form className="flex flex-row gap-3">
          <div className="flex-grow grid grid-cols-4 gap-3">
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
                  );
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
                  );
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
                  );
              }
            })}
          </div>
          <div className="inline-flex gap-3 mt-7">
            <Button
              size="icon"
              type="button"
              className="bg-button-primary  text-white hover:bg-button-primary/80 size-9"
              onClick={toggleExpand}
            >
              <SlidersHorizontal size={16} />
            </Button>
            <Button
              size="icon"
              type="button"
              className="bg-button-primary  text-white hover:bg-button-primary/80 size-9"
            >
              <Search size={16} />
            </Button>
            <Button
              size="icon"
              type="button"
              className="bg-button-secondary  text-white hover:bg-button-secondary/80 size-9"
            >
              <Download size={16} />
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
