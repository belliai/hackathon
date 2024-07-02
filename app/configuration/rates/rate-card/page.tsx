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

export default function MasterRatesCardPage() {
  const columns: ColumnDef<any>[] = [
    actionColumn,
    {
      accessorKey: "rateCardName",
      header: "Rate Card Name",
    },
    {
      accessorKey: "rateCardType",
      header: "Rate Card Type",
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
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status}
          severity={row.original.status === "Active" ? "default" : "error"}
        />
      ),
    },
    selectColumn,
  ];

  const data = [
    {
      rateCardName: "IATA",
      rateCardType: "IATA",
      startDate: "01/01/2021",
      endDate: "31/12/2021",
      status: "Active",
    },
    {
      rateCardName: "MKT",
      rateCardType: "MKT",
      startDate: "01/01/2021",
      endDate: "31/12/2021",
      status: "Active",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "rateCardType",
      placeholder: "Rate Card Type",
      label: "Rate Card Type",
      options: DUMMY_SELECT_OPTIONS,
      type: "select",
      orientation: "horizontal",
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      orientation: "horizontal",
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Rate Card"
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
