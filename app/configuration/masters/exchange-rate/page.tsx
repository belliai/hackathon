"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TFormTextField } from "@/components/form/FormTextField";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { DataTable } from "@/components/data-table/data-table";
import FilterActions from "@/components/page-template/FilterActions";

export default function MasterExchangeRatePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "currency",
      header: "Currency",
    },
    {
      accessorKey: "iataRate",
      header: "IATA Rate",
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
      accessorKey: "type",
      header: "Type",
    },
    actionColumn,
  ];

  const data = [
    {
      currency: "USD",
      rateType: "Fixed",
      iataRate: 1.0,
      type: "IATA",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "EUR",
      rateType: "Floating",
      iataRate: 0.85,
      type: "IATA",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "GBP",
      rateType: "Fixed",
      iataRate: 0.75,
      type: "IATA",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "JPY",
      rateType: "Floating",
      iataRate: 110.0,
      type: "IATA",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "AUD",
      rateType: "Fixed",
      iataRate: 1.35,
      type: "IATA",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "CAD",
      rateType: "Floating",
      iataRate: 1.25,
      type: "IATA",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "CHF",
      rateType: "Fixed",
      iataRate: 0.9,
      type: "IATA",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "CNY",
      rateType: "Floating",
      iataRate: 6.5,
      type: "IATA",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "INR",
      rateType: "Fixed",
      iataRate: 74.0,
      type: "IATA",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
    {
      currency: "MXN",
      rateType: "Floating",
      iataRate: 20.0,
      type: "IATA",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      createdAt: "2023-12-01",
      updatedAt: "2023-12-10",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "baseCurrency",
      type: "select",
      label: "Base Currency",
      placeholder: "Select Base Currency",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "currency",
      type: "text",
      label: "Currency",
      orientation: "horizontal",
    },
    {
      name: "exchangeRate",
      type: "text",
      label: "Exchange Rate",
      orientation: "horizontal",
    },
    {
      name: "rateType",
      type: "select",
      label: "Rate Type",
      placeholder: "Select Rate Type",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "fromDate",
      type: "date",
      label: "Valid From",
      orientation: "horizontal",
    },
    {
      name: "toDate",
      type: "date",
      label: "Valid To",
      orientation: "horizontal",
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      formFields={formFields}
      heading="Exchange Rate Master"
      className="max-h-none"
      hookForm={form}
      customDialogContent={
        <div className="flex flex-col gap-8">
          <div className="flex max-w-96 mt-8">
            <FilterActions />
          </div>
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      }
    />
  );
}
