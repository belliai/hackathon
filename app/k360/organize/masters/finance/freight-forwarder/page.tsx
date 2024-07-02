"use client";

import { FormTextFieldProps } from "@/components/form/FormTextField";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { Search } from "lucide-react";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions";
import { ColumnDef } from "@tanstack/react-table";
import { selectColumn } from "../../components/columnItem";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";

export default function MasterFreightForwarderPage() {
  const formFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "station",
      placeholder: "Station",
      type: "select",
      endIcon: <Search size={16} />,
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "freight_forwarder_name",
      placeholder: "Freight Forwarder Name",
      type: "text",
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
      accessorKey: "station",
      header: "Station",
    },
    {
      accessorKey: "freight_forwarder_name",
      header: "Freight Forwarder Name",
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
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];

  const filterForm = useForm();
  const freightForwarderForm = useForm();

  const data = [
    {
      station: "Station 1",
      freight_forwarder_name: "Freight Forwarder 1",
      status: "Active",
      actions: "Actions 1",
    },
    {
      station: "Station 2",
      freight_forwarder_name: "Freight Forwarder 2",
      status: "Inactive",
      actions: "Actions 2",
    },
  ];

  return (
    <MastersPageTemplate
      heading="Freight Forwarder Master"
      buttonText="Create Freight Forwarder"
      columns={columns}
      filterHookForm={filterForm}
      filterFormFields={formFields}
      formFields={formFields}
      hookForm={freightForwarderForm}
      data={data}
    />
  );
}
