"use client";

import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";

export default function PliNewPage() {
  const filterFormFields: TFormTextField[] = [
    {
      name: "originLevel",
      type: "select",
      label: "Origin Level",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "origin",
      type: "select",
      label: "Origin",
      orientation: "horizontal",
    },
    {
      name: "destinationLevel",
      type: "select",
      label: "Destination Level",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "destination",
      type: "select",
      label: "Destination",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "fromDate",
      type: "date",
      label: "From Date",
      orientation: "horizontal",
    },
    {
      name: "toDate",
      type: "date",
      label: "To Date",
      orientation: "horizontal",
    },
    {
      name: "agentCode",
      type: "text",
      label: "Agent Code",
      orientation: "horizontal",
    },
    {
      name: "shipperCode",
      type: "text",
      label: "Shipper Code",
      orientation: "horizontal",
    },
    {
      name: "pliId",
      type: "select",
      label: "PLI ID",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: DUMMY_SELECT_OPTIONS_STATUS,
      orientation: "horizontal",
    },
  ];

  const filterForm = useForm();

  return (
    <CreateFormPageTemplate
      heading="List PLI"
      hookForm={filterForm}
      formFields={filterFormFields}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          <h2 className="text-xl font-semibold">PLI Details</h2>

          {/*
            There should be a table, but I can't see the columns on the referenced page so commenting out for now

            <DataTable /> 
           
           */}
        </div>
      }
    />
  );
}
