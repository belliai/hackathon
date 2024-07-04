import { useMemo } from "react"
import { Button } from "@components/ui/button"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Plus, Trash } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { Form } from "@/components/ui/form"
import { DataTable } from "@/components/data-table/data-table"
import FormTextField from "@/components/form/FormTextField"

import { FieldArrayProps } from "./MastersPageTemplate"

interface MastersPageFieldArrayFormProps {
  hookForm: UseFormReturn<any>
  fieldArrayProps: FieldArrayProps
  showRemoveButton?: boolean
  additionalColumns?: ColumnDef<any>[]
}

export default function MastersPageFieldArrayForm({
  hookForm,
  fieldArrayProps,
  showRemoveButton = true,
  additionalColumns = [],
}: MastersPageFieldArrayFormProps) {
  const columns = useMemo<ColumnDef<any>[]>(() => {
    return [
      ...fieldArrayProps.fields.map((field) => {
        return {
          accessorKey: field.name,
          header: field.label ?? field.placeholder,
          cell: ({ row }: { row: Row<any> }) => {
            const fieldName = `${
              fieldArrayProps.fieldArrayName ?? "fieldArray"
            }.${row.index}.${field.name}`

            return (
              <FormTextField
                key={fieldName}
                {...field}
                name={fieldName}
                form={hookForm}
                disabled={field.disabled}
              />
            )
          },
        }
      }),
      showRemoveButton
        ? ({
            id: "remove",
            header: "Remove",
            cell: ({ row }) => {
              return (
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => {
                    fieldArrayProps?.fieldArray.remove(row.index)
                  }}
                >
                  <Trash size={16} />
                </Button>
              )
            },
          } as ColumnDef<any>)
        : undefined,
    ].filter(Boolean) as ColumnDef<any>[]
  }, [
    showRemoveButton,
    fieldArrayProps.fieldArray.fields,
    hookForm.getValues(fieldArrayProps.fieldArrayName ?? "fieldArray"),
  ])

  return (
    <div className="flex flex-col gap-4">
      <Form {...hookForm}>
        <DataTable
          columns={columns}
          hidePagination
          hideToolbar
          data={fieldArrayProps.fieldArray.fields}
        />
      </Form>
      <Button
        onClick={() => fieldArrayProps?.fieldArray.append({})}
        type="button"
        className="mr-auto bg-button-primary text-white hover:bg-button-primary/80"
      >
        <Plus className="mr-2" size={16} />
        Add
      </Button>
    </div>
  )
}
