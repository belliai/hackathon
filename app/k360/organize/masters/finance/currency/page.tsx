"use client"

import { FormTextFieldProps } from "@/components/form/FormTextField";
import { Search } from "lucide-react";
import { DUMMY_SELECT_OPTIONS_STATUS } from "../../components/dummySelectOptions";
import { useForm } from "react-hook-form";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { ColumnDef } from "@tanstack/react-table";
import DataTableSelectHead from "@/components/data-table/DataTableSelectHead";
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

export default function MastersCurrencyPage() {
  const formFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "currency_code",
      placeholder: "Currency Code",
      type: "text",
      endIcon: <Search size={16} />,
    },
    {
      name: "currency_name",
      placeholder: "Currency Name",
      type: "text",
      endIcon: <Search size={16} />,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => <DataTableSelectHead table={table} />,
      cell: ({ row }) => <DataTableSelectRow row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
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
        <Badge className="bg-green-700/80 text-white hover:bg-green-600">
          {row.original.status}
        </Badge>
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
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => <DataTableRowActions />,
    },
  ];

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
  ];

  const currencyForm = useForm();
  return (
    <MastersPageTemplate
      columns={columns}
      data={data}
      filterFormFields={formFields}
      filterHookForm={currencyForm}
      formFields={formFields}
      hookForm={currencyForm}
      heading="Currency Master"
      buttonText="Add Currency"
    />
  );
}
