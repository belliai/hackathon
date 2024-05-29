"use client";

import { TFormTextField } from "@/components/form/FormTextField";
import { ColumnDef } from "@tanstack/react-table";
import MastersPageTemplate from "../../components/MastersPageTemplate";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MasterMovementHistory() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "origin",
      header: "Origin",
    },
    {
      accessorKey: "destination",
      header: "Dest",
    },
    {
      accessorKey: "flightNumber",
      header: "Flight #",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "uldNumber",
      header: "ULD #",
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
      accessorKey: "awbPrefix",
      header: "AWB Prefix",
    },
    {
      accessorKey: "awbNumber",
      header: "AWB No.",
    },
  ];

  const filterFormFields: TFormTextField[] = [
    {
      name: "origin",
      placeholder: "Origin",
      type: "text",
    },
    {
      name: "destination",
      placeholder: "Dest",
      type: "text",
    },
    {
      name: "flightNumber",
      placeholder: "Flight #",
      type: "text",
    },
    {
      name: "type",
      placeholder: "Type",
      type: "text",
    },
    {
      name: "uldNumber",
      placeholder: "ULD #",
      type: "text",
    },
    {
      name: "fromDate",
      label: "From Date",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "toDate",
      label: "To Date",
      type: "date",
      hideTooltip: true,
    },
    {
      name: "awbPrefix",
      placeholder: "AWB Prefix",
      type: "text",
    },
    {
      name: "awbNumber",
      placeholder: "AWB No.",
      type: "text",
    },
  ];

  const data = [
    {
      origin: "JFK",
      destination: "LAX",
      flightNumber: "AA100",
      type: "Cargo",
      uldNumber: "ULD12345",
      fromDate: "2024-05-29",
      toDate: "2024-06-01",
      awbPrefix: "123",
      awbNumber: "4567890",
    },
    {
      origin: "LAX",
      destination: "ORD",
      flightNumber: "UA200",
      type: "Passenger",
      uldNumber: "ULD67890",
      fromDate: "2024-05-30",
      toDate: "2024-06-02",
      awbPrefix: "234",
      awbNumber: "5678901",
    },
    {
      origin: "ORD",
      destination: "DFW",
      flightNumber: "DL300",
      type: "Cargo",
      uldNumber: "ULD11223",
      fromDate: "2024-06-01",
      toDate: "2024-06-03",
      awbPrefix: "345",
      awbNumber: "6789012",
    },
    {
      origin: "DFW",
      destination: "ATL",
      flightNumber: "WN400",
      type: "Passenger",
      uldNumber: "ULD44556",
      fromDate: "2024-06-02",
      toDate: "2024-06-04",
      awbPrefix: "456",
      awbNumber: "7890123",
    },
    {
      origin: "ATL",
      destination: "JFK",
      flightNumber: "B600",
      type: "Cargo",
      uldNumber: "ULD77889",
      fromDate: "2024-06-03",
      toDate: "2024-06-05",
      awbPrefix: "567",
      awbNumber: "8901234",
    },
  ];

  const filterHookForm = useForm();

  return (
    <>
      <MastersPageTemplate
        heading="ULD Movement History"
        columns={columns}
        filterFormFields={filterFormFields}
        data={data}
        filterHookForm={filterHookForm}
        canCreate={false}
      />
      <Button
        asChild
        className="bg-button-primary hover:bg-button-primary/80 text-white"
      >
        <Link href="/organize/masters/uld">
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Link>
      </Button>
    </>
  );
}
