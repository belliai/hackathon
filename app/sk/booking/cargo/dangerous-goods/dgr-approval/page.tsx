"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ShieldCheck, ShieldX } from "lucide-react"
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
  origin: string
  destination: string
  agent_code: string
  awb_number: string
  flight: string
  status: string
  flight_date: string
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
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "agent_code",
    header: "Agent Code",
  },
  {
    accessorKey: "awb_number",
    header: "AWB Number",
  },
  {
    accessorKey: "flight",
    header: "Flight#",
  },
  {
    accessorKey: "flight_date",
    header: "Flight Date",
    meta: { isDateFilter: true },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      filterSelectOptions: [
        { value: "All", label: "All" },
        { value: "new", label: "New" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
      ],
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions />,
  },
]

const data: DataType[] = [
  {
    origin: "JFK",
    destination: "LAX",
    agent_code: "AG123",
    awb_number: "807",
    flight: "AK123",
    status: "New",
    flight_date: "2024-05-20",
  },
  {
    origin: "LHR",
    destination: "JFK",
    agent_code: "AG456",
    awb_number: "808",
    flight: "BA456",
    status: "Approved",
    flight_date: "2024-05-21",
  },
  {
    origin: "ATL",
    destination: "ORD",
    agent_code: "AG789",
    awb_number: "809",
    flight: "DL789",
    status: "Rejected",
    flight_date: "2024-05-22",
  },
]

type FilterDataType = Partial<DataType> & {
  from_date?: string
  to_date?: string
}

const formFilters: FormFieldOption<FilterDataType>[] = [
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
    ],
    placeholder: "Select destination",
  },
  {
    key: "agent_code",
    type: "text",
    label: "Agent Code",
    placeholder: "Enter agent code",
  },
  {
    key: "awb_number",
    type: "text",
    label: "AWB Number",
    placeholder: "Enter AWB number",
  },
  {
    key: "flight",
    type: "select",
    label: "Flight#",
    selectOptions: [
      { value: "All", label: "All" },
      // Add more options as needed
    ],
    placeholder: "Select flight",
  },
  {
    key: "flight_date",
    type: "date",
    label: "Flight Date",
    placeholder: "Select flight date",
  },
  {
    key: "status",
    type: "select",
    label: "Status",
    selectOptions: [
      { value: "All", label: "All" },
      { value: "new", label: "New" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
      // Add more options as needed
    ],
    placeholder: "Select status",
  },
  {
    key: "from_date",
    type: "date",
    label: "From Date",
    placeholder: "Select from date",
  },
  {
    key: "to_date",
    type: "date",
    label: "To Date",
    placeholder: "Select to date",
  },
]

export default function Page() {
  const form = useForm<FilterDataType>()
  return (
    <PageContainer className="gap-4">
      <PageHeader title="Dangerous Goods Approval" />
      {/* <DataTableFilterForm form={form} formFilters={formFilters} /> */}
      <DataTable
        extraToolbarButtons={[
          { label: "Approve", icon: ShieldCheck },
          { label: "Reject", icon: ShieldX },
        ]}
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
