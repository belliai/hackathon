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

export default function PartnerListPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "partnerPrefix",
      header: "Partner Prefix",
    },
    {
      accessorKey: "partnerCode",
      header: "Partner Code",
    },
    {
      accessorKey: "partnerName",
      header: "Partner Name",
    },
    {
      accessorKey: "partnerType",
      header: "Partner Type",
    },
    {
      accessorKey: "sis",
      header: "SIS",
    },
    {
      accessorKey: "sitaId",
      header: "SITA ID",
    },
    {
      accessorKey: "emailId",
      header: "Email ID",
    },
    {
      accessorKey: "zoneId",
      header: "Zone ID",
    },
    {
      accessorKey: "billingCurrency",
      header: "Billing Currency",
    },
    {
      accessorKey: "listingCurrency",
      header: "Listing Currency",
    },
    {
      accessorKey: "settlementMethod",
      header: "Settlement Method",
    },
    {
      accessorKey: "reg",
      header: "Reg",
    },
    actionColumn,
  ];

  const data = [
    {
      partnerPrefix: "AA",
      partnerCode: "001",
      partnerName: "Alpha Airlines",
      partnerType: "Airline",
      sis: "Yes",
      sitaId: "ALPHA123",
      emailId: "contact@alphaairlines.com",
      zoneId: "Z1",
      billingCurrency: "USD",
      listingCurrency: "USD",
      settlementMethod: "IATA Clearing House",
      reg: "Active",
    },
    {
      partnerPrefix: "BB",
      partnerCode: "002",
      partnerName: "Bravo Logistics",
      partnerType: "Freight Forwarder",
      sis: "No",
      sitaId: "BRAVO456",
      emailId: "info@bravologistics.com",
      zoneId: "Z2",
      billingCurrency: "EUR",
      listingCurrency: "EUR",
      settlementMethod: "Direct Billing",
      reg: "Inactive",
    },
    {
      partnerPrefix: "CC",
      partnerCode: "003",
      partnerName: "Charlie Cargo",
      partnerType: "Cargo Handler",
      sis: "Yes",
      sitaId: "CHARLIE789",
      emailId: "support@charliecargo.com",
      zoneId: "Z3",
      billingCurrency: "GBP",
      listingCurrency: "GBP",
      settlementMethod: "IATA Clearing House",
      reg: "Active",
    },
    {
      partnerPrefix: "DD",
      partnerCode: "004",
      partnerName: "Delta Delivery",
      partnerType: "Courier",
      sis: "No",
      sitaId: "DELTA012",
      emailId: "service@deltadelivery.com",
      zoneId: "Z4",
      billingCurrency: "JPY",
      listingCurrency: "JPY",
      settlementMethod: "Direct Billing",
      reg: "Inactive",
    },
    {
      partnerPrefix: "EE",
      partnerCode: "005",
      partnerName: "Echo Enterprises",
      partnerType: "Logistics",
      sis: "Yes",
      sitaId: "ECHO345",
      emailId: "echo@echoenterprises.com",
      zoneId: "Z5",
      billingCurrency: "AUD",
      listingCurrency: "AUD",
      settlementMethod: "IATA Clearing House",
      reg: "Active",
    },
  ];

  const form = useForm();

  const filterFormFields: TFormTextField[] = [
    {
      name: "partnerType",
      label: "Partner Type",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "partnerPrefix",
      label: "Partner Prefix",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "partnerName",
      label: "Partner Name",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "partnerCode",
      label: "Partner Code",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "emailId",
      label: "Email ID",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "sitaId",
      type: "text",
      label: "SITA ID",
      orientation: "horizontal",
    },
    {
      name: "validFrom",
      type: "date",
      label: "Valid From",
      orientation: "horizontal",
    },
    {
      name: "validTo",
      type: "date",
      label: "Valid To",
      orientation: "horizontal",
    },
  ];
  return (
    <CreateFormPageTemplate
      heading="List Partner"
      formFields={filterFormFields}
      hookForm={form}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          <DataTable columns={columns} data={data} />
        </div>
      }
    />
  );
}
