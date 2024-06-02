"use client";

import { ColumnDef } from "@tanstack/react-table";
import MastersPageTemplate from "../../masters/components/MastersPageTemplate";
import {
  actionColumn,
  selectColumn,
} from "../../masters/components/columnItem";
import { TFormTextField } from "@/components/form/FormTextField";
import { Search } from "lucide-react";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../masters/components/dummySelectOptions";
import { useForm } from "react-hook-form";

export default function MasterCostCodePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "costCode",
      header: "Cost Code",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "glCode",
      header: "GL Code",
    },
    {
      accessorKey: "status",
      header: "Status",
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
      id: 1,
      costCode: "123",
      description: "description",
      glCode: "123",
      status: "Active",
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
    },
    {
      id: 2,
      costCode: "123",
      description: "description",
      glCode: "123",
      status: "Active",
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "costCode",
      type: "text",
      placeholder: "Cost Code",
      endIcon: <Search />,
    },
    {
      name: "codeDescription",
      type: "text",
      placeholder: "Code Description",
      endIcon: <Search />,
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "costCode",
      type: "text",
      placeholder: "Cost Code",
      endIcon: <Search />,
    },
    {
      name: "codeDescription",
      type: "text",
      placeholder: "Code Description",
      endIcon: <Search />,
    },
    {
      name: "glCode",
      type: "select",
      placeholder: "GL Code",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const filterForm = useForm();
  const form = useForm();

  return (
    <MastersPageTemplate
      heading="Cost Code Master"
      buttonText="Create Cost Code"
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      columns={columns}
      data={data}
      formFields={formFields}
      hookForm={form}
    />
  );
}
