"use client";

import { ColumnDef } from "@tanstack/react-table";

export type DoReportType = {
  do_number?: string;
  date_shipped?: string;
  shipper_name?: string;
  consignee_name?: string;
  origin?: string;
  destination?: string;
  weight_kg?: number;
  dimensions?: string;
  service_type?: string;
  estimated_charge?: number;
};

export const columns: ColumnDef<DoReportType>[] = [
  {
    header: 'DO Number',
    accessorKey: 'do_number',
  },
  {
    header: 'Date Shipped',
    accessorKey: 'date_shipped',
  },
  {
    header: 'Shipper Name',
    accessorKey: 'shipper_name',
  },
  {
    header: 'Consignee Name',
    accessorKey: 'consignee_name',
  },
  {
    header: 'Origin',
    accessorKey: 'origin',
  },
  {
    header: 'Destination',
    accessorKey: 'destination',
  },
  {
    header: 'Weight (kg)',
    accessorKey: 'weight_kg',
  },
  {
    header: 'Dimensions',
    accessorKey: 'dimensions',
  },
  {
    header: 'Service Type',
    accessorKey: 'service_type',
  },
  {
    header: 'Estimated Charge',
    accessorKey: 'estimated_charge',
  },
];
