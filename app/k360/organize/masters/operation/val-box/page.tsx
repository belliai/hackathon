"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "../../components/dummySelectOptions"
import MastersPageTemplate from "../../components/MastersPageTemplate"
import StatusBadge from "../../components/StatusBadge"

export default function MasterValBoxPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "valBoxNumber",
      header: "Val Box Number",
    },
    {
      accessorKey: "valBoxStation",
      header: "Val Box Station",
    },
    {
      accessorKey: "valBoxType",
      header: "Val Box Type",
    },
    {
      accessorKey: "valBoxStatus",
      header: "Val Box Status",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.valBoxStatus}
          severity={
            row.original.valBoxStatus === "Active" ? "default" : "error"
          }
        />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "operationalStatus",
      header: "Operational Status",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.operationalStatus}
          severity={
            row.original.operationalStatus === "Good" ? "default" : "error"
          }
        />
      ),
    },
    {
      accessorKey: "remark",
      header: "Remark",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    actionColumn,
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "valBoxNumber",
      placeholder: "Val Box Number",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "valBoxStation",
      placeholder: "Val Box Station",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "valBoxType",
      placeholder: "Val Box Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
  ]

  const data = [
    {
      valBoxNumber: "VB001",
      valBoxStation: "JFK",
      valBoxType: "Type A",
      valBoxStatus: "Active",
      status: "Operational",
      operationalStatus: "Good",
      remark: "In use",
      createdAt: "2023-01-01",
      updatedAt: "2023-05-01",
    },
    {
      valBoxNumber: "VB002",
      valBoxStation: "LAX",
      valBoxType: "Type B",
      valBoxStatus: "Inactive",
      status: "Maintenance",
      operationalStatus: "Needs Repair",
      remark: "Out of order",
      createdAt: "2023-02-01",
      updatedAt: "2023-06-01",
    },
    {
      valBoxNumber: "VB003",
      valBoxStation: "ORD",
      valBoxType: "Type C",
      valBoxStatus: "Active",
      status: "Operational",
      operationalStatus: "Excellent",
      remark: "New",
      createdAt: "2023-03-01",
      updatedAt: "2023-07-01",
    },
    {
      valBoxNumber: "VB004",
      valBoxStation: "DFW",
      valBoxType: "Type A",
      valBoxStatus: "Active",
      status: "Operational",
      operationalStatus: "Good",
      remark: "In use",
      createdAt: "2023-04-01",
      updatedAt: "2023-08-01",
    },
    {
      valBoxNumber: "VB005",
      valBoxStation: "ATL",
      valBoxType: "Type B",
      valBoxStatus: "Inactive",
      status: "Maintenance",
      operationalStatus: "Needs Repair",
      remark: "Out of order",
      createdAt: "2023-05-01",
      updatedAt: "2023-09-01",
    },
  ]

  const filterHookForm = useForm()
  const hookForm = useForm()

  return (
    <MastersPageTemplate
      heading="Val Box Master"
      buttonText="Create Val Box"
      formFields={filterFormFields}
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterHookForm}
      hookForm={hookForm}
    />
  )
}
