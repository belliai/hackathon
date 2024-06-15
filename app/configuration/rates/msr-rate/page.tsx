"use client";

import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function MsrRatePage() {
  const form = useForm();
  const formFields: TFormTextField[] = [
    {
      name: "origin",
      type: "text",
      label: "Origin",
      orientation: "horizontal",
    },
    {
      name: "destination",
      type: "text",
      label: "Destination",
      orientation: "horizontal",
    },
    {
      name: "transit",
      type: "text",
      label: "Transit",
      orientation: "horizontal",
    },
    {
      name: "msrRate",
      type: "text",
      label: "MSR Rate",
      orientation: "horizontal",
    },
    {
      name: "currency",
      type: "text",
      label: "Currency",
      orientation: "horizontal",
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
      accessorKey: "transit",
      header: "Transit",
    },
    {
      accessorKey: "msrRate",
      header: "MSR Rate",
    },
    {
      accessorKey: "currency",
      header: "Currency",
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
    },
    actionColumn,
  ];

  const data = [
    {
      origin: "New York",
      destination: "Los Angeles",
      transit: "Chicago",
      msrRate: "200",
      currency: "USD",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      active: true,
    },
    {
      origin: "London",
      destination: "Paris",
      transit: "Brussels",
      msrRate: "150",
      currency: "EUR",
      validFrom: "2024-02-01",
      validTo: "2024-11-30",
      active: false,
    },
  ];

  return (
    <CreateFormPageTemplate
      heading="MSR Rate Master"
      hookForm={form}
      formFields={formFields}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4 mt-8">
          <div className="max-w-96">
            <FilterActions />
          </div>
          <Separator />
          <DataTable columns={columns} data={data} />
        </div>
      }
    />
  );
}
