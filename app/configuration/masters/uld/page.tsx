"use client";

import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate";
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

export default function MasterUldPage() {
  const columns: ColumnDef<any>[] = [
    selectColumn,
    {
      accessorKey: "uldNumber",
      header: "ULD#",
    },
    {
      accessorKey: "uldStatus",
      header: "ULD Status",
    },
    {
      accessorKey: "uldUseStatus",
      header: "ULD Use Status",
    },
    {
      accessorKey: "uldLocation",
      header: "Location",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated On",
    },
    actionColumn,
  ];

  const data = [
    {
      uldNumber: "ULD12345",
      uldStatus: "Active",
      uldUseStatus: "In Use",
      flightNumber: "FN123",
      uldLocation: "Warehouse A",
      uldLocationType: "Indoor",
      tareWeight: "200 kg",
      maxGrossWeight: "5000 kg",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-10",
    },
    {
      uldNumber: "ULD67890",
      uldStatus: "Inactive",
      uldUseStatus: "Stored",
      flightNumber: "FN456",
      uldLocation: "Warehouse B",
      uldLocationType: "Outdoor",
      tareWeight: "250 kg",
      maxGrossWeight: "6000 kg",
      createdAt: "2023-02-01",
      updatedAt: "2023-02-10",
    },
    {
      uldNumber: "ULD11223",
      uldStatus: "Active",
      uldUseStatus: "In Use",
      flightNumber: "FN789",
      uldLocation: "Warehouse C",
      uldLocationType: "Indoor",
      tareWeight: "300 kg",
      maxGrossWeight: "7000 kg",
      createdAt: "2023-03-01",
      updatedAt: "2023-03-10",
    },
    {
      uldNumber: "ULD44556",
      uldStatus: "Maintenance",
      uldUseStatus: "Under Repair",
      flightNumber: "FN012",
      uldLocation: "Warehouse D",
      uldLocationType: "Outdoor",
      tareWeight: "350 kg",
      maxGrossWeight: "8000 kg",
      createdAt: "2023-04-01",
      updatedAt: "2023-04-10",
    },
    {
      uldNumber: "ULD77889",
      uldStatus: "Active",
      uldUseStatus: "In Use",
      flightNumber: "FN345",
      uldLocation: "Warehouse E",
      uldLocationType: "Indoor",
      tareWeight: "400 kg",
      maxGrossWeight: "9000 kg",
      createdAt: "2023-05-01",
      updatedAt: "2023-05-10",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "location",
      label: "Location",
      type: "text",
    },
    {
      name: "uldNumber",
      label: "ULD#",
      type: "text",
    },
    {
      name: "uldType",
      label: "ULD Type",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldOwner",
      label: "ULD Owner",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "uldStatus",
      label: "ULD Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "uldUseStatus",
      label: "ULD Use Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
  ];

  const filterForm = useForm();

  return (
    <MastersPageTemplate
      heading="List ULDs"
      columns={columns}
      data={data}
      filterFormFields={filterFormFields}
      filterHookForm={filterForm}
      customFilterButtons={<FilterActions />}
      bottomCustomComponent={
        <div className="flex gap-2 mt-4">
          <Button variant="button-primary">Get Movement History</Button>
          <Button variant="button-primary">Delete</Button>
        </div>
      }
    />
  );
}
