"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OffloadReportType = {
  axb_number?: string;
  origin?: string;
  destination?: string;
  booked_pcs?: string;
  booked_wt?: string;
  charged_wt?: string;
  offload_pcs?: string;
  offload_wt?: string;
  reason?: string;
  offloaded_flight?: string;
  offloaded_by?: string;
  offloaded_at?: string;
};

export const columns: ColumnDef<OffloadReportType>[] = [
  { header: 'AXB Number', accessorKey: 'axb_number' },
  { header: 'Origin', accessorKey: 'origin' },
  { header: 'Destination', accessorKey: 'destination' },
  { header: 'Booked Pcs.', accessorKey: 'booked_pcs' },
  { header: 'Booked Wt.', accessorKey: 'booked_wt' },
  { header: 'Charged Wt.', accessorKey: 'charged_wt' },
  { header: 'Offload Pcs.', accessorKey: 'offload_pcs' },
  { header: 'Offload Wt.', accessorKey: 'offload_wt' },
  { header: 'Reason', accessorKey: 'reason' },
  { header: 'Offloaded Flight', accessorKey: 'offloaded_flight' },
  { header: 'Offloaded By', accessorKey: 'offloaded_by' },
  { header: 'Offloaded At', accessorKey: 'offloaded_at' }
];
