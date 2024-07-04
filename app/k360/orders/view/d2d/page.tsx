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
  axb: string
  org: string
  des: string
  customer_code: string
  status: string
  mode: string
  gross_wt: string
  total_pcs: string
  booking_date: string
  execution_date: string
  first_flight_assign_date: string
  delivery_date: string
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
    accessorKey: "axb",
    header: "AXB",
  },
  {
    accessorKey: "org",
    header: "Org",
  },
  {
    accessorKey: "des",
    header: "Des",
  },
  {
    accessorKey: "customer_code",
    header: "Customer Code",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "mode",
    header: "Mode",
  },
  {
    accessorKey: "gross_wt",
    header: "Gross Wt.",
  },
  {
    accessorKey: "total_pcs",
    header: "Total Pcs",
  },
  {
    accessorKey: "booking_date",
    header: "Booking Date",
  },
  {
    accessorKey: "execution_date",
    header: "Execution Date",
  },
  {
    accessorKey: "first_flight_assign_date",
    header: "First Flight Assign Date",
  },
  {
    accessorKey: "delivery_date",
    header: "Delivery Date",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions />,
  },
]

const data: DataType[] = [
  {
    axb: "AXB001",
    org: "JFK",
    des: "LAX",
    customer_code: "CUST123",
    status: "On Time",
    mode: "Air",
    gross_wt: "5000",
    total_pcs: "50",
    booking_date: "2024-05-20T08:00:00Z",
    execution_date: "2024-05-21T08:00:00Z",
    first_flight_assign_date: "2024-05-22T08:00:00Z",
    delivery_date: "2024-05-23T08:00:00Z",
  },
  {
    axb: "AXB002",
    org: "LHR",
    des: "JFK",
    customer_code: "CUST456",
    status: "Delayed",
    mode: "Air",
    gross_wt: "7000",
    total_pcs: "70",
    booking_date: "2024-05-19T08:00:00Z",
    execution_date: "2024-05-20T08:00:00Z",
    first_flight_assign_date: "2024-05-21T08:00:00Z",
    delivery_date: "2024-05-22T08:00:00Z",
  },
  {
    axb: "AXB003",
    org: "ATL",
    des: "ORD",
    customer_code: "CUST789",
    status: "On Time",
    mode: "Air",
    gross_wt: "6000",
    total_pcs: "60",
    booking_date: "2024-05-18T08:00:00Z",
    execution_date: "2024-05-19T08:00:00Z",
    first_flight_assign_date: "2024-05-20T08:00:00Z",
    delivery_date: "2024-05-21T08:00:00Z",
  },
]

type FilterDataType = Partial<DataType> & {
  choose_from_date?: string
  choose_to_date?: string
}

const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "axb",
    type: "text",
    label: "AXB Number",
    placeholder: "Enter AXB number",
  },
  {
    key: "customer_code",
    type: "text",
    label: "Customer Code",
    placeholder: "Enter customer code",
  },
  {
    key: "choose_from_date",
    type: "date",
    label: "Choose From Date",
    placeholder: "Select from date",
  },
  {
    key: "choose_to_date",
    type: "date",
    label: "Choose To Date",
    placeholder: "Select to date",
  },
  {
    key: "status",
    type: "select",
    label: "Select Status",
    selectOptions: [
      { value: "On Time", label: "On Time" },
      { value: "Delayed", label: "Delayed" },
      // Add more options as needed
    ],
    placeholder: "Select status",
  },
  {
    key: "org",
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
    key: "des",
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
    key: "execution_date",
    type: "date",
    label: "Execution Date",
    placeholder: "Select execution date",
  },
  {
    key: "first_flight_assign_date",
    type: "date",
    label: "Flight Assign Date",
    placeholder: "Select flight assign date",
  },
  {
    key: "delivery_date",
    type: "date",
    label: "Delivery Date",
    placeholder: "Select delivery date",
  },
]

export default function Page() {
  const form = useForm()
  return (
    <PageContainer className="gap-6">
      <PageHeader title="D2D Orders" />
      <DataTableFilterForm form={form} formFilters={formFilters} />
      <DataTable columns={columns} data={data} />
    </PageContainer>
  )
}
