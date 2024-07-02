"use client";

import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function RateCardNewPage() {
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

  const secionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "rateCardName",
          label: "Rate Card Name",
          type: "text",
          orientation: "horizontal",
        },
        {
          name: "rateCardType",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
          label: "Rate Card Type",
          orientation: "horizontal",
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
          name: "status",
          type: "select",
          options: DUMMY_SELECT_OPTIONS_STATUS,
          orientation: "horizontal",
          label: "Status",
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
          name: "handlingCode",
          type: "text",
          label: "Handling Code",
          orientation: "horizontal",
        },
        {
          name: "includeHandlingCode",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "iataCommCode",
          label: "IATA Commission Code",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "includeIataCommCode",
          type: "radio",
          options: excludeIncludeOptions,
          orientation: "horizontal",
        },
        {
          name: "agenCode",
          label: "Agent Code",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "includeAgent",
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
      ],
    },
  ];

  return (
    <CreateFormPageTemplate
      heading="Rate Card"
      hookForm={form}
      className="max-h-none"
      sectionedFormFields={secionedFormFields}
      customDialogContent={
        <div className="flex gap-2 mt-8">
          <Button variant="button-primary">Save</Button>
          <Button variant="button-primary">Cancel</Button>
        </div>
      }
    />
  );
}
