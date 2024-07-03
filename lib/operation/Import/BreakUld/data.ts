import {
  AwbType,
  UldType,
} from "@/components/operation/Import/BreakUld/columns"

export const DUMMY_DATA_ULD: UldType[] = [
  {
    uld: "ULD001",
    awb_count: "5",
    pieces: "50",
    weight: "1000",
    uom: "kg",
    location: "JFK",
  },
  {
    uld: "ULD002",
    awb_count: "4",
    pieces: "40",
    weight: "800",
    uom: "kg",
    location: "ORD",
  },
  {
    uld: "ULD003",
    awb_count: "6",
    pieces: "60",
    weight: "1200",
    uom: "kg",
    location: "ATL",
  },
  {
    uld: "ULD004",
    awb_count: "7",
    pieces: "70",
    weight: "1400",
    uom: "kg",
    location: "DFW",
  },
  {
    uld: "ULD005",
    awb_count: "8",
    pieces: "80",
    weight: "1600",
    uom: "kg",
    location: "LAX",
  },
  {
    uld: "ULD006",
    awb_count: "9",
    pieces: "90",
    weight: "1800",
    uom: "kg",
    location: "SFO",
  },
  {
    uld: "ULD007",
    awb_count: "10",
    pieces: "100",
    weight: "2000",
    uom: "kg",
    location: "SEA",
  },
  {
    uld: "ULD008",
    awb_count: "11",
    pieces: "110",
    weight: "2200",
    uom: "kg",
    location: "MIA",
  },
  {
    uld: "ULD009",
    awb_count: "12",
    pieces: "120",
    weight: "2400",
    uom: "kg",
    location: "BOS",
  },
  {
    uld: "ULD010",
    awb_count: "13",
    pieces: "130",
    weight: "2600",
    uom: "kg",
    location: "DEN",
  },
]

export const DUMMY_DATA_AWB: AwbType[] = [
  {
    awb: "123-45678901",
    priority: "High",
    pol: "JFK",
    pou: "LAX",
    build_pcs: "10",
    build_wgt: "500",
    acc_pcs: "10",
    acc_wt: "500",
    arr_pcs: "10",
    arr_wt: "500",
    flight_no: "FL123",
    flight_date: "2024-06-01",
  },
  {
    awb: "123-45678902",
    priority: "Medium",
    pol: "ORD",
    pou: "MIA",
    build_pcs: "8",
    build_wgt: "320",
    acc_pcs: "8",
    acc_wt: "320",
    arr_pcs: "8",
    arr_wt: "320",
    flight_no: "FL124",
    flight_date: "2024-06-02",
  },
  {
    awb: "123-45678903",
    priority: "Low",
    pol: "ATL",
    pou: "SEA",
    build_pcs: "15",
    build_wgt: "750",
    acc_pcs: "15",
    acc_wt: "750",
    arr_pcs: "15",
    arr_wt: "750",
    flight_no: "FL125",
    flight_date: "2024-06-03",
  },
  {
    awb: "123-45678904",
    priority: "High",
    pol: "DFW",
    pou: "SFO",
    build_pcs: "12",
    build_wgt: "600",
    acc_pcs: "12",
    acc_wt: "600",
    arr_pcs: "12",
    arr_wt: "600",
    flight_no: "FL126",
    flight_date: "2024-06-04",
  },
]

export const getDataUld = () => {
  return DUMMY_DATA_ULD
}

export const getDataAwb = () => {
  return DUMMY_DATA_AWB
}
