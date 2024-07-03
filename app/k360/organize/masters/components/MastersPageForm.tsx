"use client"

import { UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Form } from "@/components/ui/form"
import FormTextField, { TFormTextField } from "@/components/form/FormTextField"

interface MastersPageFormProps {
  formFields?: TFormTextField[]
  hookForm: UseFormReturn<any>
}

export default function MastersPageForm({
  formFields,
  hookForm,
}: MastersPageFormProps) {
  return (
    <Form {...hookForm}>
      <div
        className={cn("grid items-end gap-4 gap-x-6 py-2 sm:grid-cols-2", {
          "max-w-xl sm:grid-cols-1": formFields && formFields?.length < 5,
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
          )
        })}
      </div>
    </Form>
  )
}
