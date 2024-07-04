"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "../masters/components/dummySelectOptions"
import MastersPageTemplate, {
  SectionedFormFields,
} from "../masters/components/MastersPageTemplate"

export default function MessageConfiguration() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "srNo",
      header: "Sr No",
    },
    {
      accessorKey: "messageType",
      header: "Message Type",
    },
    {
      accessorKey: "communicationType",
      header: "Communication Type",
    },
    {
      accessorKey: "flightNo",
      header: "Flight No",
    },
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "partnerType",
      header: "Partner Type",
    },
    {
      accessorKey: "partnerCode",
      header: "Partner Code",
    },
    {
      accessorKey: "emailId",
      header: "Email Id",
    },
    {
      accessorKey: "sitaId",
      header: "SITA ID",
    },
    {
      accessorKey: "FTP ID",
      header: "FTP ID",
    },
    {
      accessorKey: "transitDestination",
      header: "Transit Destination",
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
      srNo: 1,
      messageType: "PAX",
      communicationType: "Email",
      flightNo: "AI-101",
      origin: "DEL",
      destination: "BOM",
      partnerType: "Airline",
      partnerCode: "AI",
      emailId: "12345",
      sitaId: "12345",
      FTPID: "12345",
      transitDestination: "BOM",
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
    },
    {
      srNo: 2,
      messageType: "PAX",
      communicationType: "Email",
      flightNo: "AI-101",
      origin: "DEL",
      destination: "BOM",
      partnerType: "Airline",
      partnerCode: "AI",
      emailId: "12345",
      sitaId: "12345",
      FTPID: "12345",
      transitDestination: "BOM",
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
    },
    {
      srNo: 3,
      messageType: "PAX",
      communicationType: "Email",
      flightNo: "AI-101",
      origin: "DEL",
      destination: "BOM",
      partnerType: "Airline",
      partnerCode: "AI",
      emailId: "12345",
      sitaId: "12345",
      FTPID: "12345",
      transitDestination: "BOM",
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
    },
    {
      srNo: 4,
      messageType: "PAX",
      communicationType: "Email",
      flightNo: "AI-101",
      origin: "DEL",
      destination: "BOM",
      partnerType: "Airline",
      partnerCode: "AI",
      emailId: "12345",
      sitaId: "12345",
      FTPID: "12345",
      transitDestination: "BOM",
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "flightNo",
      placeholder: "Flight No",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "origin",
      placeholder: "Origin",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "destination",
      placeholder: "Destination",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "transitTransition",
      placeholder: "Transit Transition",
      type: "text",
      endIcon: <Search />,
    },
  ]

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "partnerType",
          placeholder: "Partner Type",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "partnerCode",
          placeholder: "Partner Code",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "messageType",
          placeholder: "Message Type",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
    {
      sectionName: "Configuration",
      fields: [
        {
          name: "origin",
          type: "text",
          placeholder: "Origin",
        },
        {
          name: "destination",
          type: "text",
          placeholder: "Destination",
        },
        {
          name: "transitDestination",
          type: "text",
          placeholder: "Transit Destination",
        },
        {
          name: "flightNo",
          type: "text",
          placeholder: "Flight No",
        },
        {
          name: "messageCommType",
          placeholder: "Message Communication Type",
          type: "select",
        },
        {
          name: "autoGenerate",
          type: "checkbox",
          label: "Auto Generate",
        },
        {
          name: "messageStartWith",
          type: "text",
          placeholder: "Message Start With",
        },
        {
          name: "messageEndWith",
          type: "text",
          placeholder: "Message End With",
        },
        {
          name: "agentCode",
          type: "text",
          placeholder: "Agent Code",
        },
        {
          name: "roles",
          type: "select",
          placeholder: "Roles",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "emailId",
          type: "text",
          placeholder: "Email ID",
        },
      ],
    },
  ]

  const filterForm = useForm()
  const sectionedForm = useForm()

  return (
    <MastersPageTemplate
      heading="Message Configuration"
      buttonText="Create Message Configuration"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      sectionedFormFields={sectionedFormFields}
      hookForm={sectionedForm}
    />
  )
}
