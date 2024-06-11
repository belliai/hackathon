"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TFormTextField } from "@/components/form/FormTextField";
import { useFieldArray, useForm } from "react-hook-form";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { DUMMY_SELECT_OPTIONS } from "@/app/organize/masters/components/dummySelectOptions";
import { Button } from "@/components/ui/button";

export default function MasterRateLinePage() {
  const rateLineForm = useForm({
    defaultValues: {
      rateBases: [
        {
          type: "",
          weight: 0,
          charge: 0,
          cost: 0,
        },
      ],
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

  const ralateBases = useFieldArray<any>({
    control: rateLineForm.control,
    name: "rateBases",
  });

  const uldBases = useFieldArray<any>({
    control: rateLineForm.control,
    name: "uldBases",
  });

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

  return (
    <CreateFormPageTemplate
      heading="Rate Line"
      hookForm={rateLineForm}
      sectionedFormFields={[
        {
          fields: [
            {
              name: "rateCardIata",
              label: "Rate Card IATA",
              orientation: "horizontal",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "a2aD2d",
              label: "A2A/D2D *",
              orientation: "horizontal",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "airport",
              label: "Airport",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "originLevel",
              label: "Origin Level *",
              orientation: "horizontal",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "origin",
              label: "Origin *",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "destinationLevel",
              label: "Destination Level *",
              orientation: "horizontal",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "destination",
              label: "Destination *",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "currency",
              label: "Currency *",
              orientation: "horizontal",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "weightBreak",
              label: "Weight Break",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "ratingBasis",
              label: "Rating Basis *",
              orientation: "horizontal",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "validFrom",
              label: "Valid From *",
              orientation: "horizontal",
              type: "date",
              hideTooltip: true,
            },
            {
              name: "validTo",
              label: "Valid To *",
              orientation: "horizontal",
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
              label: "Status *",
              orientation: "horizontal",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
            },
            {
              name: "contrRef",
              label: "Contr Ref",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "rateType",
              label: "Rate Type",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "uom",
              label: "UOM",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "agentComm",
              label: "Agent Comm. (%)",
              orientation: "horizontal",
              type: "number",
            },
            {
              name: "maxDiscount",
              label: "Max Discount (%)",
              orientation: "horizontal",
              type: "number",
            },
            {
              name: "heavyApplicable",
              label: "Heavy Applicable",
              type: "checkbox",
            },
            {
              name: "uldRate",
              label: "ULD Rate",
              orientation: "horizontal",
              type: "number",
            },
            {
              name: "allInRate",
              label: "All-In Rate",
              orientation: "horizontal",
              type: "number",
            },
            {
              name: "tactRate",
              label: "TACT Rate",
              orientation: "horizontal",
              type: "number",
            },
            {
              name: "isPrime",
              label: "Is Prime",
              type: "checkbox",
            },
            {
              name: "remarks",
              label: "Remarks",
              orientation: "horizontal",
              type: "text",
            },
          ],
        },
        {
          sectionName: "Rate Base",
          fieldArray: {
            fieldArray: ralateBases,
            fieldArrayName: "rateBases",
            fields: [
              {
                name: "type",
                label: "Type *",
                orientation: "horizontal",
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
          },
        },
        {
          sectionName: " ",
          fieldArray: {
            fieldArray: uldBases,
            fieldArrayName: "uldBases",
            fields: [
              {
                name: "uldType",
                placeholder: "ULD Type *",
                type: "select",
                options: DUMMY_SELECT_OPTIONS,
              },
              {
                name: "type",
                placeholder: "Type",
                type: "number",
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
          },
        },

        {
          sectionName: "Parameter",
          fields: [
            {
              name: "flightCarrier",
              label: "Flight Carrier",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeFlightCarrier",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "shipperCode",
              label: "Shipper Code",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeShipperCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "flightCarrier",
              label: "Flight Carrier",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeFlightCarrier",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "shipperCode",
              label: "Shipper Code",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeShipperCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "issuingCarrier",
              label: "Issuing Carrier",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeIssuingCarrier",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "iataCommCode",
              label: "IATA Comm. Code",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeIataCommCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "flightNumber",
              label: "Flight Number",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeFlightNumber",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "productType",
              label: "Product Type",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeProductType",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "transitStation",
              label: "Transit Station",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeTransitStation",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "splHandlingCode",
              label: "SPL Handling Code",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeSplHandlingCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "originStation",
              label: "Origin Station",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeOriginStation",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "equipmentType",
              label: "Equipment Type",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeEquipmentType",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "destinationStation",
              label: "Destination Station",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeDestinationStation",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "from",
              label: "From",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeFrom",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "to",
              label: "To",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeTo",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "agentCode",
              label: "Agent Code",
              orientation: "horizontal",
              type: "text",
            },
            {
              name: "includeAgentCode",
              type: "radio",
              options: excludeIncludeOptions,
            },
            {
              name: "prorationPercentage",
              label: "Proration %",
              orientation: "horizontal",
              type: "number",
            },
            {
              name: "spaMarkupPercentage",
              label: "SPA Markup %",
              orientation: "horizontal",
              type: "number",
            },
            {
              name: "centralAgentCode",
              label: "Central Agent Code",
              orientation: "horizontal",
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
              label: "Vendor Code",
              orientation: "horizontal",
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
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col md:flex-row gap-2 mt-8">
          <Button variant="button-primary">Add Another</Button>
          <Button variant="button-primary">Save</Button>
          <Button variant="button-primary">Cancel</Button>
          <Button variant="button-secondary">Impact Analysis</Button>
        </div>
      }
    />
  );
}
