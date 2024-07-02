"use client";

import CreateFormTemplate from "@/app/k360/organize/masters/components/CreateFormTemplate";
import MastersPageTemplate, {
  SectionedFormFields,
} from "@/app/k360/organize/masters/components/MastersPageTemplate";
import StatusBadge from "@/app/k360/organize/masters/components/StatusBadge";
import {
  actionColumn,
  selectColumn,
} from "@/app/k360/organize/masters/components/columnItem";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "@/app/k360/organize/masters/components/dummySelectOptions";
import { TFormTextField } from "@/components/form/FormTextField";
import FilterActions from "@/components/page-template/FilterActions";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export default function MasterAircraftPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "manuf",
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
      header: "Passenger Capacity",
    },
    {
      accessorKey: "landingWt",
      header: "Landing Weight",
    },
    {
      accessorKey: "cargoCap",
      header: "Cargo Capacity",
    },
    {
      accessorKey: "mtow",
      header: "Maximum Takeoff Weight (MTOW)",
    },
    {
      accessorKey: "restWt",
      header: "Rest Weight",
    },
    {
      accessorKey: "dims",
      header: "Dimensions",
    },
    {
      accessorKey: "vol",
      header: "Volume",
    },
    {
      accessorKey: "maxZeroFuelWt",
      header: "Maximum Zero Fuel Weight",
    },
    {
      accessorKey: "maxWidebodyBulkCap",
      header: "Maximum Widebody Bulk Capacity (Weight & Volume)",
    },
    {
      accessorKey: "bodyType",
      header: "Body Type",
    },
    {
      accessorKey: "uldPositions",
      header: "ULD Positions",
    },
    {
      accessorKey: "doorDims",
      header: "Door Dimensions",
    },
    {
      accessorKey: "maxFloorLoadWtPerSqFt",
      header: "Maximum Floor Load Weight per sq. ft.",
    },
    {
      accessorKey: "maxHurm",
      header: "Maximum HURM",
    },
    {
      accessorKey: "eqCount",
      header: "Equipment Count",
    },
    {
      accessorKey: "maxContainers",
      header: "Maximum Containers",
    },
    {
      accessorKey: "containerType",
      header: "Container Type",
    },
    actionColumn,
  ];

  const data = [
    {
      manuf: "Embraer",
      aircraftType: "737",
      version: "400",
      paxCapacity: 125,
      landingWt: 54929,
      cargoCap: 11644,
      mtow: 84035,
      restWt: 53332,
      dims: "30x40x50",
      vol: 1774,
      maxZeroFuelWt: 64344,
      maxWidebodyBulkCap: "7000 kg, 1400 m3",
      bodyType: "Narrowbody",
      uldPositions: 18,
      doorDims: "3x4",
      maxFloorLoadWtPerSqFt: 1418,
      maxHurm: 18,
      eqCount: 9,
      maxContainers: 13,
      containerType: "Type C",
    },
    {
      manuf: "Airbus",
      aircraftType: "E195",
      version: "100",
      paxCapacity: 203,
      landingWt: 54735,
      cargoCap: 17597,
      mtow: 71981,
      restWt: 57463,
      dims: "40x50x60",
      vol: 1462,
      maxZeroFuelWt: 74897,
      maxWidebodyBulkCap: "7000 kg, 1400 m3",
      bodyType: "Widebody",
      uldPositions: 13,
      doorDims: "3x4",
      maxFloorLoadWtPerSqFt: 1394,
      maxHurm: 29,
      eqCount: 5,
      maxContainers: 9,
      containerType: "Type A",
    },
    {
      manuf: "Bombardier",
      aircraftType: "CRJ900",
      version: "200",
      paxCapacity: 255,
      landingWt: 67789,
      cargoCap: 29118,
      mtow: 81621,
      restWt: 50635,
      dims: "40x50x60",
      vol: 1688,
      maxZeroFuelWt: 62540,
      maxWidebodyBulkCap: "6000 kg, 1200 m3",
      bodyType: "Narrowbody",
      uldPositions: 14,
      doorDims: "3x4",
      maxFloorLoadWtPerSqFt: 1920,
      maxHurm: 25,
      eqCount: 11,
      maxContainers: 11,
      containerType: "Type C",
    },
    {
      manuf: "Embraer",
      aircraftType: "E195",
      version: "300",
      paxCapacity: 147,
      landingWt: 68408,
      cargoCap: 19994,
      mtow: 74311,
      restWt: 41644,
      dims: "30x40x50",
      vol: 1186,
      maxZeroFuelWt: 79014,
      maxWidebodyBulkCap: "6000 kg, 1200 m3",
      bodyType: "Widebody",
      uldPositions: 18,
      doorDims: "3x4",
      maxFloorLoadWtPerSqFt: 1546,
      maxHurm: 19,
      eqCount: 11,
      maxContainers: 7,
      containerType: "Type A",
    },
    {
      manuf: "Boeing",
      aircraftType: "A320",
      version: "200",
      paxCapacity: 192,
      landingWt: 51927,
      cargoCap: 19131,
      mtow: 70454,
      restWt: 57448,
      dims: "40x50x60",
      vol: 1053,
      maxZeroFuelWt: 62427,
      maxWidebodyBulkCap: "6000 kg, 1200 m3",
      bodyType: "Narrowbody",
      uldPositions: 19,
      doorDims: "2x3",
      maxFloorLoadWtPerSqFt: 1402,
      maxHurm: 38,
      eqCount: 5,
      maxContainers: 8,
      containerType: "Type A",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "manufacturer",
      label: "Manufacturer",
      type: "text",
    },
    {
      name: "aircraftType",
      label: "Aircraft Type",
      type: "text",
    },
    {
      name: "version",
      label: "Version",
      type: "text",
    },
  ];

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "manufacturer",
          label: "Manufacturer",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "aircraftType",
          label: "Aircraft Type",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "version",
          label: "Version",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "mtow",
          label: "MTOW",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitMtow",
          label: "MTOW Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxZeroFuelWt",
          label: "Max Zero Fuel Weight",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitMaxZeroFuelWt",
          label: "Max Zero Fuel Weight Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "bodyType",
          label: "Body Type",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "paxCap",
          label: "Passenger Capacity",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "uldPos",
          label: "ULD Positions",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "landingWt",
          label: "Landing Weight",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitLandingWt",
          label: "Landing Weight Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "cargoCap",
          label: "Cargo Capacity",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitCargoCap",
          label: "Cargo Capacity Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxBulkCapWt",
          label: "Max Bulk Capacity Weight",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitMaxBulkCapWt",
          label: "Max Bulk Capacity Weight Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxBulkCapVol",
          label: "Max Bulk Capacity Volume",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitMaxBulkCapVol",
          label: "Max Bulk Capacity Volume Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxVolume",
          label: "Max Volume",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "cubicMaxVolume",
          label: "Cubic (Max Volume)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "restrWtPc",
          label: "Restricted Weight per Piece",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitRestrWtPc",
          label: "Restricted Weight per Piece Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxDimPcL",
          label: "Max Dimension per Piece (Length)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "maxDimPcB",
          label: "Max Dimension per Piece (Breadth)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "maxDimPcH",
          label: "Max Dimension per Piece (Height)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unitDimensions",
          label: "Dimensions Unit",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "status",
          label: "Status",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "glCode",
          label: "GL Code",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "count",
          label: "Count",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Door Dim",
      fields: [
        {
          name: "aftHeight",
          label: "AFT (H)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "aftWidth",
          label: "AFT (W)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "fwdHeight",
          label: "FWD (H)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "fwdWidth",
          label: "FWD (W)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "bulkHeight",
          label: "Bulk (H)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "bulkWidth",
          label: "Bulk (W)",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "unit",
          label: "Unit",
          orientation: "horizontal",
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
          label: "FWT",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "FWD",
          label: "FWD",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "bulk",
          label: "Bulk",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "cubic",
          label: "Cubic",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
    {
      sectionName: " ",
      fields: [
        {
          name: "maxContainers",
          label: "Max Containers",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "containerType",
          label: "Container Type",
          orientation: "horizontal",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "middleSection",
          label: "Middle Section",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "rearSection",
          label: "Rear Section",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "frontSection",
          label: "Front Section",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "acceptableKennels",
          label: "Acceptable Kennels",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "kennelCount",
          label: "Kennel Count",
          orientation: "horizontal",
          type: "text",
        },
        {
          name: "maxLbh",
          label: "Max LBH",
          orientation: "horizontal",
          type: "text",
        },
      ],
    },
  ];

  const filterHookForm = useForm();
  const sectionedHookForm = useForm();

  return (
    <MastersPageTemplate
      heading="Aircraft Master"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterHookForm}
      customFilterButtons={<FilterActions />}
      bottomCustomComponent={
        <CreateFormTemplate
          hookForm={sectionedHookForm}
          sectionedFormFields={sectionedFormFields}
          className="max-h-none"
          customDialogContent={
            <Button variant="button-primary" className="mt-4">
              Save
            </Button>
          }
        />
      }
    />
  );
}
