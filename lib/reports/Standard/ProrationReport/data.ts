import { ProrationReportType } from "@/components/reports/Standard/ProrationReport/columns";

export const DUMMY_DATA: ProrationReportType[] = [
  {
    awb_number: "1234567890",
    from_date: "2024-06-10",
    to_date: "2024-06-11",
    station: "LAX",
    carrier: "United Airlines",
    flight_type: "Domestic",
    origin: "LAX",
    destination: "JFK",
    total_weight: "500kg",
    total_pieces: "10",
    total_revenue: "$5000",
    total_cost: "$3000",
    net_profit: "$2000",
    proration_factor: "0.4",
    updated_on: "2024-06-11",
  },
  {
    awb_number: "2345678901",
    from_date: "2024-06-12",
    to_date: "2024-06-13",
    station: "JFK",
    carrier: "American Airlines",
    flight_type: "International",
    origin: "JFK",
    destination: "LHR",
    total_weight: "1000kg",
    total_pieces: "20",
    total_revenue: "$10000",
    total_cost: "$7000",
    net_profit: "$3000",
    proration_factor: "0.3",
    updated_on: "2024-06-13",
  },
  {
    awb_number: "3456789012",
    from_date: "2024-06-14",
    to_date: "2024-06-15",
    station: "ORD",
    carrier: "Delta Airlines",
    flight_type: "Domestic",
    origin: "ORD",
    destination: "ATL",
    total_weight: "750kg",
    total_pieces: "15",
    total_revenue: "$7500",
    total_cost: "$4500",
    net_profit: "$3000",
    proration_factor: "0.4",
    updated_on: "2024-06-15",
  },
  {
    awb_number: "4567890123",
    from_date: "2024-06-16",
    to_date: "2024-06-17",
    station: "ATL",
    carrier: "Southwest Airlines",
    flight_type: "International",
    origin: "ATL",
    destination: "CDG",
    total_weight: "1200kg",
    total_pieces: "24",
    total_revenue: "$12000",
    total_cost: "$8000",
    net_profit: "$4000",
    proration_factor: "0.333",
    updated_on: "2024-06-17",
  },
  {
    awb_number: "5678901234",
    from_date: "2024-06-18",
    to_date: "2024-06-19",
    station: "SFO",
    carrier: "British Airways",
    flight_type: "International",
    origin: "SFO",
    destination: "LHR",
    total_weight: "900kg",
    total_pieces: "18",
    total_revenue: "$9000",
    total_cost: "$6000",
    net_profit: "$3000",
    proration_factor: "0.333",
    updated_on: "2024-06-19",
  },
  {
    awb_number: "6789012345",
    from_date: "2024-06-20",
    to_date: "2024-06-21",
    station: "SEA",
    carrier: "Lufthansa",
    flight_type: "International",
    origin: "SEA",
    destination: "FRA",
    total_weight: "1100kg",
    total_pieces: "22",
    total_revenue: "$11000",
    total_cost: "$7000",
    net_profit: "$4000",
    proration_factor: "0.364",
    updated_on: "2024-06-21",
  },
  {
    awb_number: "7890123456",
    from_date: "2024-06-22",
    to_date: "2024-06-23",
    station: "MIA",
    carrier: "Air France",
    flight_type: "International",
    origin: "MIA",
    destination: "CDG",
    total_weight: "950kg",
    total_pieces: "19",
    total_revenue: "$9500",
    total_cost: "$6000",
    net_profit: "$3500",
    proration_factor: "0.368",
    updated_on: "2024-06-23",
  },
  {
    awb_number: "8901234567",
    from_date: "2024-06-24",
    to_date: "2024-06-25",
    station: "DFW",
    carrier: "Qatar Airways",
    flight_type: "International",
    origin: "DFW",
    destination: "DOH",
    total_weight: "1300kg",
    total_pieces: "26",
    total_revenue: "$13000",
    total_cost: "$8500",
    net_profit: "$4500",
    proration_factor: "0.346",
    updated_on: "2024-06-25",
  },
  {
    awb_number: "9012345678",
    from_date: "2024-06-26",
    to_date: "2024-06-27",
    station: "LHR",
    carrier: "Emirates",
    flight_type: "International",
    origin: "LHR",
    destination: "DXB",
    total_weight: "1050kg",
    total_pieces: "21",
    total_revenue: "$10500",
    total_cost: "$7000",
    net_profit: "$3500",
    proration_factor: "0.333",
    updated_on: "2024-06-27",
  },
  {
    awb_number: "0123456789",
    from_date: "2024-06-28",
    to_date: "2024-06-29",
    station: "SYD",
    carrier: "Qantas",
    flight_type: "International",
    origin: "SYD",
    destination: "LAX",
    total_weight: "1400kg",
    total_pieces: "28",
    total_revenue: "$14000",
    total_cost: "$9000",
    net_profit: "$5000",
    proration_factor: "0.357",
    updated_on: "2024-06-29",
  },
];

export async function getData() {
  return DUMMY_DATA;
}
