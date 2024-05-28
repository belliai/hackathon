"use client";

import { ColumnDef } from "@tanstack/react-table";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import StatusBadge from "../../components/StatusBadge";
import { actionColumn, selectColumn } from "../../components/columnItem";
import { TFormTextField } from "@/components/form/FormTextField";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions";
import { useForm } from "react-hook-form";

// Registration Number *
// Warehouse Code *

// Select Ignition Status

export default function MasterVehiclePage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "registrationNumber",
      header: "Registration Number",
    },
    {
      accessorKey: "warehouseCode",
      header: "Warehouse Code",
    },
    {
      accessorKey: "ignitionStatus",
      header: "Ignition Status",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.ignitionStatus}
          severity={
            row.original.ignitionStatus === "IGN ON" ? "default" : "error"
          }
        />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge
          statusText={row.original.status === "FREE" ? "default" : "error"}
          severity="default"
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
  ];

  const data = [
    {
      registrationNumber: "ABC123",
      warehouseCode: "WH001",
      ignitionStatus: "IGN ON",
      status: "FREE",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-10",
    },
    {
      registrationNumber: "DEF456",
      warehouseCode: "WH002",
      ignitionStatus: "IGN OFF",
      status: "OCCUPIED",
      createdAt: "2023-02-01",
      updatedAt: "2023-02-10",
    },
    {
      registrationNumber: "GHI789",
      warehouseCode: "WH003",
      ignitionStatus: "IGN ON",
      status: "FREE",
      createdAt: "2023-03-01",
      updatedAt: "2023-03-10",
    },
    {
      registrationNumber: "JKL012",
      warehouseCode: "WH004",
      ignitionStatus: "IGN OFF",
      status: "OCCUPIED",
      createdAt: "2023-04-01",
      updatedAt: "2023-04-10",
    },
    {
      registrationNumber: "MNO345",
      warehouseCode: "WH005",
      ignitionStatus: "IGN ON",
      status: "FREE",
      createdAt: "2023-05-01",
      updatedAt: "2023-05-10",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "registrationNumber",
      placeholder: "Registration Number",
      type: "text",
    },
    {
      name: "warehouseCode",
      placeholder: "Warehouse Code",
      type: "text",
    },
    {
      name: "ignitionStatus",
      placeholder: "Select Ignition Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const formFields = [
    {
      name: "registrationNumber",
      placeholder: "Enter Registration No",
      type: "text",
    },
    {
      name: "vehicleType",
      placeholder: "Select Vehicle Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "bodyType",
      placeholder: "Select Body Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "warehouse",
      placeholder: "Select Warehouse",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "fuelType",
      placeholder: "Fuel Type",
      type: "text",
    },
    {
      name: "chassisNumber",
      placeholder: "Chassis Number",
      type: "text",
    },
    {
      name: "engineNumber",
      placeholder: "Engine Number",
      type: "text",
    },
    {
      name: "currentLocation",
      placeholder: "Current Location",
      type: "text",
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
  ];

  const filterHookForm = useForm();
  const hookForm = useForm();

  return (
    <MastersPageTemplate
      heading="Vehicle List"
      buttonText="Create Vehicle"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      formFields={formFields}
      filterHookForm={filterHookForm}
      hookForm={hookForm}
    />
  );
}
