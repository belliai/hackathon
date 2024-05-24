"use client";

import FormTextField, { TFormTextField } from "@/components/form/FormTextField";
import { SectionedFormFields } from "./MastersPageTemplate";
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
        className={cn(
          "grid grid-cols-2 gap-4 gap-x-6 pr-2 py-2 items-end",
          {
            "grid-cols-1": formFields && formFields?.length < 8,
          }
        )}
      >
        {formFields?.map((field) => {
          return (
            <FormTextField
              key={field.name}
              {...field}
              form={hookForm}
              endIcon={null}
            />
          );
        })}
      </div>
    </Form>
  );
}
