"use client";

import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import { DUMMY_SELECT_OPTIONS } from "@/app/organize/masters/components/dummySelectOptions";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function ConfigLinePage() {
  const hookForm = useForm();

  const formFields: TFormTextField[] = [
    {
      name: "originLevel",
      label: "Origin Level",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "origin",
      label: "Origin",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "destinationLevel",
      label: "Destination Level",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "destination",
      label: "Destination",
      orientation: "horizontal",
      type: "select",
    },
    {
      name: "configName",
      label: "Config Name",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "parameter",
      label: "Parameter",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "fromDate",
      label: "From Date",
      orientation: "horizontal",
      type: "date",
    },
    {
      name: "toDate",
      label: "To Date",
      orientation: "horizontal",
      type: "date",
    },
  ];

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "originLevel",
      header: "Origin Level",
    },
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "destinationLevel",
      header: "Destination Level",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "configName",
      header: "Config Name",
    },
    {
      accessorKey: "parameter",
      header: "Parameter",
    },
    {
      accessorKey: "fromDate",
      header: "From Date",
    },
    {
      accessorKey: "toDate",
      header: "To Date",
    },
    actionColumn,
  ];

  const data = [
    {
      originLevel: "Airport",
      origin: "JFK",
      destinationLevel: "Airport",
      destination: "LAX",
      configName: "JFK-LAX",
      parameter: "100",
      fromDate: "2021-01-01",
      toDate: "2021-12-31",
    },
    {
      originLevel: "Airport",
      origin: "LAX",
      destinationLevel: "Airport",
      destination: "JFK",
      configName: "LAX-JFK",
      parameter: "100",
      fromDate: "2021-01-01",
      toDate: "2021-12-31",
    },
  ];

  return (
    <CreateFormPageTemplate
      heading="List Config"
      hookForm={hookForm}
      formFields={formFields}
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="flex max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          <h2 className="font-semibold text-xl">Config Details</h2>
          <DataTable hideToolbar columns={columns} data={data} />
        </div>
      }
    />
  );
}
