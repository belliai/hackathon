"use client";

import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge";
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function AirlineProration() {
  const formFields: TFormTextField[] = [
    {
      name: "origin",
      type: "select",
      label: "Origin",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "destination",
      type: "select",
      label: "Destination",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "prorateFactor",
      label: "Prorate Factor",
      orientation: "horizontal",
      type: "number",
    },
    {
      name: "constrFactor",
      label: "Construction Factor",
      orientation: "horizontal",
      type: "number",
    },
    {
      name: "validFrom",
      type: "date",
      label: "Valid From",
      orientation: "horizontal",
    },
    {
      name: "validTo",
      type: "date",
      label: "Valid To",
      orientation: "horizontal",
    },
    {
      name: "active",
      type: "checkbox",
      label: "Active",
      orientation: "horizontal",
    },
  ];

  const form = useForm();

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
      accessorKey: "constrFactor",
      header: "Construction Factor",
    },
    {
      accessorKey: "validFrom",
      header: "Valid From",
    },
    {
      accessorKey: "validTo",
      header: "Valid To",
    },
    {
      accessorKey: "active",
      header: "Active",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.active ? "Active" : "Inactive"}
          severity={row.original.active ? "default" : "error"}
        />
      ),
    },
    actionColumn,
  ];

  const data = [
    {
      origin: "JFK",
      destination: "LAX",
      prorateFactor: 1.5,
      constrFactor: 2.0,
      validFrom: "2023-01-01",
      validTo: "2023-12-31",
      active: true,
    },
    {
      origin: "LHR",
      destination: "SFO",
      prorateFactor: 1.8,
      constrFactor: 2.3,
      validFrom: "2023-02-01",
      validTo: "2023-11-30",
      active: false,
    },
    {
      origin: "CDG",
      destination: "JFK",
      prorateFactor: 1.4,
      constrFactor: 1.9,
      validFrom: "2023-03-15",
      validTo: "2023-09-30",
      active: true,
    },
    {
      origin: "SIN",
      destination: "HKG",
      prorateFactor: 1.7,
      constrFactor: 2.1,
      validFrom: "2023-04-20",
      validTo: "2023-10-20",
      active: false,
    },
    {
      origin: "DXB",
      destination: "ORD",
      prorateFactor: 1.6,
      constrFactor: 2.2,
      validFrom: "2023-05-05",
      validTo: "2023-08-15",
      active: true,
    },
  ];

  return (
    <CreateFormPageTemplate
      heading="Pro-Rate Factor Master"
      formFields={formFields}
      className="max-h-none"
      hookForm={form}
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          <DataTable hideToolbar columns={columns} data={data} />
        </div>
      }
    />
  );
}
