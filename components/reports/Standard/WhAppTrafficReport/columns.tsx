"use client";

import { ColumnDef } from "@tanstack/react-table";

export type WHAppTrafficReportType = {
  date: string;
  time: string;
  vehicle_number: string;
  driver_name: string;
  entry_time: string;
  exit_time: string;
  duration: string;
  cargo_type: string;
  cargo_weight: string;
  origin: string;
  destination: string;
  status: string;
  station: string;
  updated_on: string;
};

export const columns: ColumnDef<WHAppTrafficReportType>[] = [
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Time",
    accessorKey: "time",
  },
  {
    header: "Vehicle Number",
    accessorKey: "vehicle_number",
  },
  {
    header: "Driver Name",
    accessorKey: "driver_name",
  },
  {
    header: "Entry Time",
    accessorKey: "entry_time",
  },
  {
    header: "Exit Time",
    accessorKey: "exit_time",
  },
  {
    header: "Duration",
    accessorKey: "duration",
  },
  {
    header: "Cargo Type",
    accessorKey: "cargo_type",
  },
  {
    header: "Cargo Weight",
    accessorKey: "cargo_weight",
  },
  {
    header: "Origin",
    accessorKey: "origin",
  },
  {
    header: "Destination",
    accessorKey: "destination",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Station",
    accessorKey: "station",
  },
  {
    header: "Updated On",
    accessorKey: "updated_on",
  },
];
