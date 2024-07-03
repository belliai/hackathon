"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useFieldArray, useForm } from "react-hook-form"

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
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate"

export default function MasterRateLinePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "rateId",
      header: "Rate ID",
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
      header: "Dest. Level",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "rateCard",
      header: "Rate Card",
    },
    {
      accessorKey: "slabs",
      header: "Slabs",
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
      accessorKey: "rateBased",
      header: "Rate Based",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    actionColumn,
  ]

  const data = [
    {
      rateId: "R001",
      originLevel: "Country",
      origin: "USA",
      destinationLevel: "City",
      destination: "New York",
      rateCard: "Standard",
      slabs: "1-1000 kg",
      startDate: "01-01-2023",
      endDate: "31-12-2023",
      rateBased: "Weight",
      type: "Air",
      status: "Active",
    },
    {
      rateId: "R002",
      originLevel: "Country",
      origin: "Canada",
      destinationLevel: "City",
      destination: "Toronto",
      rateCard: "Economy",
      slabs: "1001-5000 kg",
      startDate: "15-02-2023",
      endDate: "14-02-2024",
      rateBased: "Volume",
      type: "Sea",
      status: "Inactive",
    },
    {
      rateId: "R003",
      originLevel: "City",
      origin: "London",
      destinationLevel: "Country",
      destination: "UK",
      rateCard: "Express",
      slabs: "5001-10000 kg",
      startDate: "10-03-2023",
      endDate: "09-03-2024",
      rateBased: "Weight",
      type: "Road",
      status: "Active",
    },
    {
      rateId: "R004",
      originLevel: "City",
      origin: "Sydney",
      destinationLevel: "Country",
      destination: "Australia",
      rateCard: "Standard",
      slabs: "1-1000 kg",
      startDate: "05-04-2023",
      endDate: "04-04-2024",
      rateBased: "Volume",
      type: "Air",
      status: "Inactive",
    },
    {
      rateId: "R005",
      originLevel: "Country",
      origin: "India",
      destinationLevel: "City",
      destination: "Mumbai",
      rateCard: "Economy",
      slabs: "1001-5000 kg",
      startDate: "20-05-2023",
      endDate: "19-05-2024",
      rateBased: "Weight",
      type: "Sea",
      status: "Active",
    },
    {
      rateId: "R006",
      originLevel: "City",
      origin: "Paris",
      destinationLevel: "Country",
      destination: "France",
      rateCard: "Express",
      slabs: "5001-10000 kg",
      startDate: "01-06-2023",
      endDate: "31-05-2024",
      rateBased: "Volume",
      type: "Road",
      status: "Inactive",
    },
    {
      rateId: "R007",
      originLevel: "Country",
      origin: "Germany",
      destinationLevel: "City",
      destination: "Berlin",
      rateCard: "Standard",
      slabs: "1-1000 kg",
      startDate: "15-07-2023",
      endDate: "14-07-2024",
      rateBased: "Weight",
      type: "Air",
      status: "Active",
    },
    {
      rateId: "R008",
      originLevel: "City",
      origin: "Tokyo",
      destinationLevel: "Country",
      destination: "Japan",
      rateCard: "Economy",
      slabs: "1001-5000 kg",
      startDate: "10-08-2023",
      endDate: "09-08-2024",
      rateBased: "Volume",
      type: "Sea",
      status: "Inactive",
    },
    {
      rateId: "R009",
      originLevel: "Country",
      origin: "China",
      destinationLevel: "City",
      destination: "Beijing",
      rateCard: "Express",
      slabs: "5001-10000 kg",
      startDate: "05-09-2023",
      endDate: "04-09-2024",
      rateBased: "Weight",
      type: "Road",
      status: "Active",
    },
    {
      rateId: "R010",
      originLevel: "City",
      origin: "Moscow",
      destinationLevel: "Country",
      destination: "Russia",
      rateCard: "Standard",
      slabs: "1-1000 kg",
      startDate: "20-10-2023",
      endDate: "19-10-2024",
      rateBased: "Volume",
      type: "Air",
      status: "Inactive",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "originLevel",
      label: "Origin Level",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "origin",
      label: "Origin",
      orientation: "horizontal",
      type: "select",
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
      name: "rateId",
      type: "text",
      label: "Rate ID",
      orientation: "horizontal",
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
      name: "expireFromDate",
      type: "date",
      label: "Expire From",
      orientation: "horizontal",
    },
    {
      name: "expireToDate",
      type: "date",
      label: "Expire To",
      orientation: "horizontal",
    },
    {
      name: "parameter",
      type: "text",
      label: "Parameter",
      orientation: "horizontal",
    },

    {
      name: "status",
      type: "select",
      label: "Status",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "rateCardName",
      type: "text",
      label: "Rate Card Name",
      orientation: "horizontal",
    },
    {
      name: "rateType",
      label: "Rate Type",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "agentCode",
      type: "text",
      label: "Agent Code",
      orientation: "horizontal",
    },
    {
      name: "shipperCode",
      type: "select",
      label: "Shipper Code",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "iataCommCode",
      label: "IATA Comm Code",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "centralAgentCode",
      type: "select",
      label: "Central Agent Code",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "productType",
      type: "select",
      label: "Product Type",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "type",
      type: "select",
      label: "Type",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "tactRate",
      type: "checkbox",
      label: "TACT Rate",
    },
    {
      name: "uldRate",
      type: "checkbox",
      label: "ULD Rate",
    },
    {
      name: "heavyApplicable",
      type: "checkbox",
      label: "Heavy Applicable",
    },
    {
      name: "allInRate",
      type: "checkbox",
      label: "All In Rate",
    },
    {
      name: "isPrime",
      type: "checkbox",
      label: "Is Prime",
    },
  ]

  const filterForm = useForm()

  return (
    <CreateFormPageTemplate
      heading="List Rate Line"
      formFields={filterFormFields}
      hookForm={filterForm}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="mt-8 max-w-96">
            <FilterActions />
          </div>
          <Separator />
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      }
    />
  )
}
