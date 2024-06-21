"use client";

import { SectionedFormFields } from "@/app/organize/masters/components/MastersPageTemplate";
import { DUMMY_SELECT_OPTIONS } from "@/app/organize/masters/components/dummySelectOptions";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function PliPage() {
  const form = useForm();

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
      sectionName: "PLI Details",
      fields: [
        {
          name: "pliName",
          type: "text",
          label: "PLI Name",
          orientation: "horizontal",
        },
        {
          name: "pliDescription",
          type: "text",
          label: "PLI Description",
          orientation: "horizontal",
        },
        {
          name: "applicableFrom",
          type: "date",
          label: "Applicable From",
          orientation: "horizontal",
        },
        {
          name: "applicableTo",
          type: "date",
          label: "Applicable To",
          orientation: "horizontal",
        },
        {
          name: "originLevel",
          type: "select",
          label: "Origin Level",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "origin",
          type: "select",
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
          type: "select",
          label: "Destination",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "shipmentType",
          type: "select",
          label: "Shipment Type",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "currency",
          type: "select",
          label: "Currency",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "pliType",
          type: "select",
          label: "PLI Type",
          orientation: "horizontal",
        },
        {
          name: "status",
          type: "select",
          label: "Status",
          orientation: "horizontal",
        },
        {
          name: "glAccountCode",
          type: "select",
          label: "GL Account Code",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "uom",
          type: "select",
          label: "UOM",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "qualifyingRevenue",
          type: "text",
          label: "Qualifying Revenue",
          orientation: "horizontal",
        },
        {
          name: "relatedPliId",
          type: "text",
          orientation: "horizontal",
          label: "Related PLI ID",
        },
      ],
    },
    {
      sectionName: "Applied On",
      fields: [
        {
          name: "rateType",
          label: "Rate Type",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "includeFlightType",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "fromDate",
          label: "From date",
          type: "date",
          orientation: "horizontal",
        },
        {
          name: "includeFromDate",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "toDate",
          label: "To date",
          type: "date",
          orientation: "horizontal",
        },
        {
          name: "includeToDate",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "flightNumber",
          label: "Flight Number",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "includeFlightNumber",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "origin",
          label: "Origin",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "includeOrigin",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "destination",
          label: "Destination",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "includeDestination",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "commCode",
          label: "Comm. Code",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "includeCommCode",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "splHandCode",
          label: "SPL Hand Code",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "includeSplHandCode",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "awbWeight",
          label: "AWB Weight",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "includeAwbWeight",
          type: "radio",
          options: excludeIncludeOptions,
        },
      ],
    },
    {
      sectionName: "Shipment Parameters",
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
          name: "source",
          type: "text",
          label: "Source",
          orientation: "horizontal",
        },
        {
          name: "includeSource",
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
          name: "depInterval",
          type: "text",
          label: "Dep Interval",
          orientation: "horizontal",
        },
        {
          name: "includeDepInterval",
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
          name: "consigneeCode",
          label: "Consignee Code",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "includeConsigneeCode",
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
          name: "splHandCode",
          label: "SPL Handling Code",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "includeSplHandCode",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "flightType",
          label: "Flight Type",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
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
        {
          name: "rateClass",
          label: "Rate Class",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "includeRateClass",
          type: "radio",
          options: excludeIncludeOptions,
        },
      ],
    },
  ];

  return (
    <CreateFormPageTemplate
      heading="Agent PLI"
      hookForm={form}
      sectionedFormFields={sectionedFormFields}
      className="max-h-none "
      customDialogContent={
        <div className="flex gap-2 mt-8">
          <Button variant="button-primary">Save</Button>
          <Button variant="button-primary">Clear</Button>
          <Button variant="button-primary">Add Another</Button>
        </div>
      }
    />
  );
}
