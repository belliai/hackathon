"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../masters/components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../masters/components/dummySelectOptions"
import MastersPageTemplate from "../../masters/components/MastersPageTemplate"
import StatusBadge from "../../masters/components/StatusBadge"

export default function MasterOcdcPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "ocId",
      header: "OC ID",
    },
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "ocCode",
      header: "OC Code",
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
      accessorKey: "type",
      header: "Type",
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
      ocId: 1,
      origin: "Origin 1",
      ocCode: "OC-001",
      chargeName: "Charge 1",
      chargedAt: "2022-01-01",
      startDate: "2022-01-01",
      endDate: "2022-01-31",
      chargeType: "Type 1",
      status: "Active",
      type: "Type 1",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
    },
    {
      ocId: 2,
      origin: "Origin 2",
      ocCode: "OC-002",
      chargeName: "Charge 2",
      chargedAt: "2022-02-01",
      startDate: "2022-02-01",
      endDate: "2022-02-28",
      chargeType: "Type 2",
      status: "Inactive",
      type: "Type 2",
      createdAt: "2022-02-01",
      updatedAt: "2022-02-01",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "originLevel",
      placeholder: "Origin Level",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "origin",
      placeholder: "Origin",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "destinationLevel",
      type: "select",
      placeholder: "Destination Level",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "rateId",
      type: "text",
      placeholder: "Rate ID",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "chargeName",
      type: "text",
      placeholder: "Charge Name",
    },
    {
      name: "ocId",
      type: "text",
      placeholder: "OC ID",
    },
    {
      name: "fromDate",
      type: "date",
      placeholder: "From",
    },
    {
      name: "toDate",
      type: "date",
      placeholder: "To",
    },
    {
      name: "expireFromDate",
      type: "date",
      placeholder: "Expire From",
    },
    {
      name: "expireToDate",
      type: "date",
      placeholder: "Expire To",
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
      heading="OCDC Master"
      buttonText="Create OCDC"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      hookForm={form}
      sectionedFormFields={[
        {
          sectionName: "OCDC Details",
          fields: [
            {
              name: "ocCode",
              placeholder: "OC Code",
              type: "select",
              endIcon: <Search />,
            },
            {
              name: "chargeName",
              placeholder: "Charge Name",
              type: "text",
            },
            {
              name: "chargeDescription",
              placeholder: "Charge Description",
              type: "text",
            },
            {
              name: "chargeNormal",
              placeholder: "Charge Normal",
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
              name: "currency",
              placeholder: "Currency",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "paymentType",
              type: "select",
              placeholder: "Payment Type",
              options: DUMMY_SELECT_OPTIONS,
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
              name: "status",
              type: "select",
              placeholder: "Status",
              options: DUMMY_SELECT_OPTIONS_STATUS,
            },
            {
              name: "glAccountCode",
              type: "text",
              placeholder: "GL Account Code",
            },
            {
              name: "circuitryType",
              type: "select",
              placeholder: "Circuitry Type",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "pincodeType",
              type: "select",
              placeholder: "Pincode Type",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "allin",
              type: "select",
              placeholder: "All In",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "a2dd2d",
              type: "select",
              placeholder: "A2D/D2D",
              options: DUMMY_SELECT_OPTIONS,
            },
          ],
        },
        {
          sectionName: "Rate Base",
          fields: [
            {
              name: "chargeHeadBasis",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "charge",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "minPrice",
              type: "text",
              placeholder: "Min Price",
            },
            {
              name: "maxPrice",
              type: "text",
              placeholder: "Max Price",
            },
            {
              name: "rate",
              type: "text",
              placeholder: "Rate",
            },
            {
              name: "cost",
              type: "text",
              placeholder: "Cost",
            },
            {
              name: "appliedOn",
              type: "select",
              placeholder: "Applied On",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "baseRate",
              placeholder: "Base Rate",
              type: "text",
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
            {
              name: "vendorCode",
              type: "text",
              placeholder: "Vendor Code",
            },
          ],
        },
      ]}
    />
  )
}
