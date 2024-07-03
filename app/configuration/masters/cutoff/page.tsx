"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { DataTable } from "@/components/data-table/data-table"
import { TFormTextField } from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions"
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate"
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge"

export default function MasterCutoffTimePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "station",
      header: "Station",
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "shipper",
      header: "Shipper",
    },
    {
      accessorKey: "productTypeSHCCode",
      header: "Product Type SHC Code",
    },
    {
      accessorKey: "commodityCode",
      header: "Commodity Code",
    },
    {
      accessorKey: "flightNo",
      header: "Flight No.",
    },
    {
      accessorKey: "cutoffTimeMin",
      header: "Cutoff Time (min)",
    },
    {
      accessorKey: "transitTimeMin",
      header: "Transit Time (min)",
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
      accessorKey: "managerName",
      header: "Manager Name",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <StatusBadge
            statusText="Active"
            severity={row.original.status === "Active" ? "default" : "error"}
          />
        )
      },
    },
    {
      accessorKey: "orginCountry",
      header: "Origin Country",
    },
    {
      accessorKey: "destinationCountry",
      header: "Destination Country",
    },
    actionColumn,
  ]

  const data = [
    {
      station: "JFK",
      customer: "ACME Corp",
      shipper: "John Doe",
      productTypeSHCCode: "GEN",
      commodityCode: "C001",
      flightNo: "AA123",
      cutoffTimeMin: 120,
      transitTimeMin: 300,
      validFrom: "2023-01-01",
      validTo: "2023-12-31",
      managerName: "Alice Smith",
      status: "Active",
      orginCountry: "USA",
      destinationCountry: "USA",
    },
    {
      station: "LAX",
      customer: "Global Shipping",
      shipper: "Jane Smith",
      productTypeSHCCode: "PER",
      commodityCode: "C002",
      flightNo: "DL456",
      cutoffTimeMin: 90,
      transitTimeMin: 180,
      validFrom: "2023-02-01",
      validTo: "2023-11-30",
      managerName: "Bob Johnson",
      status: "Active",
      orginCountry: "USA",
      destinationCountry: "USA",
    },
    {
      station: "ORD",
      customer: "Universal Traders",
      shipper: "Mike Brown",
      productTypeSHCCode: "DGR",
      commodityCode: "C003",
      flightNo: "UA789",
      cutoffTimeMin: 150,
      transitTimeMin: 240,
      validFrom: "2023-03-01",
      validTo: "2023-10-31",
      managerName: "Carol White",
      status: "Active",
      orginCountry: "USA",
      destinationCountry: "USA",
    },
    {
      station: "DFW",
      customer: "Fast Delivery",
      shipper: "Sue Green",
      productTypeSHCCode: "VAL",
      commodityCode: "C004",
      flightNo: "AA321",
      cutoffTimeMin: 60,
      transitTimeMin: 360,
      validFrom: "2023-04-01",
      validTo: "2023-09-30",
      managerName: "David Black",
      status: "Active",
      orginCountry: "USA",
      destinationCountry: "USA",
    },
    {
      station: "ATL",
      customer: "Quick Transport",
      shipper: "Tom Blue",
      productTypeSHCCode: "AVI",
      commodityCode: "C005",
      flightNo: "DL654",
      cutoffTimeMin: 180,
      transitTimeMin: 120,
      validFrom: "2023-05-01",
      validTo: "2023-08-31",
      managerName: "Eve Gray",
      status: "Active",
      orginCountry: "USA",
      destinationCountry: "USA",
    },
  ]

  const formFields: TFormTextField[] = [
    {
      name: "station",
      label: "Station",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "cutoffTimeMin",
      label: "Cutoff Time (min)",
      orientation: "horizontal",
      type: "number",
    },
    {
      name: "transitTimeMin",
      label: "Transit Time (min)",
      orientation: "horizontal",
      type: "number",
    },
    {
      name: "validFrom",
      label: "Valid From",
      orientation: "horizontal",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "validTo",
      label: "Valid To",
      orientation: "horizontal",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "active",
      label: "Active",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "shipper",
      label: "Shipper",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "customer",
      label: "Customer",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "productType",
      label: "Product Type",
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
      name: "flightNumber",
      label: "Flight Number",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "shc",
      label: "SHC",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "commodityCode",
      label: "Commodity Code",
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
      name: "countryOrigin",
      label: "Country Origin",
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
      name: "countryDestination",
      label: "Country Destination",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "aoc",
      label: "AOC",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "equipmentType",
      label: "Equipment Type",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "routeType",
      label: "Route Type",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "flightType",
      label: "Flight Type",
      orientation: "horizontal",
      type: "text",
    },
  ]

  const filterForm = useForm()

  return (
    <CreateFormPageTemplate
      heading="Cutoff Time"
      hookForm={filterForm}
      formFields={formFields}
      className="max-h-none"
      customDialogContent={
        <div className="mt-8 flex flex-col gap-8">
          <div className="flex max-w-96">
            <FilterActions />
          </div>
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      }
    />
  )
}
