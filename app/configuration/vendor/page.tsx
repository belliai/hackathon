"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"
import {
  FormTextFieldProps,
  TFormTextField,
} from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions"

export default function MasterVendorPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "vendor_code",
      header: "Vendor Code",
    },
    {
      accessorKey: "vendor_name",
      header: "Vendor Name",
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
    actionColumn,
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

  const filterFormFields: TFormTextField[] = [
    {
      name: "vendor_code",
      label: "Vendor Code",
      orientation: "horizontal",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "vendor_name",
      label: "Vendor Name",
      orientation: "horizontal",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "airportCode",
      label: "Airport Code",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "country",
      label: "Country",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "isActive",
      label: "Is Active",
      orientation: "horizontal",
      type: "checkbox",
    },
    {
      name: "status",
      label: "Status",
      orientation: "horizontal",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ]

  const filterForm = useForm()

  return (
    <CreateFormPageTemplate
      heading="List Vendor"
      formFields={filterFormFields}
      hookForm={filterForm}
      className="max-h-none"
      customDialogContent={
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex max-w-96">
            <FilterActions />
          </div>
          <Separator />
          <DataTable columns={columns} data={data} />
        </div>
      }
    />
  )
}
