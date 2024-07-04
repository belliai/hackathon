"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"
import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate"

export default function ConfigLineNewPage() {
  const form = useForm()

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

  const sectionedFormFileds: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "configurationCode",
          label: "Configuration Code",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      sectionName: " ",
      fields: [
        {
          name: "description",
          label: "Description",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          orientation: "horizontal",
        },
        {
          name: "endDate",
          label: "End Date",
          type: "date",
          orientation: "horizontal",
        },
        {
          name: "originLevel",
          label: "Origin Level",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "origin",
          label: "Origin",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "destinationLevel",
          label: "Destination Level",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "destination",
          label: "Destination",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
    {
      sectionName: " ",
      fields: [
        {
          name: "parameter",
          label: "Parameter",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "format",
          label: "Format",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "dateFormat",
          label: "Date Format",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "roundOffToNext",
          label: "Round Off To Next",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "allowedDecimalPlaces",
          label: "Allowed Decimal Places",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "remarks",
          label: "Remarks",
          type: "text",
          orientation: "horizontal",
        },
      ],
    },
    // The "Parameters" section is just a dummy, the referenced page doesn't show this section for me but I'm sure its suppose to be there
    {
      sectionName: "Parameters",
      fields: [
        {
          name: "flightCarrier",
          type: "text",
          label: "Flight Carrier",
          orientation: "horizontal",
        },
        {
          name: "includeFlightCarrier",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "destination",
          type: "text",
          label: "Destination",
          orientation: "horizontal",
        },
        {
          name: "includeDestination",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "issuingCarrier",
          type: "text",
          label: "Issuing Carrier",
          orientation: "horizontal",
        },
        {
          name: "includeIssuingCarrier",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "countryDestination",
          type: "text",
          label: "Country Destination",
          orientation: "horizontal",
        },
        {
          name: "includeCountryDestination",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "airlineCode",
          type: "text",
          label: "Airline Code",
          orientation: "horizontal",
        },
        {
          name: "includeAirlineCode",
          type: "radio",
          orientation: "horizontal",
          options: excludeIncludeOptions,
        },
        {
          name: "flightNumber",
          type: "text",
          label: "Flight Number",
          orientation: "horizontal",
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
          label: "Product Type",
          orientation: "horizontal",
        },
        {
          name: "includeProductType",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "agentCode",
          type: "text",
          label: "Agent Code",
          orientation: "horizontal",
        },
        {
          name: "includeAgentCode",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "splHandlingCode",
          type: "text",
          label: "Special Handling Code",
          orientation: "horizontal",
        },
        {
          name: "inlcudeSplHandlingCode",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "centralAgentCode",
          type: "text",
          label: "Central Agent Code",
          orientation: "horizontal",
        },
        {
          name: "includeCentralAgentCode",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "equipmentType",
          type: "text",
          label: "Equipment Type",
          orientation: "horizontal",
        },
        {
          name: "includeEquipmentType",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "shipperCode",
          type: "text",
          label: "Shipper Code",
          orientation: "horizontal",
        },
        {
          name: "includeShipperCode",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "origin",
          type: "text",
          label: "Origin",
          orientation: "horizontal",
        },
        {
          name: "includeOrigin",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "iataCommCode",
          type: "text",
          label: "IATA Comm Code",
          orientation: "horizontal",
        },
        {
          name: "includeIataCommCode",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "countrySource",
          type: "text",
          label: "Country Source",
          orientation: "horizontal",
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
          label: "Handler",
          orientation: "horizontal",
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
          label: "Transit Station",
          orientation: "horizontal",
        },
        {
          name: "includeTransitStation",
          type: "radio",
          options: excludeIncludeOptions,
        },
      ],
    },
  ]

  return (
    <CreateFormPageTemplate
      hookForm={form}
      heading="Format Configuration"
      className="max-h-none"
      sectionedFormFields={sectionedFormFileds}
      customDialogContent={
        <Button variant="button-primary" className="mt-8">
          Save
        </Button>
      }
    />
  )
}
