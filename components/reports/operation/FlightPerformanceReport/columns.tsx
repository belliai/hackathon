"use client";

import { ColumnDef } from "@tanstack/react-table";

export type FlightPerformanceType = {
  flight_date: string;
  flight_no: string;
  origin: string;
  destination: string;
  airport_type: string;
  aircraft_type: string;
  aircraft_capacity: string;
  booked_ch_wt: string;
  manifested_ch_wt: string;
  planned_ch_wt: string;
  flight_load_factor: string;
  gross_tonnage: string;
  total_vol_cbm: string;
  chargeable_tonnage: string;
  actual_tail_no: string;
  actual_aircraft_type: string;
};

export const columns: ColumnDef<FlightPerformanceType>[] = [
  { header: 'Flight Date', accessorKey: 'flight_date' },
  { header: 'Flight No.', accessorKey: 'flight_no' },
  { header: 'Origin', accessorKey: 'origin' },
  { header: 'Destination', accessorKey: 'destination' },
  { header: 'Airport Type', accessorKey: 'airport_type' },
  { header: 'Aircraft Type', accessorKey: 'aircraft_type' },
  { header: 'Aircraft Capacity', accessorKey: 'aircraft_capacity' },
  { header: 'Booked Ch. Wt', accessorKey: 'booked_ch_wt' },
  { header: 'Manifested Ch. Wt', accessorKey: 'manifested_ch_wt' },
  { header: 'Planned Ch. Wt', accessorKey: 'planned_ch_wt' },
  { header: 'Flight Load Factor', accessorKey: 'flight_load_factor' },
  { header: 'Gross Tonnage', accessorKey: 'gross_tonnage' },
  { header: 'Total Vol CBM', accessorKey: 'total_vol_cbm' },
  { header: 'Chargeable Tonnage', accessorKey: 'chargeable_tonnage' },
  { header: 'Actual Tail No.', accessorKey: 'actual_tail_no' },
  { header: 'Actual Aircraft Type', accessorKey: 'actual_aircraft_type' }
];
