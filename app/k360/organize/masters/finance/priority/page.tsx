"use client";

import { FormTextFieldProps } from "@/components/form/FormTextField";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { DUMMY_SELECT_OPTIONS_STATUS } from "../../components/dummySelectOptions";
import { Search } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { selectColumn } from "../../components/columnItem";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

export default function MasterPriorityPage() {
  const formFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "priority",
      placeholder: "Priority",
      type: "text",
      endIcon: <Search size={16} />,
    },
    {
      name: "description",
      placeholder: "Description",
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
    {
      ...selectColumn,
    },
    {
      accessorKey: "priority",
      header: "Priority",
    },
    {
      accessorKey: "description",
      header: "Description",
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

  const data = [
    {
      priority: "High",
      description: "Dummy description 1",
      status: "Active",
    },
    {
      priority: "Medium",
      description: "Dummy description 2",
      status: "Inactive",
    },
    { priority: "Low", description: "Dummy description 3", status: "Active" },
  ];

  const priorityForm = useForm();
  const filterForm = useForm();

  return (
    <MastersPageTemplate
      heading="Priority Master"
      buttonText="Create Priority"
      hookForm={priorityForm}
      formFields={formFields}
      filterHookForm={filterForm}
      filterFormFields={formFields}
      columns={columns}
      data={data}
    />
  );
}
