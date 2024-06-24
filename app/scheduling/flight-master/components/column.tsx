"use client";

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import createActionColumn from "@/app/organize/masters/components/columnItem";

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

export const columns = (
  onRowClick: (data: Flight) => void,
  onDelete: (data: Flight) => void
): ColumnDef<Flight>[] => ([
  {
    accessorKey: "entry_type",
    header: "Entry Type",
    cell: ({ row }) => {
      return 'Manual';
    },
  },
  {
    accessorKey: "flight_no",
    header: "Flight No.",
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const source = row.original.source;
      return source ? source.name : '';
    },
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => {
      const destination = row.original.destination;
      return destination ? destination.name : '';
    },
  },
  {
    accessorKey: "from_date",
    header: "STD(API)",
    cell: ({ row }) => {
      const date = row.original.from_date || '';
      return moment(date).format('YYYY-MM-DD');
    },
  },
  {
    accessorKey: "to_date",
    header: "STA",
    cell: ({ row }) => {
      const date = row.original.to_date || '';
      return moment(date).format('YYYY-MM-DD');
    },
  },
  {
    accessorKey: "aircraft",
    header: "Aircraft Type",
    cell: ({ row }) => {
      const aircraft = row.original.aircraft;
      return aircraft ? aircraft.aircraft_type : '';
    },
  },
  {
    accessorKey: "tail",
    header: "Tail No.",
    cell: ({ row }) => {
      const tail = row.original.tail;
      return tail ? tail.tail_number : '';
    },
  },
  {
    accessorKey: "flight_type",
    header: "Flight Type",
    cell: ({ row }) => {
      const flightType = row.original.flight_type;
      return flightType ? flightType.value : '';
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return status ? status.value : '';
    },
  },
  {
    accessorKey: "sector",
    header: "Sector",
    cell: ({ row }) => {
      const sector = row.original.sector;
      return sector ? sector.value : '';
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.original.created_at || '';
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const date = row.original.updated_at || '';
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    accessorKey: "updated_by",
    header: "Updated By",
    cell: ({ row }) => {
      return 'Jeff Pan';
    },
  },
  createActionColumn({
    items: [
      {
        label: "Edit",
        value: "edit",
        fn: onRowClick,
      },
      {
        label: "Delete",
        value: "delete",
        fn: onDelete,
        shortcut: "⌘⌫",
      },
    ],
  }) as ColumnDef<Flight>
]);
