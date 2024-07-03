"use client"

import { ColumnDef } from "@tanstack/react-table"

export type AWBDetailReportType = {
  origin?: string
  destination?: string
  agent_code?: string
  awb_no?: string
  execution_date?: string
  flight_detail?: string
  pieces?: string
  gross_weight?: string
  charged_weight?: string
  commodity_code?: string
  commodity_desc?: string
}

export const columns: ColumnDef<AWBDetailReportType>[] = [
  {
    header: "Origin",
    accessorKey: "origin",
  },
  {
    header: "Destination",
    accessorKey: "destination",
  },
  {
    header: "Agent Code",
    accessorKey: "agent_code",
  },
  {
    header: "AWB No",
    accessorKey: "awb_no",
  },
  {
    header: "Execution Date",
    accessorKey: "execution_date",
  },
  {
    header: "Flight Detail",
    accessorKey: "flight_detail",
  },
  {
    header: "Pieces",
    accessorKey: "pieces",
  },
  {
    header: "Gross Weight",
    accessorKey: "gross_weight",
  },
  {
    header: "Charged Weight",
    accessorKey: "charged_weight",
  },
  {
    header: "Commodity Code",
    accessorKey: "commodity_code",
  },
  {
    header: "Commodity Description",
    accessorKey: "commodity_desc",
  },
]

export const DUMMY_DATA: AWBDetailReportType[] = [
  {
    origin: "JFK",
    destination: "LHR",
    agent_code: "AG123",
    awb_no: "123-45678901",
    execution_date: "2024-01-15",
    flight_detail: "AA100",
    pieces: "10",
    gross_weight: "1500",
    charged_weight: "1400",
    commodity_code: "C01",
    commodity_desc: "Electronics",
  },
  {
    origin: "LAX",
    destination: "HND",
    agent_code: "AG124",
    awb_no: "123-45678902",
    execution_date: "2024-01-16",
    flight_detail: "JL61",
    pieces: "20",
    gross_weight: "2500",
    charged_weight: "2400",
    commodity_code: "C02",
    commodity_desc: "Apparel",
  },
  {
    origin: "ATL",
    destination: "CDG",
    agent_code: "AG125",
    awb_no: "123-45678903",
    execution_date: "2024-01-17",
    flight_detail: "DL82",
    pieces: "15",
    gross_weight: "1800",
    charged_weight: "1700",
    commodity_code: "C03",
    commodity_desc: "Automotive Parts",
  },
  {
    origin: "ORD",
    destination: "FRA",
    agent_code: "AG126",
    awb_no: "123-45678904",
    execution_date: "2024-01-18",
    flight_detail: "LH431",
    pieces: "25",
    gross_weight: "3000",
    charged_weight: "2900",
    commodity_code: "C04",
    commodity_desc: "Pharmaceuticals",
  },
  {
    origin: "DFW",
    destination: "DXB",
    agent_code: "AG127",
    awb_no: "123-45678905",
    execution_date: "2024-01-19",
    flight_detail: "EK222",
    pieces: "30",
    gross_weight: "3500",
    charged_weight: "3400",
    commodity_code: "C05",
    commodity_desc: "Machinery",
  },
  {
    origin: "MIA",
    destination: "GRU",
    agent_code: "AG128",
    awb_no: "123-45678906",
    execution_date: "2024-01-20",
    flight_detail: "AA905",
    pieces: "12",
    gross_weight: "1600",
    charged_weight: "1500",
    commodity_code: "C06",
    commodity_desc: "Furniture",
  },
  {
    origin: "SFO",
    destination: "PVG",
    agent_code: "AG129",
    awb_no: "123-45678907",
    execution_date: "2024-01-21",
    flight_detail: "UA857",
    pieces: "18",
    gross_weight: "2200",
    charged_weight: "2100",
    commodity_code: "C07",
    commodity_desc: "Textiles",
  },
  {
    origin: "SEA",
    destination: "ICN",
    agent_code: "AG130",
    awb_no: "123-45678908",
    execution_date: "2024-01-22",
    flight_detail: "KE20",
    pieces: "22",
    gross_weight: "2700",
    charged_weight: "2600",
    commodity_code: "C08",
    commodity_desc: "Medical Equipment",
  },
  {
    origin: "BOS",
    destination: "AMS",
    agent_code: "AG131",
    awb_no: "123-45678909",
    execution_date: "2024-01-23",
    flight_detail: "KL618",
    pieces: "14",
    gross_weight: "1900",
    charged_weight: "1800",
    commodity_code: "C09",
    commodity_desc: "Books",
  },
  {
    origin: "IAH",
    destination: "NRT",
    agent_code: "AG132",
    awb_no: "123-45678910",
    execution_date: "2024-01-24",
    flight_detail: "NH173",
    pieces: "16",
    gross_weight: "2000",
    charged_weight: "1900",
    commodity_code: "C10",
    commodity_desc: "Toys",
  },
]
