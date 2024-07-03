"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../masters/components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../masters/components/dummySelectOptions"
import MastersPageTemplate from "../../masters/components/MastersPageTemplate"

export default function MasterSupplierGstinPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,

    {
      accessorKey: "gstinType",
      header: "GSTIN Type",
    },
    {
      accessorKey: "gstinId",
      header: "GSTIN ID",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "taxRegNo",
      header: "TAX Reg. No.",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "pincode",
      header: "Pincode",
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
      name: "gstinType",
      placeholder: "GSTIN Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "country",
      placeholder: "Country",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "state",
      placeholder: "State",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "taxRegNo",
      placeholder: "TAX Reg. No.",
      type: "text",
    },
    {
      name: "validFrom",
      placeholder: "Valid From",
      type: "date",
    },
    {
      name: "validTo",
      type: "date",
      placeholder: "Valid To",
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ]

  const formFields: TFormTextField[] = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
    },
    {
      name: "country",
      placeholder: "Country",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "state",
      placeholder: "State",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "taxRegNo",
      placeholder: "TAX Reg. No.",
      type: "text",
    },
    {
      name: "address",
      placeholder: "Address",
      type: "text",
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "validFrom",
      placeholder: "Valid From",
      type: "date",
    },
    {
      name: "validTo",
      type: "date",
      placeholder: "Valid To",
    },
    {
      name: "gstinType",
      placeholder: "GSTIN Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "pincode",
      placeholder: "Pincode",
      type: "text",
    },
  ]

  const filterForm = useForm()
  const form = useForm()

  const data = [
    {
      gstinType: "TDS",
      gstinId: "7709595197197",
      country: "Libyan Arab Jamahiriya",
      state: "Oklahoma",
      taxRegNo: "50-9939624",
      startDate: "2022-04-02",
      endDate: "2020-10-12",
      status: "Inactive",
      pincode: "42280",
      createdAt: "2024-04-15 15:49:47",
      updatedAt: "2024-03-30 22:02:51",
    },
    {
      gstinType: "ISD",
      gstinId: "8364570996845",
      country: "Brunei Darussalam",
      state: "Iowa",
      taxRegNo: "46-5443326",
      startDate: "2022-02-22",
      endDate: "2022-01-16",
      status: "Inactive",
      pincode: "40419",
      createdAt: "2024-02-10 06:05:34",
      updatedAt: "2024-03-06 09:50:46",
    },
    {
      gstinType: "TDS",
      gstinId: "8359852221531",
      country: "Vanuatu",
      state: "Iowa",
      taxRegNo: "02-2735933",
      startDate: "2022-03-11",
      endDate: "2021-08-05",
      status: "Active",
      pincode: "89978",
      createdAt: "2024-02-24 14:14:01",
      updatedAt: "2024-05-21 08:51:40",
    },
    {
      gstinType: "Regular",
      gstinId: "6129415933704",
      country: "Zambia",
      state: "Vermont",
      taxRegNo: "34-2632136",
      startDate: "2022-05-27",
      endDate: "2021-02-10",
      status: "Inactive",
      pincode: "94734",
      createdAt: "2024-04-16 22:52:32",
      updatedAt: "2024-01-09 12:46:45",
    },
    {
      gstinType: "ISD",
      gstinId: "2860660260606",
      country: "Fiji",
      state: "Connecticut",
      taxRegNo: "12-9360678",
      startDate: "2022-05-21",
      endDate: "2022-07-15",
      status: "Active",
      pincode: "93669",
      createdAt: "2024-04-22 10:47:42",
      updatedAt: "2024-01-08 13:11:48",
    },
    {
      gstinType: "Composite",
      gstinId: "6208792542912",
      country: "Panama",
      state: "Nebraska",
      taxRegNo: "36-8764519",
      startDate: "2022-01-13",
      endDate: "2022-09-22",
      status: "Active",
      pincode: "82530",
      createdAt: "2024-01-25 04:12:47",
      updatedAt: "2024-04-06 22:18:29",
    },
    {
      gstinType: "Regular",
      gstinId: "8310618596819",
      country: "Finland",
      state: "Nevada",
      taxRegNo: "52-7923854",
      startDate: "2022-07-21",
      endDate: "2021-08-05",
      status: "Active",
      pincode: "19820",
      createdAt: "2024-04-26 13:15:35",
      updatedAt: "2024-03-20 22:58:59",
    },
    {
      gstinType: "Composite",
      gstinId: "4056729865182",
      country: "Japan",
      state: "Alaska",
      taxRegNo: "32-4763918",
      startDate: "2022-02-16",
      endDate: "2022-08-21",
      status: "Inactive",
      pincode: "39420",
      createdAt: "2024-01-12 23:57:20",
      updatedAt: "2024-03-01 04:30:33",
    },
    {
      gstinType: "TDS",
      gstinId: "6208394567213",
      country: "Mali",
      state: "Georgia",
      taxRegNo: "13-6824597",
      startDate: "2022-09-17",
      endDate: "2022-07-04",
      status: "Inactive",
      pincode: "48290",
      createdAt: "2024-05-25 15:02:18",
      updatedAt: "2024-05-15 08:11:51",
    },
    {
      gstinType: "ISD",
      gstinId: "9581064729375",
      country: "Canada",
      state: "California",
      taxRegNo: "45-2938471",
      startDate: "2022-11-28",
      endDate: "2022-01-12",
      status: "Active",
      pincode: "32987",
      createdAt: "2024-04-28 10:20:40",
      updatedAt: "2024-05-19 14:45:33",
    },
  ]

  return (
    <MastersPageTemplate
      heading="Supplier GSTIN Master"
      buttonText="Create Supplier GSTIN"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      formFields={formFields}
      hookForm={form}
    />
  )
}
