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

type DataType = {
  details: string;
  awb: string;
  origin: string;
  destination: string;
  customer_code: string;
  status: string;
  mode: string;
  charged_wt: string;
  total_pcs: string;
  created_at: string;
  updated_at: string;
};

const data: DataType[] = [
  {
    details: "-",
    awb: "AWB001",
    origin: "JFK",
    destination: "LAX",
    customer_code: "CUST123",
    status: "On Time",
    mode: "Air",
    charged_wt: "5000",
    total_pcs: "50",
    created_at: "2024-05-20T08:00:00Z",
    updated_at: "2024-05-23T08:00:00Z",
  },
  {
    details: "-",
    awb: "AWB002",
    origin: "LHR",
    destination: "JFK",
    customer_code: "CUST456",
    status: "Delayed",
    mode: "Air",
    charged_wt: "7000",
    total_pcs: "70",
    created_at: "2024-05-19T08:00:00Z",
    updated_at: "2024-05-22T08:00:00Z",
  },
  {
    details: "-",
    awb: "AWB003",
    origin: "ATL",
    destination: "ORD",
    customer_code: "CUST789",
    status: "On Time",
    mode: "Air",
    charged_wt: "6000",
    total_pcs: "60",
    created_at: "2024-05-18T08:00:00Z",
    updated_at: "2024-05-21T08:00:00Z",
  },
];

const columns: ColumnDef<DataType>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectHead table={table} />,
    cell: ({ row }) => <DataTableSelectRow row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "details",
    header: "Details",
  },
  {
    accessorKey: "awb",
    header: "AWB",
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
    accessorKey: "customer_code",
    header: "Customer Code",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "mode",
    header: "Customer Mode",
  },
  {
    accessorKey: "charged_wt",
    header: "Charged Wt.",
  },
  {
    accessorKey: "total_pcs",
    header: "Total Pcs",
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
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

type FilterDataType = Partial<DataType> & {
  choose_from_date?: string;
  choose_to_date?: string;
};

const formFilters: FormFieldOption<FilterDataType>[] = [
  {
    key: "awb",
    type: "text",
    label: "AWB Number",
    placeholder: "Enter AWB number",
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
    ],
    placeholder: "Select status",
  },
  {
    key: "origin",
    type: "select",
    label: "Origin Code",
    selectOptions: [
      { value: "JFK", label: "John F. Kennedy International Airport" },
      { value: "LAX", label: "Los Angeles International Airport" },
    ],
    placeholder: "Select origin",
  },
  {
    key: "destination",
    type: "select",
    label: "Destination Code",
    selectOptions: [
      { value: "JFK", label: "John F. Kennedy International Airport" },
      { value: "LAX", label: "Los Angeles International Airport" },
    ],
    placeholder: "Select destination",
  },
];

export default function Page() {
  const form = useForm();
  return (
    <PageContainer className="gap-6">
      <PageHeader title="A2A Orders" />
      <DataTableFilterForm form={form} formFilters={formFilters} />
      <DataTable columns={columns} data={data} />
    </PageContainer>
  );
}
