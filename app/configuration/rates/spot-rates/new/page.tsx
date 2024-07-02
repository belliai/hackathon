"use client";

import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";

export default function SpotRateNewPage() {
  const form = useForm({
    defaultValues: {
      types: [],
      uldTypes: [],
    },
  });
  const fieldArray = useFieldArray<any>({
    control: form.control,
    name: "types",
  });

  const fieldArray2 = useFieldArray<any>({
    control: form.control,
    name: "uldTypes",
  });

  const sectionFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "prefix",
          label: "Prefix",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "awbNo",
          label: "AWB No",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Shipment Details",
      fields: [
        {
          name: "origin",
          label: "Origin",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "destination",
          label: "Destination",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "commodity",
          label: "Commodity",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "commodityDescription",
          label: "Commodity Description",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "productType",
          label: "Product Type",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "shc",
          label: "SHC",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "shippingAgent",
          label: "Shipping Agent",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "shippingAgentName",
          label: "Shipping Agent Name",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "shipper",
          label: "Shipper",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "consignee",
          label: "Consignee",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "flightNo",
          label: "Flight No",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "flightDate",
          type: "date",
          label: "Flight Date",
          orientation: "horizontal",
        },
        {
          name: "routeDetails",
          type: "text",
          label: "Route Details",
          orientation: "horizontal",
        },
        {
          name: "pieces",
          type: "text",
          label: "Pieces",
          orientation: "horizontal",
        },
        {
          name: "grossWeight",
          type: "text",
          label: "Gross Weight",
          orientation: "horizontal",
        },
        {
          name: "chargedWeight",
          type: "text",
          label: "Charged Weight",
          orientation: "horizontal",
        },
      ],
    },
    {
      sectionName: "Spot Rate Details",
      fields: [
        {
          name: "spotCategory",
          type: "select",
          label: "Spot Category",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "weightCategory",
          type: "select",
          label: "Weight Category",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "allIn",
          type: "checkbox",
          label: "All In",
        },
        {
          name: "currency",
          type: "select",
          label: "Currency",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "validFrom",
          type: "date",
          label: "Valid From",
          orientation: "horizontal",
        },
        {
          name: "validTo",
          type: "date",
          label: "Valid To",
          orientation: "horizontal",
        },
        {
          name: "thresholdLimit",
          label: "Threshold Limit",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "commissionable",
          type: "radio",
          label: "Commisionable",
          orientation: "horizontal",
          options: [
            {
              value: "commisionable",
              label: "Commisionable",
            },
            {
              value: "nonCommisionable",
              label: "Non Commisionable",
            },
          ],
        },
      ],
    },

    {
      fieldArray: {
        fieldArray: fieldArray,
        fieldArrayName: "types",
        fields: [
          {
            name: "type",
            placeholder: "Type",
            type: "select",
          },
          {
            name: "weightCount",
            placeholder: "Weight/Count",
            type: "text",
          },
          {
            name: "chargeRate",
            type: "text",
            placeholder: "Charge Rate",
          },
          {
            name: "cost",
            placeholder: "Cost",
            type: "text",
          },
        ],
      },
    },
    {
      fieldArray: {
        fieldArray: fieldArray2,
        fieldArrayName: "uldTypes",
        fields: [
          {
            name: "uldType",
            placeholder: "ULD Type",
            type: "select",
          },
          {
            name: "type",
            placeholder: "Type",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "weigth",
            placeholder: "Weight",
            type: "text",
          },
          {
            name: "chargeRate",
            type: "text",
            placeholder: "Charge Rate",
          },
          {
            name: "cost",
            placeholder: "Cost",
            type: "text",
          },
        ],
      },
    },
    {
      sectionName: "Requester Details",
      fields: [
        {
          name: "requestedBy",
          label: "Requested By",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "requestedOn",
          type: "date",
          label: "Requested On",
          orientation: "horizontal",
        },
        {
          name: "station",
          type: "text",
          label: "Station",
          orientation: "horizontal",
        },
        {
          name: "reason",
          type: "text",
          label: "Reason",
          orientation: "horizontal",
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
      heading="Spot Rate"
      hookForm={form}
      sectionedFormFields={sectionFormFields}
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
