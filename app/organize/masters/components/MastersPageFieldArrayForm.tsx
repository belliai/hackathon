import { DataTable } from "@/components/data-table/data-table";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FieldArrayProps } from "./MastersPageTemplate";
import { ColumnDef, Row } from "@tanstack/react-table";
import FormTextField from "@/components/form/FormTextField";
import { Button } from "@components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useMemo } from "react";

interface MastersPageFieldArrayFormProps {
  hookForm: UseFormReturn<any>;
  fieldArrayProps: FieldArrayProps;
}

export default function MastersPageFieldArrayForm({
  hookForm,
  fieldArrayProps,
}: MastersPageFieldArrayFormProps) {
  const columns = useMemo<ColumnDef<any>[]>(() => {
    return [
      ...fieldArrayProps.fields.map((field) => {
        return {
          accessorKey: field.name,
          header: field.label ?? field.placeholder,
          cell: ({ row }: { row: Row<any> }) => {
            return (
              <FormTextField
                key={"fieldArray." + row.index + "." + field.name}
                {...field}
                name={`fieldArray.${row.index}.${field.name}`}
                form={hookForm}
              />
            );
          },
        };
      }),
      {
        id: "remove",
        header: "Remove",
        cell: ({ row }) => {
          return (
            <Button
              size="icon"
              variant="destructive"
              onClick={() => {
                fieldArrayProps?.fieldArray.remove(row.index);
              }}
            >
              <Trash size={16} />
            </Button>
          );
        },
      },
    ];
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Form {...hookForm}>
        <DataTable
          columns={columns}
          hidePagination
          hideToolbar
          data={hookForm.watch("fieldArray")}
        />
      </Form>
      <Button
        onClick={() => fieldArrayProps?.fieldArray.append({})}
        className="bg-button-primary hover:bg-button-primary/80 text-white mr-auto"
      >
        <Plus className="mr-2" size={16} />
        Add
      </Button>
    </div>
  );
}
