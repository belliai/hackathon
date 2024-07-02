"use client";

import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge";
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import { DataTable } from "@/components/data-table/data-table";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useFieldArray, useForm } from "react-hook-form";

export default function MasterCapacityMaster() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "dest",
      header: "Dest",
    },
    {
      accessorKey: "airlineCarrier",
      header: "Airline Carrier",
    },
    {
      accessorKey: "aircraftType",
      header: "Aircraft Type",
    },
    {
      accessorKey: "equipment",
      header: "Equipment",
    },
    {
      accessorKey: "capacityWt",
      header: "Capacity Wt",
    },
    {
      accessorKey: "uom",
      header: "UOM",
    },
    {
      accessorKey: "capacityVol",
      header: "Capacity Vol",
    },
    {
      accessorKey: "fromDate",
      header: "From Date",
    },
    {
      accessorKey: "toDate",
      header: "To Date",
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
      accessorKey: "overBookingPercent",
      header: "Over-Booking %",
    },
    {
      accessorKey: "flightNo",
      header: "Flight NO",
    },
    {
      accessorKey: "shcDetail",
      header: "SHC Detail",
    },
    {
      accessorKey: "ld1",
      header: "LD1",
    },
    {
      accessorKey: "ld2",
      header: "LD2",
    },
    {
      accessorKey: "ld3",
      header: "LD3",
    },
    {
      accessorKey: "ld4",
      header: "LD4",
    },
    {
      accessorKey: "ld5",
      header: "LD5",
    },
    {
      accessorKey: "ld6",
      header: "LD6",
    },
    {
      accessorKey: "ld7",
      header: "LD7",
    },
    {
      accessorKey: "ld8",
      header: "LD8",
    },
    {
      accessorKey: "ld9",
      header: "LD9",
    },
    {
      accessorKey: "ld10",
      header: "LD10",
    },
    {
      accessorKey: "ld11",
      header: "LD11",
    },
    {
      accessorKey: "flightType",
      header: "Flight Type",
    },
    actionColumn,
  ];

  const formFields: TFormTextField[] = [
    {
      name: "origin",
      label: "Origin",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "dest",
      label: "Dest",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "aircraftType",
      label: "Aircraft Type",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "fromDate",
      label: "From Date",
      type: "date",
      orientation: "horizontal",
    },
    {
      name: "toDate",
      label: "To Date",
      type: "date",
      orientation: "horizontal",
    },
    {
      name: "overBooking",
      label: "Over Booking %",
      type: "number",
      orientation: "horizontal",
    },
    {
      name: "capacityWt",
      label: "Capacity Wt",
      type: "number",
      orientation: "horizontal",
    },
    {
      name: "uom",
      label: "UOM",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "capacityVol",
      label: "Capacity Vol",
      type: "number",
      orientation: "horizontal",
    },
    {
      name: "equipment",
      label: "Equipment",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "flightNo",
      label: "Flight No",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "airlineCarrier",
      label: "Airline Carrier",
      type: "text",
      orientation: "horizontal",
    },
    {
      name: "flightType",
      label: "Flight Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
      orientation: "horizontal",
    },
    {
      name: "active",
      label: "Active",
      type: "checkbox",
    },
  ];

  const data = [
    {
      origin: "JFK",
      dest: "LAX",
      airlineCarrier: "American Airlines",
      aircraftType: "Boeing 777",
      equipment: "Standard",
      capacityWt: 50000,
      uom: "kg",
      capacityVol: 600,
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
      status: "Active",
      overBookingPercent: 10,
      flightNo: "AA100",
      shcDetail: "General Cargo",
      ld1: 20,
      ld2: 30,
      ld3: 40,
      ld4: 50,
      ld5: 60,
      ld6: 70,
      ld7: 80,
      ld8: 90,
      ld9: 100,
      ld10: 110,
      ld11: 120,
      flightType: "Cargo",
    },
    {
      origin: "ORD",
      dest: "SFO",
      airlineCarrier: "United Airlines",
      aircraftType: "Airbus A320",
      equipment: "Standard",
      capacityWt: 45000,
      uom: "kg",
      capacityVol: 550,
      fromDate: "2023-02-01",
      toDate: "2023-11-30",
      status: "Inactive",
      overBookingPercent: 5,
      flightNo: "UA200",
      shcDetail: "Perishable",
      ld1: 15,
      ld2: 25,
      ld3: 35,
      ld4: 45,
      ld5: 55,
      ld6: 65,
      ld7: 75,
      ld8: 85,
      ld9: 95,
      ld10: 105,
      ld11: 115,
      flightType: "Passenger",
    },
    {
      origin: "ATL",
      dest: "MIA",
      airlineCarrier: "Delta Airlines",
      aircraftType: "Boeing 737",
      equipment: "Standard",
      capacityWt: 48000,
      uom: "kg",
      capacityVol: 580,
      fromDate: "2023-03-01",
      toDate: "2023-10-31",
      status: "Active",
      overBookingPercent: 15,
      flightNo: "DL300",
      shcDetail: "Hazardous",
      ld1: 10,
      ld2: 20,
      ld3: 30,
      ld4: 40,
      ld5: 50,
      ld6: 60,
      ld7: 70,
      ld8: 80,
      ld9: 90,
      ld10: 100,
      ld11: 110,
      flightType: "Cargo",
    },
    {
      origin: "LHR",
      dest: "DXB",
      airlineCarrier: "Emirates",
      aircraftType: "Airbus A380",
      equipment: "Standard",
      capacityWt: 60000,
      uom: "kg",
      capacityVol: 650,
      fromDate: "2023-04-01",
      toDate: "2023-09-30",
      status: "Active",
      overBookingPercent: 20,
      flightNo: "EK400",
      shcDetail: "Live Animals",
      ld1: 25,
      ld2: 35,
      ld3: 45,
      ld4: 55,
      ld5: 65,
      ld6: 75,
      ld7: 85,
      ld8: 95,
      ld9: 105,
      ld10: 115,
      ld11: 125,
      flightType: "Passenger",
    },
    {
      origin: "HND",
      dest: "SYD",
      airlineCarrier: "Qantas",
      aircraftType: "Boeing 787",
      equipment: "Standard",
      capacityWt: 52000,
      uom: "kg",
      capacityVol: 610,
      fromDate: "2023-05-01",
      toDate: "2023-08-31",
      status: "Inactive",
      overBookingPercent: 25,
      flightNo: "QF500",
      shcDetail: "General Cargo",
      ld1: 30,
      ld2: 40,
      ld3: 50,
      ld4: 60,
      ld5: 70,
      ld6: 80,
      ld7: 90,
      ld8: 100,
      ld9: 110,
      ld10: 120,
      ld11: 130,
      flightType: "Cargo",
    },
  ];

  const form = useForm({
    defaultValues: {
      ulds: [
        {
          uldType: "",
          count: "",
        },
      ],
      shcs: [
        {
          shcType: "",
          count: "",
        },
      ],
    },
  });

  const uldsFieldArray = useFieldArray<any>({
    control: form.control,
    name: "ulds",
  });

  const shcsFieldArray = useFieldArray<any>({
    control: form.control,
    name: "shcs",
  });

  return (
    <CreateFormPageTemplate
      heading="Capacity Master"
      hookForm={form}
      sectionedFormFields={[
        {
          fields: formFields,
        },
        {
          sectionName: " ",
          fieldArray: {
            fieldArray: uldsFieldArray,
            fieldArrayName: "ulds",
            fields: [
              {
                name: "uldType",
                type: "select",
                placeholder: "ULD",
                options: DUMMY_SELECT_OPTIONS,
              },
              {
                name: "count",
                type: "text",
                placeholder: "SHC",
              },
            ],
          },
        },
        {
          sectionName: " ",
          fieldArray: {
            fieldArray: shcsFieldArray,
            fieldArrayName: "shcs",
            fields: [
              {
                name: "shcType",
                type: "select",
                placeholder: "SHC",
                options: DUMMY_SELECT_OPTIONS,
              },
              {
                name: "count",
                type: "text",
                placeholder: "SHC",
              },
            ],
          },
        },
      ]}
      className="max-h-none"
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96 mt-8">
            <FilterActions />
          </div>
          <Separator />
          <DataTable hideToolbar columns={columns} data={data} />
        </div>
      }
    />
  );
}
