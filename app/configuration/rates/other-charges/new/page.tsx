"use client";

import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";

export default function OtherChargesNewPage() {
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

  const form = useForm({
    defaultValues: {
      uldBases: [
        {
          uldType: "",
          type: 0,
          weight: 0,
          charge: 0,
          cost: 0,
        },
      ],
    },
  });

  const uldBases = useFieldArray<any>({
    control: form.control,
    name: "uldBases",
  });

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "ocCode",
          type: "select",
          label: "OC Code",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "chargeName",
          type: "text",
          label: "Charge Name",
          orientation: "horizontal",
        },
        {
          name: "chargeDesc",
          type: "text",
          label: "Charge Description",
          orientation: "horizontal",
        },
      ],
    },
    {
      sectionName: " ",
      fields: [
        {
          name: "charge",
          label: "Charge",
          type: "number",
          orientation: "horizontal",
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
          name: "currency",
          label: "Currency",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "level",
          type: "select",
          label: "Level",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "location",
          type: "text",
          label: "Location",
          orientation: "horizontal",
        },
        {
          name: "paymentType",
          type: "select",
          label: "Payment Type",
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
          name: "uom",
          type: "select",
          label: "UOM",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "status",
          type: "select",
          label: "Status",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "glAccountCode",
          type: "select",
          label: "GL Account Code",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "partOf",
          type: "select",
          label: "Part Of",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "circuitryType",
          label: "Circuitry Type",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "status",
          label: "Is Active",
          type: "checkbox",
        },
        {
          name: "miscCharges",
          label: "Misc Charges",
          type: "checkbox",
        },
        {
          name: "manualEdit",
          label: "Manual Edit",
          type: "checkbox",
        },
      ],
    },
    {
      sectionName: " ",
      fields: [
        {
          name: "chargeHeadBasis",
          label: "Charge Head Basis",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "minimum",
          type: "text",
          label: "Minimum",
          orientation: "horizontal",
        },
        {
          name: "charge",
          label: "Charge",
          type: "number",
          orientation: "horizontal",
        },
        {
          name: "maximum",
          type: "text",
          label: "Maximum",
          orientation: "horizontal",
        },
        {
          name: "appliedOn",
          label: "Applied On",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "baseRate",
          label: "Base Rate",
          type: "number",
          orientation: "horizontal",
        },
        {
          name: "chargedAt",
          label: "Charged At",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "viaStation",
          label: "Via Station",
          type: "select",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
    {
      sectionName: " ",
      fieldArray: {
        fieldArray: uldBases,
        fieldArrayName: "uldBases",
        fields: [
          {
            name: "uldType",
            label: "ULD Type *",
            orientation: "horizontal",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "type",
            label: "Type",
            orientation: "horizontal",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "weight",
            label: "Weight",
            orientation: "horizontal",
            type: "number",
          },
          {
            name: "charge",
            label: "Charge/Rate",
            orientation: "horizontal",
            type: "number",
          },
        ],
      },
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

  return (
    <CreateFormPageTemplate
      heading="Other Charges"
      sectionedFormFields={sectionedFormFields}
      hookForm={form}
      className="max-h-none"
      customDialogContent={
        <div className="flex gap-2 mt-8">
          <Button variant="button-primary">Save</Button>
          <Button variant="button-primary">Cancel</Button>
        </div>
      }
    />
  );
}
