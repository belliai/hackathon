"use client"

import { useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { TFormTextField } from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import FilterActions from "@/components/page-template/FilterActions"
import CreateFormTemplate from "@/app/k360/organize/masters/components/CreateFormTemplate"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"
import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate"

export default function NotificationMasterPage() {
  const formFields: TFormTextField[] = [
    {
      name: "fromDate",
      label: "From Date",
      type: "date",
      orientation: "horizontal",
    },
    {
      name: "toDate",
      label: "To Date",
      type: "date",
      orientation: "horizontal",
    },
    {
      name: "importance",
      label: "Importance",
      type: "select",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "station",
      label: "Station",
      type: "select",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "userName",
      label: "User Name",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "userRole",
      label: "User Role",
      type: "select",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
  ]

  const form = useForm({
    defaultValues: {
      notifications: [{}],
    },
  })

  const fieldArray = useFieldArray<any>({
    control: form.control,
    name: "notifications",
  })

  const sectionedFormFields: SectionedFormFields[] = [
    {
      sectionName: "Notification Details",
      fieldArray: {
        fieldArray,
        fieldArrayName: "notifications",
        fields: [
          {
            name: "importance",
            type: "select",
            placeholder: "Select Importance",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "station",
            type: "select",
            placeholder: "Select Station",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "role",
            type: "select",
            placeholder: "Select Role",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "user",
            type: "select",
            placeholder: "Select User",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "fromDate",
            type: "date",
            placeholder: "From Date",
          },
          {
            name: "toDate",
            type: "date",
            placeholder: "To Date",
          },
          {
            name: "subject",
            type: "text",
            placeholder: "Subject",
          },
          {
            name: "message",
            type: "text",
            placeholder: "Message",
          },
          {
            name: "isActive",
            type: "checkbox",
            placeholder: "Is Active",
          },
        ],
      },
    },
  ]

  return (
    <CreateFormPageTemplate
      heading="Notifications"
      hookForm={form}
      formFields={formFields}
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96">
            <FilterActions />
          </div>
          <CreateFormTemplate
            sectionedFormFields={sectionedFormFields}
            hookForm={form}
          />
          <div className="mt-8 flex gap-2">
            <Button variant="button-primary">Add</Button>
            <Button variant="button-primary">Save</Button>
            <Button variant="button-primary">Delete</Button>
          </div>
        </div>
      }
    />
  )
}
