"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  actionColumn,
  selectColumn,
} from "../../masters/components/columnItem";
import StatusBadge from "../../masters/components/StatusBadge";
import MastersPageTemplate from "../../masters/components/MastersPageTemplate";
import { TFormTextField } from "@/components/form/FormTextField";
import { Search } from "lucide-react";
import { DUMMY_SELECT_OPTIONS_STATUS } from "../../masters/components/dummySelectOptions";
import { useForm } from "react-hook-form";

export default function MasterProrateFactor() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "prorateFactor",
      header: "Prorate Factor",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status}
          severity={row.original.status === "Active" ? "default" : "error"}
        />
      ),
    },
    {
      accessorKey: "valdFrom",
      header: "Valid From",
    },
    {
      accessorKey: "validTo",
      header: "Valid To",
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
      origin: "US",
      destination: "UK",
      prorateFactor: "1.2",
      status: "Active",
      valdFrom: "2021-10-01",
      validTo: "2021-10-31",
      updatedAt: "2021-10-01",
      createdAt: "2021-10-01",
    },
    {
      origin: "UK",
      destination: "US",
      prorateFactor: "1.3",
      status: "Inactive",
      valdFrom: "2021-10-01",
      validTo: "2021-10-31",
      updatedAt: "2021-10-01",
      createdAt: "2021-10-01",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "origin",
      placeholder: "Origin",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "destination",
      placeholder: "Destination",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "prorateFactor",
      placeholder: "Prorate Factor",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "fromDate",
      placeholder: "From Date",
      type: "date",
    },
    {
      name: "toDate",
      placeholder: "To Date",
      type: "date",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "origin",
      type: "text",
      placeholder: "Origin",
    },
    {
      name: "destination",
      type: "text",
      placeholder: "Destination",
    },
    {
      name: "prorateFactor",
      type: "text",
      placeholder: "Prorate Factor",
    },
    {
      name: "constrFactor",
      type: "text",
      placeholder: "Constr Factor",
    },
    {
      name: "fromDate",
      type: "date",
      placeholder: "From Date",
    },
    {
      name: "toDate",
      type: "date",
      placeholder: "To Date",
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
      heading="Prorate Factor"
      buttonText="Create Prorate Factor"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      formFields={formFields}
      filterHookForm={filterForm}
      hookForm={form}
    />
  );
}
