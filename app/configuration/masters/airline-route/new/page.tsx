"use client";

import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate";
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge";
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import { TFormTextField } from "@/components/form/FormTextField";
import FilterActions from "@/components/page-template/FilterActions";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function MasterNewRoutePage() {
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
      accessorKey: "route",
      header: "Route",
    },
    {
      accessorKey: "halt",
      header: "Halt",
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
    actionColumn,
  ];

  const data = [
    {
      origin: "Delhi",
      destination: "Mumbai",
      route: "Delhi-Mumbai",
      halt: "1",
      status: "Active",
    },
    {
      origin: "Delhi",
      destination: "Mumbai",
      route: "Delhi-Mumbai",
      halt: "1",
      status: "Active",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "origin",
      label: "Origin",
      hideTooltip: true,
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "destination",
      label: "Destination",
      hideTooltip: true,
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "via",
      label: "Via",
      hideTooltip: true,
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "isActive",
      label: "isActive",
      type: "checkbox",
    },
  ];

  const filterForm = useForm();

  return (
    <MastersPageTemplate
      heading="Route List"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      customFilterButtons={
        <>
          <div className="flex gap-2">
            <Button variant="button-secondary">Add</Button>
            <Button variant="button-secondary">Delete</Button>
          </div>
          <div className="flex gap-2 md:col-span-2">
            <Button variant="button-primary">Save</Button>
            <Button variant="button-primary">List</Button>
            <Button variant="button-primary">Clear</Button>
            <Button variant="button-primary">Export</Button>
          </div>
        </>
      }
    />
  );
}
