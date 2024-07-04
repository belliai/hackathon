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
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions"

export default function OtherChargesPage() {
  const form = useForm()

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "ocNumber",
      header: "OC #",
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
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "chargeName",
      header: "Charge Name",
    },
    {
      accessorKey: "chargedAt",
      header: "Charged At",
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
      accessorKey: "chargeType",
      header: "Charge Type",
    },
    {
      accessorKey: "serviceTax",
      header: "Service Tax",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "parameters",
      header: "Parameters",
    },
    {
      accessorKey: "slabs",
      header: "Slabs",
    },
    actionColumn,
  ]

  const data = [
    {
      ocNumber: "OC123456",
      origin: "New York",
      destination: "Los Angeles",
      code: "NY-LA",
      chargeName: "Standard Shipping",
      chargedAt: "2023-06-15",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      chargeType: "Fixed",
      serviceTax: 5.0,
      status: "Active",
      parameters: "Weight",
      slabs: "0-100kg",
    },
    {
      ocNumber: "OC234567",
      origin: "Chicago",
      destination: "San Francisco",
      code: "CHI-SFO",
      chargeName: "Express Shipping",
      chargedAt: "2023-07-20",
      startDate: "2023-02-01",
      endDate: "2023-11-30",
      chargeType: "Variable",
      serviceTax: 7.5,
      status: "Inactive",
      parameters: "Volume",
      slabs: "100-200kg",
    },
    {
      ocNumber: "OC345678",
      origin: "Houston",
      destination: "Miami",
      code: "HOU-MIA",
      chargeName: "Overnight Shipping",
      chargedAt: "2023-08-25",
      startDate: "2023-03-01",
      endDate: "2023-10-31",
      chargeType: "Fixed",
      serviceTax: 10.0,
      status: "Active",
      parameters: "Distance",
      slabs: "200-300kg",
    },
    {
      ocNumber: "OC456789",
      origin: "Atlanta",
      destination: "Seattle",
      code: "ATL-SEA",
      chargeName: "Priority Shipping",
      chargedAt: "2023-09-30",
      startDate: "2023-04-01",
      endDate: "2023-09-30",
      chargeType: "Variable",
      serviceTax: 12.5,
      status: "Inactive",
      parameters: "Weight",
      slabs: "300-400kg",
    },
    {
      ocNumber: "OC567890",
      origin: "Boston",
      destination: "Denver",
      code: "BOS-DEN",
      chargeName: "Economy Shipping",
      chargedAt: "2023-10-05",
      startDate: "2023-05-01",
      endDate: "2023-08-31",
      chargeType: "Fixed",
      serviceTax: 15.0,
      status: "Active",
      parameters: "Volume",
      slabs: "400-500kg",
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
      type: "text",
      label: "Origin",
      orientation: "horizontal",
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
      type: "text",
      label: "Destination",
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
      name: "chargeName",
      type: "text",
      label: "Charge Name",
      orientation: "horizontal",
    },
    {
      name: "parameter",
      type: "text",
      label: "Parameter",
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
      name: "chargeType",
      type: "select",
      label: "Charge Type",
      orientation: "horizontal",
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
      type: "text",
      label: "Shipper Code",
      orientation: "horizontal",
    },
    {
      name: "iataComCode",
      type: "text",
      label: "IATA Com Code",
      orientation: "horizontal",
    },
    {
      name: "productType",
      type: "text",
      label: "Product Type",
      orientation: "horizontal",
    },
    {
      name: "chargedAt",
      type: "date",
      label: "Charged At",
      orientation: "horizontal",
    },
    {
      name: "ocId",
      type: "text",
      label: "OC ID",
      orientation: "horizontal",
    },
    {
      name: "expiresFromDate",
      type: "date",
      label: "Expires From Date",
      orientation: "horizontal",
    },
    {
      name: "expiresToDate",
      type: "date",
      label: "Expires To Date",
      orientation: "horizontal",
    },
  ]

  return (
    <CreateFormPageTemplate
      heading="List Other Charges"
      hookForm={form}
      formFields={formFields}
      className="max-h-none"
      customDialogContent={
        <div className="mt-8 flex flex-col gap-4">
          <div className="max-w-96">
            <FilterActions />
          </div>
          <Separator />
          <h2 className="text-xl font-semibold">Other Charges Detail</h2>
          <DataTable hideToolbar columns={columns} data={data} />
        </div>
      }
    />
  )
}
