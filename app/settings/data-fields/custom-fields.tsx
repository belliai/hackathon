"use client"

import { useState } from "react"
import {
  Binary,
  Building2,
  CalendarDays,
  CaseUpper,
  DollarSign,
  Home,
  ListChecks,
  Phone,
  User2,
  ListCheck
} from "lucide-react"

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

const DUMMY_FIELD_TYPES: ComboboxProps["options"] = [
  {
    icon: <CaseUpper />,
    label: "Text",
    value: "text",
  },
  {
    icon: <Binary />,
    label: "Numerical",
    value: "number",
  },
  {
    icon: <ListCheck />,
    label: "Single Option",
    value: "single_option",
  },
  {
    icon: <ListChecks />,
    label: "Multiple Option",
    value: "multiple_option",
  },
  {
    icon: <DollarSign />,
    label: "Monetary",
    value: "monetary",
  },
  {
    icon: <User2 />,
    label: "User",
    value: "user",
  },
  {
    icon: <Building2 />,
    label: "Organization",
    value: "organization",
  },
  {
    icon: <Phone />,
    label: "Phone",
    value: "phone",
  },
  {
    icon: <CalendarDays />,
    label: "Date & Time",
    value: "date_time",
  },
  {
    icon: <Home />,
    label: "Address",
    value: "address",
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
          selectOptions: DUMMY_FIELD_TYPES,
        },
      ]}
      data={data}
      onDelete={deleteCustomField}
      onSave={addCustomField}
    />
  )
}
