"use client";

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

export default function MasterPaxPage() {
  const formFields: TFormTextField[] = [
    {
      name: "origin",
      placeholder: "Origin",
      label: "Origin",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
      type: "select",
    },
    {
      name: "fromDate",
      label: "From Date",
      type: "date",
      orientation: "horizontal",
    },
    {
      name: "toDate",
      label: "To Date",
      type: "date",
      orientation: "horizontal",
    },
    {
      name: "flightNo",
      type: "text",
      orientation: "horizontal",
      label: "Flight No",
    },
  ];

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "dest",
      header: "Dest",
    },
    {
      accessorKey: "flightNo",
      header: "Flight No",
    },
    actionColumn,
  ];

  const data = [
    {
      origin: "DEL",
      dest: "BOM",
      flightNo: "AI 101",
    },
    {
      origin: "BOM",
      dest: "DEL",
      flightNo: "AI 102",
    },
    {
      origin: "DEL",
      dest: "BOM",
      flightNo: "AI 103",
    },
    {
      origin: "BOM",
      dest: "DEL",
      flightNo: "AI 104",
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Pax Load"
      hookForm={form}
      formFields={formFields}
      className="max-h-none"
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
