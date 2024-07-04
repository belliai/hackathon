"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn } from "../../components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions"
import MastersPageTemplate from "../../components/MastersPageTemplate"
import StatusBadge from "../../components/StatusBadge"

export default function MasterCutoffTimePage() {
  const columns: ColumnDef<any>[] = [
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

  const formFields = [
    {
      name: "station",
      placeholder: "Station",
      type: "text",
    },
    {
      name: "cutoffTimeMin",
      placeholder: "Cutoff Time (min)",
      type: "number",
    },
    {
      name: "transitTimeMin",
      placeholder: "Transit Time (min)",
      type: "number",
    },
    {
      name: "validFrom",
      placeholder: "Valid From",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "validTo",
      placeholder: "Valid To",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "shipper",
      placeholder: "Shipper",
      type: "text",
    },
    {
      name: "customer",
      placeholder: "Customer",
      type: "text",
    },
    {
      name: "productType",
      placeholder: "Product Type",
      type: "text",
    },
    {
      name: "sg",
      placeholder: "SG",
      type: "text",
    },
    {
      name: "partnerCode",
      placeholder: "Partner Code",
      type: "text",
    },
    {
      name: "flightNumber",
      placeholder: "Flight Number",
      type: "text",
    },
    {
      name: "shc",
      placeholder: "SHC",
      type: "text",
    },
    {
      name: "commodityCode",
      placeholder: "Commodity Code",
      type: "text",
    },
    {
      name: "origin",
      placeholder: "Origin",
      type: "text",
    },
    {
      name: "countryOrigin",
      placeholder: "Country Origin",
      type: "text",
    },
    {
      name: "destination",
      placeholder: "Destination",
      type: "text",
    },
    {
      name: "countryDestination",
      placeholder: "Country Destination",
      type: "text",
    },
    {
      name: "aoc",
      placeholder: "AOC",
      type: "text",
    },
    {
      name: "equipmentType",
      placeholder: "Equipment Type",
      type: "text",
    },
    {
      name: "routeType",
      placeholder: "Route Type",
      type: "text",
    },
    {
      name: "flightType",
      placeholder: "Flight Type",
      type: "text",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "station",
      placeholder: "Station",
      type: "text",
    },
    {
      name: "validFrom",
      placeholder: "Valid From",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "validTo",
      placeholder: "Valid To",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS, // Assuming DUMMY_SELECT_OPTIONS is defined elsewhere
    },
    {
      name: "shipper",
      placeholder: "Shipper",
      type: "text",
    },
    {
      name: "customer",
      placeholder: "Customer",
      type: "text",
    },
    {
      name: "sg",
      placeholder: "SG",
      type: "text",
    },
    {
      name: "partnerCode",
      placeholder: "Partner Code",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "flightNo",
      placeholder: "Flight No.",
      type: "text",
    },
    {
      name: "origin",
      placeholder: "Origin",
      type: "text",
    },
    {
      name: "countryOrigin",
      placeholder: "Country Origin",
      type: "text",
    },
    {
      name: "destination",
      placeholder: "Destination",
      type: "text",
    },
    {
      name: "countryDestination",
      placeholder: "Country Destination",
      type: "text",
    },
    {
      name: "routeType",
      placeholder: "Route Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "flightType",
      placeholder: "Flight Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
  ]

  const filterForm = useForm()
  const cutOffForm = useForm()

  return (
    <MastersPageTemplate
      heading="Cutoff Time"
      buttonText="Create Cutoff Time"
      columns={columns}
      data={data}
      formFields={formFields}
      hookForm={cutOffForm}
      filterHookForm={filterForm}
      filterFormFields={filterFormFields}
    />
  )
}
