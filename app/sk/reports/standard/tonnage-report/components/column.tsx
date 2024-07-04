"use client"

import { ColumnDef } from "@tanstack/react-table"

export type TonnageReportType = {
  awb_prefix: string
  awb_number: string
  awb_origin: string
  awb_destination: string
  flight_no: string
  flight_date: string
  station: string
  gross_wt: string
  charged_wt: string
  commodity: string
  station_type: string
}

export const columns: ColumnDef<TonnageReportType>[] = [
  {
    header: "AWB Prefix",
    accessorKey: "awb_prefix",
  },
  {
    header: "AWB Number",
    accessorKey: "awb_number",
  },
  {
    header: "AWB Origin",
    accessorKey: "awb_origin",
  },
  {
    header: "AWB Destination",
    accessorKey: "awb_destination",
  },
  {
    header: "Flight No",
    accessorKey: "flight_no",
  },
  {
    header: "Flight Date",
    accessorKey: "flight_date",
  },
  {
    header: "Station",
    accessorKey: "station",
  },
  {
    header: "Gross WT",
    accessorKey: "gross_wt",
  },
  {
    header: "Charged WT",
    accessorKey: "charged_wt",
  },
  {
    header: "Commodity",
    accessorKey: "commodity",
  },
  {
    header: "Station Type",
    accessorKey: "station_type",
  },
]

export const DUMMY_DATA: TonnageReportType[] = [
  {
    awb_prefix: "123",
    awb_number: "45678901",
    awb_origin: "JFK",
    awb_destination: "LHR",
    flight_no: "BA178",
    flight_date: "2024-01-01",
    station: "New York",
    gross_wt: "1000.50",
    charged_wt: "950.00",
    commodity: "Electronics",
    station_type: "Origin",
  },
  {
    awb_prefix: "234",
    awb_number: "56789012",
    awb_origin: "LAX",
    awb_destination: "NRT",
    flight_no: "JL701",
    flight_date: "2024-01-02",
    station: "Los Angeles",
    gross_wt: "1200.75",
    charged_wt: "1100.00",
    commodity: "Textiles",
    station_type: "Origin",
  },
  {
    awb_prefix: "345",
    awb_number: "67890123",
    awb_origin: "ORD",
    awb_destination: "DXB",
    flight_no: "EK236",
    flight_date: "2024-01-03",
    station: "Chicago",
    gross_wt: "1500.25",
    charged_wt: "1400.00",
    commodity: "Machinery",
    station_type: "Origin",
  },
  {
    awb_prefix: "456",
    awb_number: "78901234",
    awb_origin: "IAH",
    awb_destination: "SYD",
    flight_no: "QF8",
    flight_date: "2024-01-04",
    station: "Houston",
    gross_wt: "2000.00",
    charged_wt: "1900.00",
    commodity: "Pharmaceuticals",
    station_type: "Origin",
  },
  {
    awb_prefix: "567",
    awb_number: "89012345",
    awb_origin: "MIA",
    awb_destination: "CDG",
    flight_no: "AF99",
    flight_date: "2024-01-05",
    station: "Miami",
    gross_wt: "1100.60",
    charged_wt: "1050.00",
    commodity: "Automotive",
    station_type: "Origin",
  },
  {
    awb_prefix: "678",
    awb_number: "90123456",
    awb_origin: "SEA",
    awb_destination: "HKG",
    flight_no: "CX87",
    flight_date: "2024-01-06",
    station: "Seattle",
    gross_wt: "1800.85",
    charged_wt: "1700.00",
    commodity: "Apparel",
    station_type: "Origin",
  },
  {
    awb_prefix: "789",
    awb_number: "01234567",
    awb_origin: "SFO",
    awb_destination: "AMS",
    flight_no: "KL606",
    flight_date: "2024-01-07",
    station: "San Francisco",
    gross_wt: "1300.90",
    charged_wt: "1250.00",
    commodity: "Food Products",
    station_type: "Origin",
  },
]
