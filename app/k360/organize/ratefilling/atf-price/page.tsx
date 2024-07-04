"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS_STATUS } from "../../masters/components/dummySelectOptions"
import MastersPageTemplate from "../../masters/components/MastersPageTemplate"
import StatusBadge from "../../masters/components/StatusBadge"

export default function MasterAtfPricePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "agentCode",
      header: "Agent Code",
    },
    {
      accessorKey: "atfPrice",
      header: "ATF Price",
    },
    {
      accessorKey: "validFrom",
      header: "Valid From",
    },
    {
      accessorKey: "validTo",
      header: "Valid To",
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
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    actionColumn,
  ]

  const data = [
    {
      agentCode: "A001",
      atfPrice: "100",
      validFrom: "2021-01-01",
      validTo: "2021-12-31",
      status: "Active",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    {
      agentCode: "A002",
      atfPrice: "200",
      validFrom: "2021-01-01",
      validTo: "2021-12-31",
      status: "Inactive",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "atfPrice",
      placeholder: "ATF Price",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "divisionalValue",
      placeholder: "Divisional Value",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "agentCode",
      placeholder: "Agent Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "validFrom",
      placeholder: "Valid From",
      type: "date",
    },
    {
      name: "validTo",
      placeholder: "Valid To",
      type: "date",
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ]

  const filterForm = useForm()
  const form = useForm()

  return (
    <MastersPageTemplate
      heading="ATF Price Master"
      buttonText="Create ATF Price"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      formFields={filterFormFields}
      hookForm={form}
    />
  )
}
