"use client";

import { SectionedFormFields } from "@/app/organize/masters/components/MastersPageTemplate";
import { DUMMY_SELECT_OPTIONS } from "@/app/organize/masters/components/dummySelectOptions";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function NewDealPage() {
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
      sectionName: "Deal Details",
      fields: [
        {
          name: "dealName",
          label: "Deal Name",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "dealDescription",
          label: "Deal Description",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "applicableFrom",
          label: "Applicable From",
          type: "date",
          orientation: "horizontal",
        },
        {
          name: "applicableTo",
          label: "Applicable To",
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
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "destination",
          label: "Destination",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "shipmentType",
          label: "Shipment Type",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "currency",
          label: "Currency",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "dealType",
          label: "Deal Type",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "glAccountCode",
          label: "GL Account Code",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "UOM",
          label: "UOM",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "isIncludeTds",
          label: "Is Include TDS",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "qualifiyingWeight",
          label: "Qualifying Weight",
          type: "number",
          orientation: "horizontal",
        },
        {
          name: "relatedDealId",
          orientation: "horizontal",
          label: "Related Deal Id",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Applied On",
      fields: [
        {
          name: "flightType",
          label: "Flight Type",
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
          name: "depInterval",
          label: "Dep Interval",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "includeDepInterval",
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
          name: "shipperCode",
          label: "Shipper Code",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "includeShipmentType",
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
          name: "includeFlightType",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "splHandCode",
          label: "Spl Handling Code",
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
          type: "select",
          label: "countrySource",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "includeCountySource",
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
          label: "Spl Handling Code",
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

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Agent Deals"
      sectionedFormFields={sectionedFormFields}
      hookForm={form}
      className="max-h-none"
      customDialogContent={
        <div className="flex gap-2 mt-4">
          <Button variant="button-primary">Save</Button>
          <Button variant="button-primary">Clear</Button>
          <Button variant="button-primary">Add Another</Button>
        </div>
      }
    />
  );
}
