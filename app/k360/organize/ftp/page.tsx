"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "../masters/components/dummySelectOptions"
import MastersPageTemplate from "../masters/components/MastersPageTemplate"

export default function FtpPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "ftpCustomer",
      header: "FTP Customer",
    },
    {
      accessorKey: "ftpHost",
      header: "FTP Host",
    },
    {
      accessorKey: "ftpUsername",
      header: "FTP Username",
    },
    {
      accessorKey: "ftpPassword",
      header: "FTP Password",
    },
    {
      accessorKey: "ftpDirectory",
      header: "FTP Directory",
    },
    {
      accessorKey: "ftpConnectionType",
      header: "FTP Connection Type",
    },
    {
      accessorKey: "ftpPort",
      header: "FTP Port",
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
      ftpCustomer: "Acme Inc.",
      ftpHost: "ftp.acme.com",
      ftpUsername: "acme",
      ftpPassword: "password",
      ftpDirectory: "/",
      ftpConnectionType: "FTP",
      ftpPort: 21,
      createdAt: "2021-01-01 00:00:00",
      updatedAt: "2021-01-01 00:00:00",
    },
    {
      ftpCustomer: "Acme Inc.",
      ftpHost: "ftp.acme.com",
      ftpUsername: "acme",
      ftpPassword: "password",
      ftpDirectory: "/",
      ftpConnectionType: "FTP",
      ftpPort: 21,
      createdAt: "2021-01-01 00:00:00",
      updatedAt: "2021-01-01 00:00:00",
    },
    {
      ftpCustomer: "Acme Inc.",
      ftpHost: "ftp.acme.com",
      ftpUsername: "acme",
      ftpPassword: "password",
      ftpDirectory: "/",
      ftpConnectionType: "FTP",
      ftpPort: 21,
      createdAt: "2021-01-01 00:00:00",
      updatedAt: "2021-01-01 00:00:00",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "ftpHost",
      placeholder: "FTP Host",
      type: "text",
    },
    {
      name: "fromDate",
      placeholder: "From Date",
      type: "date",
    },
    {
      name: "toDate",
      placeholder: "To Date",
      type: "date",
    },
  ]

  const formFields: TFormTextField[] = [
    {
      name: "ftpCustomer",
      type: "select",
      placeholder: "FTP Customer",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "ftpHost",
      type: "text",
      placeholder: "FTP Host",
    },
    {
      name: "ftpUsername",
      type: "text",
      placeholder: "FTP Username",
    },
    {
      name: "ftpPassword",
      type: "password",
      placeholder: "FTP Password",
    },
    {
      name: "ftpDirectory",
      type: "text",
      placeholder: "FTP Directory",
    },
    {
      name: "ftpConnectionType",
      type: "select",
      placeholder: "FTP Connection Type",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "ftpPort",
      type: "number",
      placeholder: "FTP Port",
    },
  ]

  const filterForm = useForm()
  const form = useForm()

  return (
    <MastersPageTemplate
      heading="FTP Details"
      buttonText="Create FTP Details"
      columns={columns}
      data={data}
      filterHookForm={filterForm}
      hookForm={form}
      filterFormFields={filterFormFields}
      formFields={formFields}
    />
  )
}
