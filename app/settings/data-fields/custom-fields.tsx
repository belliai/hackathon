"use client"

import { useState } from "react"

import { useCustomFields } from "@/lib/hooks/custom-fields"
import { slugify } from "@/lib/utils/slugify-utils"
import { toast } from "@/components/ui/use-toast"
import { ComboboxProps } from "@/components/form/combobox"

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

const DUMMY_FIELD_GROUPS = [
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
]

export default function CustomFields({ title, data }: CustomFieldsProps) {
  const [fieldGroups, setFieldGroups] = useState(DUMMY_FIELD_GROUPS)

  const { deleteCustomField, addCustomField } = useCustomFields()

  function handleAddCustomField(newField: string, close: () => void) {
    const isExist = fieldGroups.some((field) => field.label === newField)

    if (isExist) {
      toast({
        title: "Field Group already exists",
        description: "Please select the existing field group",
      })
      return
    }

    // TODO: Call the API to add the new option
    setFieldGroups((prev) => [
      ...prev,
      { label: newField, value: slugify(newField) },
    ])

    toast({
      title: "Success",
      description: `${newField} has been added to Field Groups`,
    })

    close()
  }

  function handleEditCustomField(newOption: string, targetValue: string) {
    if (newOption === "") {
      toast({
        title: "Field Group cannot be empty",
        description: "Please enter a valid field group",
      })
      return
    }

    const isExist = fieldGroups.some((field) => field.value === targetValue)

    if (!isExist) {
      toast({
        title: "Field Group not found",
        description: "Please select the existing field group",
      })
      return
    }

    const isTheSame =
      fieldGroups.find((field) => field.label === newOption)?.label ===
      newOption

    if (isTheSame) {
      // If the user didn't change the field group name
      return
    }

    const updatedFieldGroups = fieldGroups.map((field) => {
      if (field.value === targetValue) {
        return {
          label: newOption,
          value: slugify(newOption),
        }
      }

      return field
    })

    setFieldGroups(updatedFieldGroups)

    toast({
      title: "Success",
      description: `Option updated`,
    })
  }

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
          onAddOption: handleAddCustomField,
          onSaveEditOption: handleEditCustomField,
          className: "min-w-[200px]",
          selectOptions: fieldGroups, // Hardcoded value, should be replaced with the actual value
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
