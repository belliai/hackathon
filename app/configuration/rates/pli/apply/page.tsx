"use client";

import { SectionedFormFields } from "@/app/organize/masters/components/MastersPageTemplate";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";

export default function PliApplyPage() {
  const sectionedFormFields: SectionedFormFields[] = [
    {
      sectionName: "PLI Details",
      fields: [
        {
          name: "agentCode",
          type: "text",
          label: "Agent Code",
          orientation: "horizontal",
        },
        {
          name: "dateFrom",
          type: "date",
          label: "Date From",
          orientation: "horizontal",
        },
        {
          name: "dateTo",
          type: "date",
          label: "Date To",
          orientation: "horizontal",
        },
      ],
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading=" "
      sectionedFormFields={sectionedFormFields}
      hookForm={form}
      customDialogContent={
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex gap-2">
            <Button variant="button-primary">List</Button>
            <Button variant="button-primary">Recheck AWB&apos;s</Button>
            <Button variant="button-primary">Clear</Button>
          </div>
          <Separator />
          <div className="flex gap-2 mt-8">
            <Button variant="button-primary">Apply PLI</Button>
            <Button variant="button-primary">Export PLI</Button>
          </div>
        </div>
      }
    />
  );
}
