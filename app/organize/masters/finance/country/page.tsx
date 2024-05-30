"use client";

import { ColumnDef } from "@tanstack/react-table";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import DataTableSelectHead from "@/components/data-table/DataTableSelectHead";
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { useForm } from "react-hook-form";
import { FormTextFieldProps } from "@/components/form/FormTextField";
import { Badge } from "@/components/ui/badge";

export default function CountryPage() {
  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => <DataTableSelectHead table={table} />,
      cell: ({ row }) => <DataTableSelectRow row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "country_code",
      header: "Country Code",
    },
    {
      accessorKey: "country_name",
      header: "Country Name",
    },
    {
      accessorKey: "currency_code",
      header: "Currency Code",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className="bg-green-700/80 text-white hover:bg-green-600">
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "iata_code",
      header: "IATA Code",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "post_code",
      header: "Post Code",
    },
    {
      accessorKey: "phone",
      header: "Telephone No",
    },
    {
      accessorKey: "fax",
      header: "Fax No",
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => <DataTableRowActions />,
    },
  ];

  const filterForm = useForm({
    defaultValues: {
      country_code: "",
      currency_code: "",
      period_start: "",
      period_end: "",
      country_name: "",
      status: "",
    },
  });

  const filterFormFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "country_code",
      type: "text",
      placeholder: "Country Code",
      label: "Country Code",
      hideTooltip: true,
    },
    {
      name: "currency_code",
      type: "text",
      placeholder: "Currency Code",
      label: "Currency Code",
      hideTooltip: true,
    },
    {
      name: "period_start",
      hideTooltip: true,
      type: "date",
      placeholder: "Period Start",
    },
    {
      name: "period_end",
      hideTooltip: true,
      type: "date",
      placeholder: "Period End",
    },
    {
      name: "country_name",
      type: "text",
      placeholder: "Country Name",
      label: "Country Name",
      hideTooltip: true,
    },
    {
      name: "status",
      type: "text",
      placeholder: "Status",
      label: "Status",
      hideTooltip: true,
    },
  ];

  const countryForm = useForm({
    defaultValues: {
      country_code: "",
      iata_code: "",
      country_name: "",
      currency_code: "",
      period_start: "",
      period_end: "",
      next_billing_run_date: "",
      status: "",
      cass: "",
      fax_number: "",
      telephone_number: "",
      address: "",
      postal_code: "",
      billing_frequency: "",
      billing_period: "",
      cass_billing_offset_day: "",
    },
  });

  const formFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "country_code",
      type: "text",
      placeholder: "Country Code *",
      label: "Country Code",
      required: true,
      hideTooltip: true,
    },
    {
      name: "iata_code",
      type: "text",
      placeholder: "IATA Code",
      label: "IATA Code",
      hideTooltip: true,
    },
    {
      name: "country_name",
      type: "text",
      placeholder: "Country Name *",
      label: "Country Name",
      required: true,
      hideTooltip: true,
    },
    {
      name: "currency_code",
      type: "select",
      placeholder: "Currency Code *",
      label: "Currency Code",
      options: [
        {
          label: "USD",
          value: "USD",
        },
        {
          label: "CAD",
          value: "CAD",
        },
      ],
      required: true,
      hideTooltip: true,
    },
    {
      name: "period_start",
      type: "date",
      placeholder: "Period Start",
      hideTooltip: true,
    },
    {
      name: "period_end",
      type: "date",
      placeholder: "Period End",
      hideTooltip: true,
    },
    {
      name: "next_billing_run_date",
      type: "date",
      placeholder: "Next Billing Run Date",
      label: "Next Billing Run Date",
      hideTooltip: true,
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status *",
      label: "Status",
      required: true,
      hideTooltip: true,
      options: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
        },
      ],
    },
    {
      name: "cass",
      type: "select",
      placeholder: "Cass *",
      label: "Cass",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Inactive",
          value: "inactive",
        },
      ],
      required: true,
      hideTooltip: true,
    },
    {
      name: "fax_number",
      type: "text",
      placeholder: "Fax Number",
      label: "Fax Number",
      hideTooltip: true,
    },
    {
      name: "telephone_number",
      type: "text",
      placeholder: "Telephone Number",
      label: "Telephone Number",
      hideTooltip: true,
    },
    {
      name: "address",
      type: "text",
      placeholder: "Address",
      label: "Address",
      hideTooltip: true,
    },
    {
      name: "postal_code",
      type: "text",
      placeholder: "Postal Code",
      label: "Postal Code",
      hideTooltip: true,
    },
    {
      name: "billing_frequency",
      type: "select",
      placeholder: "Billing Frequency",
      label: "Billing Frequency",
      options: [
        {
          label: "Monthly",
          value: "monthly",
        },
        {
          label: "Quarterly",
          value: "quarterly",
        },
        {
          label: "Yearly",
          value: "yearly",
        },
      ],
      hideTooltip: true,
    },
    {
      name: "billing_period",
      type: "text",
      placeholder: "Billing Period",
      label: "Billing Period",
      hideTooltip: true,
    },
    {
      name: "cass_billing_offset_day",
      type: "number",
      placeholder: "Cass Billing Offset Day",
      label: "Cass Billing Offset Day",
      hideTooltip: true,
    },
  ];

  const data = [
    {
      country_code: "US",
      country_name: "United States",
      currency_code: "USD",
      status: "Active",
      iata_code: "US",
      address: "123 Main St",
      post_code: "12345",
      phone: "555-1234",
      fax: "555-5678",
      id: 1,
    },
    {
      country_code: "CA",
      country_name: "Canada",
      currency_code: "CAD",
      status: "Active",
      iata_code: "CA",
      address: "456 Maple Ave",
      post_code: "67890",
      phone: "555-5678",
      fax: "555-9012",
      id: 2,
    },
    {
      country_code: "GB",
      country_name: "United Kingdom",
      currency_code: "GBP",
      status: "Active",
      iata_code: "GB",
      address: "789 Oak St",
      post_code: "23456",
      phone: "555-9012",
      fax: "555-3456",
      id: 3,
    },
  ];

  return (
    <MastersPageTemplate
      heading="Country Master"
      buttonText="Create Country"
      filterHookForm={filterForm}
      filterFormFields={filterFormFields}
      formFields={formFields}
      hookForm={countryForm}
      columns={columns}
      data={data}
    />
  );
}
