"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"
import { FormTextFieldProps } from "@/components/form/FormTextField"

import { selectColumn } from "../../components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions"
import MastersPageTemplate from "../../components/MastersPageTemplate"

export default function MasterStatePage() {
  const columns: ColumnDef<any>[] = [
    {
      ...selectColumn,
    },
    {
      accessorKey: "state_code",
      header: "State Code",
    },
    {
      accessorKey: "state_name",
      header: "State Name",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "state_type",
      header: "State Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className="bg-green-700/80 text-white hover:bg-green-600">
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => <DataTableRowActions />,
    },
  ]

  const formFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "state_code",
      placeholder: "State Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "state_name",
      placeholder: "State Name",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "country",
      placeholder: "Country",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "state_type",
      placeholder: "State Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ]

  const data = [
    {
      id: 1,
      state_code: "AP",
      state_name: "Andhra Pradesh",
      country: "India",
      state_type: "ST",
      status: "Active",
      created_at: "2021-10-01",
      updated_at: "2021-10-01",
    },
    {
      id: 2,
      state_code: "TS",
      state_name: "Telangana",
      country: "India",
      state_type: "ST",
      status: "Active",
      created_at: "2021-10-01",
      updated_at: "2021-10-01",
    },
  ]

  const stateForm = useForm()
  const filterForm = useForm()

  return (
    <MastersPageTemplate
      heading="State Master"
      buttonText="Create State"
      columns={columns}
      formFields={formFields}
      data={data}
      filterFormFields={formFields}
      filterHookForm={filterForm}
      hookForm={stateForm}
    />
  )
}
