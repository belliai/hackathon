"use client";

import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function DealAuditPage() {
  const form = useForm();

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "dealListDate",
      header: "Deal List Date",
    },
    {
      accessorKey: "awbNumber",
      header: "AWB #",
    },
    {
      accessorKey: "status",
      header: "Status",
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
      accessorKey: "agent",
      header: "Agent",
    },
    {
      accessorKey: "deals",
      header: "Deals",
    },
    {
      accessorKey: "appliedDealType",
      header: "Applied Deal Type",
    },
    actionColumn,
  ];

  const data = [
    {
      dealListDate: "2023-01-15",
      awbNumber: "AWB1234567890",
      status: "Active",
      origin: "JFK",
      destination: "LAX",
      agent: "AgentA",
      deals: "Deal1",
      appliedDealType: "Standard",
    },
    {
      dealListDate: "2023-02-20",
      awbNumber: "AWB0987654321",
      status: "Inactive",
      origin: "LHR",
      destination: "SFO",
      agent: "AgentB",
      deals: "Deal2",
      appliedDealType: "Special",
    },
    {
      dealListDate: "2023-03-10",
      awbNumber: "AWB1122334455",
      status: "Pending",
      origin: "CDG",
      destination: "JFK",
      agent: "AgentC",
      deals: "Deal3",
      appliedDealType: "Promotional",
    },
    {
      dealListDate: "2023-04-05",
      awbNumber: "AWB2233445566",
      status: "Active",
      origin: "SIN",
      destination: "HKG",
      agent: "AgentD",
      deals: "Deal4",
      appliedDealType: "Emergency",
    },
    {
      dealListDate: "2023-05-25",
      awbNumber: "AWB3344556677",
      status: "Inactive",
      origin: "DXB",
      destination: "ORD",
      agent: "AgentE",
      deals: "Deal5",
      appliedDealType: "Seasonal",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "dealListDate",
      type: "date",
      label: "Deal List Date",
      orientation: "horizontal",
    },
    {
      name: "awbNumber",
      type: "text",
      label: "AWB #",
      orientation: "horizontal",
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
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
      name: "agent",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      label: "Agent",
      orientation: "horizontal",
    },
    {
      name: "deals",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      label: "Deals",
      orientation: "horizontal",
    },
    {
      name: "appliedDealType",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      label: "Applied Deal Type",
      orientation: "horizontal",
    },
  ];

  return (
    <CreateFormPageTemplate
      heading="Deal Rate Audit"
      hookForm={form}
      formFields={formFields}
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
