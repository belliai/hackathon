"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TFormTextField } from "@/components/form/FormTextField";
import {
  Box,
  Calculator,
  DoorClosed,
  Plane,
  Plus,
  ScrollTextIcon,
  Search,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import MastersPageTemplate, {
  SectionedFormFields,
} from "../../components/MastersPageTemplate";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../../components/dummySelectOptions";
import { actionColumn, selectColumn } from "../../components/columnItem";
import StatusBadge from "../../components/StatusBadge";
import CreateEditModal from "@/components/dashboard/modal/create-edit-modal/create-edit-modal";
import { useEffect, useState } from "react";
import MastersPageFieldArrayForm from "../../components/MastersPageFieldArrayForm";
import DimensionsCard from "@/components/dashboard/dimensions-card";
import BalanceCard from "@/components/dashboard/balance-card";
import { Button } from "@/components/ui/button";

export default function MasterAircraftPage() {
  const [openModal, setOpenModal] = useState<string | boolean>(false); // When the state is a string, it means the modal is in edit mode

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
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
        {
          name: "mtow",
          label: "MTOW",
          type: "text",
        },
        {
          name: "unitMtow",
          label: "MTOW Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxZeroFuelWt",
          label: "Max Zero Fuel Weight",
          type: "text",
        },
        {
          name: "unitMaxZeroFuelWt",
          label: "Max Zero Fuel Weight Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "bodyType",
          label: "Body Type",
          type: "text",
        },
        {
          name: "paxCap",
          label: "Passenger Capacity",
          type: "text",
        },
        {
          name: "uldPos",
          label: "ULD Positions",
          type: "text",
        },
        {
          name: "landingWt",
          label: "Landing Weight",
          type: "text",
        },
        {
          name: "unitLandingWt",
          label: "Landing Weight Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "cargoCap",
          label: "Cargo Capacity",
          type: "text",
        },
        {
          name: "unitCargoCap",
          label: "Cargo Capacity Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxBulkCapWt",
          label: "Max Bulk Capacity Weight",
          type: "text",
        },
        {
          name: "unitMaxBulkCapWt",
          label: "Max Bulk Capacity Weight Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxBulkCapVol",
          label: "Max Bulk Capacity Volume",
          type: "text",
        },
        {
          name: "unitMaxBulkCapVol",
          label: "Max Bulk Capacity Volume Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxVolume",
          label: "Max Volume",
          type: "text",
        },
        {
          name: "cubicMaxVolume",
          label: "Cubic (Max Volume)",
          type: "text",
        },
        {
          name: "restrWtPc",
          label: "Restricted Weight per Piece",
          type: "text",
        },
        {
          name: "unitRestrWtPc",
          label: "Restricted Weight per Piece Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "maxDimPcL",
          label: "Max Dimension per Piece (Length)",
          type: "text",
        },
        {
          name: "maxDimPcB",
          label: "Max Dimension per Piece (Breadth)",
          type: "text",
        },
        {
          name: "maxDimPcH",
          label: "Max Dimension per Piece (Height)",
          type: "text",
        },
        {
          name: "unitDimensions",
          label: "Dimensions Unit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "status",
          label: "Status",
          type: "text",
        },
        {
          name: "glCode",
          label: "GL Code",
          type: "text",
        },
        {
          name: "count",
          label: "Count",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Door Dimensions",
      fields: [
        {
          name: "aftHeight",
          label: "AFT (H)",
          type: "text",
        },
        {
          name: "aftWidth",
          label: "AFT (W)",
          type: "text",
        },
        {
          name: "fwdHeight",
          label: "FWD (H)",
          type: "text",
        },
        {
          name: "fwdWidth",
          label: "FWD (W)",
          type: "text",
        },
        {
          name: "bulkHeight",
          label: "Bulk (H)",
          type: "text",
        },
        {
          name: "bulkWidth",
          label: "Bulk (W)",
          type: "text",
        },
        {
          name: "unit",
          label: "Unit",
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
          type: "text",
        },
        {
          name: "FWD",
          label: "FWD",
          type: "text",
        },
        {
          name: "bulk",
          label: "Bulk",
          type: "text",
        },
        {
          name: "cubic",
          label: "Cubic",
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

  const formDefaultValues = {
    id: "",
    manufacturer: "",
    aircraftType: "",
    version: "",
    paxCap: "",
    landingWt: "",
    cargoCap: "",
    mtow: "",
    maxZeroFuelWt: "",
    bodyType: "",
    activeCount: "",
    inactiveCount: "",
    status: "",
    tailNumbers: [
      {
        tailNumber: "",
        status: "",
      },
    ],
    unitMtow: "",
    unitMaxZeroFuelWt: "",
    uldPos: "",
    unitLandingWt: "",
    unitCargoCap: "",
    maxBulkCapWt: "",
    unitMaxBulkCapWt: "",
    maxBulkCapVol: "",
    unitMaxBulkCapVol: "",
    maxVolume: "",
    cubicMaxVolume: "",
    restrWtPc: "",
    unitRestrWtPc: "",
    maxDimPcL: "",
    maxDimPcB: "",
    maxDimPcH: "",
    unitDimensions: "",
    glCode: "",
    count: "",
    aftHeight: "",
    aftWidth: "",
    fwdHeight: "",
    fwdWidth: "",
    bulkHeight: "",
    bulkWidth: "",
    unit: "",
    FWT: "",
    FWD: "",
    bulk: "",
    cubic: "",
  };

  const sectionedHookForm = useForm({
    defaultValues: formDefaultValues,
  });

  const fieldArray = useFieldArray<any>({
    name: "tailNumbers",
    control: sectionedHookForm.control,
  });

  const data = [
    {
      id: "1",
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
      tailNumbers: [
        {
          tailNumber: "N737AA",
          status: "active",
        },
      ],
      unitMtow: "kg",
      unitMaxZeroFuelWt: "kg",
      uldPos: "10",
      unitLandingWt: "kg",
      unitCargoCap: "kg",
      maxBulkCapWt: "15,000 kg",
      unitMaxBulkCapWt: "kg",
      maxBulkCapVol: "200 m³",
      unitMaxBulkCapVol: "m³",
      maxVolume: "800 m³",
      cubicMaxVolume: "900 m³",
      restrWtPc: "1500 kg",
      unitRestrWtPc: "kg",
      maxDimPcL: "10 m",
      maxDimPcB: "3 m",
      maxDimPcH: "2.5 m",
      unitDimensions: "m",
      glCode: "737GL",
      count: 18,
      aftHeight: "4 m",
      aftWidth: "5 m",
      fwdHeight: "4 m",
      fwdWidth: "5 m",
      bulkHeight: "2.5 m",
      bulkWidth: "3 m",
      unit: "m",
      FWT: "300 m³",
      FWD: "500 m³",
      bulk: "100 m³",
      cubic: "m³",
    },
    {
      id: "2",
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
      tailNumbers: [
        {
          tailNumber: "A320AB",
          status: "inactive",
        },
      ],
      unitMtow: "kg",
      unitMaxZeroFuelWt: "kg",
      uldPos: "12",
      unitLandingWt: "kg",
      unitCargoCap: "kg",
      maxBulkCapWt: "17,000 kg",
      unitMaxBulkCapWt: "kg",
      maxBulkCapVol: "250 m³",
      unitMaxBulkCapVol: "m³",
      maxVolume: "900 m³",
      cubicMaxVolume: "1000 m³",
      restrWtPc: "1600 kg",
      unitRestrWtPc: "kg",
      maxDimPcL: "11 m",
      maxDimPcB: "3.2 m",
      maxDimPcH: "2.6 m",
      unitDimensions: "m",
      glCode: "A320GL",
      count: 16,
      aftHeight: "4.2 m",
      aftWidth: "5.1 m",
      fwdHeight: "4.2 m",
      fwdWidth: "5.1 m",
      bulkHeight: "2.6 m",
      bulkWidth: "3.1 m",
      unit: "m",
      FWT: "320 m³",
      FWD: "520 m³",
      bulk: "110 m³",
      cubic: "m³",
    },
    {
      id: "3",
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
      tailNumbers: [
        {
          tailNumber: "E195AC",
          status: "active",
        },
      ],
      unitMtow: "kg",
      unitMaxZeroFuelWt: "kg",
      uldPos: "8",
      unitLandingWt: "kg",
      unitCargoCap: "kg",
      maxBulkCapWt: "12,000 kg",
      unitMaxBulkCapWt: "kg",
      maxBulkCapVol: "150 m³",
      unitMaxBulkCapVol: "m³",
      maxVolume: "600 m³",
      cubicMaxVolume: "700 m³",
      restrWtPc: "1400 kg",
      unitRestrWtPc: "kg",
      maxDimPcL: "9 m",
      maxDimPcB: "2.8 m",
      maxDimPcH: "2.4 m",
      unitDimensions: "m",
      glCode: "E195GL",
      count: 12,
      aftHeight: "3.8 m",
      aftWidth: "4.8 m",
      fwdHeight: "3.8 m",
      fwdWidth: "4.8 m",
      bulkHeight: "2.3 m",
      bulkWidth: "2.8 m",
      unit: "m",
      FWT: "280 m³",
      FWD: "480 m³",
      bulk: "90 m³",
      cubic: "m³",
    },
    {
      id: "4",
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
      tailNumbers: [
        {
          tailNumber: "N787BB",
          status: "Active",
        },
      ],
      unitMtow: "kg",
      unitMaxZeroFuelWt: "kg",
      uldPos: "20",
      unitLandingWt: "kg",
      unitCargoCap: "kg",
      maxBulkCapWt: "40,000 kg",
      unitMaxBulkCapWt: "kg",
      maxBulkCapVol: "700 m³",
      unitMaxBulkCapVol: "m³",
      maxVolume: "2000 m³",
      cubicMaxVolume: "2100 m³",
      restrWtPc: "3000 kg",
      unitRestrWtPc: "kg",
      maxDimPcL: "15 m",
      maxDimPcB: "5 m",
      maxDimPcH: "4 m",
      unitDimensions: "m",
      glCode: "787GL",
      count: 6,
      aftHeight: "5 m",
      aftWidth: "6 m",
      fwdHeight: "5 m",
      fwdWidth: "6 m",
      bulkHeight: "3.5 m",
      bulkWidth: "4 m",
      unit: "m",
      FWT: "500 m³",
      FWD: "700 m³",
      bulk: "150 m³",
      cubic: "m³",
    },
  ];

  return (
    <>
      <MastersPageTemplate
        heading="Aircraft Master"
        buttonText="Create Aircraft"
        columns={columns}
        sectionedFormFields={sectionedFormFields}
        filterFormFields={filterFormFields}
        filterHookForm={filterHookForm}
        hookForm={sectionedHookForm}
        data={data}
        canCreate={false}
        onRowClick={(data) => {
          setOpenModal(data.id);
          sectionedHookForm.reset(data);
        }}
        extraTableToolbarButtons={[
          {
            label: "Create Aircraft",
            icon: Plus,
            variant: "button-primary",
            onClick: () => setOpenModal(true),
          },
        ]}
      />
      <CreateEditModal
        title={
          typeof openModal === "string"
            ? "Edit Aircraft"
            : openModal
            ? "Create Aircraft"
            : ""
        }
        open={openModal !== false}
        form={sectionedHookForm}
        onSubmit={(data) => console.log(data)}
        setOpen={(open) => {
          if (open) {
            setOpenModal(openModal);
          } else {
            sectionedHookForm.reset(formDefaultValues);
            setOpenModal(false);
          }
        }}
        tabItems={[
          {
            label: "Aircraft Details",
            value: "aircraft-details",
            icon: <Plane />,
            formFields: sectionedFormFields[0].fields,
          },
          {
            label: "Tail Numbers",
            value: "tail-numbers",
            icon: <Calculator />,
            content: (
              <MastersPageFieldArrayForm
                fieldArrayProps={{
                  fieldArray,
                  fields: [
                    {
                      name: "tailNumber",
                      placeholder: "Tail Number",
                      type: "text",
                    },
                    {
                      name: "status",
                      placeholder: "Status",
                      type: "select",
                      options: DUMMY_SELECT_OPTIONS_STATUS,
                    },
                  ],
                  fieldArrayName: "tailNumbers",
                }}
                hookForm={sectionedHookForm}
              />
            ),
          },
          {
            label: "Door Dimensions",
            value: "door-dimensions",
            icon: <DoorClosed />,
            formFields: sectionedFormFields[1].fields,
          },
          {
            label: "Volume",
            value: "volume",
            icon: <Box />,
            formFields: sectionedFormFields[2].fields,
          },
        ]}
        rightComponent={
          // This is a dummy component, will replace once there is a use for this
          <>
            <div className="space-y-4">
              {/* <OrderSummaryCard {...formValues} /> */}
              <DimensionsCard />
              <BalanceCard />
            </div>
            <div className="space-y-4">
              <Button
                type="button"
                variant={"button-secondary"}
                className="w-full"
              >
                <ScrollTextIcon className="w-4 h-4 mr-2" />
                View Invoice
              </Button>
              <Button
                isLoading={false}
                variant={"button-primary"}
                className="w-full"
                type="submit"
              >
                Save Reservation
              </Button>
            </div>
          </>
        }
      />
    </>
  );
}
