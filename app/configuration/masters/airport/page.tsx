"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { TFormTextField } from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate"
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge"

export default function MasterAirportPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "countryCode",
      header: "Country Code",
    },
    {
      accessorKey: "region",
      header: "Region",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "city",
      header: "City",
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
      accessorKey: "uom",
      header: "UOM",
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
      countryCode: "US",
      region: "North America",
      state: "California",
      name: "Los Angeles",
      code: "LAX",
      type: "Airport",
      city: "Los Angeles",
      status: "Active",
      uom: "km",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
      action: "Edit",
    },
    {
      countryCode: "CA",
      region: "North America",
      state: "Ontario",
      name: "Toronto",
      code: "YYZ",
      type: "Airport",
      city: "Toronto",
      status: "Inactive",
      uom: "km",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-25",
      action: "Edit",
    },
    {
      countryCode: "GB",
      region: "Europe",
      state: "England",
      name: "London",
      code: "LHR",
      type: "Airport",
      city: "London",
      status: "Active",
      uom: "km",
      createdAt: "2023-03-05",
      updatedAt: "2023-10-30",
      action: "Edit",
    },
    {
      countryCode: "JP",
      region: "Asia",
      state: "Tokyo",
      name: "Narita",
      code: "NRT",
      type: "Airport",
      city: "Narita",
      status: "Inactive",
      uom: "km",
      createdAt: "2023-04-10",
      updatedAt: "2023-09-15",
      action: "Edit",
    },
    {
      countryCode: "DE",
      region: "Europe",
      state: "Bavaria",
      name: "Munich",
      code: "MUC",
      type: "Airport",
      city: "Munich",
      status: "Active",
      uom: "km",
      createdAt: "2023-05-25",
      updatedAt: "2023-08-20",
      action: "Edit",
    },
  ]

  const filterFormFields: TFormTextField[] = [
    {
      name: "code",
      placeholder: "Code",
      type: "text",
    },
    {
      name: "name",
      placeholder: "Name",
      type: "text",
    },
    {
      name: "type",
      type: "select",
      placeholder: "Type",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "city",
      placeholder: "City",
      type: "text",
      endIcon: <Search />,
    },
  ]

  const airportForm = useForm({
    defaultValues: {
      hoursOfOperation: [
        { day: "Monday", from: "", to: "", closed: false },
        { day: "Tuesday", from: "", to: "", closed: false },
        { day: "Wednesday", from: "", to: "", closed: false },
        { day: "Thursday", from: "", to: "", closed: false },
        { day: "Friday", from: "", to: "", closed: false },
        { day: "Saturday", from: "", to: "", closed: false },
        { day: "Sunday", from: "", to: "", closed: false },
      ],
    },
  })
  const airportFieldArray = useFieldArray<any>({
    control: airportForm.control,
    name: "hoursOfOperation",
  })

  return (
    <CreateFormPageTemplate
      heading="Airport Master"
      hookForm={airportForm}
      className="max-h-none"
      sectionedFormFields={[
        {
          fields: [
            {
              name: "airportCode",
              type: "text",
              label: "Airport Code",
              orientation: "horizontal",
            },
            {
              name: "airportName",
              type: "text",
              label: "Airport Name",
              orientation: "horizontal",
            },
            {
              name: "countryCode",
              type: "select",
              label: "Country Code",
              options: DUMMY_SELECT_OPTIONS,
              orientation: "horizontal",
            },
            {
              name: "region",
              type: "select",
              label: "Region",
              options: DUMMY_SELECT_OPTIONS,
              orientation: "horizontal",
            },
            {
              name: "managerName",
              type: "text",
              label: "Manager Name",
              orientation: "horizontal",
            },
            {
              name: "managerEmailId",
              type: "text",
              label: "Manager Email Id",
              orientation: "horizontal",
            },
            {
              name: "shiftMobileNo",
              type: "text",
              label: "Shift Mobile No",
              orientation: "horizontal",
            },
            {
              name: "landLineNo",
              type: "text",
              label: "Landline No",
              orientation: "horizontal",
            },
            {
              name: "counterOfficeTime",
              label: "Counter/Office Time",
              type: "text",
              orientation: "horizontal",
            },
            {
              name: "glAccountCode",
              type: "select",
              label: "GL Account Code",
              options: DUMMY_SELECT_OPTIONS,
              orientation: "horizontal",
            },
            {
              name: "Latitude",
              type: "text",
              label: "Latitude",
              orientation: "horizontal",
            },
            {
              name: "Longitude",
              type: "text",
              label: "Longitude",
              orientation: "horizontal",
            },
            {
              name: "portCode",
              type: "text",
              label: "Port Code",
              orientation: "horizontal",
            },
            {
              name: "posMid",
              type: "text",
              label: "POS MID",
              orientation: "horizontal",
            },
            {
              name: "city",
              type: "text",
              label: "City",
              orientation: "horizontal",
            },
            {
              name: "state",
              type: "select",
              label: "State",
              options: DUMMY_SELECT_OPTIONS,
              orientation: "horizontal",
            },
            {
              name: "stationEmailId",
              type: "text",
              label: "Station Email Id",
              orientation: "horizontal",
            },
            {
              name: "managerMobNo",
              type: "text",
              label: "Manager Mobile No",
              orientation: "horizontal",
            },
            {
              name: "airportType",
              type: "select",
              label: "Airport Type",
              options: DUMMY_SELECT_OPTIONS,
              orientation: "horizontal",
            },
            {
              name: "airportCode D2D",
              type: "text",
              label: "Airport Code D2D",
              orientation: "horizontal",
            },
            {
              name: "startDate",
              type: "date",
              label: "Start Date",
              orientation: "horizontal",
            },
            {
              name: "endDate",
              type: "date",
              label: "End Date",
              orientation: "horizontal",
            },
            {
              name: "uldEnabled",
              type: "checkbox",
              label: "ULD Enabled",
            },
            {
              name: "cooler",
              type: "checkbox",
              label: "Cooler",
            },
            {
              name: "showInMobile",
              type: "checkbox",
              label: "Show In Mobile",
            },
            {
              name: "storage",
              type: "checkbox",
              label: "Storage",
            },
            {
              name: "internationalFreight",
              type: "checkbox",
              label: "International Freight",
            },
            {
              name: "screening",
              type: "checkbox",
              label: "Screening",
            },
            {
              name: "undeparted",
              label: "Undeparted Flights Alert",
              type: "checkbox",
            },
            {
              name: "freezer",
              type: "checkbox",
              label: "Freezer",
            },
            {
              name: "active",
              type: "checkbox",
              label: "Active",
            },
            {
              name: "transitScreening",
              type: "checkbox",
              label: "Transit Screening",
            },
            {
              name: "operational",
              type: "checkbox",
              label: "Operational",
            },
          ],
        },
        {
          fields: [
            {
              name: "transitTime",
              type: "date",
              label: "Transit Time",
              orientation: "horizontal",
            },
            {
              name: "cutoffTime",
              type: "date",
              label: "CutOff Time",
              orientation: "horizontal",
            },
            {
              name: "agingDays",
              type: "text",
              label: "Aging Days",
              orientation: "horizontal",
            },
            {
              name: "metro",
              type: "checkbox",
              label: "Metro",
            },
            {
              name: "timeZone",
              type: "select",
              label: "Time Zone",
              orientation: "horizontal",
            },
            {
              name: "uom",
              type: "select",
              options: DUMMY_SELECT_OPTIONS,
              orientation: "horizontal",
              label: "UOM",
            },
            {
              name: "dimsUom",
              type: "select",
              label: "Dims UOM",
              options: DUMMY_SELECT_OPTIONS,
              orientation: "horizontal",
            },
          ],
        },
        {
          sectionName: "Hours of Operation",
          showRemoveButton: false,
          fieldArray: {
            fieldArray: airportFieldArray,
            fieldArrayName: "hoursOfOperation",
            fields: [
              {
                name: "day",
                type: "text",
                placeholder: "Day",
                disabled: true,
              },
              {
                name: "from",
                type: "time",
                placeholder: "From",
              },
              {
                name: "to",
                type: "time",
                placeholder: "To",
              },
              {
                name: "closed",
                type: "checkbox",
                placeholder: "Closed",
              },
            ],
          },
        },
      ]}
      customDialogContent={
        <div className="mt-12 flex gap-2">
          <Button variant="button-primary">Save</Button>
          <Button variant="button-primary">List</Button>
          <Button variant="button-primary">Clear</Button>
        </div>
      }
    />
  )
}
