"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../components/columnItem"
import { DUMMY_SELECT_OPTIONS_STATUS } from "../../components/dummySelectOptions"
import MastersPageTemplate from "../../components/MastersPageTemplate"
import StatusBadge from "../../components/StatusBadge"

export default function MasterProductType() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "productType",
      header: "Product Type",
    },
    {
      accessorKey: "productDescription",
      header: "Product Description",
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
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    actionColumn,
  ]

  const data = [
    {
      productType: "Electronics",
      productDescription:
        "Consumer electronics including smartphones, tablets, and accessories",
      status: "Active",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
    },
    {
      productType: "Apparel",
      productDescription: "Clothing, footwear, and fashion accessories",
      status: "Inactive",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-25",
    },
    {
      productType: "Pharmaceuticals",
      productDescription: "Medicines, health supplements, and medical devices",
      status: "Active",
      createdAt: "2023-03-05",
      updatedAt: "2023-10-30",
    },
    {
      productType: "Furniture",
      productDescription:
        "Home and office furniture including desks, chairs, and cabinets",
      status: "Inactive",
      createdAt: "2023-04-10",
      updatedAt: "2023-09-15",
    },
    {
      productType: "Food and Beverages",
      productDescription:
        "Perishable and non-perishable food items and beverages",
      status: "Active",
      createdAt: "2023-05-25",
      updatedAt: "2023-08-20",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "productType",
      placeholder: "Product Type",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "productDescription",
      placeholder: "Product Description",
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

  const filterForm = useForm()
  const productTypeForm = useForm()

  return (
    <MastersPageTemplate
      heading="Product Type Master"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      formFields={filterFormFields}
      filterHookForm={filterForm}
      hookForm={productTypeForm}
    />
  )
}
