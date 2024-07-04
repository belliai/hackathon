import { DailySalesType } from "@/components/reports/Standard/DailySales/columns"

export const DUMMY_DATA: DailySalesType[] = [
  {
    awb_no: "1234567890",
    from_date: "2024-05-14",
    to_date: "2024-05-15",
    origin: "LAX",
    destination: "JFK",
    carrier: "AA",
    dsr_type: "Accepted",
    flights: "AA123",
    shipper: "ABC Logistics",
    shc: "GEN",
    commodity: "Electronics",
    agent: "Agent A",
    total_sales: "5000",
    total_weight: "200",
    total_pieces: "5",
    total_revenue: "5500",
    total_cost: "4500",
    net_profit: "1000",
    updated_on: "2024-05-15",
  },
  {
    awb_no: "0987654321",
    from_date: "2024-05-16",
    to_date: "2024-05-17",
    origin: "ORD",
    destination: "ATL",
    carrier: "UA",
    dsr_type: "Accepted",
    flights: "UA456",
    shipper: "XYZ Transport",
    shc: "PER",
    commodity: "Pharmaceuticals",
    agent: "Agent B",
    total_sales: "3000",
    total_weight: "100",
    total_pieces: "10",
    total_revenue: "3300",
    total_cost: "2700",
    net_profit: "600",
    updated_on: "2024-05-17",
  },
  {
    awb_no: "1122334455",
    from_date: "2024-05-18",
    to_date: "2024-05-19",
    origin: "DFW",
    destination: "MIA",
    carrier: "DL",
    dsr_type: "Accepted",
    flights: "DL789",
    shipper: "FastTrack",
    shc: "VAL",
    commodity: "Jewelry",
    agent: "Agent C",
    total_sales: "15000",
    total_weight: "50",
    total_pieces: "3",
    total_revenue: "16500",
    total_cost: "14000",
    net_profit: "2500",
    updated_on: "2024-05-19",
  },
  {
    awb_no: "2233445566",
    from_date: "2024-05-20",
    to_date: "2024-05-21",
    origin: "SEA",
    destination: "LAX",
    carrier: "AS",
    dsr_type: "Accepted",
    flights: "AS321",
    shipper: "NorthWest Shipping",
    shc: "DGR",
    commodity: "Chemicals",
    agent: "Agent D",
    total_sales: "7000",
    total_weight: "300",
    total_pieces: "7",
    total_revenue: "7700",
    total_cost: "6300",
    net_profit: "1400",
    updated_on: "2024-05-21",
  },
  {
    awb_no: "3344556677",
    from_date: "2024-05-22",
    to_date: "2024-05-23",
    origin: "MIA",
    destination: "DFW",
    carrier: "AA",
    dsr_type: "Accepted",
    flights: "AA654",
    shipper: "SouthCargo",
    shc: "LHO",
    commodity: "Live Animals",
    agent: "Agent E",
    total_sales: "4000",
    total_weight: "500",
    total_pieces: "2",
    total_revenue: "4400",
    total_cost: "3600",
    net_profit: "800",
    updated_on: "2024-05-23",
  },
  {
    awb_no: "4455667788",
    from_date: "2024-05-24",
    to_date: "2024-05-25",
    origin: "LAX",
    destination: "ORD",
    carrier: "UA",
    dsr_type: "Accepted",
    flights: "UA987",
    shipper: "CargoPlus",
    shc: "SPX",
    commodity: "Special Equipment",
    agent: "Agent F",
    total_sales: "12000",
    total_weight: "400",
    total_pieces: "8",
    total_revenue: "13200",
    total_cost: "10500",
    net_profit: "2700",
    updated_on: "2024-05-25",
  },
  {
    awb_no: "5566778899",
    from_date: "2024-05-26",
    to_date: "2024-05-27",
    origin: "ATL",
    destination: "SEA",
    carrier: "DL",
    dsr_type: "Accepted",
    flights: "DL123",
    shipper: "SpeedyDelivery",
    shc: "VUN",
    commodity: "Valuables",
    agent: "Agent G",
    total_sales: "8000",
    total_weight: "200",
    total_pieces: "6",
    total_revenue: "8800",
    total_cost: "7200",
    net_profit: "1600",
    updated_on: "2024-05-27",
  },
  {
    awb_no: "6677889900",
    from_date: "2024-05-28",
    to_date: "2024-05-29",
    origin: "JFK",
    destination: "MIA",
    carrier: "AA",
    dsr_type: "Accepted",
    flights: "AA111",
    shipper: "AirExpress",
    shc: "AVI",
    commodity: "Aviation Parts",
    agent: "Agent H",
    total_sales: "6000",
    total_weight: "150",
    total_pieces: "4",
    total_revenue: "6600",
    total_cost: "5400",
    net_profit: "1200",
    updated_on: "2024-05-29",
  },
  {
    awb_no: "7788990011",
    from_date: "2024-05-30",
    to_date: "2024-05-31",
    origin: "ORD",
    destination: "DFW",
    carrier: "UA",
    dsr_type: "Accepted",
    flights: "UA222",
    shipper: "QuickShip",
    shc: "EAT",
    commodity: "Food Items",
    agent: "Agent I",
    total_sales: "5000",
    total_weight: "100",
    total_pieces: "12",
    total_revenue: "5500",
    total_cost: "4300",
    net_profit: "1200",
    updated_on: "2024-05-31",
  },
  {
    awb_no: "8899001122",
    from_date: "2024-06-01",
    to_date: "2024-06-02",
    origin: "SEA",
    destination: "ATL",
    carrier: "AS",
    dsr_type: "Accepted",
    flights: "AS333",
    shipper: "WestCargo",
    shc: "GOV",
    commodity: "Government Supplies",
    agent: "Agent J",
    total_sales: "9000",
    total_weight: "350",
    total_pieces: "9",
    total_revenue: "9900",
    total_cost: "8100",
    net_profit: "1800",
    updated_on: "2024-06-02",
  },
]

export async function getData() {
  return DUMMY_DATA
}