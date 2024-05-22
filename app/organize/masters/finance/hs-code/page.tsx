"use client";

import { FormTextFieldProps } from "@/components/form/FormTextField";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { Search } from "lucide-react";
import { DUMMY_SELECT_OPTIONS_STATUS } from "../../components/dummySelectOptions";
import { ColumnDef } from "@tanstack/react-table";
import { selectColumn } from "../../components/columnItem";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { useForm } from "react-hook-form";

export default function MasterHsCodePage() {
  const formFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "hs_code",
      placeholder: "HS Code",
      type: "text",
      endIcon: <Search size={16} />,
    },
    {
      name: "hs_description",
      placeholder: "HS Description",
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
    { ...selectColumn },
    {
      accessorKey: "hs_code",
      header: "HS Code",
    },
    {
      accessorKey: "hs_description",
      header: "HS Description",
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
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];

  const filterForm = useForm();
  const hsCodeForm = useForm();

  const data = [
    {
      hs_code: "HS Code 1",
      hs_description: "HS Description 1",
      status: "Active",
      created_at: "2021-10-10",
      updated_at: "2021-10-10",
      actions: "Actions 1",
    },
    {
      hs_code: "HS Code 2",
      hs_description: "HS Description 2",
      status: "Active",
      created_at: "2021-10-10",
      updated_at: "2021-10-10",
      actions: "Actions 2",
    },
  ];

  return (
    <MastersPageTemplate
      heading="HS Code Master"
      buttonText="Create HS Code"
      formFields={formFields}
      columns={columns}
      filterHookForm={filterForm}
      hookForm={hsCodeForm}
      data={data}
      filterFormFields={formFields}
    />
  );
}
