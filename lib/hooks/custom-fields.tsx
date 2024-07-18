import { useState } from "react"

import { toast } from "@/components/ui/use-toast"
import { ComboboxOption } from "@/components/form/combobox"
import {
  CustomFieldsSettingsType,
  FieldGroupType,
} from "@/app/data-fields/custom-fields-settings"

import { slugify } from "../utils/slugify-utils"

interface CustomFieldsHook {
  defaultFieldGroups: ComboboxOption[]
  defaultCustomFields: FieldGroupType[]
}

/**
 * A hook to provide methods to get, add, remove, and update custom fields.
 * @returns An object containing the custom fields methods.
 *
 */
export function useCustomFields({
  defaultCustomFields,
  defaultFieldGroups,
}: CustomFieldsHook) {
  // This is temporary, we will replace this with the actual data from the API
  const [fieldGroups, setFieldGroups] =
    useState<ComboboxOption[]>(defaultFieldGroups)
  const [customFields, setCustomFields] =
    useState<FieldGroupType[]>(defaultCustomFields)

  const getCustomFields = () => {}

  const addCustomField = (formValues: CustomFieldsSettingsType) => {
    console.log("submitted", formValues)

    // Get the field group selected by the user
    const customFieldsgroup = customFields.find(
      (field) => field.name === formValues.field_group
    )

    // Check if the field already exists in the selected field group
    const isExist = customFieldsgroup?.data.some(
      (field) => field.field_name === formValues.field_name
    )

    if (isExist) {
      toast({
        title: "Field already exists",
        description: "Please select the existing field",
      })
    } else {
      // Add the new field to the selected field group
      const updatedFieldGroup = customFields.map((field) => {
        if (field.id === formValues.field_group) {
          return {
            id: field.id,
            name: field.name,
            data: [
              ...field.data,
              {
                id: slugify(formValues.field_name),
                field_name: formValues.field_name,
                field_type: formValues.field_type,
                field_group: formValues.field_group,
              },
            ],
          }
        }

        return field
      })

      setCustomFields(updatedFieldGroup)

      toast({
        title: "Success",
        description: `${formValues.field_name} has been added to ${formValues.field_group}`,
      })
    }
  }

  const deleteCustomField = (data: CustomFieldsSettingsType) => {
    const updatedFieldGroups = customFields.map((field) => {
      const updatedData = field.data.filter((f) => f.id !== data.id)

      return {
        id: field.id,
        name: field.name,
        data: updatedData,
      }
    })

    setCustomFields(updatedFieldGroups)

    toast({
      title: "Success",
      description: "Field deleted",
    })
  }

  const updateCustomField = () => {}

  const addFieldGroup = (newField: string) => {
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

    setCustomFields((prev) => [
      ...prev,
      {
        id: slugify(newField),
        name: newField,
        data: [],
      },
    ])

    toast({
      title: "Success",
      description: `${newField} has been added to Field Groups`,
    })
  }

  const updateFieldGroup = (newOption: string, targetValue: string) => {
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

  return {
    getCustomFields,
    addCustomField,
    deleteCustomField,
    updateCustomField,
    customFields,
    setCustomFields,
    fieldGroups,
    setFieldGroups,
    addFieldGroup,
    updateFieldGroup,
  }
}
