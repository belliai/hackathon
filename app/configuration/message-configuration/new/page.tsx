"use client";

import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function MessageConfigurationNewPage() {
  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "partnerType",
          label: "Partner Type",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "partnerCode",
          label: "Partner Code",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "messageType",
          label: "Message Type",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
    {
      sectionName: "Configuration",
      fields: [
        {
          name: "origin",
          type: "text",
          label: "Origin",
          orientation: "horizontal",
        },
        {
          name: "destination",
          type: "text",
          label: "Destination",
          orientation: "horizontal",
        },
        {
          name: "transitDestination",
          type: "text",
          label: "Transit Destination",
          orientation: "horizontal",
        },
        {
          name: "flightNo",
          type: "text",
          label: "Flight No",
          orientation: "horizontal",
        },
        {
          name: "messageCommType",
          label: "Message Communication Type",
          orientation: "horizontal",
          type: "select",
        },
        {
          name: "autoGenerate",
          type: "checkbox",
          label: "Auto Generate",
        },
        {
          name: "messageStartWith",
          type: "text",
          label: "Message Start With",
          orientation: "horizontal",
        },
        {
          name: "messageEndWith",
          type: "text",
          label: "Message End With",
          orientation: "horizontal",
        },
        {
          name: "agentCode",
          type: "text",
          label: "Agent Code",
          orientation: "horizontal",
        },
        {
          name: "roles",
          type: "select",
          label: "Roles",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "sendBefore",
          type: "time",
          label: "Send Before",
          orientation: "horizontal",
        },

        {
          name: "emailId",
          type: "text",
          label: "Email ID",
          orientation: "horizontal",
        },
        {
          name: "shc",
          type: "text",
          label: "SHC",
          orientation: "horizontal",
        },
      ],
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Message Configuration"
      sectionedFormFields={sectionedFormFields}
      hookForm={form}
      className="max-h-none"
      customDialogContent={
        <div className="flex gap-2 mt-8">
          <Button variant="button-primary">Save</Button>
          <Button variant="button-primary">Clear</Button>
        </div>
      }
    />
  );
}
