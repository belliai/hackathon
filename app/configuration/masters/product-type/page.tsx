"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/data-table/data-table"
import { TFormTextField } from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge"

export default function MasterProductTypePage() {
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

  const formFields: TFormTextField[] = [
    {
      name: "productType",
      label: "Product Type",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "productDescription",
      label: "Product Description",
      orientation: "horizontal",
      type: "text",
    },
    {
      name: "planningPriority",
      type: "text",
      label: "Planning Priority",
      orientation: "horizontal",
    },
    {
      name: "messagingPriority",
      type: "text",
      label: "Messaging Priority",
      orientation: "horizontal",
    },
    {
      name: "shc",
      type: "text",
      label: "SHC",
      orientation: "horizontal",
    },
    {
      name: "active",
      type: "checkbox",
      label: "Active",
    },
    {
      name: "mail",
      type: "checkbox",
      label: "Mail",
    },
    {
      name: "showInMobile",
      type: "checkbox",
      label: "Show In Mobile",
    },
  ]

  const form = useForm()

  return (
    <CreateFormPageTemplate
      heading="Product Type Master"
      hookForm={form}
      formFields={formFields}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="mt-4 max-w-96">
            <FilterActions />
          </div>
          <Separator />
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      }
    />
  )
}
