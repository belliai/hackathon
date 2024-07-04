"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"
import { FormTextFieldProps } from "@/components/form/FormTextField"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions"
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate"
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge"

export default function MasterPriorityPage() {
  const formFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "priority",
      label: "Priority ID",
      type: "text",
    },
    {
      name: "priorityName",
      label: "Priority Name",
      type: "text",
    },
    {
      name: "priorityColor",
      label: "Priority Color",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "remarks",
      label: "Remarks",
      type: "text",
    },
    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },
  ]

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "priorityId",
      header: "Priority ID",
    },
    {
      accessorKey: "priorityName",
      header: "Priority Name",
    },
    {
      accessorKey: "priorityColor",
      header: "Priority Color",
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status}
          severity={row.original.status === "Active" ? "default" : "error"}
        />
      ),
    },
    actionColumn,
  ]

  const data = [
    {
      priorityId: "1",
      priorityName: "Priority 1",
      priorityColor: "Red",
      remarks: "Remarks",
      status: "Active",
    },
    {
      priorityId: "2",
      priorityName: "Priority 2",
      priorityColor: "Green",
      remarks: "Remarks",
      status: "Active",
    },
  ]

  const filterForm = useForm()

  return (
    <MastersPageTemplate
      heading="Priority Master"
      filterHookForm={filterForm}
      filterFormFields={formFields}
      columns={columns}
      data={data}
      customFilterButtons={<FilterActions />}
    />
  )
}
