"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../../components/StatusBadge";
import { TFormTextField } from "@/components/form/FormTextField";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { DUMMY_SELECT_OPTIONS_STATUS } from "../../components/dummySelectOptions";
import { useForm } from "react-hook-form";

export default function MasterEquipmentPage() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "manufacturer",
      header: "Manufacturer",
    },
    {
      accessorKey: "aircraftType",
      header: "Aircraft Type",
    },
    {
      accessorKey: "version",
      header: "Version",
    },
    {
      accessorKey: "paxCapacity",
      header: "Pax Capacity",
    },
    {
      accessorKey: "landingWt",
      header: "Landing Wt",
    },
    {
      accessorKey: "cargoCap",
      header: "Cargo Cap",
    },
    {
      accessorKey: "mtow",
      header: "MTOW",
    },
    {
      accessorKey: "tailNo",
      header: "Tail No",
    },
    {
      accessorKey: "maxZeroFuelWt",
      header: "Max Zero Fuel Wt",
    },
    {
      accessorKey: "maxBulkCapVol",
      header: "Max Bulk Cap. Vol",
    },
    {
      accessorKey: "bodyType",
      header: "Body Type",
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
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
  ];

  const formFields: TFormTextField[] = [
    {
      name: "manufacturer",
      placeholder: "Manufacturer",
      type: "text",
    },
    {
      name: "aircraftType",
      placeholder: "Aircraft Type",
      type: "text",
    },
    {
      name: "version",
      placeholder: "Version",
      type: "text",
    },
    {
      name: "tailNo",
      placeholder: "Tail No",
      type: "text",
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "fromDate",
      placeholder: "Choose From Date",
      label: "From",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "toDate",
      placeholder: "Choose To Date",
      label: "To",
      type: "date",
      hideTooltip: true,
    },
  ];

  const data = [
    {
      manufacturer: "Boeing",
      aircraftType: "737",
      version: "800",
      paxCapacity: 189,
      landingWt: "66,360 kg",
      cargoCap: "20,000 kg",
      mtow: "79,015 kg",
      tailNo: "N737BA",
      maxZeroFuelWt: "61,688 kg",
      maxBulkCapVol: "30 m³",
      bodyType: "Narrow-body",
      status: "Active",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
    },
    {
      manufacturer: "Airbus",
      aircraftType: "A320",
      version: "neo",
      paxCapacity: 195,
      landingWt: "66,000 kg",
      cargoCap: "21,000 kg",
      mtow: "79,000 kg",
      tailNo: "N320AB",
      maxZeroFuelWt: "62,500 kg",
      maxBulkCapVol: "31 m³",
      bodyType: "Narrow-body",
      status: "Inactive",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-25",
    },
    {
      manufacturer: "Boeing",
      aircraftType: "787",
      version: "9",
      paxCapacity: 296,
      landingWt: "193,000 kg",
      cargoCap: "46,000 kg",
      mtow: "254,000 kg",
      tailNo: "N789BA",
      maxZeroFuelWt: "192,776 kg",
      maxBulkCapVol: "150 m³",
      bodyType: "Wide-body",
      status: "Active",
      createdAt: "2023-03-05",
      updatedAt: "2023-10-30",
    },
    {
      manufacturer: "Airbus",
      aircraftType: "A350",
      version: "900",
      paxCapacity: 325,
      landingWt: "205,000 kg",
      cargoCap: "50,000 kg",
      mtow: "275,000 kg",
      tailNo: "N350AB",
      maxZeroFuelWt: "190,000 kg",
      maxBulkCapVol: "160 m³",
      bodyType: "Wide-body",
      status: "Inactive",
      createdAt: "2023-04-10",
      updatedAt: "2023-09-15",
    },
    {
      manufacturer: "Embraer",
      aircraftType: "E195",
      version: "E2",
      paxCapacity: 146,
      landingWt: "54,500 kg",
      cargoCap: "13,000 kg",
      mtow: "62,000 kg",
      tailNo: "N195EM",
      maxZeroFuelWt: "50,000 kg",
      maxBulkCapVol: "27 m³",
      bodyType: "Narrow-body",
      status: "Active",
      createdAt: "2023-05-25",
      updatedAt: "2023-08-20",
    },
  ];

  const equipmentForm = useForm();
  const filterForm = useForm();

  // TODO: Complete formfields, currently it is missing in the reference

  return (
    <MastersPageTemplate
      heading="Equipment Master"
      buttonText="Create Equipment"
      hookForm={equipmentForm}
      filterHookForm={filterForm}
      formFields={formFields}
      filterFormFields={formFields}
      columns={columns}
      data={data}
    />
  );
}
