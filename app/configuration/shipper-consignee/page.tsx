"use client";

import CreateFormTemplate from "@/app/k360/organize/masters/components/CreateFormTemplate";
import { SectionedFormFields } from "@/app/k360/organize/masters/components/MastersPageTemplate";
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function ShipperConsignee() {
  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "accCode",
          label: "Acc Code",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "accName",
          label: "Acc Name",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      fields: [
        {
          name: "accCode",
          type: "text",
          label: "Acc Code",
          orientation: "horizontal",
        },
        {
          name: "accName",
          type: "text",
          label: "Acc Name",
          orientation: "horizontal",
        },
        {
          name: "validFrom",
          type: "date",
          label: "Valid From",
          orientation: "horizontal",
        },
        {
          name: "validTo",
          type: "date",
          label: "Valid To",
          orientation: "horizontal",
        },
        {
          name: "address1",
          type: "text",
          label: "Address 1",
          orientation: "horizontal",
        },
        {
          name: "address2",
          type: "text",
          label: "Address 2",
          orientation: "horizontal",
        },
        {
          name: "city",
          type: "text",
          label: "City",
          orientation: "horizontal",
        },
        {
          name: "state",
          type: "text",
          label: "State",
          orientation: "horizontal",
        },
        {
          name: "country",
          type: "select",
          label: "Country",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "zipCode",
          type: "text",
          label: "Zip Code",
          orientation: "horizontal",
        },
        {
          name: "mobileNo",
          type: "text",
          label: "Mobile No.",
          orientation: "horizontal",
        },
        {
          name: "fax",
          type: "text",
          label: "Fax",
          orientation: "horizontal",
        },
        {
          name: "phoneNo",
          type: "text",
          label: "Phone No",
          orientation: "horizontal",
        },
        {
          name: "email",
          type: "email",
          label: "Email",
          orientation: "horizontal",
        },
        {
          name: "tin",
          type: "text",
          label: "TIN",
          orientation: "horizontal",
        },
        {
          name: "iataAccNo",
          type: "text",
          label: "IATA Acc No",
          orientation: "horizontal",
        },
        {
          name: "allowedCarriers",
          type: "select",
          label: "Allowed Carriers",
          orientation: "horizontal",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "billingAddressSameAsMailingAddress",
          type: "checkbox",
          label: "Billing Address Same as Mailing Address",
          orientation: "horizontal",
        },
        {
          name: "billingCity",
          type: "text",
          label: "Billing City",
          orientation: "horizontal",
        },
        {
          name: "billingZipCode",
          type: "text",
          label: "Billing Zip Code",
          orientation: "horizontal",
        },
        {
          name: "hoursOfOperationFrom",
          type: "time",
          label: "Hours of Operation From",
          orientation: "horizontal",
        },
        {
          name: "hoursOfOperationTo",
          type: "time",
          label: "Hours of Operation To",
          orientation: "horizontal",
        },
        {
          name: "eoriCode",
          type: "text",
          label: "EORI Code",
          orientation: "horizontal",
        },
        {
          name: "billingAddress1",
          type: "text",
          label: "Billing Address 1",
          orientation: "horizontal",
        },
        {
          name: "billingState",
          type: "text",
          label: "Billing State",
          orientation: "horizontal",
        },
        {
          name: "billingContactPerson",
          type: "text",
          label: "Billing Contact Person",
          orientation: "horizontal",
        },
        {
          name: "taxExempt",
          type: "checkbox",
          label: "TAX Exempt",
          orientation: "horizontal",
        },
        {
          name: "creditAccNo",
          type: "text",
          label: "Credit Acc No",
          orientation: "horizontal",
        },
        {
          name: "station",
          type: "text",
          label: "Station",
          orientation: "horizontal",
        },
        {
          name: "participationType",
          type: "text",
          label: "Participation Type",
          orientation: "horizontal",
        },
        {
          name: "agentCode",
          type: "text",
          label: "Agent Code",
          orientation: "horizontal",
        },
        {
          name: "agentName",
          type: "text",
          label: "Agent Name",
          orientation: "horizontal",
        },
        {
          name: "customerCode",
          type: "text",
          label: "Customer Code",
          orientation: "horizontal",
        },
        {
          name: "enable",
          type: "checkbox",
          label: "Enable",
          orientation: "horizontal",
        },
        {
          name: "contactPerson",
          type: "text",
          label: "Contact Person",
          orientation: "horizontal",
        },
        {
          name: "billingAddress2",
          type: "text",
          label: "Billing Address 2",
          orientation: "horizontal",
        },
        {
          name: "billingCountry",
          type: "text",
          label: "Billing Country",
          orientation: "horizontal",
        },
        {
          name: "billingPhoneNo",
          type: "text",
          label: "Billing Phone No",
          orientation: "horizontal",
        },
        {
          name: "remarks",
          type: "textarea",
          label: "Remarks",
          orientation: "horizontal",
        },
      ],
    },
  ];

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "accountCode",
      header: "Account Code",
    },
    {
      accessorKey: "accountName",
      header: "Account Name",
    },
    {
      accessorKey: "address1",
      header: "Address 1",
    },
    {
      accessorKey: "address2",
      header: "Address 2",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "zip",
      header: "Zip",
    },
    {
      accessorKey: "phoneNo",
      header: "Phone No",
    },
    {
      accessorKey: "mobileNo",
      header: "Mobile No",
    },
    {
      accessorKey: "fax",
      header: "Fax",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "iataAccountNo",
      header: "IATA Account No",
    },
    {
      accessorKey: "participationType",
      header: "Participation Type",
    },
    {
      accessorKey: "creditAccountNo",
      header: "Credit Account No",
    },
    {
      accessorKey: "TIN",
      header: "TIN",
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
    },
    {
      accessorKey: "vatExemption",
      header: "VAT Exemption",
    },
    {
      accessorKey: "dba",
      header: "DBA",
    },
    {
      accessorKey: "isKnownValidUpto",
      header: "Is Known Shipper Valid Up to",
    },
    {
      accessorKey: "station",
      header: "Station",
    },
    actionColumn,
  ];

  const data = [
    {
      accountCode: "AC12345",
      accountName: "Tech Solutions Inc.",
      address1: "1234 Elm Street",
      address2: "Suite 567",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zip: "94103",
      phoneNo: "415-555-1234",
      mobileNo: "415-555-5678",
      fax: "415-555-8765",
      email: "contact@techsolutions.com",
      iataAccountNo: "IATA1234",
      participationType: "Full",
      creditAccountNo: "CA67890",
      TIN: "TIN123456",
      contactPerson: "John Doe",
      vatExemption: "Yes",
      dba: "Tech Sol",
      isKnownValidUpto: "2024-12-31",
      station: "SFO",
    },
    {
      accountCode: "AC67890",
      accountName: "Global Trading LLC",
      address1: "7890 Pine Avenue",
      address2: "Floor 2",
      city: "New York",
      state: "NY",
      country: "USA",
      zip: "10001",
      phoneNo: "212-555-6789",
      mobileNo: "212-555-9876",
      fax: "212-555-6543",
      email: "info@globaltrading.com",
      iataAccountNo: "IATA6789",
      participationType: "Partial",
      creditAccountNo: "CA54321",
      TIN: "TIN987654",
      contactPerson: "Jane Smith",
      vatExemption: "No",
      dba: "Global Trade",
      isKnownValidUpto: "2025-06-30",
      station: "JFK",
    },
    {
      accountCode: "AC34567",
      accountName: "Logistics Hub",
      address1: "4567 Oak Street",
      address2: "",
      city: "Chicago",
      state: "IL",
      country: "USA",
      zip: "60607",
      phoneNo: "312-555-3456",
      mobileNo: "312-555-7890",
      fax: "312-555-4321",
      email: "support@logisticshub.com",
      iataAccountNo: "IATA3456",
      participationType: "Associate",
      creditAccountNo: "CA12345",
      TIN: "TIN654321",
      contactPerson: "Emily Johnson",
      vatExemption: "Yes",
      dba: "LogiHub",
      isKnownValidUpto: "2026-03-15",
      station: "ORD",
    },
  ];

  [
    {
      accountCode: "AC12345",
      accountName: "Tech Solutions Inc.",
      address1: "1234 Elm Street",
      address2: "Suite 567",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zip: "94103",
      phoneNo: "415-555-1234",
      mobileNo: "415-555-5678",
      fax: "415-555-8765",
      email: "contact@techsolutions.com",
      iataAccountNo: "IATA1234",
      participationType: "Full",
      creditAccountNo: "CA67890",
      TIN: "TIN123456",
      contactPerson: "John Doe",
      vatExemption: "Yes",
      dba: "Tech Sol",
      isKnownValidUpto: "2024-12-31",
      station: "SFO",
    },
    {
      accountCode: "AC67890",
      accountName: "Global Trading LLC",
      address1: "7890 Pine Avenue",
      address2: "Floor 2",
      city: "New York",
      state: "NY",
      country: "USA",
      zip: "10001",
      phoneNo: "212-555-6789",
      mobileNo: "212-555-9876",
      fax: "212-555-6543",
      email: "info@globaltrading.com",
      iataAccountNo: "IATA6789",
      participationType: "Partial",
      creditAccountNo: "CA54321",
      TIN: "TIN987654",
      contactPerson: "Jane Smith",
      vatExemption: "No",
      dba: "Global Trade",
      isKnownValidUpto: "2025-06-30",
      station: "JFK",
    },
    {
      accountCode: "AC34567",
      accountName: "Logistics Hub",
      address1: "4567 Oak Street",
      address2: "",
      city: "Chicago",
      state: "IL",
      country: "USA",
      zip: "60607",
      phoneNo: "312-555-3456",
      mobileNo: "312-555-7890",
      fax: "312-555-4321",
      email: "support@logisticshub.com",
      iataAccountNo: "IATA3456",
      participationType: "Associate",
      creditAccountNo: "CA12345",
      TIN: "TIN654321",
      contactPerson: "Emily Johnson",
      vatExemption: "Yes",
      dba: "LogiHub",
      isKnownValidUpto: "2026-03-15",
      station: "ORD",
    },
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Shipper-Consignee Master"
      formFields={sectionedFormFields[0].fields}
      hookForm={form}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4 mt-8">
          <div className="max-w-96">
            <FilterActions />
          </div>
          <Separator />
          <DataTable columns={columns} data={data} />
          <CreateFormTemplate
            formFields={sectionedFormFields[1].fields}
            hookForm={form}
            className="max-h-none mt-8"
          />
          <div className="flex gap-2 mt-4">
            <Button variant="button-primary">Save</Button>
          </div>
        </div>
      }
    />
  );
}
