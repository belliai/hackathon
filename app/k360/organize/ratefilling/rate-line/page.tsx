"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useFieldArray, useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "../../masters/components/dummySelectOptions"
import MastersPageTemplate from "../../masters/components/MastersPageTemplate"

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
      name: "expireFromDate",
      type: "date",
      placeholder: "Expire From",
    },
    {
      name: "expireToDate",
      type: "date",
      placeholder: "Expire To",
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "rateType",
      placeholder: "Rate Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "agentCode",
      type: "text",
      placeholder: "Agent Code",
    },
    {
      name: "shipperCode",
      type: "select",
      placeholder: "Shipper Code",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "iataCommCode",
      placeholder: "IATA Comm Code",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "centralAgentCode",
      type: "select",
      placeholder: "Central Agent Code",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "productType",
      type: "select",
      placeholder: "Product Type",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "type",
      type: "select",
      placeholder: "Type",
      options: DUMMY_SELECT_OPTIONS,
    },
  ]

  const filterForm = useForm()
  const rateLineForm = useForm()

  const ralateBases = useFieldArray<any>({
    control: rateLineForm.control,
    name: "rateBases",
  })

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

  return (
    <MastersPageTemplate
      heading="Rate Line Master"
      buttonText="Create Rate Line"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      sectionsType="tabs"
      hookForm={rateLineForm}
      sectionedFormFields={[
        {
          sectionName: "General",
          fields: [
            {
              name: "rateCardIata",
              placeholder: "Rate Card IATA",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "a2aD2d",
              placeholder: "A2A/D2D *",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "airport",
              placeholder: "Airport",
              type: "text",
            },
            {
              name: "originLevel",
              placeholder: "Origin Level *",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "origin",
              placeholder: "Origin *",
              type: "text",
            },
            {
              name: "destinationLevel",
              placeholder: "Destination Level *",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "destination",
              placeholder: "Destination *",
              type: "text",
            },
            {
              name: "currency",
              placeholder: "Currency *",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "weightBreak",
              placeholder: "Weight Break",
              type: "text",
            },
            {
              name: "ratingBasis",
              placeholder: "Rating Basis *",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "validFrom",
              placeholder: "Valid From *",
              type: "date",
              hideTooltip: true,
            },
            {
              name: "validTo",
              placeholder: "Valid To *",
              type: "date",
              hideTooltip: true,
            },
            {
              name: "isActive",
              label: "Active",
              type: "checkbox",
            },
            {
              name: "status",
              placeholder: "Status *",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "contrRef",
              placeholder: "Contr Ref",
              type: "text",
            },
            {
              name: "rateType",
              placeholder: "Rate Type",
              type: "text",
            },
            {
              name: "uom",
              placeholder: "UOM",
              type: "text",
            },
            {
              name: "agentComm",
              placeholder: "Agent Comm. (%)",
              type: "number",
            },
            {
              name: "maxDiscount",
              placeholder: "Max Discount (%)",
              type: "number",
            },
            {
              name: "heavyApplicable",
              label: "Heavy Applicable",
              type: "checkbox",
            },
            {
              name: "uldRate",
              placeholder: "ULD Rate",
              type: "number",
            },
            {
              name: "allInRate",
              placeholder: "All-In Rate",
              type: "number",
            },
            {
              name: "tactRate",
              placeholder: "TACT Rate",
              type: "number",
            },
            {
              name: "isPrime",
              label: "Is Prime",
              type: "checkbox",
            },
            {
              name: "remarks",
              placeholder: "Remarks",
              type: "text",
            },
          ],
        },
        {
          sectionName: "Rate Base",
          fieldArray: {
            fieldArray: ralateBases,
            fields: [
              {
                name: "type",
                placeholder: "Type *",
                type: "select",
                options: DUMMY_SELECT_OPTIONS,
              },
              {
                name: "weight",
                placeholder: "Weight",
                type: "number",
              },
              {
                name: "charge",
                placeholder: "Charge/Rate",
                type: "number",
              },
              {
                name: "cost",
                placeholder: "Cost",
                type: "number",
              },
            ],
            fieldArrayName: "rateBases",
          },
        },
        {
          sectionName: "Parameter",
          fields: [
            {
              name: "flightCarrier",
              placeholder: "Flight Carrier",
              type: "text",
            },
            {
              name: "includeFlightCarrier",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "shipperCode",
              placeholder: "Shipper Code",
              type: "text",
            },
            {
              name: "includeShipperCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "flightCarrier",
              placeholder: "Flight Carrier",
              type: "text",
            },
            {
              name: "includeFlightCarrier",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "shipperCode",
              placeholder: "Shipper Code",
              type: "text",
            },
            {
              name: "includeShipperCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "issuingCarrier",
              placeholder: "Issuing Carrier",
              type: "text",
            },
            {
              name: "includeIssuingCarrier",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "iataCommCode",
              placeholder: "IATA Comm. Code",
              type: "text",
            },
            {
              name: "includeIataCommCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "flightNumber",
              placeholder: "Flight Number",
              type: "text",
            },
            {
              name: "includeFlightNumber",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "productType",
              placeholder: "Product Type",
              type: "text",
            },
            {
              name: "includeProductType",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "transitStation",
              placeholder: "Transit Station",
              type: "text",
            },
            {
              name: "includeTransitStation",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "splHandlingCode",
              placeholder: "SPL Handling Code",
              type: "text",
            },
            {
              name: "includeSplHandlingCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "originStation",
              placeholder: "Origin Station",
              type: "text",
            },
            {
              name: "includeOriginStation",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "equipmentType",
              placeholder: "Equipment Type",
              type: "text",
            },
            {
              name: "includeEquipmentType",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "destinationStation",
              placeholder: "Destination Station",
              type: "text",
            },
            {
              name: "includeDestinationStation",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "from",
              placeholder: "From",
              type: "text",
            },
            {
              name: "includeFrom",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "to",
              placeholder: "To",
              type: "text",
            },
            {
              name: "includeTo",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "agentCode",
              placeholder: "Agent Code",
              type: "text",
            },
            {
              name: "includeAgentCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "prorationPercentage",
              placeholder: "Proration %",
              type: "number",
            },
            {
              name: "spaMarkupPercentage",
              placeholder: "SPA Markup %",
              type: "number",
            },
            {
              name: "centralAgentCode",
              placeholder: "Central Agent Code",
              type: "text",
            },
            {
              name: "includeCentralAgentCode",
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
              name: "includeCentralAgentCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "vendorCode",
              placeholder: "Vendor Code",
              type: "text",
            },
            {
              name: "includeVendorCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
          ],
        },
      ]}
    />
  )
}
