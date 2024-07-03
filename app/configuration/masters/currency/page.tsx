"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate"
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge"

export default function MasterCurrencyPage() {
  const formFields: TFormTextField[] = [
    {
      name: "currency_code",
      label: "Currency Code",
      type: "text",
      hideTooltip: true,
    },
    {
      name: "currency_name",
      label: "Currency Name",
      type: "text",
      hideTooltip: true,
    },
    {
      name: "isActive",
      label: "isActive",
      type: "checkbox",
    },
  ]

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "currency_code",
      header: "Currency Code",
    },
    {
      accessorKey: "currency_name",
      header: "Currency Name",
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
    {
      accessorKey: "created_at",
      header: "Created At",
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
    },
    actionColumn,
  ]

  const data = [
    {
      currency_code: "USD",
      currency_name: "United States Dollar",
      status: "Active",
      created_at: "2022-01-01",
      updated_at: "2022-01-02",
    },
    {
      currency_code: "EUR",
      currency_name: "Euro",
      status: "Active",
      created_at: "2022-01-03",
      updated_at: "2022-01-04",
    },
  ]

  const currencyForm = useForm()
  return (
    <MastersPageTemplate
      heading="Currency Master"
      columns={columns}
      data={data}
      filterFormFields={formFields}
      filterHookForm={currencyForm}
      customFilterButtons={<FilterActions />}
    />
  )
}
