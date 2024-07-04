"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../masters/components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../masters/components/dummySelectOptions"
import MastersPageTemplate from "../../masters/components/MastersPageTemplate"
import StatusBadge from "../../masters/components/StatusBadge"

export default function MasterSpotRatePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "spotRateId",
      header: "Spot Rate ID",
    },
    {
      accessorKey: "deviation",
      header: "Deviation",
    },
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
      accessorKey: "commodityDest",
      header: "Commodity Dest",
    },
    {
      accessorKey: "info",
      header: "Info",
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
  ]

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
      commodityDest: "Commodity Dest 1",
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
      commodityDest: "Commodity Dest 2",
      info: "Info 2",
      createdAt: "2021-09-02",
      updatedAt: "2021-09-02",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "origin",
      placeholder: "Origin",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "destination",
      placeholder: "Destination",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "flightNo",
      type: "text",
      placeholder: "Flight No",
    },
    {
      name: "flightDate",
      type: "date",
      placeholder: "Flight Date",
    },
    {
      name: "fromDate",
      type: "date",
      placeholder: "From Date",
    },
    {
      name: "toDate",
      type: "date",
      placeholder: "To Date",
    },
    {
      name: "agentCode",
      placeholder: "Agent Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "spotRateId",
      placeholder: "Spot Rate ID",
      type: "text",
    },
    {
      name: "prefix",
      placeholder: "Prefix",
      type: "text",
    },
    {
      name: "awbNo",
      placeholder: "AWB No",
      type: "text",
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ]

  const filterForm = useForm()
  const form = useForm()
  const fieldArray = useFieldArray<any>({
    control: form.control,
    name: "rateDetails",
  })

  return (
    <MastersPageTemplate
      heading="Spot Rate"
      buttonText="Create Spot Rate"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      hookForm={form}
      sectionedFormFields={[
        {
          fields: [
            {
              name: "prefix",
              placeholder: "Prefix",
              type: "text",
            },
            {
              name: "awbNo",
              placeholder: "AWB No",
              type: "text",
            },
          ],
        },
        {
          sectionName: "Shipment Details",
          fields: [
            {
              name: "origin",
              placeholder: "origin",
              type: "text",
            },
            {
              name: "destination",
              placeholder: "Destination",
              type: "text",
            },
            {
              name: "commodity",
              placeholder: "Commodity",
              type: "text",
            },
            {
              name: "commodityDescription",
              placeholder: "Commodity Description",
              type: "text",
            },
            {
              name: "productType",
              placeholder: "Product Type",
              type: "text",
            },
            {
              name: "shc",
              placeholder: "SHC",
              type: "text",
            },
            {
              name: "shippingAgent",
              placeholder: "Shipping Agent",
              type: "text",
            },
            {
              name: "shipper",
              placeholder: "Shipper",
              type: "text",
            },
            {
              name: "consignee",
              placeholder: "Consignee",
              type: "text",
            },
            {
              name: "flightNo",
              placeholder: "Flight No",
              type: "text",
            },
            {
              name: "flightDate",
              type: "date",
              placeholder: "Flight Date",
            },
            {
              name: "routeDetails",
              type: "text",
              placeholder: "Route Details",
            },
            {
              name: "pieces",
              type: "text",
              placeholder: "Pieces",
            },
            {
              name: "grossWeight",
              type: "text",
              placeholder: "Gross Weight",
            },
            {
              name: "chargedWeight",
              type: "text",
              placeholder: "Charged Weight",
            },
          ],
        },
        {
          sectionName: "Rate Details",
          fieldArray: {
            fieldArray: fieldArray,
            fieldArrayName: "rateDetails",
            fields: [
              {
                name: "type",
                placeholder: "Type",
                type: "select",
              },
              {
                name: "weightCount",
                placeholder: "Weight/Count",
                type: "text",
              },
              {
                name: "chargeRate",
                type: "text",
                placeholder: "Charge Rate",
              },
              {
                name: "cost",
                placeholder: "Cost",
                type: "text",
              },
            ],
          },
          fields: [
            {
              name: "spotCategory",
              type: "select",
              placeholder: "Spot Category",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "weightCategory",
              type: "select",
              placeholder: "Weight Category",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "allIn",
              type: "select",
              placeholder: "All In",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "currency",
              type: "select",
              placeholder: "Currency",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "validFrom",
              type: "date",
              placeholder: "Valid From",
            },
            {
              name: "validTo",
              type: "date",
              placeholder: "Valid To",
            },
            {
              name: "thresholdLimit",
              placeholder: "Threshold Limit",
              type: "text",
            },
          ],
        },
        {
          sectionName: "Requester Details",
          fields: [
            {
              name: "requestedBy",
              placeholder: "Requested By",
              type: "text",
            },
            {
              name: "requestedOn",
              type: "date",
              placeholder: "Requested On",
            },
            {
              name: "station",
              type: "text",
              placeholder: "Station",
            },
          ],
        },
        {
          sectionName: "Remarks",
          fields: [
            {
              name: "remarks",
              placeholder: "Remarks",
              type: "text",
            },
          ],
        },
      ]}
    />
  )
}
