"use client"

import { ColumnDef } from "@tanstack/react-table";
import MastersPageTemplate from "../../masters/components/MastersPageTemplate";
import {
  actionColumn,
  selectColumn,
} from "../../masters/components/columnItem";
import { TFormTextField } from "@/components/form/FormTextField";
import { DUMMY_SELECT_OPTIONS_STATUS } from "../../masters/components/dummySelectOptions";
import { useForm } from "react-hook-form";

export default function MasterSacPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "sacCode",
      header: "SAC Code",
    },
    {
      accessorKey: "sacDescription",
      header: "SAC Description",
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
      sacCode: "123",
      sacDescription: "sacDescription",
      status: "Active",
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
    },
    {
      id: 2,
      sacCode: "123",
      sacDescription: "sacDescription",
      status: "Active",
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "sacCode",
      type: "text",
      placeholder: "SAC Code",
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
      name: "sacCode",
      type: "text",
      placeholder: "SAC Code",
    },
    {
      name: "sacDescription",
      type: "text",
      placeholder: "SAC Description",
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
      heading="SAC Master"
      buttonText="Create SAC Code"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      formFields={formFields}
      hookForm={form}
    />
  );
}
