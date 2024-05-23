"use client";

import DataTableSelectHead from "@/components/data-table/DataTableSelectHead";
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow";
import { DataTable } from "@/components/data-table/data-table";
import DataTableFilterForm, {
  FormFieldOption,
} from "@/components/data-table/data-table-filter-form";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

type FlightMasterDataType = {
  entry_type: string;
  flight_no: string;
  source: string;
  destination: string;
  std_api: string;
  sta: string;
  aircraft_type: string;
  tail_no: string;
  flight_type: string;
  status: string;
  sector: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
};

const columns: ColumnDef<FlightMasterDataType>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectHead table={table} />,
    cell: ({ row }) => <DataTableSelectRow row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "entry_type",
    header: "Entry Type",
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
    accessorKey: "std_api",
    header: "STD(API)",
  },
  {
    accessorKey: "sta",
    header: "STA",
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
    accessorKey: "flight_type",
    header: "Flight Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "sector",
    header: "Sector",
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
    accessorKey: "updated_by",
    header: "Updated By",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions />,
  },
];

const data: FlightMasterDataType[] = [
  {
    entry_type: "Scheduled",
    flight_no: "AA123",
    source: "JFK",
    destination: "LAX",
    std_api: "2024-05-23T08:00:00Z",
    sta: "2024-05-23T11:00:00Z",
    aircraft_type: "Boeing 737",
    tail_no: "N12345",
    flight_type: "Domestic",
    status: "On Time",
    sector: "NYC-LA",
    created_at: "2024-05-20T10:00:00Z",
    updated_at: "2024-05-22T10:00:00Z",
    updated_by: "John Doe",
  },
  {
    entry_type: "Charter",
    flight_no: "BB456",
    source: "SFO",
    destination: "ORD",
    std_api: "2024-05-23T09:30:00Z",
    sta: "2024-05-23T13:30:00Z",
    aircraft_type: "Airbus A320",
    tail_no: "N67890",
    flight_type: "Domestic",
    status: "Delayed",
    sector: "SF-CHI",
    created_at: "2024-05-20T12:00:00Z",
    updated_at: "2024-05-22T12:00:00Z",
    updated_by: "Jane Smith",
  },
  {
    entry_type: "Cargo",
    flight_no: "CC789",
    source: "MIA",
    destination: "DFW",
    std_api: "2024-05-23T07:00:00Z",
    sta: "2024-05-23T10:00:00Z",
    aircraft_type: "Boeing 747",
    tail_no: "N54321",
    flight_type: "Cargo",
    status: "Cancelled",
    sector: "MIA-DFW",
    created_at: "2024-05-20T14:00:00Z",
    updated_at: "2024-05-22T14:00:00Z",
    updated_by: "Mike Johnson",
  },
];

type FilterDataType = Partial<FlightMasterDataType> & {
  date_from?: string;
  date_to?: string;
};

const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "source",
    type: "select",
    label: "Origin",
    selectOptions: [
      { value: "JFK", label: "JFK" },
      { value: "SFO", label: "SFO" },
      { value: "MIA", label: "MIA" },
      // Add more options as needed
    ],
    placeholder: "Select Origin",
  },
  {
    key: "destination",
    type: "select",
    label: "Destination",
    selectOptions: [
      { value: "LAX", label: "LAX" },
      { value: "ORD", label: "ORD" },
      { value: "DFW", label: "DFW" },
      // Add more options as needed
    ],
    placeholder: "Select Destination",
  },
  {
    key: "flight_no",
    type: "text",
    label: "Flight No",
    placeholder: "Enter Flight No",
  },
  {
    key: "date_from",
    type: "date",
    label: "Choose From Date",
  },
  {
    key: "date_to",
    type: "date",
    label: "Choose To Date",
  },
  {
    key: "aircraft_type",
    type: "select",
    label: "Aircraft Type",
    selectOptions: [
      { value: "Boeing 737", label: "Boeing 737" },
      { value: "Airbus A320", label: "Airbus A320" },
      { value: "Boeing 747", label: "Boeing 747" },
      // Add more options as needed
    ],
    placeholder: "Select Aircraft Type",
  },
  {
    key: "sector",
    type: "text",
    label: "Sector",
    placeholder: "Enter Sector",
  },
  {
    key: "flight_type",
    type: "select",
    label: "Flight Type",
    selectOptions: [
      { value: "Domestic", label: "Domestic" },
      { value: "International", label: "International" },
      { value: "Cargo", label: "Cargo" },
      // Add more options as needed
    ],
    placeholder: "Select Flight Type",
  },
  {
    key: "status",
    type: "select",
    label: "Status",
    selectOptions: [
      { value: "On Time", label: "On Time" },
      { value: "Delayed", label: "Delayed" },
      { value: "Cancelled", label: "Cancelled" },
      // Add more options as needed
    ],
    placeholder: "Select Status",
  },
];

export default function Page() {
  const form = useForm();
  return (
    <PageContainer className="gap-6">
      <PageHeader title="Flight Master" />
      <DataTableFilterForm form={form} formFilters={formFilters} />
      <DataTable columns={columns} data={data} hideToolbar />
    </PageContainer>
  );
}
