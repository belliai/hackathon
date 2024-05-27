"use client";

import { ColumnDef } from "@tanstack/react-table";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { actionColumn, selectColumn } from "../../components/columnItem";
import { TFormTextField } from "@/components/form/FormTextField";
import { DUMMY_SELECT_OPTIONS } from "../../components/dummySelectOptions";
import { useForm } from "react-hook-form";

export default function MasterPartnerPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "partnerPrefix",
      header: "Partner Prefix",
    },
    {
      accessorKey: "partnerCode",
      header: "Partner Code",
    },
    {
      accessorKey: "partnerName",
      header: "Partner Name",
    },
    {
      accessorKey: "partnerType",
      header: "Partner Type",
    },
    {
      accessorKey: "sis",
      header: "SIS",
    },
    {
      accessorKey: "sitaId",
      header: "SITA ID",
    },
    {
      accessorKey: "emailId",
      header: "Email ID",
    },
    {
      accessorKey: "zoneId",
      header: "Zone ID",
    },
    {
      accessorKey: "billingCurrency",
      header: "Billing Currency",
    },
    {
      accessorKey: "listingCurrency",
      header: "Listing Currency",
    },
    {
      accessorKey: "settlementMethod",
      header: "Settlement Method",
    },
    {
      accessorKey: "reg",
      header: "Reg",
    },
    actionColumn,
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "partnerType",
      placeholder: "Partner Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "partnerPrefix",
      placeholder: "Partner Prefix",
      type: "text",
    },
    {
      name: "partnerName",
      placeholder: "Partner Name",
      type: "text",
    },
    {
      name: "partnerCode",
      placeholder: "Partner Code",
      type: "text",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "partnerName",
      placeholder: "Partner Name",
      type: "text",
    },
    {
      name: "legalName",
      placeholder: "Legal Name",
      type: "text",
    },
    {
      name: "partnerPrefix",
      placeholder: "Partner Prefix",
      type: "text",
    },
    {
      name: "designatorCode",
      placeholder: "Designator Code",
      type: "text",
    },
    {
      name: "validFrom",
      label: "Valid From",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "validTo",
      label: "Valid To",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "currencyOfListing",
      placeholder: "Currency of Listing",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "currencyOfBilling",
      placeholder: "Currency of Billing",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "country",
      placeholder: "Country",
      type: "text",
    },
    {
      name: "city",
      placeholder: "City",
      type: "text",
    },
    {
      name: "tolerance",
      placeholder: "Tolerance (%)",
      type: "number",
    },
    {
      name: "airlineLanguage",
      placeholder: "Airline Language",
      type: "text",
    },
    {
      name: "acceptMoreLessPcs",
      placeholder: "Accept More/Less Pcs",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "includeOtherCharges",
      placeholder: "Include Other Charges",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "autoCustomsMsg",
      placeholder: "Auto Customs Msg",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "partnerLocationId",
      placeholder: "Partner Location ID",
      type: "text",
    },
    {
      name: "partnerAccountingCode",
      placeholder: "Partner Accounting Code",
      type: "text",
    },
    {
      name: "companyPresident",
      placeholder: "Company President",
      type: "text",
    },
    {
      name: "companyCFO",
      placeholder: "Company CFO",
      type: "text",
    },
    {
      name: "companyRegistrationId",
      placeholder: "Company Registration ID",
      type: "text",
    },
    {
      name: "digitalSignature",
      placeholder: "Digital Signature",
      type: "text",
    },
    {
      name: "suspend",
      placeholder: "Suspend",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "isScheduled",
      placeholder: "Is Scheduled",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "companyCode",
      placeholder: "Company Code",
      type: "text",
    },
    {
      name: "taxVatRegId",
      placeholder: "Tax/VAT Reg ID",
      type: "text",
    },
    {
      name: "additionalTaxVatRegId",
      placeholder: "Additional Tax/VAT Registration ID",
      type: "text",
    },
    {
      name: "settlementMethod",
      placeholder: "Settlement Method",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "address",
      placeholder: "Address",
      type: "text",
    },
    {
      name: "postalCode",
      placeholder: "Postal Code",
      type: "text",
    },
    {
      name: "billingOn",
      placeholder: "Billing On",
      type: "text",
    },
    {
      name: "autoGenerateInvoice",
      placeholder: "Auto Generate Invoice",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "billType",
      placeholder: "Bill Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "sis",
      placeholder: "SIS",
      type: "text",
    },
    {
      name: "sitaId",
      placeholder: "Sita ID",
      type: "text",
    },
    {
      name: "emailId",
      placeholder: "Email ID",
      type: "email",
    },
  ];

  const filterForm = useForm();
  const partnerForm = useForm();

  const data = [
    {
      partnerPrefix: "AA",
      partnerCode: "001",
      partnerName: "Alpha Airlines",
      partnerType: "Airline",
      sis: "Yes",
      sitaId: "ALPHA123",
      emailId: "contact@alphaairlines.com",
      zoneId: "Z1",
      billingCurrency: "USD",
      listingCurrency: "USD",
      settlementMethod: "IATA Clearing House",
      reg: "Active",
    },
    {
      partnerPrefix: "BB",
      partnerCode: "002",
      partnerName: "Bravo Logistics",
      partnerType: "Freight Forwarder",
      sis: "No",
      sitaId: "BRAVO456",
      emailId: "info@bravologistics.com",
      zoneId: "Z2",
      billingCurrency: "EUR",
      listingCurrency: "EUR",
      settlementMethod: "Direct Billing",
      reg: "Inactive",
    },
    {
      partnerPrefix: "CC",
      partnerCode: "003",
      partnerName: "Charlie Cargo",
      partnerType: "Cargo Handler",
      sis: "Yes",
      sitaId: "CHARLIE789",
      emailId: "support@charliecargo.com",
      zoneId: "Z3",
      billingCurrency: "GBP",
      listingCurrency: "GBP",
      settlementMethod: "IATA Clearing House",
      reg: "Active",
    },
    {
      partnerPrefix: "DD",
      partnerCode: "004",
      partnerName: "Delta Delivery",
      partnerType: "Courier",
      sis: "No",
      sitaId: "DELTA012",
      emailId: "service@deltadelivery.com",
      zoneId: "Z4",
      billingCurrency: "JPY",
      listingCurrency: "JPY",
      settlementMethod: "Direct Billing",
      reg: "Inactive",
    },
    {
      partnerPrefix: "EE",
      partnerCode: "005",
      partnerName: "Echo Enterprises",
      partnerType: "Logistics",
      sis: "Yes",
      sitaId: "ECHO345",
      emailId: "echo@echoenterprises.com",
      zoneId: "Z5",
      billingCurrency: "AUD",
      listingCurrency: "AUD",
      settlementMethod: "IATA Clearing House",
      reg: "Active",
    },
  ];

  return (
    <MastersPageTemplate
      heading="Partner Master"
      buttonText="Create Partner"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      formFields={formFields}
      filterHookForm={filterForm}
      hookForm={partnerForm}
    />
  );
}
