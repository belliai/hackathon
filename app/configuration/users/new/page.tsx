"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TFormTextField } from "@/components/form/FormTextField"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"
import CreateFormTemplate from "@/app/k360/organize/masters/components/CreateFormTemplate"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"

export default function ConfigurationUsersNewPage() {
  const formFields: TFormTextField[] = [
    {
      name: "loginId",
      placeholder: "Login ID",
      type: "text",
      required: true,
    },
    {
      name: "userName",
      placeholder: "User Name",
      type: "text",
      required: true,
    },
    {
      name: "emailId",
      placeholder: "Email ID",
      type: "text",
      required: true,
    },
    {
      name: "mobileNo",
      placeholder: "Mobile No.",
      type: "text",
      required: true,
    },
    {
      name: "password",
      placeholder: "Enter Password",
      type: "password",
      required: true,
    },
    {
      name: "companyType",
      type: "select",
      placeholder: "Select Company Type",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "companyName",
      placeholder: "Company Name",
      type: "text",
    },
    {
      name: "role",
      placeholder: "Role",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      required: true,
    },
    {
      name: "baseStation",
      placeholder: "Base Station",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      required: true,
    },
    {
      name: "baseCarrier",
      placeholder: "Base Carrier",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "stationAccess",
      placeholder: "Station Access",
      type: "text",
    },
    {
      name: "agentCode",
      placeholder: "Agent Code",
      type: "text",
    },
    {
      name: "allowedCarriers",
      placeholder: "Allowed Carriers",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "entity",
      type: "select",
      placeholder: "Select Entity",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "status",
      placeholder: "Select Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "agentType",
      placeholder: "Select Agent Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "accesss",
      placeholder: "Access",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "allStations",
      label: "All Stations",
      type: "checkbox",
    },
    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },
    {
      name: "lock",
      label: "Lock",
      type: "checkbox",
    },
    {
      name: "adUser",
      label: "AD User",
      type: "checkbox",
    },
  ]

  const form = useForm()

  return (
    <PageContainer className="flex flex-col gap-4">
      <PageHeader title="User Creation" />
      <Separator />
      <CreateFormTemplate
        hookForm={form}
        formFields={formFields}
        className="max-h-none"
      />
      <div className="flex gap-2">
        <Button className="bg-button-primary text-white hover:bg-button-primary/80">
          Save
        </Button>
        <Button
          variant="outline"
          className="border-button-primary text-button-primary hover:border-button-primary/80 hover:text-button-primary"
        >
          Cancel
        </Button>
      </div>
    </PageContainer>
  )
}
