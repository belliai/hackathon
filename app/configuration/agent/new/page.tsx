"use client";

import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function AgentNewPage() {
  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "agentCode",
          label: "Agent Code",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "agentName",
          label: "Agent Name",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      sectionName: "General Information",
      fields: [
        {
          name: "customerCode",
          label: "Customer Code *",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "iataAgentCode",
          label: "IATA Agent Code",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "shipperType",
          label: "Shipper Type *",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "businessType",
          label: "Business Type *",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "industryFocus",
          label: "Industry Focus *",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "opsEmail",
          label: "Ops Email",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "accountsEmail",
          label: "Account's Email *",
          orientation: "horizontal",
          type: "email",
        },
        {
          name: "salesEmail",
          label: "Sale's Email",
          orientation: "horizontal",
          type: "email",
        },
        {
          name: "agentCodes",
          label: "SAP Agent Codes",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "customerType",
          label: "Agent Type",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
    {
      sectionName: "Shipping Details",
      fields: [
        {
          name: "contactPerson",
          label: "Contact Person",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "mobileNumber",
          label: "Mobile Number",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "address1",
          label: "Address1 *",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "address2",
          label: "Address2",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "city",
          label: "City *",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "country",
          label: "Country *",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "phoneNo",
          label: "Phone No.",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Billing Details",
      fields: [
        {
          name: "billingAddress1",
          label: "Billing Address 1",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "billingAddress2",
          label: "Billing Address 2",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "billingCity",
          label: "Billing City",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "billingState",
          label: "Billing State",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "billingCountry",
          label: "Billing Country",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "billingZip",
          label: "Billing Zip",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "contactPerson",
          label: "Contact Person",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "billingPhoneNo",
          label: "Billing Phone No",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "poNumber",
          label: "PO Number",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "baseVolRateCMS",
          label: "BaseVolRate(CMS) *",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "grossWeight",
          label: "Gross weight",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Account Details",
      fields: [
        {
          name: "validFrom",
          label: "Valid From *",
          type: "date",
          hideTooltip: true,
        },
        {
          name: "validTo",
          label: "Valid To *",
          type: "date",
          hideTooltip: true,
        },
        {
          name: "participationType",
          label: "Participation Type *",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "stockController",
          label: "Stock Controller *",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "stockControllerCode",
          label: "Stock Controller Code*",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "billTo",
          label: "Bill To *",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "billingControllerCode",
          label: "Billing Controller Code",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "glCode",
          label: "GL Code",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "billType",
          label: "Bill Type *",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "creditController",
          label: "Credit Controller *",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "creditControllerCode",
          label: "Credit Controller Code *",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "commission",
          label: "Commission(%)",
          orientation: "horizontal",
          type: "number",
        },
        {
          name: "incentivePerKg",
          label: "Incentive Per Kg",
          orientation: "horizontal",
          type: "number",
        },
        {
          name: "currencyCode",
          label: "Currency Code *",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "agentType",
          label: "Agent Type *",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "dealsPliAppliedTo",
          label: "Deals PLI applied To",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "invoiceDueDays",
          label: "Invoice due days *",
          orientation: "horizontal",
          type: "number",
        },
        {
          name: "pp",
          label: "PP",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "defaultPayMode",
          label: "Default Pay Mode",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "isFoc",
          label: "Is FOC",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "validateCredit",
          label: "Validate Credit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "isActive",
          label: "IsActive *",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "ratelinePreference",
          label: "Rateline Preference *",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "isPOMail",
          label: "IsPOMail",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "isBonded",
          label: "IsBonded",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "autoAllocateStock",
          label: "Auto Allocate Stock",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "autoGenerateInvoice",
          label: "Auto Generate Invoice",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "participateInCass",
          label: "Participate in CASS",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "billingOnGrossWt",
          label: "Billing on Gross.wt",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "isCharter",
          label: "IsCharter",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "isWalkIn",
          label: "IsWalkIn",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "srNumberRequired",
          label: "Sr Number Required",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "selectAllowPaymode",
          label: "Select allow paymode",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "allowedPaymentMode",
          label: "Allowed Payment Mode",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      sectionName: "XML Notification",
      fields: [
        {
          name: "xmlNotification",
          label: "XML Notification",
          type: "checkbox",
        },
        {
          name: "sftpClientCredential",
          label: "SFTP Client Credential",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "status",
          label: "Status",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS_STATUS,
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
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Agent Master"
      sectionedFormFields={sectionedFormFields}
      hookForm={form}
      className="max-h-none"
      customDialogContent={
        <div className="flex gap-2 mt-8">
          <Button variant="button-primary">Save</Button>
          <Button variant="button-primary">Cancel</Button>
        </div>
      }
    />
  );
}
