"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"
import { FormTextFieldProps } from "@/components/form/FormTextField"

import { selectColumn } from "../../components/columnItem"
import { DUMMY_SELECT_OPTIONS_STATUS } from "../../components/dummySelectOptions"
import MastersPageTemplate from "../../components/MastersPageTemplate"

export default function MasterVendorPage() {
  const columns: ColumnDef<any>[] = [
    {
      ...selectColumn,
    },
    {
      accessorKey: "vendor_name",
      header: "Vendor Name",
    },
    {
      accessorKey: "vendor_code",
      header: "Vendor Code",
    },
    {
      accessorKey: "address_1",
      header: "Address 1",
    },
    {
      accessorKey: "address_2",
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
      accessorKey: "pincode",
      header: "Pincode",
    },
    {
      accessorKey: "phone_no",
      header: "Phone No.",
    },
    {
      accessorKey: "mobile_no",
      header: "Mobile No.",
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
      accessorKey: "iata_account_no",
      header: "IATA Account No.",
    },
    {
      accessorKey: "credit_account_no",
      header: "Credit Account No.",
    },
    {
      accessorKey: "tin",
      header: "TIN",
    },
    {
      accessorKey: "contact_person",
      header: "Contact Person",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => <DataTableRowActions />,
    },
  ]

  const data = [
    {
      vendor_name: "Vendor 1",
      vendor_code: "V001",
      address_1: "Address 1",
      address_2: "Address 2",
      city: "City 1",
      state: "State 1",
      country: "Country 1",
      pincode: "12345",
      phone_no: "1234567890",
      mobile_no: "9876543210",
      fax: "123456",
      email: "vendor1@example.com",
      iata_account_no: "IATA001",
      credit_account_no: "CREDIT001",
      tin: "TIN001",
      contact_person: "John Doe",
      status: "Active",
      created_at: "2022-01-01",
      updated_at: "2022-01-02",
    },
    {
      vendor_name: "Vendor 2",
      vendor_code: "V002",
      address_1: "Address 3",
      address_2: "Address 4",
      city: "City 2",
      state: "State 2",
      country: "Country 2",
      pincode: "54321",
      phone_no: "0987654321",
      mobile_no: "0123456789",
      fax: "654321",
      email: "vendor2@example.com",
      iata_account_no: "IATA002",
      credit_account_no: "CREDIT002",
      tin: "TIN002",
      contact_person: "Jane Smith",
      status: "Inactive",
      created_at: "2022-02-01",
      updated_at: "2022-02-02",
    },
  ]

  const filterFormFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "vendor_code",
      placeholder: "Vendor Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "vendor_name",
      placeholder: "Vendor Name",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ]

  const vendorFormFields: Omit<FormTextFieldProps, "form">[] = [
    {
      name: "vendor_code",
      placeholder: "Vendor Code",
      type: "text",
      required: true,
      label: "Vendor Code",
      hideTooltip: true,
    },
    {
      name: "vendor_name",
      placeholder: "Vendor Name",
      type: "text",
      required: true,
      label: "Vendor Name",
      hideTooltip: true,
    },
    {
      name: "valid_from",
      placeholder: "Valid From",
      type: "date",
      required: true,
      hideTooltip: true,
    },
    {
      name: "valid_to",
      placeholder: "Valid To",
      type: "date",
      required: true,
      hideTooltip: true,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
      required: true,
      label: "Status",
      hideTooltip: true,
    },
    {
      name: "credit_account_no",
      placeholder: "Credit Account No.",
      type: "text",
      label: "Credit Account No.",
      hideTooltip: true,
    },
    {
      name: "address_1",
      placeholder: "Address 1",
      type: "text",
      required: true,
      label: "Address 1",
      hideTooltip: true,
    },
    {
      name: "address_2",
      placeholder: "Address 2",
      type: "text",
      label: "Address 2",
      hideTooltip: true,
    },
    {
      name: "city",
      placeholder: "City",
      type: "text",
      required: true,
      label: "City",
      hideTooltip: true,
    },
    {
      name: "country",
      placeholder: "Country",
      type: "text",
      required: true,
      label: "Country",
      hideTooltip: true,
    },
    {
      name: "state",
      placeholder: "State",
      type: "text",
      label: "State",
      hideTooltip: true,
    },
    {
      name: "pincode",
      placeholder: "Pincode",
      type: "text",
      label: "Pincode",
      hideTooltip: true,
    },
    {
      name: "mobile_no",
      placeholder: "Mobile No.",
      type: "text",
      label: "Mobile No.",
      hideTooltip: true,
    },
    {
      name: "phone_no",
      placeholder: "Phone No.",
      type: "text",
      required: true,
      label: "Phone No.",
      hideTooltip: true,
    },
    {
      name: "fax",
      placeholder: "Fax",
      type: "text",
      label: "Fax",
      hideTooltip: true,
    },
    {
      name: "iata_account_no",
      placeholder: "IATA Account No.",
      type: "text",
      label: "IATA Account No.",
      hideTooltip: true,
    },
    {
      name: "tin",
      placeholder: "TIN",
      type: "text",
      label: "TIN",
      hideTooltip: true,
    },
    {
      name: "contact_person",
      placeholder: "Contact Person",
      type: "text",
      label: "Contact Person",
      hideTooltip: true,
    },
    {
      name: "email",
      placeholder: "Email",
      type: "text",
      label: "Email",
      hideTooltip: true,
    },
    {
      name: "billing_address_same",
      placeholder: "Billing Address Same as Mailing Address",
      type: "checkbox",
      label: "Billing Address Same as Mailing Address",
      hideTooltip: true,
    },
    {
      name: "billing_address_1",
      placeholder: "Billing Address 1",
      type: "text",
      label: "Billing Address 1",
      hideTooltip: true,
    },
    {
      name: "billing_address_2",
      placeholder: "Billing Address 2",
      type: "text",
      label: "Billing Address 2",
      hideTooltip: true,
    },
    {
      name: "billing_city",
      placeholder: "Billing City",
      type: "text",
      label: "Billing City",
      hideTooltip: true,
    },
    {
      name: "billing_state",
      placeholder: "Billing State",
      type: "text",
      label: "Billing State",
      hideTooltip: true,
    },
    {
      name: "billing_country",
      placeholder: "Billing Country",
      type: "text",
      label: "Billing Country",
      hideTooltip: true,
    },
    {
      name: "billing_pincode",
      placeholder: "Billing Pincode",
      type: "text",
      label: "Billing Pincode",
      hideTooltip: true,
    },
    {
      name: "billing_contact_person",
      placeholder: "Billing Contact Person",
      type: "text",
      label: "Billing Contact Person",
      hideTooltip: true,
    },
    {
      name: "billing_phone_no",
      placeholder: "Billing Phone No.",
      type: "text",
      label: "Billing Phone No.",
      hideTooltip: true,
    },
    {
      name: "remarks",
      placeholder: "Remarks",
      type: "text",
      label: "Remarks",
      hideTooltip: true,
    },
    {
      name: "remark",
      placeholder: "Remark",
      type: "text",
      required: true,
      label: "Remark",
      hideTooltip: true,
    },
  ]

  const filterForm = useForm()
  const vendorForm = useForm()

  return (
    <MastersPageTemplate
      heading="Vendor Master"
      buttonText="Create Vendor"
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      formFields={vendorFormFields}
      hookForm={vendorForm}
      data={data}
      columns={columns}
    />
  )
}
