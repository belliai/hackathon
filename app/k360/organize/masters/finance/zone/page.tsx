"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions"
import MastersPageTemplate from "../../components/MastersPageTemplate"
import StatusBadge from "../../components/StatusBadge"

export default function MasterZonePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "zone_name",
      header: "Zone Name",
    },
    {
      accessorKey: "level",
      header: "Level",
    },
    {
      accessorKey: "location",
      header: "Location",
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

  const formFields: TFormTextField[] = [
    {
      name: "zone_name",
      placeholder: "Zone Name",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "level",
      placeholder: "Level",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "location",
      placeholder: "Location",
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

  const zoneForm = useForm()
  const filterForm = useForm()

  const data = [
    {
      zone_name: "Zone 1",
      level: "Level 1",
      location: "Location 1",
      status: "Active",
    },
    {
      zone_name: "Zone 2",
      level: "Level 2",
      location: "Location 2",
      status: "Inactive",
    },
  ]

  return (
    <MastersPageTemplate
      heading="Zone Master"
      buttonText="Create Zone"
      columns={columns}
      filterFormFields={formFields}
      filterHookForm={filterForm}
      hookForm={zoneForm}
      formFields={formFields}
      data={data}
    />
  )
}
