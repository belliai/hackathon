"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/data-table/data-table"
import { TFormTextField } from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"

export default function ListDealsPage() {
  // const columns: ColumnDef<any>[] = [

  //     {
  //         ac: ""
  //     }
  // ]

  const columns: ColumnDef<any>[] = [
    selectColumn,
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
      accessorKey: "fromDate",
      header: "From Date",
    },
    {
      accessorKey: "toDate",
      header: "To Date",
    },
    {
      accessorKey: "agentCode",
      header: "Agent Code",
    },
    {
      accessorKey: "shipperCode",
      header: "Shipper Code",
    },
    {
      accessorKey: "dealId",
      header: "Deal Id",
    },
    {
      accessorKey: "parameter",
      header: "Parameter",
    },
    {
      accessorKey: "commCode",
      header: "Comm Code",
    },
    {
      accessorKey: "productType",
      header: "Product Type",
    },
    {
      accessorKey: "dealType",
      header: "Deal Type",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    actionColumn,
  ]

  const data = [
    {
      originLevel: "Airport",
      origin: "JFK",
      destinationLevel: "Airport",
      destination: "LAX",
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
      agentCode: "AG123",
      shipperCode: "SH456",
      dealId: "DL789",
      parameter: "Weight",
      commCode: "CC001",
      productType: "General Cargo",
      dealType: "Standard",
      status: "Active",
    },
    {
      originLevel: "City",
      origin: "NYC",
      destinationLevel: "City",
      destination: "LA",
      fromDate: "2023-02-01",
      toDate: "2023-11-30",
      agentCode: "AG124",
      shipperCode: "SH457",
      dealId: "DL790",
      parameter: "Volume",
      commCode: "CC002",
      productType: "Perishable",
      dealType: "Special",
      status: "Inactive",
    },
    {
      originLevel: "Region",
      origin: "North America",
      destinationLevel: "Region",
      destination: "West Coast",
      fromDate: "2023-03-01",
      toDate: "2023-10-31",
      agentCode: "AG125",
      shipperCode: "SH458",
      dealId: "DL791",
      parameter: "Distance",
      commCode: "CC003",
      productType: "Hazardous",
      dealType: "Promotional",
      status: "Active",
    },
    {
      originLevel: "Country",
      origin: "USA",
      destinationLevel: "Country",
      destination: "Canada",
      fromDate: "2023-04-01",
      toDate: "2023-09-30",
      agentCode: "AG126",
      shipperCode: "SH459",
      dealId: "DL792",
      parameter: "Fragility",
      commCode: "CC004",
      productType: "Fragile Goods",
      dealType: "Seasonal",
      status: "Inactive",
    },
    {
      originLevel: "Continent",
      origin: "North America",
      destinationLevel: "Continent",
      destination: "Europe",
      fromDate: "2023-05-01",
      toDate: "2023-08-31",
      agentCode: "AG127",
      shipperCode: "SH460",
      dealId: "DL793",
      parameter: "Temperature",
      commCode: "CC005",
      productType: "Temperature Controlled",
      dealType: "Emergency",
      status: "Active",
    },
  ]

  const formFields: TFormTextField[] = [
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
      name: "dealId",
      type: "text",
      label: "Deal Id",
      orientation: "horizontal",
    },
    {
      name: "parameter",
      type: "text",
      label: "Parameter",
      orientation: "horizontal",
    },
    {
      name: "commCode",
      type: "text",
      label: "Comm Code",
      orientation: "horizontal",
    },
    {
      name: "productType",
      type: "select",
      label: "Product Type",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "dealType",
      type: "select",
      label: "Deal Type",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
  ]

  const form = useForm()

  return (
    <CreateFormPageTemplate
      heading="Agent Deals"
      formFields={formFields}
      hookForm={form}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="mt-8 max-w-96">
            <FilterActions />
          </div>
          <Separator />
          <h2 className="text-xl font-semibold">Deal Details</h2>
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      }
    />
  )
}
