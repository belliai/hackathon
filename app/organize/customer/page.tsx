"use client";

import { Download, Search } from "lucide-react";
import MastersPageTemplate, {
  SectionedFormFields,
} from "../masters/components/MastersPageTemplate";
import { actionColumn, selectColumn } from "../masters/components/columnItem";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../masters/components/dummySelectOptions";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function MasterCustomerPage() {
  const columns = [
    selectColumn,
    {
      accessorKey: "customerCode",
      header: "Customer Code",
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
    },
    {
      accessorKey: "parentCode",
      header: "Parent Code",
    },
    {
      accessorKey: "a2aD2d",
      header: "A2A / D2D",
    },
    {
      accessorKey: "warehouseCode",
      header: "Warehouse Code",
    },
    {
      accessorKey: "airportCode",
      header: "Airport Code",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "validFrom",
      header: "Valid From",
    },
    {
      accessorKey: "validTo",
      header: "Valid To",
    },
    actionColumn,
  ];

  const data = [
    {
      customerCode: "CUST001",
      customerName: "Acme Corp",
      parentCode: "PC001",
      a2aD2d: "A2A",
      warehouseCode: "WH001",
      airportCode: "AP001",
      city: "New York",
      country: "USA",
      status: "Active",
      validFrom: "2023-01-01",
      validTo: "2024-01-01",
    },
    {
      customerCode: "CUST002",
      customerName: "Global Inc",
      parentCode: "PC002",
      a2aD2d: "D2D",
      warehouseCode: "WH002",
      airportCode: "AP002",
      city: "Los Angeles",
      country: "USA",
      status: "Inactive",
      validFrom: "2022-06-15",
      validTo: "2023-06-15",
    },
    {
      customerCode: "CUST003",
      customerName: "Tech Solutions",
      parentCode: "PC003",
      a2aD2d: "A2A",
      warehouseCode: "WH003",
      airportCode: "AP003",
      city: "San Francisco",
      country: "USA",
      status: "Active",
      validFrom: "2023-03-10",
      validTo: "2024-03-10",
    },
    {
      customerCode: "CUST004",
      customerName: "Innovate Ltd",
      parentCode: "PC004",
      a2aD2d: "D2D",
      warehouseCode: "WH004",
      airportCode: "AP004",
      city: "Chicago",
      country: "USA",
      status: "Inactive",
      validFrom: "2021-09-01",
      validTo: "2022-09-01",
    },
    {
      customerCode: "CUST005",
      customerName: "Logistics Plus",
      parentCode: "PC005",
      a2aD2d: "A2A",
      warehouseCode: "WH005",
      airportCode: "AP005",
      city: "Houston",
      country: "USA",
      status: "Active",
      validFrom: "2022-12-01",
      validTo: "2023-12-01",
    },
  ];

  const filterFormFields = [
    {
      name: "customerCode",
      placeholder: "Customer Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "customerName",
      placeholder: "Customer Name",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "airportCode",
      placeholder: "Airport Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "country",
      placeholder: "Country",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "warehouseCode",
      placeholder: "Warehouse Code",
      type: "text",
      endIcon: <Search />,
    },
  ];

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "customerCode",
          placeholder: "customer Code",
          type: "text",
        },
        {
          name: "customerName",
          placeholder: "Customer Name",
          type: "text",
        },
      ],
    },
    {
      sectionName: "General Information",
      fields: [
        {
          name: "customerCode",
          placeholder: "Customer Code *",
          type: "text",
        },
        {
          name: "customerName",
          placeholder: "Customer Name *",
          type: "text",
        },
        {
          name: "a2aD2d",
          placeholder: "A2A/D2D *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "iataAgentCode",
          placeholder: "IATA Agent Code",
          type: "text",
        },
        {
          name: "shipperType",
          placeholder: "Shipper Type *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "opsEmail",
          placeholder: "Ops Email",
          type: "text",
        },
        {
          name: "accountsEmail",
          placeholder: "Account's Email *",
          type: "email",
        },
        {
          name: "salesEmail",
          placeholder: "Sale's Email",
          type: "email",
        },
        {
          name: "sapCustomerCodes",
          placeholder: "SAP Customer Codes",
          type: "text",
        },
        {
          name: "customerType",
          placeholder: "Customer Type",
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
          placeholder: "Contact Person",
          type: "text",
        },
        {
          name: "mobileNumber",
          placeholder: "Mobile Number",
          type: "text",
        },
        {
          name: "address1",
          placeholder: "Address1 *",
          type: "text",
        },
        {
          name: "address2",
          placeholder: "Address2",
          type: "text",
        },
        {
          name: "city",
          placeholder: "City *",
          type: "text",
        },
        {
          name: "country",
          placeholder: "Country *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "phoneNo",
          placeholder: "Phone No.",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Billing Details",
      fields: [
        {
          name: "billingAddress1",
          placeholder: "Billing Address 1",
          type: "text",
        },
        {
          name: "billingAddress2",
          placeholder: "Billing Address 2",
          type: "text",
        },
        {
          name: "billingCity",
          placeholder: "Billing City",
          type: "text",
        },
        {
          name: "billingState",
          placeholder: "Billing State",
          type: "text",
        },
        {
          name: "billingCountry",
          placeholder: "Billing Country",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "billingZip",
          placeholder: "Billing Zip",
          type: "text",
        },
        {
          name: "contactPerson",
          placeholder: "Contact Person",
          type: "text",
        },
        {
          name: "billingPhoneNo",
          placeholder: "Billing Phone No",
          type: "text",
        },
        {
          name: "poNumber",
          placeholder: "PO Number",
          type: "text",
        },
        {
          name: "baseVolRateCMS",
          placeholder: "BaseVolRate(CMS) *",
          type: "text",
        },
        {
          name: "grossWeight",
          placeholder: "Gross weight",
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
          placeholder: "Participation Type *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "stockController",
          placeholder: "Stock Controller *",
          type: "text",
        },
        {
          name: "stockControllerCode",
          placeholder: "Stock Controller Code*",
          type: "text",
        },
        {
          name: "billTo",
          placeholder: "Bill To *",
          type: "text",
        },
        {
          name: "billingControllerCode",
          placeholder: "Billing Controller Code",
          type: "text",
        },
        {
          name: "glCode",
          placeholder: "GL Code",
          type: "text",
        },
        {
          name: "billType",
          placeholder: "Bill Type *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "creditController",
          placeholder: "Credit Controller *",
          type: "text",
        },
        {
          name: "creditControllerCode",
          placeholder: "Credit Controller Code *",
          type: "text",
        },
        {
          name: "commission",
          placeholder: "Commission(%)",
          type: "number",
        },
        {
          name: "incentivePerKg",
          placeholder: "Incentive Per Kg",
          type: "number",
        },
        {
          name: "currencyCode",
          placeholder: "Currency Code *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "agentType",
          placeholder: "Agent Type *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "dealsPliAppliedTo",
          placeholder: "Deals PLI applied To",
          type: "text",
        },
        {
          name: "invoiceDueDays",
          placeholder: "Invoice due days *",
          type: "number",
        },
        {
          name: "pp",
          placeholder: "PP",
          type: "text",
        },
        {
          name: "defaultPayMode",
          placeholder: "Default Pay Mode",
          type: "text",
        },
        {
          name: "isFoc",
          placeholder: "Is FOC",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "validateCredit",
          placeholder: "Validate Credit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "isActive",
          placeholder: "IsActive *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "ratelinePreference",
          placeholder: "Rateline Preference *",
          type: "text",
        },
        {
          name: "isPOMail",
          placeholder: "IsPOMail",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "isBonded",
          placeholder: "IsBonded",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "autoAllocateStock",
          placeholder: "Auto Allocate Stock",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "autoGenerateInvoice",
          placeholder: "Auto Generate Invoice",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "participateInCass",
          placeholder: "Participate in CASS",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "billingOnGrossWt",
          placeholder: "Billing on Gross.wt",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "isCharter",
          placeholder: "IsCharter",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "isWalkIn",
          placeholder: "IsWalkIn",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "srNumberRequired",
          placeholder: "Sr Number Required",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "selectAllowPaymode",
          placeholder: "Select allow paymode",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "allowedPaymentMode",
          placeholder: "Allowed Payment Mode",
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
          placeholder: "SFTP Client Credential",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "status",
          placeholder: "Status",
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
          placeholder: "Remarks",
          type: "text",
        },
      ],
    },
  ];

  const filterForm = useForm();
  const hookForm = useForm();

  return (
    <MastersPageTemplate
      heading="Customer Master"
      buttonText="Create Customer"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      hookForm={hookForm}
      sectionedFormFields={sectionedFormFields}
      pageActions={
        <>
          <Button className="gap-2 bg-button-primary text-white hover:bg-button-primary/80">
            <Download size={16}/>
            GSTIN
          </Button>
          <Button className="gap-2 bg-button-primary text-white hover:bg-button-primary/80">
            <Download size={16}/>
            Export
          </Button>
        </>
      }
    />
  );
}
