"use client"

import { ColumnDef } from "@tanstack/react-table"

export type AppreciationReportType = {
  employee_name?: string
  location?: string
  clap_count?: string
  given_by?: string
  email_id?: string
  date?: string
  remarks?: string
}

export const columns: ColumnDef<AppreciationReportType>[] = [
  {
    header: "Employee Name",
    accessorKey: "employee_name",
  },
  {
    header: "Location",
    accessorKey: "location",
  },
  {
    header: "Clap Count",
    accessorKey: "clap_count",
  },
  {
    header: "Given By",
    accessorKey: "given_by",
  },
  {
    header: "Email",
    accessorKey: "email_id",
  },
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Remarks",
    accessorKey: "remarks",
  },
]
