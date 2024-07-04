"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { DataTable } from "@/components/data-table/data-table"
import DataTableFilterForm, {
  FormFieldOption,
} from "@/components/data-table/data-table-filter-form"
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"
import DataTableSelectHead from "@/components/data-table/DataTableSelectHead"
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

type DataType = {
  flight: string
  comm_code: string
  origin: string
  destination: string
  user: string
  shipper_code: string
  template_id: string
  agent_code: string
}

const columns: ColumnDef<DataType>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectHead table={table} />,
    cell: ({ row }) => <DataTableSelectRow row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "flight",
    header: "Flight",
  },
  {
    accessorKey: "comm_code",
    header: "Comm Code",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "shipper_code",
    header: "Shipper Code",
  },
  {
    accessorKey: "template_id",
    header: "Template Id",
  },
  {
    accessorKey: "agent_code",
    header: "Agent Code",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions />,
  },
]

const data: DataType[] = [
  {
    flight: "AK-232-564",
    comm_code: "COM-123",
    origin: "SG",
    destination: "CGK",
    user: "Jeff",
    shipper_code: "FF00023",
    template_id: "AA0023",
    agent_code: "AG-233",
  },
  {
    flight: "LW-883-993",
    comm_code: "COM-123",
    origin: "JFK",
    destination: "CGK",
    user: "John",
    shipper_code: "SH99231",
    template_id: "LL2123",
    agent_code: "AG-442",
  },
  {
    flight: "PR-345-665",
    comm_code: "COM-123",
    origin: "GLS",
    destination: "SYD",
    user: "Udin",
    shipper_code: "LP99233",
    template_id: "MK0232",
    agent_code: "AG-887",
  },
]

type FilterDataType = DataType

const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "flight",
    type: "text",
    label: "Flight",
    placeholder: "Enter flight number",
  },
  {
    key: "comm_code",
    type: "text",
    label: "Comm Code",
    placeholder: "Enter comm code",
  },
  {
    key: "origin",
    type: "select",
    label: "Origin",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "JFK", label: "John F. Kennedy International Airport" },
      { value: "LAX", label: "Los Angeles International Airport" },
      // Add more options as needed
    ],
    placeholder: "Select origin",
  },
  {
    key: "destination",
    type: "select",
    label: "Destination",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "JFK", label: "John F. Kennedy International Airport" },
      { value: "LAX", label: "Los Angeles International Airport" },
      // Add more options as needed
    ],
    placeholder: "Select destination",
  },
  {
    key: "user",
    type: "text",
    label: "User",
    placeholder: "Enter user name",
  },
  {
    key: "shipper_code",
    type: "text",
    label: "Shipper Code",
    placeholder: "Enter shipper code",
  },
  {
    key: "template_id",
    type: "text",
    label: "Template Id",
    placeholder: "Enter template id",
  },
  {
    key: "agent_code",
    type: "text",
    label: "Agent Code",
    placeholder: "Enter agent code",
  },
]

export default function Page() {
  const form = useForm<DataType>()
  return (
    <PageContainer className="gap-4">
      <PageHeader title="Templates List" />
      <DataTableFilterForm form={form} formFilters={formFilters} />
      <DataTable
        initialPinning={{
          left: ["select"],
          right: ["action"],
        }}
        columns={columns}
        data={data}
      />
    </PageContainer>
  )
}
