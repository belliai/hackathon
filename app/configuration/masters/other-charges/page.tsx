"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
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

export default function OrganizeOtherChargesPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "ocCode",
      header: "OC Code",
    },
    {
      accessorKey: "ocDescription",
      header: "OC Description",
    },
    actionColumn,
  ]

  const data = [
    {
      ocCode: "OC001",
      ocDescription: "Operational Code 1",
      status: "Active",
      createdAt: "2023-01-01",
      updatedAt: "2023-02-01",
    },
    {
      ocCode: "OC002",
      ocDescription: "Operational Code 2",
      status: "Inactive",
      createdAt: "2023-01-05",
      updatedAt: "2023-02-05",
    },
    {
      ocCode: "OC003",
      ocDescription: "Operational Code 3",
      status: "Active",
      createdAt: "2023-01-10",
      updatedAt: "2023-02-10",
    },
    {
      ocCode: "OC004",
      ocDescription: "Operational Code 4",
      status: "Inactive",
      createdAt: "2023-01-15",
      updatedAt: "2023-02-15",
    },
    {
      ocCode: "OC005",
      ocDescription: "Operational Code 5",
      status: "Active",
      createdAt: "2023-01-20",
      updatedAt: "2023-02-20",
    },
    {
      ocCode: "OC006",
      ocDescription: "Operational Code 6",
      status: "Inactive",
      createdAt: "2023-01-25",
      updatedAt: "2023-02-25",
    },
    {
      ocCode: "OC007",
      ocDescription: "Operational Code 7",
      status: "Active",
      createdAt: "2023-01-30",
      updatedAt: "2023-03-01",
    },
    {
      ocCode: "OC008",
      ocDescription: "Operational Code 8",
      status: "Inactive",
      createdAt: "2023-02-05",
      updatedAt: "2023-03-05",
    },
    {
      ocCode: "OC009",
      ocDescription: "Operational Code 9",
      status: "Active",
      createdAt: "2023-02-10",
      updatedAt: "2023-03-10",
    },
    {
      ocCode: "OC010",
      ocDescription: "Operational Code 10",
      status: "Inactive",
      createdAt: "2023-02-15",
      updatedAt: "2023-03-15",
    },
  ]

  const formFields: TFormTextField[] = [
    {
      name: "ocCode",
      label: "OC Code",
      orientation: "horizontal",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "ocDescription",
      label: "OC Description",
      orientation: "horizontal",
      type: "text",
      endIcon: <Search />,
    },
  ]

  const form = useForm()

  return (
    <CreateFormPageTemplate
      heading="OC Master"
      hookForm={form}
      formFields={formFields}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="mt-8 max-w-96">
            <FilterActions />
          </div>
          <Separator />
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      }
    />
  )
}
