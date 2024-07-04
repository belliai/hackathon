"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"

import { actionColumn, selectColumn } from "../../masters/components/columnItem"
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../masters/components/dummySelectOptions"
import MastersPageTemplate, {
  SectionedFormFields,
} from "../../masters/components/MastersPageTemplate"

export default function MasterTaxlinePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "taxId",
      header: "Tax Id",
    },
    {
      accessorKey: "originLevel",
      header: "Origin Level",
    },
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "destinationLevel",
      header: "Destination Level",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "taxCode",
      header: "Tax Code",
    },
    {
      accessorKey: "taxName",
      header: "Tax Name",
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
      taxId: "1",
      originLevel: "Country",
      origin: "US",
      destinationLevel: "Country",
      destination: "UK",
      taxCode: "1",
      taxName: "VAT",
      startDate: "2021-10-01",
      endDate: "2021-10-31",
      status: "Active",
      createdAt: "2021-10-01",
      updatedAt: "2021-10-01",
    },
    {
      taxId: "2",
      originLevel: "Country",
      origin: "UK",
      destinationLevel: "Country",
      destination: "US",
      taxCode: "2",
      taxName: "GST",
      startDate: "2021-10-01",
      endDate: "2021-10-31",
      status: "Inactive",
      createdAt: "2021-10-01",
      updatedAt: "2021-10-01",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "originLevel",
      type: "select",
      placeholder: "Origin Level",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "taxName",
      type: "text",
      placeholder: "Tax Name",
      endIcon: <Search />,
    },
    {
      name: "taxId",
      type: "text",
      placeholder: "Tax Id",
      endIcon: <Search />,
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
    {
      name: "expiresFromDate",
      placeholder: "Expires From Date",
      type: "date",
    },
    {
      name: "expiresToDate",
      placeholder: "Expires To Date",
      type: "date",
    },
    {
      name: "status",
      type: "select",
      placeholder: "Status",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ]

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "taxName",
          placeholder: "Tax Name*",
          type: "text",
        },
        {
          name: "taxType",
          placeholder: "Tax Type*",
          type: "text",
        },
        {
          name: "startDate",
          placeholder: "Start Date*",
          type: "date",
          hideTooltip: true,
        },
        {
          name: "endDate",
          placeholder: "End Date*",
          type: "date",
          hideTooltip: true,
        },
        {
          name: "currencyCode",
          placeholder: "Currency Code*",
          type: "text",
        },
        {
          name: "level",
          placeholder: "Level*",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "location",
          placeholder: "Location*",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "originLevel",
          placeholder: "Origin Level*",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "origin",
          placeholder: "Origin*",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "destinationLevel",
          placeholder: "Destination Level*",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "destination",
          placeholder: "Destination*",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "glAccountCode",
          placeholder: "GL Account Code",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "appliedAt",
          placeholder: "Applied At",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "addInTotal",
          placeholder: "Add in Total",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "taxPercentage",
          placeholder: "Tax%*",
          type: "number",
        },
        {
          name: "minimumPrice",
          placeholder: "Minimum Price",
          type: "number",
        },
        {
          name: "maximumPrice",
          placeholder: "Maximum Price",
          type: "number",
        },
        {
          name: "appliedOn",
          placeholder: "Applied On*",
          type: "text",
        },
        {
          name: "status",
          placeholder: "Status",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Parameter",
      fields: [
        {
          name: "destinationState",
          placeholder: "Destination State",
          type: "text",
        },
        {
          name: "includeDestinationState",
          type: "radio",
          options: [
            {
              label: "Exclude",
              value: "exclude",
            },
            {
              label: "Include",
              value: "include",
            },
          ],
        },
        {
          name: "destinationCountry",
          placeholder: "Destination Country",
          type: "text",
        },
        {
          name: "includeDestinationCountry",
          type: "radio",
          options: [
            {
              label: "Exclude",
              value: "exclude",
            },
            {
              label: "Include",
              value: "include",
            },
          ],
        },
      ],
    },
    {
      sectionName: "Remarks",
      fields: [
        {
          name: "remarks",
          placeholder: "Remarks",
          type: "text",
        },
      ],
    },
  ]

  const filterHookForm = useForm()
  const form = useForm()

  return (
    <MastersPageTemplate
      heading="Taxline Master"
      buttonText="Create Taxline"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterHookForm}
      hookForm={form}
      sectionedFormFields={sectionedFormFields}
    />
  )
}
