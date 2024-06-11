"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TFormTextField } from "@/components/form/FormTextField";
import { useForm } from "react-hook-form";
import {
  actionColumn,
  selectColumn,
} from "@/app/organize/masters/components/columnItem";
import StatusBadge from "@/app/organize/masters/components/StatusBadge";
import { DUMMY_SELECT_OPTIONS } from "@/app/organize/masters/components/dummySelectOptions";
import MastersPageTemplate from "@/app/organize/masters/components/MastersPageTemplate";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { DataTable } from "@/components/data-table/data-table";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";

export default function MasterCostLinePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "costId",
      header: "Cost ID",
    },
    {
      accessorKey: "vendorCode",
      header: "Vendor Code",
    },
    {
      accessorKey: "costCode",
      header: "Cost Code",
    },
    {
      accessorKey: "costType",
      header: "Cost Type",
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
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
    },
    {
      accessorKey: "currency",
      header: "Currency",
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
    {
      accessorKey: "slab",
      header: "Slab",
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
      costId: 1,
      vendorCode: "VN001",
      costCode: "C001",
      costType: "Freight",
      originLevel: "Airport",
      origin: "DEL",
      destinationLevel: "Airport",
      destination: "BOM",
      startDate: "2021-09-01",
      endDate: "2021-09-01",
      currency: "INR",
      status: "Active",
      slab: "1",
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
    },
    {
      costId: 2,
      vendorCode: "VN001",
      costCode: "C001",
      costType: "Freight",
      originLevel: "Airport",
      origin: "DEL",
      destinationLevel: "Airport",
      destination: "BOM",
      startDate: "2021-09-01",
      endDate: "2021-09-01",
      currency: "INR",
      status: "Active",
      slab: "1",
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "vendorCode",
      type: "select",
      label: "Vendor Code",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "costCode",
      type: "text",
      label: "Cost Code",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "costType",
      type: "select",
      label: "Cost Type",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "status",
      label: "Status",
      orientation: "horizontal",
      type: "select",
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
      options: DUMMY_SELECT_OPTIONS,
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
      name: "costId",
      type: "text",
      label: "Cost ID",
      orientation: "horizontal",
    },
  ];

  const filterForm = useForm();

  return (
    <CreateFormPageTemplate
      heading="Cost Line Master"
      formFields={filterFormFields}
      hookForm={filterForm}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      }
    />
  );
}
