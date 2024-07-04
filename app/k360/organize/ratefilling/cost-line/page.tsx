"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../masters/components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../masters/components/dummySelectOptions"
import MastersPageTemplate from "../../masters/components/MastersPageTemplate"
import StatusBadge from "../../masters/components/StatusBadge"

export default function MasterCostLinePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "costId",
      header: "Cost ID",
    },
    {
      accessorKey: "vendorCode",
      header: "Vendor Code",
    },
    {
      accessorKey: "costCode",
      header: "Cost Code",
    },
    {
      accessorKey: "costType",
      header: "Cost Type",
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
      header: "Destination Level",
    },
    {
      accessorKey: "destination",
      header: "Destination",
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
      accessorKey: "currency",
      header: "Currency",
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
      accessorKey: "slab",
      header: "Slab",
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
      costId: 1,
      vendorCode: "VN001",
      costCode: "C001",
      costType: "Freight",
      originLevel: "Airport",
      origin: "DEL",
      destinationLevel: "Airport",
      destination: "BOM",
      startDate: "2021-09-01",
      endDate: "2021-09-01",
      currency: "INR",
      status: "Active",
      slab: "1",
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
    },
    {
      costId: 2,
      vendorCode: "VN001",
      costCode: "C001",
      costType: "Freight",
      originLevel: "Airport",
      origin: "DEL",
      destinationLevel: "Airport",
      destination: "BOM",
      startDate: "2021-09-01",
      endDate: "2021-09-01",
      currency: "INR",
      status: "Active",
      slab: "1",
      createdAt: "2021-09-01",
      updatedAt: "2021-09-01",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "vendorCode",
      type: "select",
      placeholder: "Vendor Code",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "costCode",
      type: "text",
      placeholder: "Cost Code",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "costType",
      type: "select",
      placeholder: "Cost Type",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
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
      name: "originLevel",
      type: "select",
      placeholder: "Origin Level",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "origin",
      type: "select",
      placeholder: "Origin",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "destinationLevel",
      type: "select",
      placeholder: "Destination Level",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "destination",
      type: "select",
      placeholder: "Destination",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "costId",
      type: "text",
      placeholder: "Cost ID",
    },
  ]

  const excludeIncludeOptions = [
    {
      label: "Exclude",
      value: "exclude",
    },
    {
      label: "Include",
      value: "include",
    },
  ]

  const filterForm = useForm()
  const form = useForm()

  return (
    <MastersPageTemplate
      heading="Cost Line Master"
      buttonText="Create Cost Line"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      hookForm={form}
      sectionedFormFields={[
        {
          fields: [
            {
              name: "vendorCode",
              placeholder: "Vendor Code",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "costCode",
              placeholder: "Cost Code",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "costName",
              placeholder: "Cost Name",
              type: "text",
            },
            {
              name: "costDescription",
              placeholder: "Cost Description",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },

            {
              name: "costType",
              type: "select",
              placeholder: "Cost Type",
            },
            {
              name: "currency",
              placeholder: "Currency",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "startDate",
              placeholder: "Start Date",
              type: "date",
            },
            {
              name: "endDate",
              placeholder: "End Date",
              type: "date",
            },
            {
              name: "originLevel",
              type: "select",
              placeholder: "Origin Level",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "origin",
              type: "select",
              placeholder: "Origin",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "destinationLevel",
              type: "select",
              placeholder: "Destination Level",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "destination",
              type: "select",
              placeholder: "Destination",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "paymentType",
              type: "select",
              placeholder: "Payment Type",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "chargeType",
              type: "select",
              placeholder: "Charge Type",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "uom",
              type: "select",
              placeholder: "UOM",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "glAccountCode",
              type: "text",
              placeholder: "GL Account Code",
            },
            {
              name: "status",
              type: "select",
              placeholder: "Status",
              options: DUMMY_SELECT_OPTIONS_STATUS,
            },

            {
              name: "tax",
              type: "text",
              placeholder: "Tax%",
            },
          ],
        },
        {
          sectionName: "Cost Base",
          fields: [
            {
              name: "costHeadBasis",
              type: "select",
              placeholder: "Cost Head Basis",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "charge",
              type: "select",
              placeholder: "Charge",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "minimum",
              type: "text",
              placeholder: "Minimum",
            },
            {
              name: "maximum",
              type: "text",
              placeholder: "Maximum",
            },
            {
              name: "chargeOn",
              type: "select",
              placeholder: "Charge On",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "appliedOn",
              type: "select",
              placeholder: "Applied On",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "chargeAt",
              placeholder: "Charge At",
              type: "select",
            },
          ],
        },
        {
          sectionName: "Parameters",
          fields: [
            {
              name: "flightCarrier",
              type: "text",
              placeholder: "Flight Carrier",
            },
            {
              name: "includeFlightCarrier",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "destination",
              type: "text",
              placeholder: "Destination",
            },
            {
              name: "includeDestination",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "issuingCarrier",
              type: "text",
              placeholder: "Issuing Carrier",
            },
            {
              name: "includeIssuingCarrier",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "countryDestination",
              type: "text",
              placeholder: "Country Destination",
            },
            {
              name: "includeCountryDestination",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "airlineCode",
              type: "text",
              placeholder: "Airline Code",
            },
            {
              name: "includeAirlineCode",
              type: "radio",
              placeholder: "Include Airline Code",
              options: excludeIncludeOptions,
            },
            {
              name: "flightNumber",
              type: "text",
              placeholder: "Flight Number",
              options: excludeIncludeOptions,
            },
            {
              name: "includeFlightNumber",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "productType",
              type: "text",
              placeholder: "Product Type",
            },
            {
              name: "includeProductType",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "agentCode",
              type: "text",
              placeholder: "Agent Code",
            },
            {
              name: "includeAgentCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "splHandlingCode",
              type: "text",
              placeholder: "Special Handling Code",
            },
            {
              name: "inlcudeSplHandlingCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "centralAgentCode",
              type: "text",
              placeholder: "Central Agent Code",
            },
            {
              name: "includeCentralAgentCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "equipmentType",
              type: "text",
              placeholder: "Equipment Type",
            },
            {
              name: "includeEquipmentType",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "shipperCode",
              type: "text",
              placeholder: "Shipper Code",
            },
            {
              name: "includeShipperCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "origin",
              type: "text",
              placeholder: "Origin",
            },
            {
              name: "includeOrigin",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "iataCommCode",
              type: "text",
              placeholder: "IATA Comm Code",
            },
            {
              name: "includeIataCommCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "countrySource",
              type: "text",
              placeholder: "Country Source",
              options: excludeIncludeOptions,
            },
            {
              name: "includeCountrySource",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "handler",
              type: "text",
              placeholder: "Handler",
            },
            {
              name: "includeHandler",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "monday",
              label: "Mon",
              type: "checkbox",
            },
            {
              name: "tuesday",
              label: "Tue",
              type: "checkbox",
            },
            {
              name: "wednesday",
              label: "Wed",
              type: "checkbox",
            },
            {
              name: "thursday",
              label: "Thu",
              type: "checkbox",
            },
            {
              name: "friday",
              label: "Fri",
              type: "checkbox",
            },
            {
              name: "saturday",
              label: "Sat",
              type: "checkbox",
            },
            {
              name: "sunday",
              label: "Sun",
              type: "checkbox",
            },
            {
              name: "includeDays",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "transitStation",
              type: "text",
              placeholder: "Transit Station",
            },
            {
              name: "includeTransitStation",
              type: "radio",
              options: excludeIncludeOptions,
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
