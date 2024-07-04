"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { TFormTextField } from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"

export default function PartnerNewPage() {
  const formFields: TFormTextField[] = [
    {
      name: "partnerName",
      label: "Partner Name",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "legalName",
      label: "Legal Name",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "partnerPrefix",
      label: "Partner Prefix",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "designatorCode",
      label: "Designator Code",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "validFrom",
      label: "Valid From",
      orientation: "horizontal",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "validTo",
      label: "Valid To",
      orientation: "horizontal",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "currencyOfListing",
      label: "Currency of Listing",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "currencyOfBilling",
      label: "Currency of Billing",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "country",
      label: "Country",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "city",
      label: "City",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "tolerance",
      label: "Tolerance (%)",
      orientation: "horizontal",
      type: "number",
    },
    {
      name: "airlineLanguage",
      label: "Airline Language",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "acceptMoreLessPcs",
      label: "Accept More/Less Pcs",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "includeOtherCharges",
      label: "Include Other Charges",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "autoCustomsMsg",
      label: "Auto Customs Msg",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "partnerLocationId",
      label: "Partner Location ID",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "partnerAccountingCode",
      label: "Partner Accounting Code",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "companyPresident",
      label: "Company President",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "companyCFO",
      label: "Company CFO",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "companyRegistrationId",
      label: "Company Registration ID",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "digitalSignature",
      label: "Digital Signature",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "suspend",
      label: "Suspend",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "isScheduled",
      label: "Is Scheduled",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "companyCode",
      label: "Company Code",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "taxVatRegId",
      label: "Tax/VAT Reg ID",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "additionalTaxVatRegId",
      label: "Additional Tax/VAT Registration ID",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "settlementMethod",
      label: "Settlement Method",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "address",
      label: "Address",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "postalCode",
      label: "Postal Code",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "billingOn",
      label: "Billing On",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "autoGenerateInvoice",
      label: "Auto Generate Invoice",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "billType",
      label: "Bill Type",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "sis",
      label: "SIS",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "sitaId",
      label: "Sita ID",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "emailId",
      label: "Email ID",
      orientation: "horizontal",
      type: "email",
    },
    {
      name: "paymentTerm",
      label: "Payment Term",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "invoiceEntity",
      label: "Invoice Entity",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
  ]

  const form = useForm()

  return (
    <CreateFormPageTemplate
      heading="Partner Master"
      formFields={formFields}
      hookForm={form}
      className="max-h-none"
      customDialogContent={
        <div className="mt-8 flex gap-2">
          <Button variant="button-primary">Save</Button>
          <Button variant="button-primary">Clear</Button>
        </div>
      }
    />
  )
}
