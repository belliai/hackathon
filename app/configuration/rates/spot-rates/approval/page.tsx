"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TFormTextField } from "@/components/form/FormTextField";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { DUMMY_SELECT_OPTIONS_STATUS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge";
import { DataTable } from "@/components/data-table/data-table";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";

export default function MasterSpotRateApprovalPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "awbNo",
      header: "AWB No",
    },
    {
      accessorKey: "agentCode",
      header: "Agent Code",
    },
    {
      accessorKey: "agentName",
      header: "Agent Name",
    },
    {
      accessorKey: "flightNo",
      header: "Flight No",
    },
    {
      accessorKey: "flightDate",
      header: "Flight Date",
    },
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "spotRate",
      header: "Spot Rate",
    },
    {
      accessorKey: "allIn",
      header: "All In",
    },
    {
      accessorKey: "currency",
      header: "Currency",
    },
    {
      accessorKey: "type",
      header: "Type",
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
      accessorKey: "validFrom",
      header: "Valid From",
    },
    {
      accessorKey: "validTo",
      header: "Valid To",
    },
    {
      accessorKey: "weight",
      header: "Weight",
    },
    {
      accessorKey: "chargeableWeight",
      header: "Chargeable Wt.",
    },
    {
      accessorKey: "SHC",
      header: "SHC",
    },
    {
      accessorKey: "commodityDesc",
      header: "Commodity Desc",
    },
    {
      accessorKey: "spotRateId",
      header: "Spot Rate ID",
    },
    {
      accessorKey: "deviation",
      header: "Deviation",
    },
    {
      accessorKey: "info",
      header: "Info",
    },
    actionColumn,
  ];

  const data = [
    {
      spotRateId: 1,
      deviation: 1,
      awbNo: "AWB-1",
      agentCode: "AG-1",
      agentName: "Agent 1",
      flightNo: "F-1",
      flightDate: "2021-09-01",
      origin: "Origin 1",
      destination: "Destination 1",
      spotRate: 1000,
      allIn: 1100,
      currency: "USD",
      type: "Type 1",
      status: "Active",
      validFrom: "2021-09-01",
      validTo: "2021-09-30",
      weight: 100,
      chargeableWeight: 110,
      SHC: "SHC 1",
      commodityDesc: "Commodity Desc 1",
      info: "Info 1",
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
    },
    {
      spotRateId: 2,
      deviation: 2,
      awbNo: "AWB-2",
      agentCode: "AG-2",
      agentName: "Agent 2",
      flightNo: "F-2",
      flightDate: "2021-09-02",
      origin: "Origin 2",
      destination: "Destination 2",
      spotRate: 2000,
      allIn: 2200,
      currency: "USD",
      type: "Type 2",
      status: "Inactive",
      validFrom: "2021-09-02",
      validTo: "2021-09-30",
      weight: 200,
      chargeableWeight: 220,
      SHC: "SHC 2",
      commodityDesc: "Commodity Desc 2",
      info: "Info 2",
      createdAt: "2021-09-02",
      updatedAt: "2021-09-02",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "origin",
      label: "Origin",
      orientation: "horizontal",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "destination",
      label: "Destination",
      orientation: "horizontal",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "flightNo",
      type: "text",
      label: "Flight No",
      orientation: "horizontal",
    },
    {
      name: "flightDate",
      type: "date",
      label: "Flight Date",
      orientation: "horizontal",
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
      label: "Agent Code",
      orientation: "horizontal",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "spotRateId",
      label: "Spot Rate ID",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "prefix",
      label: "Prefix",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "awbNo",
      label: "AWB No",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "status",
      label: "Status",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const filterForm = useForm();

  return (
    <CreateFormPageTemplate
      heading="Spot Rate Approval/Rejection"
      hookForm={filterForm}
      formFields={filterFormFields}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4 mt-4">
          <div className="max-w-96">
            <FilterActions />
          </div>
          <Separator />
          <h2 className="text-xl font-semibold">Spot Rate Details</h2>
          <DataTable hideToolbar columns={columns} data={data} />
        </div>
      }
    />
  );
}
