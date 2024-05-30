"use client";

import { TFormTextField } from "@/components/form/FormTextField";
import MastersPageTemplate, {
  SectionedFormFields,
} from "../masters/components/MastersPageTemplate";
import { Search } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../masters/components/StatusBadge";
import { actionColumn, selectColumn } from "../masters/components/columnItem";
import { DUMMY_SELECT_OPTIONS } from "../masters/components/dummySelectOptions";

export default function MastersPage() {
  const filterFields: TFormTextField[] = [
    {
      name: "consigneeCode",
      placeholder: "Consignee Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "consigneeName",
      placeholder: "Consignee Name",
      type: "text",
      endIcon: <Search />,
    },
  ];

  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "consigneeCode",
      header: "Consignee Code",
    },
    {
      accessorKey: "consigneeName",
      header: "Consignee Name",
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
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status}
          severity={row.original.status === "Active" ? "default" : "error"}
        />
      ),
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
      consigneeCode: "C001",
      consigneeName: "John Doe",
      city: "New York",
      country: "USA",
      status: "Active",
      validFrom: "01-01-2023",
      validTo: "31-12-2023",
    },
    {
      consigneeCode: "C002",
      consigneeName: "Jane Smith",
      city: "Los Angeles",
      country: "USA",
      status: "Inactive",
      validFrom: "15-02-2023",
      validTo: "14-02-2024",
    },
    {
      consigneeCode: "C003",
      consigneeName: "Robert Brown",
      city: "Chicago",
      country: "USA",
      status: "Active",
      validFrom: "10-03-2023",
      validTo: "09-03-2024",
    },
    {
      consigneeCode: "C004",
      consigneeName: "Emily White",
      city: "Houston",
      country: "USA",
      status: "Inactive",
      validFrom: "05-04-2023",
      validTo: "04-04-2024",
    },
    {
      consigneeCode: "C005",
      consigneeName: "Michael Johnson",
      city: "Phoenix",
      country: "USA",
      status: "Active",
      validFrom: "20-05-2023",
      validTo: "19-05-2024",
    },
    {
      consigneeCode: "C006",
      consigneeName: "Jessica Davis",
      city: "Philadelphia",
      country: "USA",
      status: "Active",
      validFrom: "01-06-2023",
      validTo: "31-05-2024",
    },
    {
      consigneeCode: "C007",
      consigneeName: "Daniel Garcia",
      city: "San Antonio",
      country: "USA",
      status: "Inactive",
      validFrom: "15-07-2023",
      validTo: "14-07-2024",
    },
    {
      consigneeCode: "C008",
      consigneeName: "Laura Martinez",
      city: "San Diego",
      country: "USA",
      status: "Active",
      validFrom: "10-08-2023",
      validTo: "09-08-2024",
    },
    {
      consigneeCode: "C009",
      consigneeName: "David Wilson",
      city: "Dallas",
      country: "USA",
      status: "Inactive",
      validFrom: "05-09-2023",
      validTo: "04-09-2024",
    },
    {
      consigneeCode: "C010",
      consigneeName: "Sarah Lee",
      city: "San Jose",
      country: "USA",
      status: "Active",
      validFrom: "20-10-2023",
      validTo: "19-10-2024",
    },
  ];

  const filterForm = useForm();
  const form = useForm({
    defaultValues: {
      credits: [],
      registrationNumbers: [],
    },
  });

  const fieldArray = useFieldArray<any>({
    name: "credits",
    control: form.control,
  });

  const fieldArray2 = useFieldArray<any>({
    name: "registrationNumbers",
    control: form.control,
  });

  console.log(form.watch());

  const sectionedFormFields: SectionedFormFields[] = [
    {
      sectionName: "General Information",
      fields: [
        {
          name: "consigneeCode",
          type: "text",
          placeholder: "Consignee Code",
        },
        {
          name: "consigneeName",
          type: "text",
          placeholder: "Consignee Name",
        },
        {
          name: "validFrom",
          type: "date",
          placeholder: "Valid From",
        },
        {
          name: "validTo",
          type: "date",
          placeholder: "Valid To",
        },
        {
          name: "station",
          type: "text",
          placeholder: "Station",
        },
        {
          name: "address",
          type: "text",
          placeholder: "Address",
        },
        {
          name: "participationType",
          type: "select",
          placeholder: "Participation Type",
        },
        {
          name: "city",
          type: "text",
          placeholder: "City",
        },
        {
          name: "state",
          type: "select",
          placeholder: "State",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "country",
          type: "select",
          placeholder: "Country",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "zipCode",
          type: "text",
          placeholder: "Zip Code",
        },
        {
          name: "mobilePhone",
          type: "text",
          placeholder: "Mobile Phone",
        },
        {
          name: "phoneNo",
          type: "text",
          placeholder: "Phone No",
        },
        {
          name: "email",
          type: "text",
          placeholder: "Email",
        },
        {
          name: "tin",
          type: "text",
          placeholder: "TIN",
        },
        {
          name: "enable",
          type: "checkbox",
          label: "Enable",
        },
        {
          name: "tds",
          type: "text",
          placeholder: "TDS",
        },
        {
          name: "remarks",
          type: "text",
          placeholder: "Remarks",
        },
      ],
    },
    {
      sectionName: "Credit",
      fieldArray: {
        fieldArrayName: "credits",
        fieldArray: fieldArray,
        fields: [
          {
            name: "transactionType",
            placeholder: "Transaction Type",
            type: "text",
          },
          {
            name: "validFrom",
            placeholder: "Valid From *",
            type: "date",
            hideTooltip: true,
          },
          {
            name: "validTo",
            placeholder: "Valid To *",
            type: "date",
            hideTooltip: true,
          },
          {
            name: "bankGuaranteeNumber",
            placeholder: "Bank Guarantee Number",
            type: "text",
          },
          {
            name: "guaranteeAmount",
            placeholder: "Guarantee Amount",
            type: "number",
          },
          {
            name: "thresholdLimitPercentage",
            placeholder: "Threshold Limit(%)",
            type: "number",
          },
          {
            name: "thresholdLimitDays",
            placeholder: "Threshold Limit(Days)",
            type: "number",
          },
          {
            name: "orNumber",
            placeholder: "OR Number",
            type: "text",
          },
          {
            name: "updatedBy",
            placeholder: "Updated by",
            type: "text",
          },
          {
            name: "updatedOn",
            placeholder: "Updated On",
            type: "date",
            hideTooltip: true,
          },
          {
            name: "remarks",
            placeholder: "Remarks",
            type: "textarea",
          },
        ],
      },
    },
    {
      sectionName: "Registration Numbers",
      fieldArray: {
        fieldArray: fieldArray2,
        fieldArrayName: "registrationNumbers",
        fields: [
          {
            name: "country",
            placeholder: "Country",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "state",
            placeholder: "State",
            type: "select",
            options: DUMMY_SELECT_OPTIONS,
          },
          {
            name: "address",
            placeholder: "Address",
            type: "text",
          },
          {
            name: "taxRegNo",
            placeholder: "TAX Reg No.",
            type: "text",
          },
          {
            name: "panNumber",
            placeholder: "PAN Number",
            type: "text",
          },
          {
            name: "sapCustomerCode",
            placeholder: "SAP Customer Code",
            type: "text",
          },
          {
            name: "pincode",
            placeholder: "Pincode",
            type: "text",
          },
          {
            name: "isDefault",
            label: "Default",
            type: "checkbox",
          },
          {
            name: "action",
            placeholder: "Action",
            type: "text",
          },
        ],
      },
    },
  ];

  return (
    <MastersPageTemplate
      heading="Consignee Master"
      buttonText="Create Consignee"
      columns={columns}
      data={data}
      filterFormFields={filterFields}
      filterHookForm={filterForm}
      sectionedFormFields={sectionedFormFields}
      sectionsType="tabs"
      hookForm={form}
    />
  );
}
