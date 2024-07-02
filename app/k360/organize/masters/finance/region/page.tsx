"use client";

import { ColumnDef } from "@tanstack/react-table";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { selectColumn } from "../../components/columnItem";
import { FormTextFieldProps } from "@/components/form/FormTextField";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MasterRegionPage() {
  const columns: ColumnDef<any>[] = [
    {
      ...selectColumn,
    },
    {
      accessorKey: "region_code",
      header: "Region Code",
    },
    {
      accessorKey: "region_name",
      header: "Region Name",
    },
    {
      accessorKey: "country",
      header: "Country",
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
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => <DataTableRowActions />,
    },
  ];

  const formFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "region_code",
      placeholder: "Region Code",
      type: "text",
      endIcon: <Search size={16} />,
    },
    {
      name: "region_name",
      placeholder: "Region Name",
      type: "text",
      endIcon: <Search size={16} />,
    },
    {
      name: "country",
      placeholder: "Country",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const data = [
    {
      region_code: "R001",
      region_name: "Region 1",
      country: "ID",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
    {
      region_code: "R002",
      region_name: "Region 2",
      country: "SG",
      status: "Active",
      created_at: "2021-09-01",
      updated_at: "2021-09-01",
    },
  ];

  const filterForm = useForm();
  const regionForm = useForm();

  return (
    <MastersPageTemplate
      heading="Region Master"
      buttonText="Create Region"
      columns={columns}
      hookForm={regionForm}
      formFields={formFields}
      filterHookForm={filterForm}
      filterFormFields={formFields}
      data={data}
    />
  );
}
