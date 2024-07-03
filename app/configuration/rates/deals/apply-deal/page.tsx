"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import FilterActions from "@/components/page-template/FilterActions"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge"

export default function ApplyDealPage() {
  // Don't know the correct columns, so this is just a guess
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "agentCode",
      header: "Agent Code",
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
      accessorKey: "rateApplied",
      header: "Rate Applied",
    },
    actionColumn,
  ]

  const data = [
    {
      agentCode: "AG001",
      status: "Active",
      rateApplied: "Standard",
    },
    {
      agentCode: "AG002",
      status: "Inactive",
      rateApplied: "Standard",
    },
    {
      agentCode: "AG003",
      status: "Active",
      rateApplied: "Standard",
    },
  ]

  const form = useForm()

  return (
    <CreateFormPageTemplate
      hookForm={form}
      heading="Agent Deals"
      sectionedFormFields={[
        {
          sectionName: "Deal Details",
          fields: [
            {
              name: "agentCode",
              type: "text",
              label: "Agent Code",
              orientation: "horizontal",
            },
            {
              name: "dateFrom",
              type: "date",
              label: "Date From",
              orientation: "horizontal",
            },
            {
              name: "dateTo",
              type: "date",
              label: "Date To",
              orientation: "horizontal",
            },
            {
              name: "rateApplied",
              type: "select",
              label: "Rate Applied",
              orientation: "horizontal",
              options: DUMMY_SELECT_OPTIONS,
            },
          ],
        },
      ]}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="mt-8 max-w-96">
            <FilterActions />
          </div>
          <DataTable columns={columns} data={data} />
          <div className="flex gap-2">
            <Button variant="button-primary">Apply Deal</Button>
            <Button variant="button-primary">Export Deals</Button>
          </div>
        </div>
      }
    />
  )
}
