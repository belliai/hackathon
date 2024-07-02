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

export default function MessageConfigurationPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "srNo",
      header: "Sr No",
    },
    {
      accessorKey: "messageType",
      header: "Message Type",
    },
    {
      accessorKey: "communicationType",
      header: "Communication Type",
    },
    {
      accessorKey: "flightNo",
      header: "Flight No",
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
      accessorKey: "partnerType",
      header: "Partner Type",
    },
    {
      accessorKey: "partnerCode",
      header: "Partner Code",
    },
    {
      accessorKey: "emailId",
      header: "Email Id",
    },
    {
      accessorKey: "sitaId",
      header: "SITA ID",
    },
    {
      accessorKey: "FTP ID",
      header: "FTP ID",
    },
    {
      accessorKey: "transitDestination",
      header: "Transit Destination",
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
      srNo: 1,
      messageType: "PAX",
      communicationType: "Email",
      flightNo: "AI-101",
      origin: "DEL",
      destination: "BOM",
      partnerType: "Airline",
      partnerCode: "AI",
      emailId: "12345",
      sitaId: "12345",
      FTPID: "12345",
      transitDestination: "BOM",
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
    },
    {
      srNo: 2,
      messageType: "PAX",
      communicationType: "Email",
      flightNo: "AI-101",
      origin: "DEL",
      destination: "BOM",
      partnerType: "Airline",
      partnerCode: "AI",
      emailId: "12345",
      sitaId: "12345",
      FTPID: "12345",
      transitDestination: "BOM",
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
    },
    {
      srNo: 3,
      messageType: "PAX",
      communicationType: "Email",
      flightNo: "AI-101",
      origin: "DEL",
      destination: "BOM",
      partnerType: "Airline",
      partnerCode: "AI",
      emailId: "12345",
      sitaId: "12345",
      FTPID: "12345",
      transitDestination: "BOM",
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
    },
    {
      srNo: 4,
      messageType: "PAX",
      communicationType: "Email",
      flightNo: "AI-101",
      origin: "DEL",
      destination: "BOM",
      partnerType: "Airline",
      partnerCode: "AI",
      emailId: "12345",
      sitaId: "12345",
      FTPID: "12345",
      transitDestination: "BOM",
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "flightNo",
      label: "Flight No",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "origin",
      label: "Origin",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "destination",
      label: "Destination",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "transitTransition",
      label: "Transit Transition",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "messageType",
      label: "Message Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "partnerType",
      label: "Partner Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "partnerCode",
      label: "Partner Code",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "agentCode",
      label: "Agent Code",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
  ];
  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Message Configuration"
      formFields={filterFormFields}
      hookForm={form}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          <h2 className="text-xl font-semibold">
            Message Configuration Details
          </h2>
          <DataTable columns={columns} data={data} />
        </div>
      }
    />
  );
}
