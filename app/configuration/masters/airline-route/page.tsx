"use client";

import MastersPageTemplate from "@/app/organize/masters/components/MastersPageTemplate";
import StatusBadge from "@/app/organize/masters/components/StatusBadge";
import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import { TFormTextField } from "@/components/form/FormTextField";
import FilterActions from "@/components/page-template/FilterActions";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function MasterAirlineRoutePage() {
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
      type: "text",
    },
    {
      name: "destination",
      label: "Destination",
      hideTooltip: true,
      type: "text",
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
      customFilterButtons={<FilterActions />}
    />
  );
}
