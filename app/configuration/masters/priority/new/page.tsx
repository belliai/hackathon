"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions"
import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate"

export default function NewPriorityPage() {
  const form = useForm()

  const excludeIncludeOptions = [
    {
      label: "Exclude",
      value: "exclude",
    },
    {
      label: "Include",
      value: "include",
    },
  ]

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "priorityConfiguration",
          label: "Priority Configuration",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      sectionName: " ",
      fields: [
        {
          name: "validFrom",
          label: "Valid From",
          type: "date",
          orientation: "horizontal",
        },
        {
          name: "validTo",
          label: "Valid To",
          type: "date",
          orientation: "horizontal",
        },
        {
          name: "origin",
          type: "select",
          label: "Origin",
          placeholder: "Select Origin",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "destination",
          type: "select",
          label: "destination",
          placeholder: "Select destination",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "priority",
          type: "select",
          label: "Priority",
          placeholder: "Select Priority",
          options: DUMMY_SELECT_OPTIONS,
          orientation: "horizontal",
        },
        {
          name: "remarks",
          label: "Remarks",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "active",
          type: "checkbox",
          label: "Active",
        },
        {
          name: "offloaded",
          label: "Offloaded",
          orientation: "horizontal",
          type: "checkbox",
        },
        {
          name: "offoadedCount",
          label: "Offloaded Count",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "postDwellTime",
          label: "Post Dwell Time",
          orientation: "horizontal",
          type: "checkbox",
        },
        {
          name: "dwellTimePeriod",
          label: "Dwell Time Period",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "transit",
          label: "Transit",
          orientation: "horizontal",
          type: "checkbox",
        },
      ],
    },
    {
      sectionName: "Parameters",
      fields: [
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
          name: "shipperName",
          type: "text",
          label: "Shipper Name",
          orientation: "horizontal",
        },
        {
          name: "includeShipperName",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "agent",
          label: "Agent",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "includeAgent",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "CommCode",
          type: "text",
          label: "Commo Code",
          orientation: "horizontal",
        },
        {
          name: "includeIataCommCode",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "shc",
          type: "text",
          label: "SHC",
          orientation: "horizontal",
        },
        {
          name: "includeShc",
          type: "radio",
          options: excludeIncludeOptions,
        },
        {
          name: "hasAllotment",
          type: "checkbox",
          label: "Has Allotment",
        },
        {
          name: "includeAllotment",
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
  ]

  return (
    <CreateFormPageTemplate
      heading="New Priority Configuration"
      hookForm={form}
      sectionedFormFields={sectionedFormFields}
      className="max-h-none"
      customDialogContent={
        <Button variant="button-primary" className="mt-4">
          Save
        </Button>
      }
    />
  )
}
