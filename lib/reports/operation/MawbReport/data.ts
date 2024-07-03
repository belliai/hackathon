import { MawbReportType } from "@/components/reports/operation/MawbReport/columns"

export const DUMMY_DATA: MawbReportType[] = [
  {
    mawb_number: "1234567890",
    date_shipped: "2024-05-01",
    shipper_name: "ABC Company",
    consignee_name: "XYZ Corporation",
    origin: "New York",
    destination: "Los Angeles",
    total_weight_kg: 50,
    total_pieces: 3,
    service_type: "Express",
    estimated_charge: 200,
  },
  {
    mawb_number: "0987654321",
    date_shipped: "2024-05-05",
    shipper_name: "DEF Corp",
    consignee_name: "PQR Ltd",
    origin: "London",
    destination: "Tokyo",
    total_weight_kg: 30,
    total_pieces: 2,
    service_type: "Economy",
    estimated_charge: 150,
  },
  {
    mawb_number: "1357924680",
    date_shipped: "2024-05-10",
    shipper_name: "GHI Ltd",
    consignee_name: "MNO Inc",
    origin: "Sydney",
    destination: "Shanghai",
    total_weight_kg: 70,
    total_pieces: 4,
    service_type: "Priority",
    estimated_charge: 300,
  },
  {
    mawb_number: "2468013579",
    date_shipped: "2024-05-15",
    shipper_name: "JKL Corporation",
    consignee_name: "STU Enterprises",
    origin: "Paris",
    destination: "Dubai",
    total_weight_kg: 45,
    total_pieces: 2,
    service_type: "Standard",
    estimated_charge: 180,
  },
  {
    mawb_number: "9876543210",
    date_shipped: "2024-05-20",
    shipper_name: "VWX Ltd",
    consignee_name: "YZ Corp",
    origin: "Berlin",
    destination: "Beijing",
    total_weight_kg: 60,
    total_pieces: 3,
    service_type: "Priority",
    estimated_charge: 250,
  },
]

export async function getData() {
  return DUMMY_DATA
}
