"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "../../components/dummySelectOptions"
import MastersPageTemplate from "../../components/MastersPageTemplate"
import StatusBadge from "../../components/StatusBadge"

export default function MasterAirportPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "countryCode",
      header: "Country Code",
    },
    {
      accessorKey: "region",
      header: "Region",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "city",
      header: "City",
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
      accessorKey: "uom",
      header: "UOM",
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
      countryCode: "US",
      region: "North America",
      state: "California",
      name: "Los Angeles",
      code: "LAX",
      type: "Airport",
      city: "Los Angeles",
      status: "Active",
      uom: "km",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
      action: "Edit",
    },
    {
      countryCode: "CA",
      region: "North America",
      state: "Ontario",
      name: "Toronto",
      code: "YYZ",
      type: "Airport",
      city: "Toronto",
      status: "Inactive",
      uom: "km",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-25",
      action: "Edit",
    },
    {
      countryCode: "GB",
      region: "Europe",
      state: "England",
      name: "London",
      code: "LHR",
      type: "Airport",
      city: "London",
      status: "Active",
      uom: "km",
      createdAt: "2023-03-05",
      updatedAt: "2023-10-30",
      action: "Edit",
    },
    {
      countryCode: "JP",
      region: "Asia",
      state: "Tokyo",
      name: "Narita",
      code: "NRT",
      type: "Airport",
      city: "Narita",
      status: "Inactive",
      uom: "km",
      createdAt: "2023-04-10",
      updatedAt: "2023-09-15",
      action: "Edit",
    },
    {
      countryCode: "DE",
      region: "Europe",
      state: "Bavaria",
      name: "Munich",
      code: "MUC",
      type: "Airport",
      city: "Munich",
      status: "Active",
      uom: "km",
      createdAt: "2023-05-25",
      updatedAt: "2023-08-20",
      action: "Edit",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "code",
      placeholder: "Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "name",
      placeholder: "Name",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "type",
      type: "select",
      placeholder: "Type",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "city",
      placeholder: "City",
      type: "text",
      endIcon: <Search />,
    },
  ]

  const airportForm = useForm()
  const filterForm = useForm()

  return (
    <MastersPageTemplate
      heading="Airport/Warehouse Master"
      buttonText="Create Airport/Warehouse"
      filterFormFields={filterFormFields}
      formFields={filterFormFields}
      filterHookForm={filterForm}
      hookForm={airportForm}
      columns={columns}
      data={data}
    />
  )
}
