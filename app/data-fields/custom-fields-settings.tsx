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
  ListTodo,
  Phone,
  Plus,
  User2,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { useCustomFields } from "@/lib/hooks/custom-fields"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { ComboboxProps } from "@/components/form/combobox"
import { InputSwitchProps } from "@/components/form/InputSwitch"

import CrudTable, { FormDropdown } from "./components/crud-table"
import {
  DataFields,
  DataFieldsItem,
  DataFieldsItemContent,
} from "./components/data-fields"

export type FieldGroupType = {
  id: string
  name: string
  data: CustomFieldsSettingsType[]
}

export type CustomFieldsSettingsType = {
  id: string
  field_name: string
  field_type: string
  field_group: string
}

interface CustomFieldsSettingsProps {
  title?: string
  data: FieldGroupType[]
  groups: Required<ComboboxProps>["options"]
}

const DUMMY_FIELD_TYPES: Required<ComboboxProps>["options"] = [
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
    icon: <ListTodo />,
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

export default function CustomFieldsSettings({
  data,
  groups,
}: CustomFieldsSettingsProps) {
  const [selectedEditingField, setSelectedEditingField] = useState<
    string | null
  >(null)
  const [selectedEditingGroup, setSelectedEditingGroup] = useState<
    string | null
  >(null)

  const [selectedGroup, setSelectedGroup] = useState<string[]>([])
  const [selectedAddgroup, setSelectedAddGroup] = useState<string | null>(null)

  const {
    deleteCustomField,
    addCustomField,
    fieldGroups,
    addFieldGroup,
    updateCustomField,
    customFields,
    setCustomFields,
    updateFieldGroup,
    deleteFieldGroup,
  } = useCustomFields({
    defaultCustomFields: data,
    defaultFieldGroups: groups,
  })

  const form: InputSwitchProps<CustomFieldsSettingsType>[] = [
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
      name: "field_group",
      type: "combobox",
      label: "Field Group",
      placeholder: "Field Group",
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
  ]

  const secondForm: InputSwitchProps<{ field_group: string }>[] = [
    {
      name: "field_group",
      type: "text",
      label: "Field Group Name",
    },
  ]

  const fieldGroupForm = useForm({
    defaultValues: { field_group: "" },
  })

  function handleAddFieldGroup(data: { field_group: string }) {
    const newField = addFieldGroup(data.field_group)

    // Add new field after creating the field group
    handleAddFieldToGroup(newField?.id || "")
  }

  function handleAddFieldToGroup(id: string) {
    setSelectedAddGroup(id)
    setSelectedGroup((prev) => prev.concat(id))
  }

  function handleUpdateFieldGroup(data: { id: string; field_group: string }) {
    if (selectedEditingGroup) {
      updateFieldGroup(data.field_group, selectedEditingGroup)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <FormDropdown
        form={form}
        onSave={(data) => {
          let payload = {
            ...data,
            field_group: data.field_group,
          }

          if (data.field_group === "" || !data.field_group) {
            payload.field_group = "unassigned"
          }

          addCustomField(payload)
        }}
        className="flex-wrap justify-end"
        fieldsDirection="vertical"
        buttonText="New Field"
        secondFormProps={{
          form: secondForm,
          onSave: handleAddFieldGroup,
          buttonText: "New Group",
        }}
      />
      <Accordion
        type="multiple"
        className="flex flex-col gap-2"
        value={selectedGroup}
        onValueChange={setSelectedGroup}
      >
        {customFields.map((fieldGroup) => {
          const currentFieldGroupData = fieldGroups.find(
            (f) => f.value === fieldGroup.id
          )

          const dataToDisplay = {
            id: fieldGroup.id,
            field_group: currentFieldGroupData?.label || "Unassigned",
          }

          return (
            <AccordionItem
              value={fieldGroup.id}
              className="rounded-sm border bg-zinc-900/50"
              key={fieldGroup.id}
            >
              <Form {...fieldGroupForm}>
                <AccordionTrigger
                  value={fieldGroup.id}
                  className="group/trigger flex flex-row-reverse justify-between gap-2 px-3 py-1.5"
                >
                  <Button
                    size="icon"
                    className="h-8 w-8 bg-transparent p-0 text-gray-400 opacity-0 transition-opacity duration-200 hover:bg-transparent group-hover/trigger:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedGroup((prev) => prev.concat(fieldGroup.id))
                      setSelectedAddGroup(fieldGroup.id)
                    }}
                  >
                    <Plus size={16} />
                  </Button>
                  <DataFieldsItemContent
                    selectedEditing={selectedEditingGroup}
                    setSelectedEditing={setSelectedEditingGroup}
                    columnSpans={[12, 0, 0]}
                    data={dataToDisplay}
                    title={fieldGroup.name}
                    form={secondForm}
                    onSave={handleUpdateFieldGroup}
                    onDelete={() => deleteFieldGroup(fieldGroup.id)}
                    actionsClassName="group/trigger:opacity-0 group-hover/trigger:opacity-100 group-hover:opacity-0"
                  />
                </AccordionTrigger>
                <AccordionContent className="py-2">
                  {fieldGroup.data.map((field) => {
                    const dataToDisplay = {
                      id: field.id,
                      field_name: field.field_name,
                      field_type: DUMMY_FIELD_TYPES.find(
                        (d) => d.value === field.field_type
                      )?.label,
                    }

                    return (
                      <DataFieldsItem
                        key={field.id}
                        className="group/item rounded-none border-0 bg-transparent pl-9 hover:bg-white/5"
                      >
                        <DataFieldsItemContent
                          selectedEditing={selectedEditingField}
                          setSelectedEditing={setSelectedEditingField}
                          columnSpans={[4, 4, 4]}
                          data={dataToDisplay}
                          actionsClassName="group-hover:opacity-0 opacity-0 group-hover/item:opacity-100"
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
                              name: "field_type",
                              type: "combobox",
                              label: "Field Type",
                              placeholder: "Field Type*",
                              className: "min-w-[200px]",
                              selectOptions: DUMMY_FIELD_TYPES,
                            },
                          ]}
                          title={field.field_name}
                          onSave={(data) =>
                            updateCustomField({
                              ...data,
                              field_type: field.field_type,
                              field_group: fieldGroup.id,
                            })
                          }
                          onDelete={() => deleteCustomField(field)}
                        />
                      </DataFieldsItem>
                    )
                  })}
                  {selectedAddgroup === fieldGroup.id && (
                    <DataFieldsItem className="group/item border-0 bg-transparent pl-9">
                      <DataFieldsItemContent
                        selectedEditing={selectedAddgroup}
                        setSelectedEditing={setSelectedAddGroup}
                        columnSpans={[4, 4, 4]}
                        data={{
                          id: fieldGroup.id,
                          field_name: "",
                          field_type: "",
                        }}
                        actionsClassName="group-hover:opacity-0 opacity-0 group-hover/item:opacity-100"
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
                            name: "field_type",
                            type: "combobox",
                            label: "Field Type",
                            placeholder: "Field Type*",
                            className: "min-w-[200px]",
                            selectOptions: DUMMY_FIELD_TYPES,
                          },
                        ]}
                        title={`New Field to ${fieldGroup.name}`}
                        isNew
                        onSave={(data) => {
                          addCustomField({
                            ...data,
                            field_group: fieldGroup.id,
                          })
                          setSelectedAddGroup(null)
                        }}
                        onDelete={() => {}}
                      />
                    </DataFieldsItem>
                  )}
                </AccordionContent>
              </Form>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
