"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TFormTextField } from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import FilterActions from "@/components/page-template/FilterActions"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions"

export default function RateAuditPage() {
  const form = useForm()

  const formFields: TFormTextField[] = [
    {
      name: "pliListFromDate",
      label: "PLI List From Date",
      type: "date",
      orientation: "horizontal",
    },
    {
      name: "pliListToDate",
      label: "PLI List To Date",
      type: "date",
      orientation: "horizontal",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "origin",
      label: "Origin",
      type: "select",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "destination",
      label: "Destination",
      type: "select",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "awbNumber",
      label: "AWB #",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "agent",
      label: "Agent",
      type: "select",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "plis",
      label: "PLIs",
      type: "select",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
  ]

  return (
    <CreateFormPageTemplate
      heading="PLI Rate Audit"
      hookForm={form}
      formFields={formFields}
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="mt-8 max-w-96">
            <FilterActions />
          </div>
          <Separator />
          <div className="mt-8 flex gap-2">
            <Button variant="button-primary">Confirm</Button>
            <Button variant="button-primary">Reopen</Button>
            <Button variant="button-primary">Generate CN</Button>
          </div>
        </div>
      }
    />
  )
}
