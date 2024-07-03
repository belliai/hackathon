"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "../../masters/components/dummySelectOptions"
import MastersPageTemplate, {
  SectionedFormFields,
} from "../../masters/components/MastersPageTemplate"

export default function MastersCapacityAllocationPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "allotmentId",
      header: "Allotment ID",
    },
    {
      accessorKey: "flightOrigin",
      header: "Flight Origin",
    },
    {
      accessorKey: "flightDestination",
      header: "Flight Destination",
    },
    {
      accessorKey: "flightNo",
      header: "Flight No.",
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
      accessorKey: "frequency",
      header: "Frequency",
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
      accessorKey: "allocatedCapacity",
      header: "Allocated Capacity",
    },
    {
      accessorKey: "allocatedVolume",
      header: "Allocated Volume",
    },
    {
      accessorKey: "parameters",
      header: "Parameters",
    },
    actionColumn,
  ]
  const data = [
    {
      allotmentId: 1,
      flightOrigin: "DEL",
      flightDestination: "BOM",
      flightNo: "AI-101",
      validFrom: "01/01/2021",
      validTo: "01/01/2022",
      frequency: "Daily",
      agentCode: "A001",
      shipperCode: "S001",
      allocatedCapacity: "100",
      allocatedVolume: "100",
      parameters: "100",
    },
    {
      allotmentId: 2,
      flightOrigin: "DEL",
      flightDestination: "BOM",
      flightNo: "AI-102",
      validFrom: "01/01/2021",
      validTo: "01/01/2022",
      frequency: "Daily",
      agentCode: "A002",
      shipperCode: "S002",
      allocatedCapacity: "100",
      allocatedVolume: "100",
      parameters: "100",
    },
    {
      allotmentId: 3,
      flightOrigin: "DEL",
      flightDestination: "BOM",
      flightNo: "AI-103",
      validFrom: "01/01/2021",
      validTo: "01/01/2022",
      frequency: "Daily",
      agentCode: "A003",
      shipperCode: "S003",
      allocatedCapacity: "100",
      allocatedVolume: "100",
      parameters: "100",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "flightOrigin",
      type: "select",
      placeholder: "Flight Origin",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "flightDestination",
      type: "select",
      placeholder: "Flight Destination",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "fromDate",
      type: "date",
      placeholder: "From Date",
    },
    {
      name: "partnerCode",
      type: "select",
      placeholder: "Partner Code",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "flightNo",
      type: "text",
      placeholder: "Flight No.",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "shipmentOrigin",
      type: "select",
      placeholder: "Shipment Origin",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "shipmentDestination",
      type: "text",
      placeholder: "Shipment Destination",
    },
    {
      name: "agentCode",
      placeholder: "Agent Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "shipperCode",
      placeholder: "Shipper Code",
      type: "text",
      endIcon: <Search />,
    },
  ]

  const filterForm = useForm()
  const hookForm = useForm()
  const fieldArray = useFieldArray<any>({
    control: hookForm.control,
    name: "allocations",
  })

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "origin",
          placeholder: "Origin",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "destination",
          type: "text",
          placeholder: "Destination",
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
          name: "partnerCode",
          type: "select",
          placeholder: "Partner Code",
        },
        {
          name: "flightNo",
          type: "text",
          placeholder: "Flight No.",
        },
      ],
    },
    {
      fieldArray: {
        fieldArray,
        fieldArrayName: "allocations",
        fields: [
          {
            name: "allotmentId",
            placeholder: "Allotment ID",
            type: "text",
          },
          {
            name: "carrier",
            placeholder: "Carrier",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "shipmentOrigin",
            placeholder: "Shipment Origin",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "shipmentDestination",
            placeholder: "Shipment Destination",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "frequency",
            placeholder: "Frequency",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "agentCode",
            placeholder: "Agent Code",
            type: "text",
          },
          {
            name: "shipperCode",
            placeholder: "Shipper Code",
            type: "text",
          },
          {
            name: "uldType",
            placeholder: "ULD Type",
            type: "select",
          },
          {
            name: "productType",
            placeholder: "Product Type",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "shcCode",
            placeholder: "SHC Code",
            type: "text",
          },
          {
            name: "commodityCode",
            placeholder: "Commodity Code",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
        ],
      },
    },
    {
      fields: [
        {
          name: "totalCapacity",
          placeholder: "Total Capacity",
          type: "text",
        },
        {
          name: "usedCapacity",
          placeholder: "Used Capacity",
          type: "text",
        },
        {
          name: "availableCapacity",
          placeholder: "Available Capacity",
          type: "text",
        },
      ],
    },
  ]

  return (
    <MastersPageTemplate
      heading="Capacity Allocation"
      buttonText="Create Capacity Allocation"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      sectionedFormFields={sectionedFormFields}
      hookForm={hookForm}
    />
  )
}
