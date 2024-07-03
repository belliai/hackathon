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

type ActiveFlightDataType = {
  flight_no: string
  source: string
  destination: string
  dept_time: string
  arrival_time: string
  aircraft_type: number
  tail_no: string
  capacity: string
  uom: string
  cargo_volume: string
  status: string
  operation_status: string
  flight_type: string
  updated_by: string
  entry_type: string
  updated_at: string
}

const columns: ColumnDef<ActiveFlightDataType>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectHead table={table} />,
    cell: ({ row }) => <DataTableSelectRow row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "flight_no",
    header: "Flight No.",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "dept_time",
    header: "Dept Time",
  },
  {
    accessorKey: "arrival_time",
    header: "Arrival Time",
  },
  {
    accessorKey: "aircraft_type",
    header: "Aircraft Type",
  },
  {
    accessorKey: "tail_no",
    header: "Tail No.",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "cargo_volume",
    header: "Cargo Volume",
  },
  {
    accessorKey: "status",
    header: "Operation Status",
  },
  {
    accessorKey: "flight_type",
    header: "Flight Type",
  },
  {
    accessorKey: "updated_by",
    header: "Updated By",
  },
  {
    accessorKey: "entry_type",
    header: "Entry Type",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions />,
  },
]

const data: ActiveFlightDataType[] = [
  {
    flight_no: "AA123",
    source: "JFK",
    destination: "LAX",
    dept_time: "2024-05-23T08:00:00Z",
    arrival_time: "2024-05-23T11:00:00Z",
    aircraft_type: 737,
    tail_no: "N123AA",
    capacity: "180",
    uom: "seats",
    cargo_volume: "2000",
    status: "On Time",
    operation_status: "Operational",
    flight_type: "Domestic",
    updated_by: "system",
    entry_type: "Automated",
    updated_at: "2024-05-23T06:00:00Z",
  },
  {
    flight_no: "BA456",
    source: "LHR",
    destination: "JFK",
    dept_time: "2024-05-23T14:00:00Z",
    arrival_time: "2024-05-23T17:00:00Z",
    aircraft_type: 747,
    tail_no: "G-BA456",
    capacity: "400",
    uom: "seats",
    cargo_volume: "5000",
    status: "Delayed",
    operation_status: "Operational",
    flight_type: "International",
    updated_by: "system",
    entry_type: "Automated",
    updated_at: "2024-05-23T12:00:00Z",
  },
  {
    flight_no: "DL789",
    source: "ATL",
    destination: "ORD",
    dept_time: "2024-05-23T09:30:00Z",
    arrival_time: "2024-05-23T11:00:00Z",
    aircraft_type: 757,
    tail_no: "N789DL",
    capacity: "200",
    uom: "seats",
    cargo_volume: "3000",
    status: "On Time",
    operation_status: "Operational",
    flight_type: "Domestic",
    updated_by: "user123",
    entry_type: "Manual",
    updated_at: "2024-05-23T07:00:00Z",
  },
]

type FilterDataType = Partial<ActiveFlightDataType> & {
  dept_time_to?: string
  dept_time_from?: string
}

const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "source",
    type: "select",
    label: "Origin",
    selectOptions: [
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
      { value: "JFK", label: "John F. Kennedy International Airport" },
      { value: "LAX", label: "Los Angeles International Airport" },
      // Add more options as needed
    ],
    placeholder: "Select destination",
  },
  {
    key: "flight_no",
    type: "text",
    label: "Flight No",
    placeholder: "Enter flight number",
  },
  {
    key: "aircraft_type",
    type: "select",
    label: "Aircraft Type",
    selectOptions: [
      { value: "737", label: "Boeing 737" },
      { value: "747", label: "Boeing 747" },
      // Add more options as needed
    ],
    placeholder: "Select aircraft type",
  },
  {
    key: "flight_type",
    type: "select",
    label: "Flight Type",
    selectOptions: [
      { value: "Domestic", label: "Domestic" },
      { value: "International", label: "International" },
      // Add more options as needed
    ],
    placeholder: "Select flight type",
  },
  {
    key: "dept_time_from",
    type: "date",
    label: "Depart From Date",
    placeholder: "Select departure from date",
  },
  {
    key: "dept_time_to",
    type: "date",
    label: "Depart To Date",
    placeholder: "Select departure to date",
  },
  {
    key: "operation_status",
    type: "select",
    label: "Operation Status",
    selectOptions: [
      { value: "Operational", label: "Operational" },
      { value: "Non-Operational", label: "Non-Operational" },
      // Add more options as needed
    ],
    placeholder: "Select operation status",
  },
  {
    key: "status",
    type: "select",
    label: "Status",
    selectOptions: [
      { value: "On Time", label: "On Time" },
      { value: "Delayed", label: "Delayed" },
      // Add more options as needed
    ],
    placeholder: "Select status",
  },
  {
    key: "entry_type",
    type: "select",
    label: "Entry Type",
    selectOptions: [
      { value: "Automated", label: "Automated" },
      { value: "Manual", label: "Manual" },
      // Add more options as needed
    ],
    placeholder: "Select entry type",
  },
]

export default function Page() {
  const form = useForm()
  return (
    <PageContainer className="gap-6">
      <PageHeader title="Active Flights" />
      <DataTableFilterForm form={form} formFilters={formFilters} />
      <DataTable columns={columns} data={data} hideToolbar />
    </PageContainer>
  )
}
