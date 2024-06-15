"use client";

import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/organize/masters/components/dummySelectOptions";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function VolExemptionPage() {
  const formFields: TFormTextField[] = [
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
      name: "parameter",
      label: "Parameter",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="List Volumetric Exemption"
      formFields={formFields}
      hookForm={form}
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="flex max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          {/* <DataTable /> */}
        </div>
      }
    />
  );
}
