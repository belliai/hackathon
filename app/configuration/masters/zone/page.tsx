"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate"
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge"

export default function MastersZonePage() {
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
      label: "Zone Name",
      hideTooltip: true,
      type: "text",
    },
    {
      name: "level",
      label: "Level",
      hideTooltip: true,
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "location",
      label: "Location",
      hideTooltip: true,
      type: "text",
    },
    {
      name: "isActive",
      label: "isActive",
      type: "checkbox",
    },
  ]

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
      data={data}
      columns={columns}
      filterFormFields={formFields}
      filterHookForm={filterForm}
      customFilterButtons={<FilterActions />}
    />
  )
}
