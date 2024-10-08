"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"
import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate"

export default function RolesNewPage() {
  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "roleName",
          label: "Role Name",
          type: "text",
        },
        {
          name: "dashboard",
          label: "Dashboard",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "awbConfirmation",
          label: "AWB Confirmation Up To (%)",
          type: "number",
        },
      ],
    },
    {
      sectionName: "",
      fields: [
        {
          name: "expandSales",
          type: "checkbox",
          label: "Expand - Sales",
        },
        {
          name: "expandPlanning",
          type: "checkbox",
          label: "Expand - Planning",
        },
        {
          name: "expandBooking",
          type: "checkbox",
          label: "Expand - Booking",
        },
        {
          name: "expandOperations",
          type: "checkbox",
          label: "Expand - Operations",
        },
        {
          name: "expandULD",
          type: "checkbox",
          label: "Expand - ULD",
        },
        {
          name: "expandTrackAudit",
          type: "checkbox",
          label: "Expand - Track & Audit",
        },
        {
          name: "expandAccounting",
          type: "checkbox",
          label: "Expand - Accounting",
        },
        {
          name: "expandReports",
          type: "checkbox",
          label: "Expand - Reports",
        },
        {
          name: "expandMaintenance",
          type: "checkbox",
          label: "Expand - Maintenance",
        },
        {
          name: "expandConfiguration",
          type: "checkbox",
          label: "Expand - Configuration",
        },
      ],
    },
  ]

  const form = useForm()

  return (
    <CreateFormPageTemplate
      heading="New Role"
      sectionedFormFields={sectionedFormFields}
      hookForm={form}
      className="max-h-none pb-4"
      customDialogContent={
        <div className="mt-8 flex gap-2">
          <Button className="bg-button-primary text-white hover:bg-button-primary/80">
            Save
          </Button>
          <Button
            variant="outline"
            className="border-button-primary text-button-primary hover:bg-button-primary/40 hover:text-button-primary/80"
          >
            Cancel
          </Button>
        </div>
      }
    />
  )
}
