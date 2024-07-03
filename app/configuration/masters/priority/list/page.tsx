"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"
import { FormTextFieldProps } from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS_STATUS } from "@/app/k360/organize/masters/components/dummySelectOptions"
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate"
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge"

export default function MasterPriorityPage() {
  const formFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "priority",
      label: "Priority",
      type: "text",
    },
    {
      name: "location",
      label: "Location",
      type: "text",
    },
    {
      name: "shipment",
      label: "Shipment",
      type: "text",
    },
    {
      name: "active",
      label: "Active",
      type: "checkbox",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ]

  const filterForm = useForm()

  return (
    <CreateFormPageTemplate
      heading="List Priority Configuration"
      formFields={formFields}
      hookForm={filterForm}
      customDialogContent={
        <div className="flex w-full max-w-96 flex-col gap-4">
          <FilterActions />
          <Separator />
          <div className="flex w-full gap-2">
            <Button variant="button-primary">Save</Button>
            <Button variant="button-primary">Details</Button>
          </div>
        </div>
      }
    />
  )
}
