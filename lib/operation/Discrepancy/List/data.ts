import { DiscrepancyListType } from "@/components/operation/Discrepancy/List/columns"

export const DUMMY_DATA: DiscrepancyListType[] = [
  {
    awb_number: "AWB001",
    origin: "JFK",
    destination: "LAX",
    shipper: "Company A",
    consignee: "Company X",
    declared_weight: "500kg",
    actual_weight: "510kg",
    weight_discrepancy: "10kg",
    declared_pieces: "50",
    actual_pieces: "48",
    pieces_discrepancy: "2",
    flight_number: "AA123",
    flight_date: "2024-06-01",
    remarks: "Weight discrepancy due to repackaging",
  },
  {
    awb_number: "AWB002",
    origin: "ORD",
    destination: "DFW",
    shipper: "Company B",
    consignee: "Company Y",
    declared_weight: "200kg",
    actual_weight: "195kg",
    weight_discrepancy: "-5kg",
    declared_pieces: "20",
    actual_pieces: "20",
    pieces_discrepancy: "0",
    flight_number: "UA456",
    flight_date: "2024-06-02",
    remarks: "Minor weight discrepancy",
  },
  {
    awb_number: "AWB003",
    origin: "ATL",
    destination: "MIA",
    shipper: "Company C",
    consignee: "Company Z",
    declared_weight: "1000kg",
    actual_weight: "990kg",
    weight_discrepancy: "-10kg",
    declared_pieces: "100",
    actual_pieces: "99",
    pieces_discrepancy: "1",
    flight_number: "DL789",
    flight_date: "2024-06-03",
    remarks: "Weight and pieces discrepancy",
  },
  {
    awb_number: "AWB004",
    origin: "LAX",
    destination: "SEA",
    shipper: "Company D",
    consignee: "Company W",
    declared_weight: "750kg",
    actual_weight: "760kg",
    weight_discrepancy: "10kg",
    declared_pieces: "75",
    actual_pieces: "74",
    pieces_discrepancy: "1",
    flight_number: "AS321",
    flight_date: "2024-06-04",
    remarks: "Weight discrepancy due to packaging",
  },
  {
    awb_number: "AWB005",
    origin: "DFW",
    destination: "ORD",
    shipper: "Company E",
    consignee: "Company V",
    declared_weight: "300kg",
    actual_weight: "290kg",
    weight_discrepancy: "-10kg",
    declared_pieces: "30",
    actual_pieces: "29",
    pieces_discrepancy: "1",
    flight_number: "AA654",
    flight_date: "2024-06-05",
    remarks: "Weight discrepancy due to different scales",
  },
  {
    awb_number: "AWB006",
    origin: "SEA",
    destination: "JFK",
    shipper: "Company F",
    consignee: "Company U",
    declared_weight: "600kg",
    actual_weight: "610kg",
    weight_discrepancy: "10kg",
    declared_pieces: "60",
    actual_pieces: "58",
    pieces_discrepancy: "2",
    flight_number: "AS987",
    flight_date: "2024-06-06",
    remarks: "Weight discrepancy due to remeasurement",
  },
  {
    awb_number: "AWB007",
    origin: "MIA",
    destination: "ATL",
    shipper: "Company G",
    consignee: "Company T",
    declared_weight: "800kg",
    actual_weight: "810kg",
    weight_discrepancy: "10kg",
    declared_pieces: "80",
    actual_pieces: "79",
    pieces_discrepancy: "1",
    flight_number: "DL654",
    flight_date: "2024-06-07",
    remarks: "Weight discrepancy due to repacking",
  },
  {
    awb_number: "AWB008",
    origin: "LAX",
    destination: "ORD",
    shipper: "Company H",
    consignee: "Company S",
    declared_weight: "450kg",
    actual_weight: "445kg",
    weight_discrepancy: "-5kg",
    declared_pieces: "45",
    actual_pieces: "45",
    pieces_discrepancy: "0",
    flight_number: "UA321",
    flight_date: "2024-06-08",
    remarks: "Minor weight discrepancy",
  },
  {
    awb_number: "AWB009",
    origin: "ORD",
    destination: "DFW",
    shipper: "Company I",
    consignee: "Company R",
    declared_weight: "550kg",
    actual_weight: "560kg",
    weight_discrepancy: "10kg",
    declared_pieces: "55",
    actual_pieces: "54",
    pieces_discrepancy: "1",
    flight_number: "AA123",
    flight_date: "2024-06-09",
    remarks: "Weight discrepancy due to reweighing",
  },
  {
    awb_number: "AWB010",
    origin: "JFK",
    destination: "LAX",
    shipper: "Company J",
    consignee: "Company Q",
    declared_weight: "700kg",
    actual_weight: "695kg",
    weight_discrepancy: "-5kg",
    declared_pieces: "70",
    actual_pieces: "69",
    pieces_discrepancy: "1",
    flight_number: "AA456",
    flight_date: "2024-06-10",
    remarks: "Weight discrepancy due to measurement error",
  },
]

export async function getData() {
  return DUMMY_DATA
}
