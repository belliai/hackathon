"use client";

import FormTextField, { TFormTextField } from "@/components/form/FormTextField";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface MastersPageFormProps {
  formFields?: TFormTextField[];
  hookForm: UseFormReturn<any>;
}

export default function MastersPageForm({
  formFields,
  hookForm,
}: MastersPageFormProps) {
  return (
    <Form {...hookForm}>
      <div
        className={cn("grid sm:grid-cols-2 gap-4 gap-x-6 py-2 items-end", {
          "sm:grid-cols-1 max-w-xl": formFields && formFields?.length < 5,
        })}
      >
        {formFields?.map((field) => {
          return (
            <FormTextField
              key={field.name}
              {...field}
              form={hookForm}
              endIcon={null}
              hideTooltip={true}
            />
          );
        })}
      </div>
    </Form>
  );
}
