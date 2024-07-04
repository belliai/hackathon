"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate"
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge"

export default function MassterSpecialHandlingCodePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "specialHandlingCode",
      header: "Code",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "knownShipperValidation",
      header: "Known Shipper Validation",
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status}
          severity={row.original.status === "Active" ? "default" : "error"}
        />
      ),
    },
    {
      accessorKey: "isnotoc",
      header: "ISNOTOC",
    },
    {
      accessorKey: "isPreAlert",
      header: "isPreAlert",
    },
    actionColumn,
  ]

  const data = [
    {
      specialHandlingCode: "PER",
      description: "Perishable goods",
      isnotoc: "No",
      status: "Active",
      isPreAlert: "N",
      knownShipperValidation: "InActive",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
    },
    {
      specialHandlingCode: "AVI",
      description: "Live animals",
      isnotoc: "Yes",
      status: "Inactive",
      knownShipperValidation: "InActive",
      isPreAlert: "N",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-25",
    },
    {
      specialHandlingCode: "DGR",
      description: "Dangerous goods",
      isnotoc: "No",
      status: "Active",
      knownShipperValidation: "InActive",
      isPreAlert: "N",
      createdAt: "2023-03-05",
      updatedAt: "2023-10-30",
    },
    {
      specialHandlingCode: "VAL",
      description: "Valuable cargo",
      isnotoc: "Yes",
      status: "Inactive",
      knownShipperValidation: "InActive",
      isPreAlert: "N",
      createdAt: "2023-04-10",
      updatedAt: "2023-09-15",
    },
    {
      specialHandlingCode: "HEA",
      description: "Human remains",
      isnotoc: "No",
      status: "Active",
      knownShipperValidation: "InActive",
      isPreAlert: "N",
      createdAt: "2023-05-25",
      updatedAt: "2023-08-20",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "specialHandlingCode",
      label: "Special Handling Code",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
    },
    {
      name: "isnotoc",
      label: "ISNOTOC",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "isPreAlert",
      label: "isPrealert",
      type: "checkbox",
    },
    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },
  ]

  const filterForm = useForm()

  return (
    <MastersPageTemplate
      heading="Special Handling Code Master"
      buttonText="Create"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      customFilterButtons={<FilterActions />}
    />
  )
}
