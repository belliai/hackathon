"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions"
import MastersPageTemplate from "../../components/MastersPageTemplate"
import StatusBadge from "../../components/StatusBadge"

export default function MasterCommodityPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "commodityCode",
      header: "Commodity Code",
    },
    {
      accessorKey: "commodityName",
      header: "Commodity Name",
    },
    {
      accessorKey: "commodityDescription",
      header: "Commodity Description",
    },
    {
      accessorKey: "commodityCategory",
      header: "Commodity Category",
    },
    {
      accessorKey: "shcCode",
      header: "SHC Code",
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
      accessorKey: "isNotoc",
      header: "ISNOTOC",
    },
    {
      accessorKey: "priority",
      header: "Priority",
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

  const formFields: TFormTextField[] = [
    {
      name: "commodityCode",
      placeholder: "Commodity Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "commodityName",
      placeholder: "Commodity Name",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "commodityDescription",
      placeholder: "Commodity Description",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "commodityCategory",
      placeholder: "Commodity Category",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "shcCode",
      placeholder: "SHC Code",
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
      name: "isNotoc",
      placeholder: "ISNOTOC",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "priority",
      placeholder: "Priority",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
  ]

  const commodityForm = useForm()
  const filterForm = useForm()

  const data = [
    {
      commodityCode: "C001",
      commodityName: "Electronics",
      commodityDescription:
        "Consumer electronics including smartphones and laptops",
      commodityCategory: "Technology",
      shcCode: "E001",
      status: "Active",
      isNotoc: "No",
      priority: "High",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
      action: "Edit",
    },
    {
      commodityCode: "C002",
      commodityName: "Apparel",
      commodityDescription: "Clothing and accessories",
      commodityCategory: "Fashion",
      shcCode: "A001",
      status: "Inactive",
      isNotoc: "Yes",
      priority: "Medium",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-25",
      action: "Edit",
    },
    {
      commodityCode: "C003",
      commodityName: "Pharmaceuticals",
      commodityDescription: "Medicines and healthcare products",
      commodityCategory: "Health",
      shcCode: "P001",
      status: "Active",
      isNotoc: "No",
      priority: "High",
      createdAt: "2023-03-05",
      updatedAt: "2023-10-30",
      action: "Edit",
    },
    {
      commodityCode: "C004",
      commodityName: "Furniture",
      commodityDescription: "Home and office furniture",
      commodityCategory: "Home",
      shcCode: "F001",
      status: "Inactive",
      isNotoc: "Yes",
      priority: "Low",
      createdAt: "2023-04-10",
      updatedAt: "2023-09-15",
      action: "Edit",
    },
    {
      commodityCode: "C005",
      commodityName: "Food and Beverages",
      commodityDescription: "Perishable and non-perishable food items",
      commodityCategory: "Food",
      shcCode: "F002",
      status: "Active",
      isNotoc: "No",
      priority: "High",
      createdAt: "2023-05-25",
      updatedAt: "2023-08-20",
      action: "Edit",
    },
  ]

  return (
    <MastersPageTemplate
      heading="Commodity Master"
      buttonText="Create Commodity"
      filterFormFields={formFields}
      formFields={formFields}
      filterHookForm={filterForm}
      hookForm={commodityForm}
      columns={columns}
      data={data}
    />
  )
}
