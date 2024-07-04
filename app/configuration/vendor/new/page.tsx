"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { TFormTextField } from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import FilterActions from "@/components/page-template/FilterActions"
import { DUMMY_SELECT_OPTIONS_STATUS } from "@/app/k360/organize/masters/components/dummySelectOptions"

export default function VendorNewPage() {
  const vendorFormFields: TFormTextField[] = [
    {
      name: "vendor_code",
      placeholder: "Vendor Code",
      type: "text",
      required: true,
      label: "Vendor Code",
      orientation: "horizontal",
    },
    {
      name: "vendor_name",
      placeholder: "Vendor Name",
      type: "text",
      required: true,
      label: "Vendor Name",
      orientation: "horizontal",
    },
    {
      name: "valid_from",
      label: "Valid From",
      type: "date",
      required: true,
      orientation: "horizontal",
    },
    {
      name: "valid_to",
      label: "Valid To",
      type: "date",
      required: true,
      orientation: "horizontal",
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
      required: true,
      label: "Status",
      orientation: "horizontal",
    },
    {
      name: "credit_account_no",
      placeholder: "Credit Account No.",
      type: "text",
      label: "Credit Account No.",
      orientation: "horizontal",
    },
    {
      name: "address_1",
      placeholder: "Address 1",
      type: "text",
      required: true,
      label: "Address 1",
      orientation: "horizontal",
    },
    {
      name: "address_2",
      placeholder: "Address 2",
      type: "text",
      label: "Address 2",
      orientation: "horizontal",
    },
    {
      name: "city",
      placeholder: "City",
      type: "text",
      required: true,
      label: "City",
      orientation: "horizontal",
    },
    {
      name: "country",
      placeholder: "Country",
      type: "text",
      required: true,
      label: "Country",
      orientation: "horizontal",
    },
    {
      name: "state",
      placeholder: "State",
      type: "text",
      label: "State",
      orientation: "horizontal",
    },
    {
      name: "pincode",
      placeholder: "Pincode",
      type: "text",
      label: "Pincode",
      orientation: "horizontal",
    },
    {
      name: "mobile_no",
      placeholder: "Mobile No.",
      type: "text",
      label: "Mobile No.",
      orientation: "horizontal",
    },
    {
      name: "phone_no",
      placeholder: "Phone No.",
      type: "text",
      required: true,
      label: "Phone No.",
      orientation: "horizontal",
    },
    {
      name: "fax",
      placeholder: "Fax",
      type: "text",
      label: "Fax",
      orientation: "horizontal",
    },
    {
      name: "iata_account_no",
      placeholder: "IATA Account No.",
      type: "text",
      label: "IATA Account No.",
      orientation: "horizontal",
    },
    {
      name: "tin",
      placeholder: "TIN",
      type: "text",
      label: "TIN",
      orientation: "horizontal",
    },
    {
      name: "contact_person",
      placeholder: "Contact Person",
      type: "text",
      label: "Contact Person",
      orientation: "horizontal",
    },
    {
      name: "email",
      placeholder: "Email",
      type: "text",
      label: "Email",
      orientation: "horizontal",
    },
    {
      name: "billing_address_same",
      placeholder: "Billing Address Same as Mailing Address",
      type: "checkbox",
      label: "Billing Address Same as Mailing Address",
      orientation: "horizontal",
    },
    {
      name: "billing_address_1",
      placeholder: "Billing Address 1",
      type: "text",
      label: "Billing Address 1",
      orientation: "horizontal",
    },
    {
      name: "billing_address_2",
      placeholder: "Billing Address 2",
      type: "text",
      label: "Billing Address 2",
      orientation: "horizontal",
    },
    {
      name: "billing_city",
      placeholder: "Billing City",
      type: "text",
      label: "Billing City",
      orientation: "horizontal",
    },
    {
      name: "billing_state",
      placeholder: "Billing State",
      type: "text",
      label: "Billing State",
      orientation: "horizontal",
    },
    {
      name: "billing_country",
      placeholder: "Billing Country",
      type: "text",
      label: "Billing Country",
      orientation: "horizontal",
    },
    {
      name: "billing_pincode",
      placeholder: "Billing Pincode",
      type: "text",
      label: "Billing Pincode",
      orientation: "horizontal",
    },
    {
      name: "billing_contact_person",
      placeholder: "Billing Contact Person",
      type: "text",
      label: "Billing Contact Person",
      orientation: "horizontal",
    },
    {
      name: "billing_phone_no",
      placeholder: "Billing Phone No.",
      type: "text",
      label: "Billing Phone No.",
      orientation: "horizontal",
    },
    {
      name: "remarks",
      placeholder: "Remarks",
      type: "text",
      label: "Remarks",
      orientation: "horizontal",
    },
    {
      name: "remark",
      placeholder: "Remark",
      type: "text",
      required: true,
      label: "Remark",
      orientation: "horizontal",
    },
  ]

  const form = useForm()

  return (
    <CreateFormPageTemplate
      formFields={vendorFormFields}
      hookForm={form}
      heading="Vendor Master"
      customDialogContent={
        <Button variant="button-primary" className="mt-8">
          Save
        </Button>
      }
    />
  )
}
