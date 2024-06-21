"use client";

import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function VolExemptionNew() {
  const form = useForm();

  const formFields: TFormTextField[] = [
    {
      name: "exemptionName",
      label: "Exemption Name",
      type: "text",
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
      name: "active",
      label: "Active",
      type: "checkbox",
    },
  ];

  return (
    <CreateFormPageTemplate
      heading="Volumetric Exemption"
      hookForm={form}
      formFields={formFields}
      customDialogContent={
        <Button variant="button-primary" className="mt-8">
          Save
        </Button>
      }
    />
  );
}
