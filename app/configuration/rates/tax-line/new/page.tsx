"use client";

import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function TaxLineNewPage() {
  const excludeIncludeOptions = [
    {
      label: "Exclude",
      value: "exclude",
    },
    {
      label: "Include",
      value: "include",
    },
  ];

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "taxName",
          label: "Tax Name*",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "taxType",
          label: "Tax Type*",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "startDate",
          label: "Start Date*",
          orientation: "horizontal",
          type: "date",
          hideTooltip: true,
        },
        {
          name: "endDate",
          label: "End Date*",
          orientation: "horizontal",
          type: "date",
          hideTooltip: true,
        },
        {
          name: "currencyCode",
          label: "Currency Code*",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "level",
          label: "Level*",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "location",
          label: "Location*",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "originLevel",
          label: "Origin Level*",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "origin",
          label: "Origin*",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "destinationLevel",
          label: "Destination Level*",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "destination",
          label: "Destination*",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "glAccountCode",
          label: "GL Account Code",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "appliedAt",
          label: "Applied At",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "addInTotal",
          label: "Add in Total",
          orientation: "horizontal",
          type: "checkbox",
        },
        {
          name: "interline",
          label: "Interline",
          orientation: "horizontal",
          type: "checkbox",
        },
        {
          name: "taxPercentage",
          label: "Tax%*",
          orientation: "horizontal",
          type: "number",
        },
        {
          name: "status",
          label: "Status",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      sectionName: " ",
      fields: [
        {
          name: "minimumPrice",
          label: "Minimum Price",
          orientation: "horizontal",
          type: "number",
        },
        {
          name: "maximumPrice",
          label: "Maximum Price",
          orientation: "horizontal",
          type: "number",
        },
        {
          name: "appliedOn",
          label: "Applied On*",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
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
          name: "originState",
          type: "select",
          label: "Origin State",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "includeOriginState",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "countrySource",
          type: "text",
          label: "Country Source",
          orientation: "horizontal",
        },
        {
          name: "includeCountrySource",
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
    {
      sectionName: "Remarks",
      fields: [
        {
          name: "remarks",
          label: "Remarks",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Tax Line"
      hookForm={form}
      sectionedFormFields={sectionedFormFields}
      className="max-h-none"
      customDialogContent={
        <Button variant="button-primary" className="mt-4">
          Save
        </Button>
      }
    />
  );
}
