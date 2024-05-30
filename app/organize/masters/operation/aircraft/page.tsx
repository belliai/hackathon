"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TFormTextField } from "@/components/form/FormTextField";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import MastersPageTemplate, {
  SectionedFormFields,
} from "../../components/MastersPageTemplate";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions";
import { actionColumn, selectColumn } from "../../components/columnItem";
import StatusBadge from "../../components/StatusBadge";

export default function MasterAircraftPage() {
  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
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
          name: "mtow",
          placeholder: "MTOW",
          type: "text",
        },
        {
          name: "unitMtow",
          placeholder: "MTOW Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxZeroFuelWt",
          placeholder: "Max Zero Fuel Weight",
          type: "text",
        },
        {
          name: "unitMaxZeroFuelWt",
          placeholder: "Max Zero Fuel Weight Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "bodyType",
          placeholder: "Body Type",
          type: "text",
        },
        {
          name: "paxCap",
          placeholder: "Passenger Capacity",
          type: "text",
        },
        {
          name: "uldPos",
          placeholder: "ULD Positions",
          type: "text",
        },
        {
          name: "landingWt",
          placeholder: "Landing Weight",
          type: "text",
        },
        {
          name: "unitLandingWt",
          placeholder: "Landing Weight Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "cargoCap",
          placeholder: "Cargo Capacity",
          type: "text",
        },
        {
          name: "unitCargoCap",
          placeholder: "Cargo Capacity Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxBulkCapWt",
          placeholder: "Max Bulk Capacity Weight",
          type: "text",
        },
        {
          name: "unitMaxBulkCapWt",
          placeholder: "Max Bulk Capacity Weight Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxBulkCapVol",
          placeholder: "Max Bulk Capacity Volume",
          type: "text",
        },
        {
          name: "unitMaxBulkCapVol",
          placeholder: "Max Bulk Capacity Volume Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxVolume",
          placeholder: "Max Volume",
          type: "text",
        },
        {
          name: "cubicMaxVolume",
          placeholder: "Cubic (Max Volume)",
          type: "text",
        },
        {
          name: "restrWtPc",
          placeholder: "Restricted Weight per Piece",
          type: "text",
        },
        {
          name: "unitRestrWtPc",
          placeholder: "Restricted Weight per Piece Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxDimPcL",
          placeholder: "Max Dimension per Piece (Length)",
          type: "text",
        },
        {
          name: "maxDimPcB",
          placeholder: "Max Dimension per Piece (Breadth)",
          type: "text",
        },
        {
          name: "maxDimPcH",
          placeholder: "Max Dimension per Piece (Height)",
          type: "text",
        },
        {
          name: "unitDimensions",
          placeholder: "Dimensions Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "status",
          placeholder: "Status",
          type: "text",
        },
        {
          name: "glCode",
          placeholder: "GL Code",
          type: "text",
        },
        {
          name: "count",
          placeholder: "Count",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Door Dim",
      fields: [
        {
          name: "aftHeight",
          placeholder: "AFT (H)",
          type: "text",
        },
        {
          name: "aftWidth",
          placeholder: "AFT (W)",
          type: "text",
        },
        {
          name: "fwdHeight",
          placeholder: "FWD (H)",
          type: "text",
        },
        {
          name: "fwdWidth",
          placeholder: "FWD (W)",
          type: "text",
        },
        {
          name: "bulkHeight",
          placeholder: "Bulk (H)",
          type: "text",
        },
        {
          name: "bulkWidth",
          placeholder: "Bulk (W)",
          type: "text",
        },
        {
          name: "unit",
          placeholder: "Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
    {
      sectionName: "Section Volume",
      fields: [
        {
          name: "FWT",
          placeholder: "FWT",
          type: "text",
        },
        {
          name: "FWD",
          placeholder: "FWD",
          type: "text",
        },
        {
          name: "bulk",
          placeholder: "Bulk",
          type: "text",
        },
        {
          name: "cubic",
          placeholder: "Cubic",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "manufacturer",
      placeholder: "Manufacturer",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "aircraftType",
      placeholder: "Aircraft Type",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "version",
      placeholder: "Version",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "fromDate",
      placeholder: "From Date",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "toDate",
      placeholder: "To Date",
      type: "date",
      hideTooltip: true,
    },
  ];

  const columns: ColumnDef<any>[] = [
    selectColumn,
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
      accessorKey: "paxCap",
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
      accessorKey: "maxZeroFuelWt",
      header: "Max Zero Fuel Wt",
    },
    {
      accessorKey: "bodyType",
      header: "Body Type",
    },
    {
      accessorKey: "activeCount",
      header: "Active Count",
    },
    {
      accessorKey: "inactiveCount",
      header: "Inactive Count",
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
    actionColumn,
  ];

  const filterHookForm = useForm();
  const sectionedHookForm = useForm();

  const data = [
    {
      manufacturer: "Boeing",
      aircraftType: "737",
      version: "800",
      paxCap: 189,
      landingWt: "65,317 kg",
      cargoCap: "20,000 kg",
      mtow: "79,015 kg",
      maxZeroFuelWt: "61,688 kg",
      bodyType: "Narrow-body",
      activeCount: 15,
      inactiveCount: 3,
      status: "Active",
      createdAt: "2023-01-15",
      updatedAt: "2023-12-01",
      action: "Edit",
    },
    {
      manufacturer: "Airbus",
      aircraftType: "A320",
      version: "Neo",
      paxCap: 195,
      landingWt: "66,000 kg",
      cargoCap: "21,000 kg",
      mtow: "79,000 kg",
      maxZeroFuelWt: "62,500 kg",
      bodyType: "Narrow-body",
      activeCount: 12,
      inactiveCount: 4,
      status: "Inactive",
      createdAt: "2023-02-20",
      updatedAt: "2023-11-25",
      action: "Edit",
    },
    {
      manufacturer: "Embraer",
      aircraftType: "E195",
      version: "E2",
      paxCap: 132,
      landingWt: "49,800 kg",
      cargoCap: "13,300 kg",
      mtow: "62,000 kg",
      maxZeroFuelWt: "50,790 kg",
      bodyType: "Narrow-body",
      activeCount: 10,
      inactiveCount: 2,
      status: "Active",
      createdAt: "2023-03-05",
      updatedAt: "2023-10-30",
      action: "Edit",
    },
    {
      manufacturer: "Boeing",
      aircraftType: "787",
      version: "9",
      paxCap: 296,
      landingWt: "192,000 kg",
      cargoCap: "47,000 kg",
      mtow: "254,000 kg",
      maxZeroFuelWt: "187,000 kg",
      bodyType: "Wide-body",
      activeCount: 5,
      inactiveCount: 1,
      status: "Active",
      createdAt: "2023-04-10",
      updatedAt: "2023-09-15",
      action: "Edit",
    },
    {
      manufacturer: "Airbus",
      aircraftType: "A350",
      version: "1000",
      paxCap: 369,
      landingWt: "233,000 kg",
      cargoCap: "51,000 kg",
      mtow: "308,000 kg",
      maxZeroFuelWt: "223,000 kg",
      bodyType: "Wide-body",
      activeCount: 7,
      inactiveCount: 0,
      status: "Inactive",
      createdAt: "2023-05-25",
      updatedAt: "2023-08-20",
      action: "Edit",
    },
  ];

  return (
    <MastersPageTemplate
      heading="Aircraft Master"
      buttonText="Create Aircraft"
      columns={columns}
      sectionedFormFields={sectionedFormFields}
      filterFormFields={filterFormFields}
      filterHookForm={filterHookForm}
      hookForm={sectionedHookForm}
      data={data}
    />
  );
}
