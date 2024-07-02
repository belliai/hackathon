"use client";

import { ColumnDef } from "@tanstack/react-table";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { actionColumn, selectColumn } from "../../components/columnItem";
import StatusBadge from "../../components/StatusBadge";
import { TFormTextField } from "@/components/form/FormTextField";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

export default function MassterSpecialHandlingCodePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "specialHandlingCode",
      header: "Special Handling Code",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "isnotoc",
      header: "ISNOTOC",
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status}
          severity={row.original.status === "Active" ? "default" : "error"}
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    actionColumn,
  ];

  const data = [
    {
      specialHandlingCode: "PER",
      description: "Perishable goods",
      isnotoc: "No",
      status: "Active",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
    },
    {
      specialHandlingCode: "AVI",
      description: "Live animals",
      isnotoc: "Yes",
      status: "Inactive",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-25",
    },
    {
      specialHandlingCode: "DGR",
      description: "Dangerous goods",
      isnotoc: "No",
      status: "Active",
      createdAt: "2023-03-05",
      updatedAt: "2023-10-30",
    },
    {
      specialHandlingCode: "VAL",
      description: "Valuable cargo",
      isnotoc: "Yes",
      status: "Inactive",
      createdAt: "2023-04-10",
      updatedAt: "2023-09-15",
    },
    {
      specialHandlingCode: "HEA",
      description: "Human remains",
      isnotoc: "No",
      status: "Active",
      createdAt: "2023-05-25",
      updatedAt: "2023-08-20",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "specialHandlingCode",
      placeholder: "Special Handling Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "description",
      placeholder: "Description",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "isnotoc",
      placeholder: "ISNOTOC",
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

  const filterForm = useForm();
  const hookForm = useForm();

  return (
    <MastersPageTemplate
      heading="Special Handling Code Master"
      buttonText="Create"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      formFields={filterFormFields}
      hookForm={hookForm}
    />
  );
}
