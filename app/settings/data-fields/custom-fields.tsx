"use client"

import { useCustomFields } from "@/lib/hooks/custom-fields"

import CrudTable from "./components/crud-table"

type CustomFieldsType = {
  id: string
  field_name: string
  field_type: string
  field_label: string
  field_group: string
}

interface CustomFieldsProps {
  title: string
  data: CustomFieldsType[]
}

export default function CustomFields({ title, data }: CustomFieldsProps) {
  const { deleteCustomField, addCustomField } = useCustomFields()

  return (
    <CrudTable
      title={title}
      columns={[
        {
          accessorKey: "field_name",
          header: "Field Name",
        },
        {
          accessorKey: "field_group",
          header: "Field Group",
        },
        {
          accessorKey: "field_type",
          header: "Field Type",
        },
      ]}
      form={[
        {
          name: "id",
          type: "hidden",
        },
        {
          name: "field_name",
          type: "text",
          label: "Field Name*",
        },
        {
          name: "field_label",
          type: "combobox",
          label: "Field Group",
          placeholder: "Field Group",
          className: "min-w-[200px]",
          selectOptions: [
            {
              label: "Aircraft",
              value: "Aircraft",
            },
            {
              label: "Crew",
              value: "Crew",
            },
            {
              label: "Passenger",
              value: "Passenger",
            },
          ],
        },
        {
          name: "field_type",
          type: "combobox",
          label: "Field Type",
          placeholder: "Field Type*",
          className: "min-w-[200px]",
          selectOptions: [
            {
              label: "Text",
              value: "text",
            },
            {
              label: "Number",
              value: "number",
            },
          ],
        },
      ]}
      data={data}
      onDelete={deleteCustomField}
      onSave={addCustomField}
    />
  )
}
