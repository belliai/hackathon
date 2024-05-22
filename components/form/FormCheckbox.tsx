"use client";

import { UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface FormCheckboxProps {
  label: string;
  form: UseFormReturn<any>;
}

export function FormCheckbox({ label, form }: FormCheckboxProps) {
  return (
    <FormField
      control={form.control}
      name="mobile"
      render={({ field }) => (
        <FormItem className="flex items-center gap-1.5 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="border-zinc-700"
            />
          </FormControl>
          <FormLabel>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
}
