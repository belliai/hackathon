"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TFormTextField } from "@/components/form/FormTextField";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/organize/masters/components/dummySelectOptions";
import { SectionedFormFields } from "@/app/organize/masters/components/MastersPageTemplate";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { DataTable } from "@/components/data-table/data-table";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";

export default function MasterTaxlinePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "taxId",
      header: "Tax Id",
    },
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
      accessorKey: "taxCode",
      header: "Tax Code",
    },
    {
      accessorKey: "taxName",
      header: "Tax Name",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
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
      taxId: "1",
      originLevel: "Country",
      origin: "US",
      destinationLevel: "Country",
      destination: "UK",
      taxCode: "1",
      taxName: "VAT",
      startDate: "2021-10-01",
      endDate: "2021-10-31",
      status: "Active",
      createdAt: "2021-10-01",
      updatedAt: "2021-10-01",
    },
    {
      taxId: "2",
      originLevel: "Country",
      origin: "UK",
      destinationLevel: "Country",
      destination: "US",
      taxCode: "2",
      taxName: "GST",
      startDate: "2021-10-01",
      endDate: "2021-10-31",
      status: "Inactive",
      createdAt: "2021-10-01",
      updatedAt: "2021-10-01",
    },
  ];

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
      label: "Origin",
      orientation: "horizontal",
      type: "text",
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
      label: "Destination",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "taxName",
      type: "text",
      label: "Tax Name",
      orientation: "horizontal",
    },
    {
      name: "taxId",
      type: "text",
      label: "Tax Id",
      orientation: "horizontal",
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
    {
      name: "expiresFromDate",
      label: "Expires From Date",
      orientation: "horizontal",
      type: "date",
    },
    {
      name: "expiresToDate",
      label: "Expires To Date",
      orientation: "horizontal",
      type: "date",
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="List Tax Line"
      hookForm={form}
      formFields={filterFormFields}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          <h2 className="text-xl font-semibold">Tax Line Details</h2>
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      }
    />
  );
}
