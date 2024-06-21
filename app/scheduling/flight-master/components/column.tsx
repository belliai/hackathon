"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableSelectHead from "@/components/data-table/DataTableSelectHead";
import DataTableSelectRow from "@/components/data-table/DataTableSelectRow";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

export type FlightMasterDataType = {
    entry_type: string;
    flight_no: string;
    source: string;
    destination: string;
    std_api: string;
    sta: string;
    aircraft_type: string;
    tail_no: string;
    flight_type: string;
    status: string;
    sector: string;
    created_at: string;
    updated_at: string;
    updated_by: string;
};

export const columns: ColumnDef<FlightMasterDataType>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableSelectHead table={table} />,
    cell: ({ row }) => <DataTableSelectRow row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "entry_type",
    header: "Entry Type",
  },
  {
    accessorKey: "flight_no",
    header: "Flight No.",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "std_api",
    header: "STD(API)",
  },
  {
    accessorKey: "sta",
    header: "STA",
  },
  {
    accessorKey: "aircraft_type",
    header: "Aircraft Type",
  },
  {
    accessorKey: "tail_no",
    header: "Tail No.",
  },
  {
    accessorKey: "flight_type",
    header: "Flight Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "sector",
    header: "Sector",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
    accessorKey: "updated_by",
    header: "Updated By",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions />,
  },
];

export const DUMMY_DATA: FlightMasterDataType[] = [
  {
    entry_type: "Scheduled",
    flight_no: "AA123",
    source: "JFK",
    destination: "LAX",
    std_api: "2024-05-23T08:00:00Z",
    sta: "2024-05-23T11:00:00Z",
    aircraft_type: "Boeing 737",
    tail_no: "N12345",
    flight_type: "Domestic",
    status: "On Time",
    sector: "NYC-LA",
    created_at: "2024-05-20T10:00:00Z",
    updated_at: "2024-05-22T10:00:00Z",
    updated_by: "John Doe",
  },
  {
    entry_type: "Charter",
    flight_no: "BB456",
    source: "SFO",
    destination: "ORD",
    std_api: "2024-05-23T09:30:00Z",
    sta: "2024-05-23T13:30:00Z",
    aircraft_type: "Airbus A320",
    tail_no: "N67890",
    flight_type: "Domestic",
    status: "Delayed",
    sector: "SF-CHI",
    created_at: "2024-05-20T12:00:00Z",
    updated_at: "2024-05-22T12:00:00Z",
    updated_by: "Jane Smith",
  },
  {
    entry_type: "Cargo",
    flight_no: "CC789",
    source: "MIA",
    destination: "DFW",
    std_api: "2024-05-23T07:00:00Z",
    sta: "2024-05-23T10:00:00Z",
    aircraft_type: "Boeing 747",
    tail_no: "N54321",
    flight_type: "Cargo",
    status: "Cancelled",
    sector: "MIA-DFW",
    created_at: "2024-05-20T14:00:00Z",
    updated_at: "2024-05-22T14:00:00Z",
    updated_by: "Mike Johnson",
  },
];
