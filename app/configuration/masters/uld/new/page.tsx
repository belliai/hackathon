"use client";

import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function MasterNewUldPage() {
  const formFields: TFormTextField[] = [
    {
      name: "uldNo",
      label: "ULD#",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "isThirdParty",
      label: "Is Third Party",
      type: "checkbox",
    },
    {
      name: "uldManufacturer",
      label: "ULD Manufacturer",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "updatedOn",
      label: "Updated On",
      orientation: "horizontal",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "uldPurchaseCost",
      label: "ULD Purchase Cost",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "currency",
      label: "Currency",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldLocationType",
      label: "ULD Location Type",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldLocation",
      label: "ULD Location",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "uldLocationSource",
      label: "ULD Location Source",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "isReceived",
      label: "Is Received",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "dimensionL",
      label: "Dimension (L)",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "dimensionB",
      label: "Dimension (B)",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "dimensionH",
      label: "Dimension (H)",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "cubicCM",
      label: "Cubic CM",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldStatus",
      label: "ULD Status",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldUseStatus",
      label: "ULD Use Status",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "maxGrossWeight",
      label: "Max Gross Weight",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "dollyWeight",
      label: "Dolly Weight",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "tareWeight",
      label: "Tare Weight",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "tareWeightunit",
      label: "Tare Weight Unit",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldEconomicalRepairPoint",
      label: "ULD Economical Repair Point",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "certification",
      label: "Certification",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "classRating",
      label: "Class Rating",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "remarks",
      label: "Remarks",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "isActive",
      label: "Is Active",
      type: "checkbox",
    },
  ];

  const hookForm = useForm();

  return (
    <CreateFormPageTemplate
      heading="ULD Details"
      className="max-h-none"
      formFields={formFields}
      hookForm={hookForm}
      customDialogContent={
        <div className="flex gap-2 mt-4">
          <Button variant="button-primary">Save</Button>
          <Button variant="button-primary">Clear</Button>
        </div>
      }
    />
  );
}
